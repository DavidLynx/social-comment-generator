export type AccountPlan = "free" | "premium";
export type AccountStatus = "anonymous" | "logged_in" | "premium";

export type AuthSession = {
  status: AccountStatus;
  userId: string | null;
  email: string | null;
  plan: AccountPlan | null;
  displayName?: string | null;
  provider: "demo" | "supabase";
};
