```ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { createSession } from "@/lib/auth";


const schema = z.object({ email: z.string().email(), password: z.string().min(6) });


export async function POST(req: Request) {
const body = await req.json();
const parsed = schema.safeParse(body);
if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });


const user = await db.user.findUnique({ where: { email: parsed.data.email } });
if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });


const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });


await createSession({ id: user.id, email: user.email, name: user.name });
return NextResponse.json({ id: user.id, email: user.email, name: user.name });
}
```
