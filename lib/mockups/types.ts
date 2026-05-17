export type Platform = "tiktok" | "instagram";
export type AccountState = "anonymous" | "logged_in" | "premium";
export type LegacyAccountState = AccountState | "authenticated";
export type AvatarType = "preset" | "uploaded";
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

export type MockupAuthor = {
  name: string;
  handle: string;
  avatarType: AvatarType;
  avatarPresetId?: string;
  avatarPresetUrl?: string;
  avatarUrl?: string;
};

export type MockupReply = {
  id: string;
  author: MockupAuthor;
  text: string;
  timestamp?: string;
  likes?: string;
};

export type MockupData = {
  id: string;
  platform: Platform;
  mainAuthor: MockupAuthor;
  mainText: string;
  replies: MockupReply[];
  timestamp: string;
  likes: number;
  verified: boolean;
  showWatermark: boolean;
  accountState: AccountState;
  colorPreset: CommentColorPreset;
  createdAt: number;
};
