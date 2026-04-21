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
            avatarId={data.avatarId}
            customAvatarDataUrl={data.customAvatarDataUrl}
            source={data.avatarSource}
          />
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="truncate text-[15px] font-semibold leading-6">
                {data.handle}
              </span>
              {data.verified ? <VerifiedBadge /> : null}
            </div>
            <p className="mt-1 text-[15px] leading-6" style={{ color: theme.text }}>
              {data.comment}
            </p>
            <div
              className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold"
              style={{ color: theme.muted }}
            >
              <span>{data.timestamp}</span>
              <span>{data.likes} likes</span>
              <span>Reply</span>
            </div>
            {data.showReply && data.reply ? (
              <div className="mt-4 grid grid-cols-[32px_minmax(0,1fr)] gap-3">
                <div
                  className="mt-3 h-px w-8"
                  style={{ background: theme.border }}
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {data.username}
                  </div>
                  <p
                    className="mt-1 text-sm leading-5"
                    style={{ color: theme.text }}
                  >
                    {data.reply}
                  </p>
                </div>
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
