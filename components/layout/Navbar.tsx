import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { AuthSession } from "@/lib/auth/types";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { BrandLogo } from "./BrandLogo";

type NavbarProps = {
  dictionary: Dictionary;
  locale: Locale;
  session: AuthSession;
};

export function Navbar({ dictionary, locale, session }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 h-[60px] border-b border-white/10 bg-background/86 backdrop-blur-xl">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="group flex h-full items-center gap-3 rounded-md py-0 text-sm font-semibold text-white transition duration-200 ease-out hover:opacity-95"
        >
          <span className="inline-flex md:hidden">
            <BrandLogo
              aria-hidden="true"
              className="drop-shadow-[0_0_14px_rgba(34,211,238,0.16)] transition duration-200 ease-out group-hover:brightness-110"
              imageClassName="h-[28px] w-[28px]"
              variant="icon"
            />
          </span>
          <span className="hidden md:inline-flex">
            <BrandLogo
              aria-hidden="true"
              className="drop-shadow-[0_0_14px_rgba(34,211,238,0.12)] transition duration-200 ease-out group-hover:brightness-110"
              imageClassName="h-auto w-[164px] max-w-none"
              variant="brand"
            />
          </span>
          <span className="sr-only">Commentra</span>
        </Link>
        <nav className="flex h-full items-center gap-1.5">
          <Link
            className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-zinc-300 transition duration-200 ease-out hover:bg-white/8 hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.16)]"
            href={`/${locale}/generator`}
          >
            {dictionary.nav.generator}
          </Link>
          {session.status === "anonymous" ? (
            <Link
              className="hidden h-9 items-center rounded-md px-3 text-sm font-medium text-zinc-300 transition duration-200 ease-out hover:bg-white/8 hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.16)] sm:inline-flex"
              href={`/${locale}/login`}
            >
              {dictionary.nav.login}
            </Link>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="max-w-40 truncate text-xs text-zinc-500">
                {session.displayName ?? session.email}
              </span>
              <LogoutButton className="min-h-0 h-9 px-3" label={dictionary.nav.logout} />
            </div>
          )}
          <LanguageSwitcher dictionary={dictionary} locale={locale} />
        </nav>
      </div>
    </header>
  );
}
