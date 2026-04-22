import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getUsagePolicy } from "./limits";
import { ensureProfile } from "@/lib/auth/profiles";

export type UsageSnapshot = {
  count: number;
  limit: number | null;
  remaining: number | null;
  allowed: boolean;
  date: string;
  source: "database";
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

async function syncProfileForUsage(supabase: SupabaseClient, user: User) {
  try {
    await ensureProfile(supabase, user);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Profile sync failed during usage check", {
        error,
        userId: user.id,
      });
    }
  }
}

function toSnapshot({
  count,
  date,
  limit,
}: {
  count: number;
  date: string;
  limit: number | null;
}): UsageSnapshot {
  return {
    allowed: limit === null || count < limit,
    count,
    date,
    limit,
    remaining: limit === null ? null : Math.max(0, limit - count),
    source: "database",
  };
}

export async function getAuthenticatedUsage(
  supabase: SupabaseClient,
  user: User,
): Promise<UsageSnapshot> {
  await syncProfileForUsage(supabase, user);

  const date = todayKey();
  const policy = getUsagePolicy("logged_in");
  const { data, error } = await supabase
    .from("daily_usage")
    .select("count")
    .eq("user_id", user.id)
    .eq("usage_date", date)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const count = data?.count ?? 0;
  const limit = policy.dailyLimit;

  return toSnapshot({
    count,
    date,
    limit,
  });
}

export async function incrementAuthenticatedUsage(
  supabase: SupabaseClient,
  user: User,
): Promise<UsageSnapshot> {
  await syncProfileForUsage(supabase, user);

  const date = todayKey();
  const policy = getUsagePolicy("logged_in");
  const limit = policy.dailyLimit;
  const { data, error } = await supabase
    .from("daily_usage")
    .select("count")
    .eq("user_id", user.id)
    .eq("usage_date", date)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const current = toSnapshot({
    count: data?.count ?? 0,
    date,
    limit,
  });

  if (!current.allowed) {
    return current;
  }

  const nextCount = current.count + 1;
  const write =
    data === null
      ? await supabase.from("daily_usage").insert({
          count: nextCount,
          usage_date: current.date,
          user_id: user.id,
        })
      : await supabase
          .from("daily_usage")
          .update({ count: nextCount })
          .eq("user_id", user.id)
          .eq("usage_date", current.date);

  if (write.error) {
    throw write.error;
  }

  return {
    ...current,
    allowed: current.limit === null || nextCount <= current.limit,
    count: nextCount,
    remaining:
      current.limit === null ? null : Math.max(0, current.limit - nextCount),
  };
}
