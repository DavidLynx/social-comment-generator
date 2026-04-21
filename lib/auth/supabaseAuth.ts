import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AuthSession } from "./types";

export async function getSupabaseSession(): Promise<AuthSession> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return anonymousSupabaseSession;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return anonymousSupabaseSession;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, username")
    .eq("id", user.id)
    .maybeSingle();
  const plan = profile?.plan === "premium" ? "premium" : "free";

  return {
    status: plan === "premium" ? "premium" : "logged_in",
    userId: user.id,
    email: user.email ?? null,
    displayName:
      typeof profile?.username === "string"
        ? profile.username
        : typeof user.user_metadata.name === "string"
          ? user.user_metadata.name
          : typeof user.user_metadata.full_name === "string"
            ? user.user_metadata.full_name
            : null,
    plan,
    provider: "supabase",
  };
}

const anonymousSupabaseSession: AuthSession = {
  status: "anonymous",
  userId: null,
  email: null,
  displayName: null,
  plan: null,
  provider: "supabase",
};
