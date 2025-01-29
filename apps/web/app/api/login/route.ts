// app/api/login/route.ts
import { authenticateUser } from '@/components/LoginCheck';
import { sessionOptions } from '@/lib/session';
import type { SessionData } from '@/types/LoginUser';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    const { userName, password } = await request.json();

    try {
        // ここで認証処理を実装
        // 例: データベースでユーザー確認など
        const user = await authenticateUser(userName, password);

        if (user) {
            session.user = {
                userId: user.userId,
                userName: user.userName,
                authority: user.authority,
                enable: user.enable,
                firstLogin: user.firstLogin,
                passwordChange: user.passwordChange,
            };
            await session.save();
            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, message: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}