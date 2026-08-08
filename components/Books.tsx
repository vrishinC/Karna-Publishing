import type { Book } from "@/lib/types";

function BookCard({ book }: { book: Book }) {
  const canBuy = book.available && Boolean(book.amazon_url);

  return (
    <div className="flex flex-col items-center text-center">
      {book.cover_image_url ? (
        <img
          src={book.cover_image_url}
          alt={book.title}
          className="aspect-[2/3] w-full max-w-[220px] rounded-lg object-cover shadow-lg"
        />
      ) : (
        <div className="flex aspect-[2/3] w-full max-w-[220px] items-center justify-center rounded-lg bg-gray-100 px-3 text-center text-sm text-gray-400 shadow-lg">
          {book.title}
        </div>
      )}

      <h3 className="mt-6 text-lg font-semibold text-gray-900">{book.title}</h3>
      <p className="mt-2 max-w-xs text-sm text-gray-500">{book.blurb}</p>
      {book.price != null && (
        <p className="mt-2 text-sm text-gray-400">${Number(book.price).toFixed(2)}</p>
      )}

      {canBuy ? (
        <a
          href={book.amazon_url!}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Buy on Amazon
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="mt-5 cursor-not-allowed rounded-full border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-400"
        >
          Coming Soon
        </span>
      )}
    </div>
  );
}

export function Books({ books }: { books: Book[] }) {
  if (books.length === 0) return null;

  return (
    <section id="books" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-semibold tracking-tight text-gray-900">
        Books
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
