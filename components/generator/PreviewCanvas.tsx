import type { RefObject } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { MockupData } from "@/lib/mockups/types";
import { InstagramCommentMockup } from "@/components/mockups/InstagramCommentMockup";
import { TikTokCommentMockup } from "@/components/mockups/TikTokCommentMockup";
import { mockupExportTargetId } from "@/lib/export/exportTarget";

type PreviewCanvasProps = {
  dictionary: Dictionary;
  mockup: MockupData;
  previewRef: RefObject<HTMLDivElement | null>;
};

export function PreviewCanvas({
  dictionary,
  mockup,
  previewRef,
}: PreviewCanvasProps) {
  const watermark = mockup.accountState === "anonymous";

  return (
    <div className="grid min-h-[420px] place-items-center overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(16,185,129,0.06),rgba(244,63,94,0.08))] p-5">
      <div
        data-export-ready="true"
        id={mockupExportTargetId}
        ref={previewRef}
        className="w-full max-w-[560px] bg-transparent"
      >
        {mockup.platform === "tiktok" ? (
          <TikTokCommentMockup
            data={mockup}
            watermark={watermark}
            watermarkText={dictionary.generator.watermark}
          />
        ) : (
          <InstagramCommentMockup
            data={mockup}
            watermark={watermark}
            watermarkText={dictionary.generator.watermark}
          />
        )}
      </div>
    </div>
  );
}
