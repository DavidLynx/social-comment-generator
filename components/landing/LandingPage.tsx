import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramCommentMockup } from "@/components/mockups/InstagramCommentMockup";
import { TikTokCommentMockup } from "@/components/mockups/TikTokCommentMockup";
import { defaultMockup } from "@/lib/mockups/defaults";

type LandingPageProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function LandingPage({ dictionary, locale }: LandingPageProps) {
  const instagramMockup = { ...defaultMockup, platform: "instagram" as const };

  return (
    <div className="overflow-hidden">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            {dictionary.landing.eyebrow}
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {dictionary.landing.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            {dictionary.landing.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/${locale}/generator`}>
              {dictionary.landing.primaryCta}
            </ButtonLink>
            <ButtonLink href="#preview" variant="secondary">
              {dictionary.landing.secondaryCta}
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {dictionary.landing.stats.map((item) => (
              <div
                className="border-l border-cyan-300/50 py-2 pl-4 text-sm font-medium text-zinc-300"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div id="preview" className="relative min-h-[520px]">
          <div className="absolute left-0 top-8 w-[92%] rotate-[-3deg] opacity-95">
            <TikTokCommentMockup data={defaultMockup} watermark={false} />
          </div>
          <div className="absolute bottom-8 right-0 w-[88%] rotate-[3deg]">
            <InstagramCommentMockup data={instagramMockup} watermark={false} />
          </div>
        </div>
      </section>
      <section className="border-y border-white/10 bg-white/[0.03] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-white">
            {dictionary.landing.featuresTitle}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dictionary.landing.features.map((feature) => (
              <article
                className="rounded-lg border border-white/10 bg-zinc-950 p-6"
                key={feature.title}
              >
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-zinc-400">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold text-white">
            {dictionary.landing.useCasesTitle}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {dictionary.landing.useCases.map((item) => (
              <span
                className="rounded-md border border-white/10 bg-white/6 px-3 py-2 text-sm text-zinc-300"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="border-l border-cyan-300/40 pl-6">
          <h2 className="text-3xl font-semibold text-white">
            {dictionary.landing.ctaTitle}
          </h2>
          <p className="mt-4 leading-8 text-zinc-300">
            {dictionary.landing.ctaBody}
          </p>
        </div>
      </section>
      <section className="border-y border-white/10 bg-white/[0.03] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-white">
            {dictionary.landing.faqTitle}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {dictionary.landing.faqs.map((item) => (
              <article
                className="rounded-lg border border-white/10 bg-zinc-950 p-6"
                key={item.question}
              >
                <h3 className="text-base font-semibold text-white">
                  {item.question}
                </h3>
                <p className="mt-3 leading-7 text-zinc-400">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-white">
          {dictionary.landing.discoverTitle}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {dictionary.landing.discoverTools.map((tool) => (
            <a
              className="rounded-lg border border-white/10 bg-zinc-950 p-6 transition hover:border-cyan-300/50 hover:bg-white/[0.04]"
              href={tool.url}
              key={tool.title}
              rel="noreferrer"
              target="_blank"
            >
              <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
              <p className="mt-3 leading-7 text-zinc-400">{tool.body}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-300">
                {tool.url.replace("https://", "")}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
