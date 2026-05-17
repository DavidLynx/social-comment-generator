import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { MockupData } from "@/lib/mockups/types";
import { Button } from "@/components/ui/Button";
import { AvatarBubble } from "@/components/mockups/AvatarBubble";

type RecentMockupsProps = {
  dictionary: Dictionary;
  items: MockupData[];
  onReuse: (mockup: MockupData) => void;
  onClear: () => void;
};

export function RecentMockups({
  dictionary,
  items,
  onReuse,
  onClear,
}: RecentMockupsProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-zinc-950 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition duration-200 ease-out hover:border-cyan-300/20">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">
          {dictionary.generator.recentTitle}
        </h2>
        {items.length ? (
          <Button onClick={onClear} type="button" variant="ghost">
            {dictionary.generator.clear}
          </Button>
        ) : null}
      </div>
      {items.length ? (
        <div className="grid gap-3">
          {items.map((item) => {
            return (
              <article
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3 transition duration-200 ease-out hover:border-cyan-300/18 hover:bg-white/[0.05]"
                key={item.id}
              >
                <AvatarBubble
                  avatarId={item.mainAuthor.avatarPresetId ?? "avatar-01"}
                  imageSrc={
                    item.mainAuthor.avatarType === "uploaded"
                      ? item.mainAuthor.avatarUrl
                      : item.mainAuthor.avatarPresetUrl
                  }
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-white">
                    {item.mainAuthor.name}
                  </div>
                  <p className="truncate text-sm text-zinc-400">{item.mainText}</p>
                </div>
                <Button
                  onClick={() => onReuse(item)}
                  type="button"
                  variant="secondary"
                >
                  {dictionary.generator.reuse}
                </Button>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-zinc-500">{dictionary.generator.recentEmpty}</p>
      )}
    </section>
  );
}
