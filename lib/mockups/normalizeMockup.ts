import { defaultMockup } from "./defaults";
import { commentColorThemes } from "./commentColors";
import type { AccountState, CommentColorPreset, MockupData } from "./types";

type StoredMockup = Omit<Partial<MockupData>, "accountState"> & {
  accountState?: AccountState | "authenticated";
};

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

  return {
    ...defaultMockup,
    ...value,
    accountState,
    colorPreset,
    avatarSource:
      value.avatarSource === "uploaded" && value.customAvatarDataUrl
        ? "uploaded"
        : "generated",
    verified:
      accountState === "anonymous" ? false : value.verified ?? defaultMockup.verified,
    createdAt: value.createdAt ?? Date.now(),
  };
}
