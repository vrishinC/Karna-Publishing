export function Footer({
  email,
  instagramHandle,
}: {
  email: string;
  instagramHandle: string;
}) {
  const cleanHandle = instagramHandle.replace(/^@/, "");

  return (
    <footer id="contact" className="border-t border-gray-200 px-6 py-12 text-center text-sm text-gray-500">
      <p className="space-x-3">
        {email && (
          <a href={`mailto:${email}`} className="hover:text-gray-800">
            {email}
          </a>
        )}
        {email && cleanHandle && <span>·</span>}
        {cleanHandle && (
          <a
            href={`https://instagram.com/${cleanHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800"
          >
            @{cleanHandle}
          </a>
        )}
      </p>
      <p className="mt-3 text-gray-400">
        &copy; {new Date().getFullYear()} Karna Publishing. All rights reserved.
      </p>
    </footer>
  );
}
