export function About({
  paragraphs,
  foundedYear,
}: {
  paragraphs: string[];
  foundedYear?: string;
}) {
  if (paragraphs.length === 0) return null;

  return (
    <section id="about" className="mx-auto max-w-2xl px-6 py-20">
      <h2 className="text-center text-3xl font-semibold tracking-tight text-gray-900">
        About the Company
      </h2>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-gray-600">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {foundedYear && (
        <p className="mt-8 text-center text-sm text-gray-400">
          Founded {foundedYear}
        </p>
      )}
    </section>
  );
}
