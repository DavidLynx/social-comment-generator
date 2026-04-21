import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig, warnIfSupabaseMissing } from "./config";

export async function createSupabaseServerClient() {
  const config = getSupabaseConfig();

  if (!config.isConfigured || !config.url || !config.publishableKey) {
    warnIfSupabaseMissing("server client");
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot set cookies; route handlers and proxy can.
        }
      },
    },
  });
}
