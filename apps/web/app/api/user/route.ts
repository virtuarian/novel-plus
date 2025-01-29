// app/api/user/route.ts
import { sessionOptions } from "@/lib/session";
import type { SessionData } from "@/types/LoginUser";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (session.user) {
        return NextResponse.json({
            user: session.user,
        });
    }

    return NextResponse.json({
        user: null,
    });
}
