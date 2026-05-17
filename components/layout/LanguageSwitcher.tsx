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
      className="grid h-9 grid-cols-2 rounded-md border border-white/10 bg-white/6 p-[3px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] transition duration-200 ease-out"
    >
      {locales.map((nextLocale) => {
        const href = pathname.replace(`/${locale}`, `/${nextLocale}`);
        const isActive = nextLocale === locale;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex items-center rounded px-2.5 text-xs font-bold uppercase transition-[background-color,color,box-shadow] duration-200 ease-out ${
              isActive
                ? "bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
                : "text-zinc-400 hover:bg-white/6 hover:text-white"
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
