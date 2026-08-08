import { createClient } from "@supabase/supabase-js";
import type { Book, SiteSettings } from "./types";

export type SiteContent = {
  books: Book[];
  settings: SiteSettings;
};

// Public, read-only content for the homepage. Uses the anon key directly
// (no cookies/session needed) so this stays a plain server-side fetch that
// works with static rendering + revalidation.
export async function getSiteContent(): Promise<SiteContent | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const [booksResult, settingsResult] = await Promise.all([
    supabase.from("books").select("*").order("position", { ascending: true }),
    supabase.from("site_settings").select("key, value"),
  ]);

  if (booksResult.error) {
    console.error("Failed to load books:", booksResult.error.message);
    return null;
  }
  if (settingsResult.error) {
    console.error("Failed to load site_settings:", settingsResult.error.message);
    return null;
  }

  const settings: SiteSettings = {};
  for (const row of settingsResult.data ?? []) {
    settings[row.key] = row.value;
  }

  return { books: booksResult.data ?? [], settings };
}
