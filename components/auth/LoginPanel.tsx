import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { AuthSession } from "@/lib/auth/types";
import { LoginButton } from "./LoginButton";

type LoginPanelProps = {
  dictionary: Dictionary;
  session: AuthSession;
};

export function LoginPanel({ dictionary, session }: LoginPanelProps) {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-white/10 bg-zinc-950 p-8 text-center">
        <h1 className="text-3xl font-semibold text-white">
          {dictionary.auth.title}
        </h1>
        <p className="mt-4 leading-7 text-zinc-400">
          {session.status === "anonymous"
            ? dictionary.auth.body
            : dictionary.auth.alreadyLoggedIn}
        </p>
        {session.status === "anonymous" ? (
          <LoginButton
            label={dictionary.auth.button}
            pendingMessage={dictionary.auth.pending}
          />
        ) : null}
      </div>
    </section>
  );
}
