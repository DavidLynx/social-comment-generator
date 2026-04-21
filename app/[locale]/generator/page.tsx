import { GeneratorPage } from "@/components/generator/GeneratorPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { assertLocale } from "@/lib/i18n/config";
import { getSupabaseSession } from "@/lib/auth/supabaseAuth";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const dictionary = await getDictionary(locale);
  const session = await getSupabaseSession();

  return <GeneratorPage dictionary={dictionary} initialSession={session} locale={locale} />;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.meta.generatorTitle,
    description: dictionary.meta.generatorDescription,
    alternates: {
      canonical: `/${locale}/generator`,
      languages: {
        en: "/en/generator",
        es: "/es/generator",
      },
    },
    keywords:
      locale === "es"
        ? [
            "generador de comentarios",
            "mockup de comentarios",
            "comentario estilo TikTok",
            "comentario estilo Instagram",
          ]
        : [
            "social comment generator",
            "TikTok comment mockup",
            "Instagram comment generator",
            "comment mockup generator",
          ],
    openGraph: {
      title: dictionary.meta.generatorTitle,
      description: dictionary.meta.generatorDescription,
      locale,
      siteName: "Social Comment Generator",
      type: "website",
      url: `/${locale}/generator`,
    },
  };
}
