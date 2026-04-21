import type { SupabaseClient, User } from "@supabase/supabase-js";

export async function ensureProfile(
  supabase: SupabaseClient,
  user: User,
) {
  const displayName =
    typeof user.user_metadata.name === "string"
      ? user.user_metadata.name
      : typeof user.user_metadata.full_name === "string"
        ? user.user_metadata.full_name
        : null;

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email ?? null,
      username: displayName,
      plan: "free",
    },
    { onConflict: "id" },
  );

  if (error) {
    throw error;
  }
}
