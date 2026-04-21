import { LoginPanel } from "@/components/auth/LoginPanel";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { assertLocale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const dictionary = await getDictionary(locale);

  return <LoginPanel dictionary={dictionary} />;
}
