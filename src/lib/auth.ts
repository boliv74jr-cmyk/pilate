```ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";


const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const COOKIE = "psess";


export async function createSession(user: { id: number; email: string; name: string }) {
const token = await new SignJWT({ sub: String(user.id), email: user.email, name: user.name })
.setProtectedHeader({ alg: "HS256" })
.setIssuedAt()
.setExpirationTime("7d")
.sign(secret);
cookies().set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
}


export async function getSession() {
const token = cookies().get(COOKIE)?.value;
if (!token) return null;
try {
const { payload } = await jwtVerify(token, secret);
return { id: Number(payload.sub), email: payload.email as string, name: payload.name as string };
} catch {
return null;
}
}


export function clearSession() {
cookies().set(COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/" });
}
```
