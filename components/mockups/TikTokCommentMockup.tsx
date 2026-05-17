import type { MockupData } from "@/lib/mockups/types";
import { getCommentColorTheme } from "@/lib/mockups/commentColors";
import { AvatarBubble } from "./AvatarBubble";
import { SharedMockupShell } from "./SharedMockupShell";
import { VerifiedBadge } from "./VerifiedBadge";

type TikTokCommentMockupProps = {
  data: MockupData;
  watermark?: boolean;
  watermarkText?: string;
};

export function TikTokCommentMockup({
  data,
  watermark,
  watermarkText,
}: TikTokCommentMockupProps) {
  const theme = getCommentColorTheme(data.colorPreset);
  const replies = data.replies.filter((reply) => reply.text.trim().length > 0);
  const mainAvatarImage =
    data.mainAuthor.avatarType === "uploaded"
      ? data.mainAuthor.avatarUrl
      : data.mainAuthor.avatarPresetUrl;

  return (
    <SharedMockupShell watermark={watermark} watermarkText={watermarkText}>
      <div
        className="rounded-[28px] border p-5 shadow-2xl"
        style={{
          background: theme.background,
          borderColor: theme.border,
          boxShadow: theme.shadow,
          color: theme.text,
        }}
      >
        <div className="grid grid-cols-[56px_minmax(0,1fr)_24px] gap-3">
          <AvatarBubble
            avatarId={data.mainAuthor.avatarPresetId ?? "avatar-01"}
            imageSrc={mainAvatarImage}
            size="lg"
          />
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="truncate font-semibold">{data.mainAuthor.name}</span>
              {data.verified ? <VerifiedBadge /> : null}
            </div>
            <div className="mt-0.5 truncate text-xs" style={{ color: theme.muted }}>
              @{data.mainAuthor.handle}
            </div>
            <p className="mt-1 text-[15px] leading-6" style={{ color: theme.text }}>
              {data.mainText}
            </p>
            <div
              className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium"
              style={{ color: theme.muted }}
            >
              <span>{data.timestamp}</span>
              <span>Reply</span>
              <span>{formatLikes(data.likes)}</span>
            </div>
            {replies.length ? (
              <div className="mt-4 grid gap-4">
                {replies.map((reply) => (
                  <div
                    className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-l pl-3"
                    key={reply.id}
                    style={{ borderColor: theme.border }}
                  >
                    <AvatarBubble
                      avatarId={reply.author.avatarPresetId ?? "avatar-02"}
                      imageSrc={
                        reply.author.avatarType === "uploaded"
                          ? reply.author.avatarUrl
                          : reply.author.avatarPresetUrl
                      }
                      size="sm"
                    />
                    <div className="min-w-0">
                      <div
                        className="truncate text-sm font-semibold"
                        style={{ color: theme.muted }}
                      >
                        {reply.author.name}
                      </div>
                      <div
                        className="mt-0.5 truncate text-xs"
                        style={{ color: theme.muted }}
                      >
                        @{reply.author.handle}
                      </div>
                      <p
                        className="mt-1 text-sm leading-5"
                        style={{ color: theme.text }}
                      >
                        {reply.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="pt-8 text-right text-xl" style={{ color: theme.muted }}>
            ♡
          </div>
        </div>
      </div>
    </SharedMockupShell>
  );
}

function formatLikes(likes: number) {
  if (likes >= 1000) {
    return `${(likes / 1000).toFixed(1).replace(".0", "")}K`;
  }

  return likes.toString();
}
