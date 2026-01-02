import { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://montedeiazzu.it").replace(/\/$/, "");

// Only allow indexing if explicitly set to true OR if we are in production
const ALLOW_INDEXING =
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" || process.env.NODE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
    // 1. BLOCK EVERYTHING (Staging, Dev, Previews)
    if (!ALLOW_INDEXING) {
        return {
            rules: {
                userAgent: "*",
                disallow: "/",
            },
        };
    }

    // 2. PRODUCTION RULES
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/dashboard", "/api", "/_next", "/private"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}