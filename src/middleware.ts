import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    let hostname = req.headers.get("host") || "";
    hostname = hostname.replace(":3000", "");

    // Check if we are on a subdomain
    const isAdminSubdomain = hostname.startsWith("admin.");

    // 1. REWRITE LOGIC (Only for subdomains)
    if (isAdminSubdomain && !url.pathname.startsWith("/admin")) {
        url.pathname = `/admin${url.pathname}`;
    }

    const pathToCheck = url.pathname;
    const session = req.cookies.get("session")?.value;

    let payload = null;
    if (session) {
        try {
            const verified = await jwtVerify(session, SECRET_KEY, { algorithms: ["HS256"] });
            payload = verified.payload;
        } catch (err) {
            // Invalid token
        }
    }

    // -----------------------------------------------------------
    // ADMIN ROUTES PROTECTION
    // -----------------------------------------------------------
    if (pathToCheck.startsWith("/admin")) {

        // Case: Admin Login Page
        if (pathToCheck === "/admin/login") {
            if (payload?.role === "admin") {
                // FIXED: If on subdomain, go to /dashboard (which rewrites to admin dash).
                // If on main domain, go explicitly to /admin/dashboard.
                const target = isAdminSubdomain ? "/dashboard" : "/admin/dashboard";
                return NextResponse.redirect(new URL(target, req.url));
            }
            return NextResponse.rewrite(url);
        }

        // Case: Protect all other admin pages
        if (!payload || payload.role !== "admin") {
            // Redirect to admin login, not user login
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }

    // -----------------------------------------------------------
    // USER DASHBOARD PROTECTION
    // -----------------------------------------------------------
    if (pathToCheck.startsWith("/dashboard")) {
        if (!payload) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    // -----------------------------------------------------------
    // PREVENT LOGGED-IN USERS FROM SEEING AUTH PAGES
    // -----------------------------------------------------------
    if (pathToCheck === "/login" || pathToCheck === "/signup") {
        if (payload) {
            // If admin tries to see user login, send them to admin dash
            if (payload.role === "admin") {
                const target = isAdminSubdomain ? "/dashboard" : "/admin/dashboard";
                return NextResponse.redirect(new URL(target, req.url));
            }
            // Regular users go to user dashboard
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    return NextResponse.rewrite(url);
}

export const config = {
    matcher: ["/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)"],
};