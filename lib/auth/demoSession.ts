import type { AccountState } from "@/lib/mockups/types";
import type { AuthSession } from "./types";

export function createDemoSession(status: AccountState): AuthSession {
  return {
    status,
    userId: status === "anonymous" ? null : "demo-user",
    email: status === "anonymous" ? null : "creator@example.com",
    plan: status === "premium" ? "premium" : status === "logged_in" ? "free" : null,
    provider: "demo",
  };
}

export const demoAccountStates: AccountState[] = ["anonymous", "logged_in"];
