import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // Simulate sending an email
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ success: true, message: "OTP sent" });
}