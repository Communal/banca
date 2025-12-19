import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

// GET: Fetch all user settings
export async function GET() {
    const session = await getSession();
    if (!session || !session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const user = await db.query.users.findFirst({
            where: eq(users.id, session.userId as string),
            // Select specific fields to avoid sending passwordHash
            columns: {
                id: true,
                fullName: true,
                userName: true,
                email: true,
                avatarUrl: true,
                dateOfBirth: true,
                presentAddress: true,
                permanentAddress: true,
                city: true,
                postalCode: true,
                country: true,
                currency: true,
                timeZone: true,
                notifyDigitalCurrency: true,
                notifyMerchantOrder: true,
                notifyRecommendations: true,
                twoFactorEnabled: true,
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

// PUT: Update user settings
export async function PUT(req: Request) {
    const session = await getSession();
    if (!session || !session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();

        // Security: Prevent updating sensitive fields like role or id
        const { id, role, passwordHash, email, ...updateData } = body;

        // Update DB
        await db.update(users)
            .set(updateData)
            .where(eq(users.id, session.userId as string));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}