type LegalPageProps = {
  content: {
    title: string;
    body: readonly string[];
  };
};

export function LegalPage({ content }: LegalPageProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-white">{content.title}</h1>
      <div className="mt-8 space-y-5 text-lg leading-8 text-zinc-300">
        {content.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
