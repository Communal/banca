// src/app/api/logout/route.ts
import { NextResponse } from "next/server";
import { logout } from "@/lib/auth"; // Import the helper function

export async function POST() {
    await logout(); // Clears the cookie
    return NextResponse.json({ success: true });
}