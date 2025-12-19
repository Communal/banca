import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // 1. Find User
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        console.log(user);
        

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // 2. Strict Role Check (Admin Only)
        if (user.role !== "admin") {
            return NextResponse.json(
                { success: false, message: "Access Denied: You do not have admin privileges." },
                { status: 403 } // Forbidden
            );
        }

        // 3. Verify Password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // 4. Create Session (Only if Admin)
        await createSession({ userId: user.id, role: user.role });

        return NextResponse.json({ success: true, message: "Admin Login Successful" });

    } catch (error) {
        console.error("Admin Login Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}