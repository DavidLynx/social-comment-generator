import type { Dictionary } from "@/lib/i18n/dictionaries";
import { avatars } from "@/lib/mockups/avatars";

type AvatarPickerProps = {
  dictionary: Dictionary;
  value: string;
  onChange: (avatarId: string) => void;
};

export function AvatarPicker({ dictionary, value, onChange }: AvatarPickerProps) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium text-zinc-300">
        {dictionary.generator.avatar}
      </div>
      <div className="grid max-h-44 grid-cols-10 gap-2 overflow-y-auto pr-1">
        {avatars.map((avatar) => (
          <button
            aria-label={avatar.label}
            aria-pressed={value === avatar.id}
            className={`grid aspect-square place-items-center rounded-md bg-gradient-to-br ${avatar.gradient} text-xs font-black text-white ring-offset-2 ring-offset-zinc-950 transition ${
              value === avatar.id ? "ring-2 ring-cyan-300" : "opacity-80"
            }`}
            key={avatar.id}
            onClick={() => onChange(avatar.id)}
            type="button"
          >
            {avatar.initials}
          </button>
        ))}
      </div>
    </div>
  );
}
