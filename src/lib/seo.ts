import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

export function makeMetadata({
  title,
  description,
  pathname = "/",
  image = "/images/web.png",
}: {
  title: string;
  description: string;
  pathname?: string;
  image?: string;
}): Metadata {
  const url = new URL(pathname, SITE_URL).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Montedeiazzu",
      images: [{ url: new URL(image, SITE_URL).toString(), width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL(image, SITE_URL).toString()],
    },
  };
}

export { SITE_URL };
