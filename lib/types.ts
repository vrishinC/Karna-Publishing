export type Book = {
  id: string;
  position: number;
  title: string;
  blurb: string;
  price: number | null;
  amazon_url: string | null;
  available: boolean;
  cover_image_url: string | null;
};

export type SiteSettings = Record<string, string>;
