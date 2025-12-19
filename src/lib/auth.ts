import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "@/db"; // Import DB
import { users } from "@/db/schema"; // Import users schema
import { eq } from "drizzle-orm";

// Validate Environment Variable
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file");
}

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);
const ONE_DAY = 24 * 60 * 60 * 1000;

export async function createSession(payload: { userId: string; role: string }) {
    const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(SECRET_KEY);

    const cookieStore = await cookies();

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + ONE_DAY),
        sameSite: "lax",
        path: "/",
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) return null;

    try {
        // 1. Verify the Token Signature
        const { payload } = await jwtVerify(session, SECRET_KEY, {
            algorithms: ["HS256"],
        });

        // 2. [NEW STEP] Verify User Exists in Database
        // This prevents "deleted" users from accessing the app using an old token
        const user = await db.query.users.findFirst({
            where: eq(users.id, payload.userId as string),
            columns: { id: true, role: true } // Only fetch what we need
        });

        if (!user) {
            // Token is valid, but user is gone. Destroy the cookie.
            await logout();
            return null;
        }

        return payload;
    } catch (error) {
        return null;
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set("session", "", { expires: new Date(0) });
}