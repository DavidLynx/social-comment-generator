import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { AuthSession } from "@/lib/auth/types";
import { LogoutButton } from "@/components/auth/LogoutButton";

type NavbarProps = {
  dictionary: Dictionary;
  locale: Locale;
  session: AuthSession;
};

export function Navbar({ dictionary, locale, session }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/86 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 text-sm font-semibold text-white"
        >
          <span className="grid size-8 place-items-center rounded-md bg-cyan-300 text-slate-950">
            SC
          </span>
          <span>Social Comment Generator</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            className="rounded-md px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/8 hover:text-white"
            href={`/${locale}/generator`}
          >
            {dictionary.nav.generator}
          </Link>
          {session.status === "anonymous" ? (
            <Link
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/8 hover:text-white sm:inline-flex"
              href={`/${locale}/login`}
            >
              {dictionary.nav.login}
            </Link>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="max-w-40 truncate text-xs text-zinc-500">
                {session.displayName ?? session.email}
              </span>
              <LogoutButton label={dictionary.nav.logout} />
            </div>
          )}
          <LanguageSwitcher dictionary={dictionary} locale={locale} />
        </nav>
      </div>
    </header>
  );
}
