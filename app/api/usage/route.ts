import { getUsageLimit } from "@/lib/usage/limits";
import {
  getAuthenticatedUsage,
  incrementAuthenticatedUsage,
} from "@/lib/usage/databaseUsage";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function debugUsage(context: string, data: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[Usage debug] ${context}`, data);
  }
}

export async function GET() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    debugUsage("read session", {
      hasSession: Boolean(user),
      userId: user?.id ?? null,
    });

    if (user) {
      try {
        const usage = await getAuthenticatedUsage(supabase, user);
        debugUsage("read result", {
          count: usage.count,
          limit: usage.limit,
          remaining: usage.remaining,
          userId: user.id,
        });
        return Response.json({ authenticated: true, usage });
      } catch (error) {
        console.error("Failed to read authenticated usage", error);
        return Response.json(
          {
            authenticated: true,
            error: "usage_read_failed",
            reason: "backend_failure",
          },
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
    debugUsage("increment skipped", {
      reason: "supabase_not_configured",
    });
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

  debugUsage("increment session", {
    hasSession: Boolean(user),
    userId: user?.id ?? null,
  });

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

    debugUsage("increment result", {
      allowed: usage.allowed,
      count: usage.count,
      limit: usage.limit,
      remaining: usage.remaining,
      userId: user.id,
    });

    if (!usage.allowed) {
      debugUsage("increment blocked", {
        reason: "daily_limit_reached",
        userId: user.id,
      });
      return Response.json(
        {
          authenticated: true,
          allowed: false,
          error: "daily_limit_reached",
          reason: "limit",
          usage,
        },
        { status: 429 },
      );
    }

    return Response.json({
      authenticated: true,
      allowed: usage.allowed,
      usage,
    });
  } catch (error) {
    console.error("Failed to increment authenticated usage", error);
    debugUsage("increment blocked", {
      reason: "backend_failure",
      userId: user.id,
    });
    return Response.json(
      {
        authenticated: true,
        error: "usage_increment_failed",
        reason: "backend_failure",
      },
      { status: 500 },
    );
  }
}
