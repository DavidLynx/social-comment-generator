import { getAvatar } from "@/lib/mockups/avatars";

type AvatarBubbleProps = {
  avatarId: string;
  customAvatarDataUrl?: string;
  size?: "sm" | "md" | "lg";
  source?: "generated" | "uploaded";
};

const sizes = {
  sm: "size-8 text-xs",
  md: "size-11 text-sm",
  lg: "size-14 text-base",
};

export function AvatarBubble({
  avatarId,
  customAvatarDataUrl,
  size = "md",
  source = "generated",
}: AvatarBubbleProps) {
  const avatar = getAvatar(avatarId);
  const useCustomAvatar = source === "uploaded" && customAvatarDataUrl;

  return (
    <div
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br ${avatar.gradient} ${sizes[size]} font-black text-white shadow-lg shadow-black/20`}
    >
      {useCustomAvatar ? (
        <span
          aria-hidden="true"
          className="block h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${customAvatarDataUrl})` }}
        />
      ) : (
        avatar.initials
      )}
    </div>
  );
}
