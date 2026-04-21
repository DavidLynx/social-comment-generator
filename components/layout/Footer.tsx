import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

type FooterProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function Footer({ dictionary, locale }: FooterProps) {
  return (
    <footer className="border-t border-white/10 px-4 py-8 text-sm text-zinc-500 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>{dictionary.footer.disclaimer}</p>
        <div className="flex gap-4">
          <Link className="hover:text-white" href={`/${locale}/terms`}>
            {dictionary.footer.terms}
          </Link>
          <Link className="hover:text-white" href={`/${locale}/privacy`}>
            {dictionary.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
