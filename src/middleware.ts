import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const path = url.pathname;

    // 1. Verify Session
    const session = req.cookies.get("session")?.value;
    let payload = null;

    if (session) {
        try {
            const verified = await jwtVerify(session, SECRET_KEY, { algorithms: ["HS256"] });
            payload = verified.payload;
        } catch (err) {
            // Invalid token -> treat as logged out
        }
    }

    // -----------------------------------------------------------
    // A. PROTECT ADMIN ROUTES (/admin/*)
    // -----------------------------------------------------------
    if (path.startsWith("/admin")) {

        // Case 1: Admin Login Page (/admin/login)
        if (path === "/admin/login") {
            // If already logged in as Admin, go to dashboard
            if (payload?.role === "admin") {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            }
            // If logged in as User, kick them out to user dashboard
            if (payload?.role === "user") {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
            // Otherwise allow access to login form
            return NextResponse.next();
        }

        // Case 2: Protected Admin Pages (e.g. /admin/dashboard, /admin/users)
        // Must be logged in AND have role 'admin'
        if (!payload || payload.role !== "admin") {
            // Redirect unauthorized users to Admin Login
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }

    // -----------------------------------------------------------
    // B. PROTECT USER ROUTES (/dashboard/*)
    // -----------------------------------------------------------
    if (path.startsWith("/dashboard")) {
        if (!payload) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        // Optional: Prevent admins from seeing user dashboard? 
        // Usually admins might want to see it, but if not, redirect them to /admin/dashboard
        if (payload.role === "admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
    }

    // -----------------------------------------------------------
    // C. AUTH PAGE REDIRECTS (Already logged in?)
    // -----------------------------------------------------------
    if (path === "/login" || path === "/signup") {
        if (payload) {
            if (payload.role === "admin") {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            }
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // Matches all routes except  files and APIs
    matcher: ["/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)"],
};