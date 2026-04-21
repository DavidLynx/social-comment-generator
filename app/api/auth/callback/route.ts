import { NextResponse } from "next/server";
import { ensureProfile } from "@/lib/auth/profiles";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/en/generator";
  const supabase = await createSupabaseServerClient();

  if (!supabase || !code) {
    return NextResponse.redirect(new URL(next, request.url));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (!error) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      try {
        await ensureProfile(supabase, user);
      } catch (profileError) {
        console.error("Profile upsert failed after login", profileError);
      }
    }
  } else {
    console.error("Supabase auth callback failed", error);
  }

  return NextResponse.redirect(new URL(next, request.url));
}
