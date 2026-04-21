import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { MockupData } from "@/lib/mockups/types";
import { Button } from "@/components/ui/Button";
import { getAvatar } from "@/lib/mockups/avatars";

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
    <section className="rounded-lg border border-white/10 bg-zinc-950 p-4">
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
            const avatar = getAvatar(item.avatarId);

            return (
              <article
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3"
                key={item.id}
              >
                <div
                  className={`grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${avatar.gradient} text-sm font-black text-white`}
                >
                  {avatar.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-white">
                    {item.username}
                  </div>
                  <p className="truncate text-sm text-zinc-400">{item.comment}</p>
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
