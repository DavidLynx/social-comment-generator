import { createBrowserClient } from "@supabase/ssr";
import {
  debugSupabaseConfig,
  getSupabaseConfig,
  warnIfSupabaseMissing,
} from "./config";

export function createSupabaseBrowserClient() {
  const config = getSupabaseConfig();
  debugSupabaseConfig("browser client init");

  if (!config.isConfigured || !config.url || !config.publishableKey) {
    warnIfSupabaseMissing("browser client");
    return null;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[Supabase debug] browser client initialized", {
      initialized: true,
    });
  }

  return createBrowserClient(config.url, config.publishableKey);
}
