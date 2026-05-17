import type { MockupData } from "@/lib/mockups/types";
import { getCommentColorTheme } from "@/lib/mockups/commentColors";
import { AvatarBubble } from "./AvatarBubble";
import { SharedMockupShell } from "./SharedMockupShell";
import { VerifiedBadge } from "./VerifiedBadge";

type InstagramCommentMockupProps = {
  data: MockupData;
  watermark?: boolean;
  watermarkText?: string;
};

export function InstagramCommentMockup({
  data,
  watermark,
  watermarkText,
}: InstagramCommentMockupProps) {
  const theme = getCommentColorTheme(data.colorPreset);
  const replies = data.replies.filter((reply) => reply.text.trim().length > 0);
  const mainAvatarImage =
    data.mainAuthor.avatarType === "uploaded"
      ? data.mainAuthor.avatarUrl
      : data.mainAuthor.avatarPresetUrl;

  return (
    <SharedMockupShell watermark={watermark} watermarkText={watermarkText}>
      <div
        className="rounded-[24px] border p-5 shadow-2xl"
        style={{
          background: theme.background,
          borderColor: theme.border,
          boxShadow: theme.shadow,
          color: theme.text,
        }}
      >
        <div className="grid grid-cols-[44px_minmax(0,1fr)_24px] gap-3">
          <AvatarBubble
            avatarId={data.mainAuthor.avatarPresetId ?? "avatar-01"}
            imageSrc={mainAvatarImage}
          />
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="truncate text-[15px] font-semibold leading-6">
                {data.mainAuthor.handle}
              </span>
              {data.verified ? <VerifiedBadge /> : null}
            </div>
            <div className="mt-0.5 truncate text-xs" style={{ color: theme.muted }}>
              {data.mainAuthor.name}
            </div>
            <p className="mt-1 text-[15px] leading-6" style={{ color: theme.text }}>
              {data.mainText}
            </p>
            <div
              className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold"
              style={{ color: theme.muted }}
            >
              <span>{data.timestamp}</span>
              <span>{data.likes} likes</span>
              <span>Reply</span>
            </div>
            {replies.length ? (
              <div className="mt-4 grid gap-4">
                {replies.map((reply) => (
                  <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-3" key={reply.id}>
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
                      <div className="truncate text-sm font-semibold">
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
          <div className="pt-1 text-right text-lg" style={{ color: theme.muted }}>
            ♡
          </div>
        </div>
      </div>
    </SharedMockupShell>
  );
}
