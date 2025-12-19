import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      {/* This padding logic was moved from the root layout to here */}
      <main className="min-h-screen pt-32 px-4 md:px-8 w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>

      <Footer />
    </>
  );
}
