import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Platform } from "@/lib/mockups/types";

type PlatformTabsProps = {
  dictionary: Dictionary;
  value: Platform;
  onChange: (platform: Platform) => void;
};

export function PlatformTabs({ dictionary, value, onChange }: PlatformTabsProps) {
  const platforms: Platform[] = ["tiktok", "instagram"];

  return (
    <div>
      <div className="mb-3 text-sm font-semibold text-white">
        {dictionary.generator.platform}
      </div>
      <div className="grid grid-cols-2 rounded-md border border-white/10 bg-black/40 p-1">
        {platforms.map((platform) => (
          <button
            aria-pressed={value === platform}
            className={`rounded px-3 py-2 text-sm font-semibold transition ${
              value === platform
                ? "bg-white text-slate-950"
                : "text-zinc-400 hover:text-white"
            }`}
            key={platform}
            onClick={() => onChange(platform)}
            type="button"
          >
            {platform === "tiktok"
              ? dictionary.generator.tiktok
              : dictionary.generator.instagram}
          </button>
        ))}
      </div>
    </div>
  );
}
