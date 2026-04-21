import type { AccountState } from "@/lib/mockups/types";

export type UsagePolicy = {
  dailyLimit: number | null;
  source: "demo" | "database";
};

export function getUsageLimit(accountState: AccountState) {
  const policy = getUsagePolicy(accountState);
  return policy.dailyLimit ?? Number.POSITIVE_INFINITY;
}

export function getUsagePolicy(accountState: AccountState): UsagePolicy {
  if (accountState === "premium") {
    return { dailyLimit: null, source: "demo" };
  }

  return {
    dailyLimit: accountState === "logged_in" ? 20 : 10,
    source: "demo",
  };
}
