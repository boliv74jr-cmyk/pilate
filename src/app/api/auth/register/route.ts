```ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { createSession } from "@/lib/auth";


const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) });


export async function POST(req: Request) {
const body = await req.json();
const parsed = schema.safeParse(body);
if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });


const { name, email, password } = parsed.data;
const exists = await db.user.findUnique({ where: { email } });
if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 400 });


const passwordHash = await bcrypt.hash(password, 10);
const user = await db.user.create({ data: { name, email, passwordHash } });
await createSession({ id: user.id, email: user.email, name: user.name });
return NextResponse.json({ id: user.id, email: user.email, name: user.name });
}
```

