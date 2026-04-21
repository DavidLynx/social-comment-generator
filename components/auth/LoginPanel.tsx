import type { Dictionary } from "@/lib/i18n/dictionaries";
import { LoginButton } from "./LoginButton";

type LoginPanelProps = {
  dictionary: Dictionary;
};

export function LoginPanel({ dictionary }: LoginPanelProps) {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-white/10 bg-zinc-950 p-8 text-center">
        <h1 className="text-3xl font-semibold text-white">
          {dictionary.auth.title}
        </h1>
        <p className="mt-4 leading-7 text-zinc-400">{dictionary.auth.body}</p>
        <LoginButton
          label={dictionary.auth.button}
          pendingMessage={dictionary.auth.pending}
        />
      </div>
    </section>
  );
}
