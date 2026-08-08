import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Books } from "@/components/Books";
import { Instagram } from "@/components/Instagram";
import { Footer } from "@/components/Footer";
import { FallbackNotice } from "@/components/FallbackNotice";
import { getSiteContent } from "@/lib/content";

// Revalidate periodically so edits made in the Supabase dashboard show up
// without a redeploy.
export const revalidate = 60;

export default async function Page() {
  const content = await getSiteContent();

  if (!content) {
    return (
      <>
        <Nav />
        <FallbackNotice message="We couldn't load site content right now. Please check back soon." />
      </>
    );
  }

  const { books, settings } = content;
  const aboutParagraphs = (settings.about ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <Nav />
      <main>
        <Hero tagline={settings.tagline ?? ""} books={books} />
        <About paragraphs={aboutParagraphs} foundedYear={settings.founded_year} />
        <Books books={books} />
        <Instagram handle={settings.instagram_handle ?? ""} />
      </main>
      <Footer
        email={settings.contact_email ?? ""}
        instagramHandle={settings.instagram_handle ?? ""}
      />
    </>
  );
}
