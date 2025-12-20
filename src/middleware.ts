import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    let hostname = req.headers.get("host") || "";

    // Remove port if testing locally (e.g. localhost:3000 -> localhost)
    hostname = hostname.replace(":3000", "");

    // Get the subdomain (e.g., "admin" from "admin.yourbank.com")
    // For standard domains like "yourbank.com", subdomain will be "yourbank" or null/www depending on logic.
    // A safer check for strictly "admin" subdomain:
    const isAdminSubdomain = hostname.startsWith("admin.");

    // -----------------------------------------------------------
    // 1. SUBDOMAIN REWRITE LOGIC
    // -----------------------------------------------------------

    // If the user is on "admin.yourdomain.com", we assume they want content from /admin folder
    // We rewrite the URL so Next.js serves from /src/app/admin/...
    if (isAdminSubdomain) {
        // Prevent double-nesting if the path already starts with /admin (rare but possible)
        if (!url.pathname.startsWith("/admin")) {
            url.pathname = `/admin${url.pathname}`;
        }
    }

    // We use 'pathToCheck' for auth logic. This represents the "real" internal path.
    const pathToCheck = url.pathname;

    // -----------------------------------------------------------
    // 2. AUTHENTICATION LOGIC
    // -----------------------------------------------------------

    const session = req.cookies.get("session")?.value;

    // Decrypt Session if it exists
    let payload = null;
    if (session) {
        try {
            const verified = await jwtVerify(session, SECRET_KEY, { algorithms: ["HS256"] });
            payload = verified.payload;
        } catch (err) {
            // Invalid token
        }
    }

    // A. Protect Admin Routes (matches /admin because of the rewrite above)
    if (pathToCheck.startsWith("/admin")) {

        // Case: Admin Login Page
        if (pathToCheck === "/admin/login") {
            if (payload?.role === "admin") {
                // Redirect to admin dashboard (keep them on the subdomain)
                const dashboardUrl = new URL("/dashboard", req.url);
                // The browser stays on admin.domain.com/dashboard
                return NextResponse.redirect(dashboardUrl);
            }
            // Allow access to login page. 
            // IMPORTANT: We must return `rewrite` here to ensure the /admin/login file is served
            return NextResponse.rewrite(url);
        }

        // Case: Protected Admin Pages
        if (!payload || payload.role !== "admin") {
            const loginUrl = new URL("/login", req.url); // relative to current host (admin.domain.com)
            return NextResponse.redirect(loginUrl);
        }
    }

    // B. Protect User Dashboard Routes (Main Domain)
    // These routes are NOT on the admin subdomain
    if (pathToCheck.startsWith("/dashboard")) {
        // If they try to access /dashboard on the admin subdomain, maybe kick them out?
        // For now, standard protection:
        if (!payload) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    // C. Redirect Logged-in Users away from Public Auth Pages
    if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup") {
        if (payload) {
            if (payload.role === "admin") {
                // If an admin logs in on the main site, send them to the admin subdomain
                // Note: This requires hardcoding your domain or dynamic construction if environment varies
                const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
                const rootDomain = hostname.replace("admin.", ""); // simplistic extraction
                const adminUrl = `${protocol}://admin.${rootDomain}/dashboard`;

                return NextResponse.redirect(adminUrl);
            } else {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
        }
    }

    // Finally, apply the rewrite calculated in Step 1
    return NextResponse.rewrite(url);
}

export const config = {
    // Update matcher to catch all paths so we can check subdomains on the root "/"
    matcher: [
        "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
    ],
};