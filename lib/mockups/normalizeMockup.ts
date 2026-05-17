import {
  createDefaultReply,
  createReplyId,
  defaultMockup,
} from "./defaults";
import { commentColorThemes } from "./commentColors";
import { getAvatar } from "./avatars";
import type {
  AccountState,
  AvatarType,
  CommentColorPreset,
  MockupAuthor,
  MockupData,
  MockupReply,
} from "./types";

type LegacyStoredMockup = {
  accountState?: AccountState | "authenticated";
  avatarId?: string;
  avatarImageSrc?: string;
  avatarSource?: "generated" | "uploaded";
  colorPreset?: string;
  comment?: string;
  createdAt?: number;
  customAvatarDataUrl?: string;
  handle?: string;
  id?: string;
  likes?: number;
  platform?: MockupData["platform"];
  reply?: string;
  replyAvatarId?: string;
  replyAvatarImageSrc?: string;
  replyAvatarSource?: "generated" | "uploaded";
  replyCustomAvatarDataUrl?: string;
  replyHandle?: string;
  replyUsername?: string;
  showReply?: boolean;
  showWatermark?: boolean;
  timestamp?: string;
  username?: string;
  verified?: boolean;
};

type StoredMockup = Omit<Partial<MockupData>, "accountState"> & LegacyStoredMockup;

function normalizeAvatarType(
  value: MockupAuthor | undefined,
  fallbackUrl: string | undefined,
  fallbackType: "generated" | "uploaded" | undefined,
) {
  if (value?.avatarType === "uploaded" && value.avatarUrl) {
    return "uploaded" as AvatarType;
  }

  if (value?.avatarType === "preset") {
    return "preset" as AvatarType;
  }

  if (fallbackType === "uploaded" && fallbackUrl) {
    return "uploaded" as AvatarType;
  }

  return "preset" as AvatarType;
}

function normalizeAuthor(
  value: MockupAuthor | undefined,
  fallback: {
    avatarId?: string;
    avatarImageSrc?: string;
    avatarSource?: "generated" | "uploaded";
    customAvatarDataUrl?: string;
    handle?: string;
    name?: string;
  },
  defaultAuthor: MockupAuthor,
): MockupAuthor {
  const fallbackAvatarUrl =
    fallback.avatarSource === "uploaded"
      ? fallback.customAvatarDataUrl
      : fallback.avatarImageSrc;

  const avatarType = normalizeAvatarType(value, fallbackAvatarUrl, fallback.avatarSource);

  return {
    name: value?.name ?? fallback.name ?? defaultAuthor.name,
    handle: value?.handle ?? fallback.handle ?? defaultAuthor.handle,
    avatarType,
    avatarPresetId:
      value?.avatarPresetId ?? fallback.avatarId ?? defaultAuthor.avatarPresetId,
    avatarPresetUrl:
      value?.avatarPresetUrl ??
      (value?.avatarType === "preset" ? value.avatarUrl : undefined) ??
      (avatarType === "preset" ? fallbackAvatarUrl : undefined) ??
      getAvatar(value?.avatarPresetId ?? fallback.avatarId ?? defaultAuthor.avatarPresetId ?? "avatar-01")
        .imageSrc ??
      defaultAuthor.avatarPresetUrl,
    avatarUrl:
      value?.avatarUrl ??
      (avatarType === "uploaded" ? fallbackAvatarUrl : undefined),
  };
}

function normalizeReplies(value: StoredMockup): MockupReply[] {
  if (value.replies?.length) {
    return value.replies.map((reply) => ({
      ...createDefaultReply(),
      ...reply,
      id: reply.id ?? createReplyId(),
      author: normalizeAuthor(
        reply.author,
        {},
        createDefaultReply().author,
      ),
      text: reply.text ?? "",
    }));
  }

  if (value.showReply === false || !value.reply) {
    return [];
  }

  return [
    {
      ...createDefaultReply(),
      id: createReplyId(),
      author: normalizeAuthor(
        undefined,
        {
          avatarId: value.replyAvatarId,
          avatarImageSrc: value.replyAvatarImageSrc,
          avatarSource: value.replyAvatarSource,
          customAvatarDataUrl: value.replyCustomAvatarDataUrl,
          handle: value.replyHandle,
          name: value.replyUsername,
        },
        createDefaultReply().author,
      ),
      text: value.reply,
    },
  ];
}

export function normalizeMockupData(value: StoredMockup): MockupData {
  const accountState =
    value.accountState === "authenticated"
      ? "logged_in"
      : value.accountState ?? defaultMockup.accountState;
  const colorPreset: CommentColorPreset = commentColorThemes.some(
    (theme) => theme.id === value.colorPreset,
  )
    ? (value.colorPreset as CommentColorPreset)
    : defaultMockup.colorPreset;
  const mainAuthor = normalizeAuthor(
    value.mainAuthor,
    {
      avatarId: value.avatarId,
      avatarImageSrc: value.avatarImageSrc,
      avatarSource: value.avatarSource,
      customAvatarDataUrl: value.customAvatarDataUrl,
      handle: value.handle,
      name: value.username,
    },
    defaultMockup.mainAuthor,
  );

  return {
    ...defaultMockup,
    ...value,
    accountState,
    colorPreset,
    mainAuthor,
    mainText: value.mainText ?? value.comment ?? defaultMockup.mainText,
    replies: normalizeReplies(value),
    showWatermark: value.showWatermark ?? defaultMockup.showWatermark,
    verified:
      accountState === "anonymous" ? false : value.verified ?? defaultMockup.verified,
    createdAt: value.createdAt ?? Date.now(),
  };
}
