import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
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
    const isProduction = process.env.NODE_ENV === "production";
    const secureCookie = isProduction;

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: secureCookie,
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
        const { payload } = await jwtVerify(session, SECRET_KEY, {
            algorithms: ["HS256"],
        });

        const user = await db.query.users.findFirst({
            where: eq(users.id, payload.userId as string),
            columns: { id: true, role: true }
        });

        if (!user) {
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