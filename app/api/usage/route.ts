import { getUsageLimit } from "@/lib/usage/limits";

export function GET() {
  return Response.json({
    anonymous: getUsageLimit("anonymous"),
    logged_in: getUsageLimit("logged_in"),
    premium: null,
  });
}
