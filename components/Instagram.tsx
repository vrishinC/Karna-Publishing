export function Instagram({ handle }: { handle: string }) {
  if (!handle) return null;
  const cleanHandle = handle.replace(/^@/, "");

  return (
    <section id="instagram" className="mx-auto max-w-4xl px-6 py-20 text-center">
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
        Follow Along
      </h2>
      <div className="mt-3 flex items-center justify-center gap-2">
        <img
          src="/instagram/profile.jpg"
          alt={`@${cleanHandle}`}
          className="h-8 w-8 rounded-full object-cover"
        />
        <p className="text-gray-500">@{cleanHandle}</p>
      </div>
      <a
        href={`https://instagram.com/${cleanHandle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        Follow @{cleanHandle}
      </a>

      <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex aspect-square items-center justify-center rounded-md bg-gray-100"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5-11 11" />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}
