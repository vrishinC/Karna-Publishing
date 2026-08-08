-- Karna Publishing: schema, RLS policies, and seed data.
-- Run this once in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- books
-- ---------------------------------------------------------------------------
create table if not exists books (
  id uuid primary key default gen_random_uuid(),
  position integer not null,
  title text not null,
  blurb text not null,
  price numeric(10, 2),
  amazon_url text,
  available boolean not null default false,
  cover_image_url text,
  created_at timestamptz not null default now()
);

create unique index if not exists books_position_key on books (position);

-- ---------------------------------------------------------------------------
-- site_settings (key/value store for editable copy)
-- ---------------------------------------------------------------------------
create table if not exists site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security: public read, no public write.
-- Content is edited from the Supabase dashboard (using the service role,
-- which bypasses RLS), never from the live site.
-- ---------------------------------------------------------------------------
alter table books enable row level security;
alter table site_settings enable row level security;

drop policy if exists "Public can read books" on books;
create policy "Public can read books"
  on books for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can read site_settings" on site_settings;
create policy "Public can read site_settings"
  on site_settings for select
  to anon, authenticated
  using (true);

-- No insert/update/delete policies are defined, so those operations are
-- denied by default for anon and authenticated roles.

-- ---------------------------------------------------------------------------
-- Seed data
-- ---------------------------------------------------------------------------
-- cover_image_url values below point at placeholder cover art shipped in
-- public/covers/. Replace with real cover URLs once available; the field
-- accepts any public image URL.
insert into books (position, title, blurb, price, amazon_url, available, cover_image_url)
values
  (1, 'A Conversation With No Audience', 'A quiet meditation on being heard, and the silence that follows.', null, 'https://www.amazon.com/dp/B0GM5KSXCF', true, '/covers/book-1.png'),
  (2, 'I, Kartik Aniket Navil, Do It.', 'A defiant, incendiary claim of a name and everything done in it.', null, 'https://tinyurl.com/56c2xurr', true, '/covers/book-2.png'),
  (3, 'Third Act', 'A memoir about resilience and reinvention.', null, null, false, '/covers/book-3.svg')
on conflict (position) do nothing;

insert into site_settings (key, value)
values
  ('tagline', 'Independent stories, thoughtfully published.'),
  ('about', E'Karna Publishing was founded to give overlooked voices a home. We work closely with every author we publish, from first draft to finished book.\n\nWe are a small press by choice: a short, carefully chosen list each year, printed and sold with care, from developmental edit to final proof.\n\nEvery title on our shelf was picked for the same reason: a voice worth hearing, told the way the author meant to tell it.'),
  ('founded_year', '2026'),
  ('instagram_handle', 'navil.kartik')
on conflict (key) do nothing;
