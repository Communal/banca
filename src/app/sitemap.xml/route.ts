import { SITE_URL } from "@/lib/seo";

const PAGES = [
  "/",
  "/about",
  "/products",
  "/security",
  "/careers",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
];

export async function GET() {
  const base = SITE_URL || "https://yourdomain.com";
  const lastmod = new Date().toISOString();

  const urls = PAGES.map((p) => {
    return `  <url>\n    <loc>${base}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
