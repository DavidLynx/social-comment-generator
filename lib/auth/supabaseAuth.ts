import type { AuthSession } from "./types";

export async function getSupabaseSession(): Promise<AuthSession> {
  return {
    status: "anonymous",
    userId: null,
    email: null,
    plan: null,
    provider: "supabase",
  };
}

export async function signInWithGoogle() {
  throw new Error("Supabase Auth is not configured yet.");
}
