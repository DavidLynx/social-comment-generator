"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function LanguageSwitcher({ dictionary, locale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div
      aria-label={dictionary.nav.language}
      className="grid grid-cols-2 rounded-md border border-white/10 bg-white/6 p-1"
    >
      {locales.map((nextLocale) => {
        const href = pathname.replace(`/${locale}`, `/${nextLocale}`);
        const isActive = nextLocale === locale;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`rounded px-2.5 py-1.5 text-xs font-bold uppercase transition ${
              isActive
                ? "bg-white text-slate-950"
                : "text-zinc-400 hover:text-white"
            }`}
            href={href}
            key={nextLocale}
          >
            {nextLocale}
          </Link>
        );
      })}
    </div>
  );
}
