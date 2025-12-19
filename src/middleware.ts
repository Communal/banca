import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
    const session = req.cookies.get("session")?.value;
    const { pathname } = req.nextUrl;

    // 1. Decrypt Session if it exists
    let payload = null;
    if (session) {
        try {
            const verified = await jwtVerify(session, SECRET_KEY, { algorithms: ["HS256"] });
            payload = verified.payload;
        } catch (err) {
            // Invalid token, treat as guest
        }
    }

    // 2. Protect Admin Routes
    if (pathname.startsWith("/admin")) {
        // Special Case: Handling the Admin Login Page itself
        if (pathname === "/admin/login") {
            if (payload?.role === "admin") {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            }
            return NextResponse.next();
        }

        // For all other /admin pages, strict check
        if (!payload || payload.role !== "admin") {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }

    // 3. Protect User Dashboard Routes
    if (pathname.startsWith("/dashboard")) {
        if (!payload) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    // 4. Redirect Logged-in Users away from public User Auth pages
    if (pathname === "/login" || pathname === "/signup") {
        if (payload) {
            // Intelligent redirect based on role
            const target = payload.role === "admin" ? "/admin/dashboard" : "/dashboard";
            return NextResponse.redirect(new URL(target, req.url));
        }
    }

    return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup"],
};