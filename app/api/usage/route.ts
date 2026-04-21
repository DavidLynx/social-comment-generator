import { getUsageLimit } from "@/lib/usage/limits";
import {
  getAuthenticatedUsage,
  incrementAuthenticatedUsage,
} from "@/lib/usage/databaseUsage";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      try {
        const usage = await getAuthenticatedUsage(supabase, user);
        return Response.json({ authenticated: true, usage });
      } catch (error) {
        console.error("Failed to read authenticated usage", error);
        return Response.json(
          { authenticated: true, error: "usage_read_failed" },
          { status: 500 },
        );
      }
    }
  }

  return Response.json({
    authenticated: false,
    anonymous: getUsageLimit("anonymous"),
    logged_in: getUsageLimit("logged_in"),
    premium: null,
  });
}

export async function POST() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return Response.json({
      authenticated: false,
      allowed: true,
      usage: {
        count: 0,
        limit: getUsageLimit("anonymous"),
        remaining: getUsageLimit("anonymous"),
        source: "demo",
      },
    });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({
      authenticated: false,
      allowed: true,
      usage: {
        count: 0,
        limit: getUsageLimit("anonymous"),
        remaining: getUsageLimit("anonymous"),
        source: "demo",
      },
    });
  }

  try {
    const usage = await incrementAuthenticatedUsage(supabase, user);
    return Response.json({
      authenticated: true,
      allowed: usage.allowed,
      usage,
    });
  } catch (error) {
    console.error("Failed to increment authenticated usage", error);
    return Response.json(
      { authenticated: true, allowed: false, error: "usage_increment_failed" },
      { status: 500 },
    );
  }
}
