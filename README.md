# Karna Publishing

A one-page site for Karna Publishing. Built with Next.js (App Router) and
Supabase. All page copy and book data lives in Supabase tables — there is
nothing to edit in code to update content.

## Stack

- Next.js App Router, React Server Components
- Supabase (Postgres + `@supabase/supabase-js`) for content
- Tailwind CSS

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the two values below
npm run dev
```

Required environment variables (in `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon/publishable-key
```

Both are safe to expose to the browser — they only grant the public,
read-only access defined by the RLS policies below.

## Database setup

Run [`supabase/schema.sql`](supabase/schema.sql) once, either by pasting it
into the Supabase dashboard's SQL editor, or via the CLI:

```bash
supabase db push --file supabase/schema.sql
```

It creates two tables and seeds them with placeholder rows:

- **`books`** — `id`, `position`, `title`, `blurb`, `price`, `amazon_url`,
  `available`, `cover_image_url`. `position` controls the display order
  (and must be unique).
- **`site_settings`** — a `key`/`value` table for editable copy: `tagline`,
  `about`, `founded_year`, `instagram_handle`.

Row Level Security is enabled on both tables with a public **read-only**
policy. There are no insert/update/delete policies, so the anon key used by
the live site cannot write anything — all edits happen from the Supabase
dashboard (Table Editor), which uses your logged-in/service-role access and
bypasses RLS.

### Editing content

All from the Supabase dashboard → Table Editor, no deploy needed (the site
revalidates content every 60 seconds):

- **Add or edit a book**: edit a row in `books`. `position` (1, 2, 3, ...)
  sets shelf order; the Hero section shows the first three by `position`.
- **Flip a book live**: set `available` to `true` and fill in `amazon_url`.
  The "Coming Soon" pill automatically becomes a working "Check it out!"
  button — no code change required. Leaving `available = false` (or
  `amazon_url` empty) keeps the disabled state even if one of the two is set.
- **Cover images**: paste a public image URL into `cover_image_url`. If
  it's empty, a placeholder box with the book's title is shown instead.
- **About text**: edit the `about` row's `value` in `site_settings`.
  Separate paragraphs with a blank line — each becomes its own `<p>`.
- **Instagram**: edit `instagram_handle` (no `@`) in `site_settings`. It's
  used for both the Instagram section and the footer link.
- **Tagline / founded year**: edit `tagline` and `founded_year` in
  `site_settings`.

### If content fails to load

If the environment variables are missing or the Supabase fetch fails for
any reason, the page renders a plain fallback message instead of crashing
(see `lib/content.ts` and `components/FallbackNotice.tsx`).

## Project structure

```
app/page.tsx           Fetches books + settings, composes the sections
lib/content.ts          Server-side Supabase fetch (public, read-only)
lib/types.ts             Book / SiteSettings types
components/              Nav, Hero, About, Books, Instagram, Footer, FallbackNotice
supabase/schema.sql      Tables, RLS policies, seed data
```

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. In the Vercel project settings, add the same two environment variables
   as above (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Deploy. No other configuration is required.
