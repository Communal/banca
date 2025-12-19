import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";
import { z } from "zod";

// Input Validation Schema
const signupSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validate Input
        const result = signupSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { success: false, message: result.error.errors[0].message },
                { status: 400 }
            );
        }

        const { fullName, email, password } = result.data;

        // 2. Check if user exists
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, message: "User with this email already exists" },
                { status: 409 } // Conflict
            );
        }

        // 3. Hash Password
        const passwordHash = await bcrypt.hash(password, 10);

        // 4. Create User in DB
        // Note: 'role' defaults to 'user' based on your schema default
        const newUser = await db.insert(users).values({
            email,
            fullName,
            passwordHash,
            role: 'user',
            // Add a placeholder avatar or handle it later
            avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`,
        }).returning();

        const user = newUser[0];

        // 5. Auto-Login (Create Session)
        await createSession({ userId: user.id, role: user.role });

        return NextResponse.json({
            success: true,
            message: "Account created successfully",
            user: { id: user.id, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}