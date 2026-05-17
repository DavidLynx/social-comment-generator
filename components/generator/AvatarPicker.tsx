import type { Dictionary } from "@/lib/i18n/dictionaries";
import { avatars } from "@/lib/mockups/avatars";
import { AvatarBubble } from "@/components/mockups/AvatarBubble";

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
      <div className="grid max-h-60 grid-cols-7 gap-3 overflow-y-auto pr-1 sm:grid-cols-8 lg:grid-cols-10">
        {avatars.map((avatar) => (
          <button
            aria-label={avatar.label}
            aria-pressed={value === avatar.id}
            className={`inline-flex size-14 items-center justify-center rounded-full border-2 border-transparent bg-transparent transition-[border-color,background-color,box-shadow,transform,opacity] duration-200 ease-out ${
              value === avatar.id
                ? "border-cyan-300 bg-cyan-300/8 shadow-[0_0_0_1px_rgba(34,211,238,0.14)]"
                : "opacity-90 hover:border-white/12 hover:opacity-100"
            }`}
            key={avatar.id}
            onClick={() => onChange(avatar.id)}
            type="button"
          >
            <AvatarBubble
              avatarId={avatar.id}
              className="size-11"
              imageSrc={avatar.imageSrc}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
