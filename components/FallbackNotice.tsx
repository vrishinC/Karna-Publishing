export function FallbackNotice({ message }: { message: string }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Karna Publishing
      </h1>
      <p className="mt-4 text-gray-500">{message}</p>
    </div>
  );
}
