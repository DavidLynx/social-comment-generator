import type { MockupData } from "./types";

export const defaultMockup: MockupData = {
  id: "draft",
  platform: "tiktok",
  username: "Luna Studio",
  handle: "luna.studio",
  comment: "This looks so real I would use it in a launch deck.",
  reply: "Replying to @luna.studio: clean, quick, and export-ready.",
  showReply: true,
  avatarId: "avatar-01",
  avatarSource: "generated",
  customAvatarDataUrl: undefined,
  timestamp: "2h",
  likes: 1240,
  verified: false,
  accountState: "anonymous",
  colorPreset: "black",
  createdAt: Date.now(),
};

export function createMockupId() {
  return `mockup-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
