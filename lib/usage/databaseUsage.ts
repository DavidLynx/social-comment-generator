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

export async function getAuthenticatedUsage(
  supabase: SupabaseClient,
  user: User,
): Promise<UsageSnapshot> {
  await ensureProfile(supabase, user);

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

  return {
    allowed: limit === null || count < limit,
    count,
    date,
    limit,
    remaining: limit === null ? null : Math.max(0, limit - count),
    source: "database",
  };
}

export async function incrementAuthenticatedUsage(
  supabase: SupabaseClient,
  user: User,
): Promise<UsageSnapshot> {
  const current = await getAuthenticatedUsage(supabase, user);

  if (!current.allowed) {
    return current;
  }

  const nextCount = current.count + 1;
  const { error } = await supabase.from("daily_usage").upsert(
    {
      user_id: user.id,
      usage_date: current.date,
      count: nextCount,
    },
    { onConflict: "user_id,usage_date" },
  );

  if (error) {
    throw error;
  }

  return {
    ...current,
    allowed: current.limit === null || nextCount <= current.limit,
    count: nextCount,
    remaining:
      current.limit === null ? null : Math.max(0, current.limit - nextCount),
  };
}
