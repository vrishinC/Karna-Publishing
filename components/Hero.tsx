import type { Book } from "@/lib/types";

export function Hero({ tagline, books }: { tagline: string; books: Book[] }) {
  const covers = books.slice(0, 3);

  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-28">
      <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl md:text-8xl">
        Karna Publishing
      </h1>

      {tagline && (
        <p className="mx-auto mt-6 max-w-xl text-xl font-light text-gray-600">
          {tagline}
        </p>
      )}

      <div className="mt-8 flex items-center justify-center gap-4">
        <a
          href="#books"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Shop Books
        </a>
        <a
          href="#about"
          className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition hover:border-gray-400"
        >
          Learn More
        </a>
      </div>

      {covers.length > 0 && (
        <div className="mt-16 flex flex-wrap items-end justify-center gap-6 sm:gap-10">
          {covers.map((book) => (
            <div key={book.id} className="w-40 sm:w-48">
              {book.cover_image_url ? (
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  className="aspect-[2/3] w-full rounded-lg object-cover shadow-xl"
                />
              ) : (
                <div className="flex aspect-[2/3] w-full items-center justify-center rounded-lg bg-gray-100 px-3 text-center text-sm text-gray-400 shadow-xl">
                  {book.title}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
