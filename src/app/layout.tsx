import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import TawkToChat from "@/components/TawkToChat";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Montedeiazzu - Empowering Your Financial Journey",
  description: "Modern banking solutions.",
  icons: {
    icon: "/images/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${lexend.className} bg-brand-light antialiased overflow-x-hidden`}
      >
        <Providers>
          {children}
          <TawkToChat />
        </Providers>
      </body>
    </html>
  );
}