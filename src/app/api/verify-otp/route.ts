import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // Simulate verifying code
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ success: true, message: "OTP Verified" });
}