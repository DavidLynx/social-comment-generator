import type { MockupAuthor, MockupData, MockupReply } from "./types";

export function createMockupId() {
  return `mockup-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createReplyId() {
  return `reply-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createDefaultMainAuthor(): MockupAuthor {
  return {
    name: "Luna Studio",
    handle: "luna.studio",
    avatarType: "preset",
    avatarPresetId: "avatar-01",
    avatarPresetUrl: "/perfiles/mujer.png",
  };
}

export function createDefaultReplyAuthor(): MockupAuthor {
  return {
    name: "Mateo Ruiz",
    handle: "mateo.ruiz",
    avatarType: "preset",
    avatarPresetId: "avatar-02",
    avatarPresetUrl: "/perfiles/hombre.png",
  };
}

export function createDefaultReply(): MockupReply {
  return {
    id: createReplyId(),
    author: createDefaultReplyAuthor(),
    text: "And it exports cleanly, which is exactly what we need.",
  };
}

export const defaultMockup: MockupData = {
  id: "draft",
  platform: "tiktok",
  mainAuthor: createDefaultMainAuthor(),
  mainText: "This looks polished enough to use in a launch deck.",
  replies: [createDefaultReply()],
  timestamp: "2h",
  likes: 1240,
  verified: false,
  showWatermark: true,
  accountState: "anonymous",
  colorPreset: "black",
  createdAt: Date.now(),
};
