import type { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
    cookieName: process.env.COOKIE_NAME as string,
    password: process.env.COOKIE_PASSWORD as string,
    cookieOptions: {
        secure: false,
        maxAge: Number(process.env.SESSION_TIMEOUT),
    },
};
