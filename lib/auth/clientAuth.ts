import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export async function signInWithGoogle() {
  const supabase = createSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase Auth is not configured.");
  }

  const origin = window.location.origin;
  const locale = window.location.pathname.split("/")[1] || "en";
  const redirectTo = `${origin}/api/auth/callback?next=/${locale}/generator`;

  if (process.env.NODE_ENV !== "production") {
    console.info("[Supabase debug] starting Google OAuth", {
      provider: "google",
      redirectTo,
    });
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });

  if (error) {
    throw error;
  }
}

export async function signOut() {
  const supabase = createSupabaseBrowserClient();

  if (!supabase) {
    return;
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}
