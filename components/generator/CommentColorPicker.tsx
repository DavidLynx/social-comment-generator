import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { CommentColorPreset } from "@/lib/mockups/types";
import { commentColorThemes } from "@/lib/mockups/commentColors";

type CommentColorPickerProps = {
  dictionary: Dictionary;
  value: CommentColorPreset;
  onChange: (preset: CommentColorPreset) => void;
};

export function CommentColorPicker({
  dictionary,
  value,
  onChange,
}: CommentColorPickerProps) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium text-zinc-300">
        {dictionary.generator.color}
      </div>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
        {commentColorThemes.map((theme) => (
          <button
            aria-label={theme.label}
            aria-pressed={value === theme.id}
            className={`group grid aspect-square place-items-center rounded-md border transition ${
              value === theme.id
                ? "border-cyan-300 ring-2 ring-cyan-300/30"
                : "border-white/10 hover:border-white/35"
            }`}
            key={theme.id}
            onClick={() => onChange(theme.id)}
            style={{ background: theme.background }}
            title={theme.label}
            type="button"
          >
            <span
              className="size-2.5 rounded-full opacity-80 group-hover:opacity-100"
              style={{ background: theme.accent }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
