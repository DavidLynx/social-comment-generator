import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { BrandLogo } from "./BrandLogo";

type FooterProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function Footer({ dictionary, locale }: FooterProps) {
  return (
    <footer className="border-t border-white/10 px-4 py-8 text-sm text-zinc-500 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <BrandLogo className="mb-4" imageClassName="h-auto w-[185px]" variant="brand" />
          <p>{dictionary.footer.disclaimer}</p>
        </div>
        <div className="flex gap-4">
          <Link
            className="transition duration-200 ease-out hover:text-white"
            href={`/${locale}/terms`}
          >
            {dictionary.footer.terms}
          </Link>
          <Link
            className="transition duration-200 ease-out hover:text-white"
            href={`/${locale}/privacy`}
          >
            {dictionary.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
