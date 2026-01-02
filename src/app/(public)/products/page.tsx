import type { Metadata } from "next";
import { makeMetadata } from "@/lib/seo";
import ProductsContent from "@/components/sections/products/ProductsContent";

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata({
    title: "Products — Montedeiazzu",
    description:
      "Explore Montedeiazzu's product suite: checking, savings, loans, and business banking solutions.",
    pathname: "/products",
  });
}

export default function ProductsPage() {
  return <ProductsContent />;
}