export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  return {
    isConfigured: Boolean(url && publishableKey),
    publishableKey,
    url,
  };
}

export function debugSupabaseConfig(context: string) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const config = getSupabaseConfig();

  console.info(`[Supabase debug] ${context}`, {
    hasPublishableKey: Boolean(config.publishableKey),
    hasUrl: Boolean(config.url),
    isConfigured: config.isConfigured,
  });
}

export function warnIfSupabaseMissing(context: string) {
  const { isConfigured } = getSupabaseConfig();

  if (!isConfigured && process.env.NODE_ENV !== "production") {
    console.warn(
      `[Supabase] ${context}: missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Auth will run in anonymous mode.`,
    );
  }

  return isConfigured;
}
