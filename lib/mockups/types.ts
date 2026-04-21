export type Platform = "tiktok" | "instagram";
export type AccountState = "anonymous" | "logged_in" | "premium";
export type LegacyAccountState = AccountState | "authenticated";
export type AvatarSource = "generated" | "uploaded";
export type CommentColorPreset =
  | "white"
  | "black"
  | "periwinkle"
  | "mint"
  | "sunset"
  | "lavender"
  | "red"
  | "orange"
  | "green"
  | "blue"
  | "purple";

export type MockupData = {
  id: string;
  platform: Platform;
  username: string;
  handle: string;
  comment: string;
  reply: string;
  showReply: boolean;
  avatarId: string;
  avatarSource: AvatarSource;
  customAvatarDataUrl?: string;
  timestamp: string;
  likes: number;
  verified: boolean;
  accountState: AccountState;
  colorPreset: CommentColorPreset;
  createdAt: number;
};
