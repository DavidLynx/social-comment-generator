import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig, warnIfSupabaseMissing } from "./config";

export function createSupabaseBrowserClient() {
  const config = getSupabaseConfig();

  if (!config.isConfigured || !config.url || !config.publishableKey) {
    warnIfSupabaseMissing("browser client");
    return null;
  }

  return createBrowserClient(config.url, config.publishableKey);
}
