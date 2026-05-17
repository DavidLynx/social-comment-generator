import { getAvatar } from "@/lib/mockups/avatars";

type AvatarBubbleProps = {
  avatarId: string;
  className?: string;
  imageSrc?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "size-8 text-xs",
  md: "size-11 text-sm",
  lg: "size-14 text-base",
};

export function AvatarBubble({
  avatarId,
  className = "",
  imageSrc,
  size = "md",
}: AvatarBubbleProps) {
  const avatar = getAvatar(avatarId);
  const avatarImage = imageSrc ?? avatar.imageSrc;
  const avatarGlyph = avatar.symbol ?? avatar.initials;
  const imageScale = avatar.imageScale ?? 1;
  const imagePosition = avatar.imagePosition ?? "center";

  return (
    <div
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br ${avatar.gradient} ${sizes[size]} font-black text-white shadow-lg shadow-black/20 ${className}`}
    >
      {avatarImage ? (
        <span
          aria-hidden="true"
          className="block h-full w-full origin-center bg-cover"
          style={{
            backgroundImage: `url(${avatarImage})`,
            backgroundPosition: imagePosition,
            transform: imageScale === 1 ? undefined : `scale(${imageScale})`,
          }}
        />
      ) : (
        <span
          className={
            avatar.symbol
              ? "text-[1.28em] font-semibold leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.28)]"
              : ""
          }
        >
          {avatarGlyph}
        </span>
      )}
    </div>
  );
}
