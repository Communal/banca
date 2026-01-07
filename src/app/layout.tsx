import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import TawkToChat from "@/components/TawkToChat";
import GoogleTranslate from "@/components/GoogleTranslate";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://montedeiazzu.it"
  ),
  title: "Montedeiazzu — Empowering Your Financial Journey",
  description:
    "Modern banking solutions. Secure, fast, and modern banking for individuals and businesses.",
  openGraph: {
    title: "Montedeiazzu — Empowering Your Financial Journey",
    description:
      "Modern banking solutions. Secure, fast, and modern banking for individuals and businesses.",
    url: "https://montedeiazzu.it",
    siteName: "Montedeiazzu",
    images: [{ url: "/images/web.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Montedeiazzu — Empowering Your Financial Journey",
    description:
      "Modern banking solutions. Secure, fast, and modern banking for individuals and businesses.",
  },
  alternates: {
    canonical: "https://montedeiazzu.it",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${lexend.className} bg-brand-light antialiased overflow-x-hidden`}
      >
        {/* ✅ Load Google Translate ONCE globally */}
        <GoogleTranslate />

        <Providers>
          {children}
          <TawkToChat />
        </Providers>
      </body>
    </html>
  );
}
