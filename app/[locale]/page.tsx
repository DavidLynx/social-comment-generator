import { LandingPage } from "@/components/landing/LandingPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { assertLocale } from "@/lib/i18n/config";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const dictionary = await getDictionary(locale);

  return <LandingPage dictionary={dictionary} locale={locale} />;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.meta.landingTitle,
    description: dictionary.meta.landingDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
      },
    },
    keywords:
      locale === "es"
        ? [
            "generador de comentarios",
            "mockup de comentarios",
            "comentario estilo TikTok",
            "comentario estilo Instagram",
            "generador de Instagram",
          ]
        : [
            "social comment generator",
            "comment mockup generator",
            "TikTok comment mockup",
            "Instagram comment generator",
            "transparent PNG comment",
          ],
    openGraph: {
      title: dictionary.meta.landingTitle,
      description: dictionary.meta.landingDescription,
      locale,
      siteName: "Social Comment Generator",
      type: "website",
      url: `/${locale}`,
    },
  };
}
