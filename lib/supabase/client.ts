import { createBrowserClient } from "@supabase/ssr";

const browserSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const browserSupabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function getBrowserSupabaseConfig() {
  return {
    isConfigured: Boolean(
      browserSupabaseUrl && browserSupabasePublishableKey,
    ),
    publishableKey: browserSupabasePublishableKey,
    url: browserSupabaseUrl,
  };
}

function debugBrowserSupabaseConfig(
  context: string,
  extra?: Record<string, boolean | string>,
) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const config = getBrowserSupabaseConfig();

  console.info(`[Supabase debug] ${context}`, {
    hasPublishableKey: Boolean(config.publishableKey),
    hasUrl: Boolean(config.url),
    isConfigured: config.isConfigured,
    ...extra,
  });
}

export function createSupabaseBrowserClient() {
  const config = getBrowserSupabaseConfig();
  debugBrowserSupabaseConfig("browser client init");

  if (!config.isConfigured || !config.url || !config.publishableKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Supabase] browser client: missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Auth will run in anonymous mode.",
      );
    }

    return null;
  }

  const supabase = createBrowserClient(config.url, config.publishableKey);
  debugBrowserSupabaseConfig("browser client initialized", {
    initialized: Boolean(supabase),
  });

  return supabase;
}
