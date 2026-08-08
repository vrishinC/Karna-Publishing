const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#books", label: "Books" },
  { href: "#instagram", label: "Instagram" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="text-[15px] font-semibold tracking-tight text-gray-900"
        >
          Karna Publishing
        </a>

        <nav className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-gray-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px] text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
    </header>
  );
}
