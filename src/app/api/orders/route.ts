```ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";


const Item = z.object({ id: z.number(), qty: z.number().min(1), priceCents: z.number().min(0) });
const Schema = z.object({
items: z.array(Item).min(1),
fullName: z.string().min(2), email: z.string().email(), phone: z.string().min(6),
addressLine1: z.string().min(3), addressLine2: z.string().optional(), suburb: z.string().min(2), state: z.string().min(2), postcode: z.string().min(3),
deliveryNotes: z.string().optional(), stairs: z.boolean().optional(), preferredWindow: z.string().optional(),
});


export async function POST(req: Request) {
const user = await getSession();
if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });


const body = await req.json();
const parsed = Schema.safeParse(body);
if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });


const { items, ...delivery } = parsed.data;


// fetch product prices from DB to trust server values
const productIds = items.map(i => i.id);
const products = await db.product.findMany({ where: { id: { in: productIds } } });
const byId = new Map(products.map(p => [p.id, p]));


let total = 0;
const order = await db.order.create({
data: {
userId: user.id,
totalCents: 0,
...delivery,
items: {
create: items.map(i => {
const p = byId.get(i.id)!;
const price = p.priceCents;
total += price * i.qty;
return { productId: p.id, qty: i.qty, priceCents: price };
})
}
},
include: { items: true }
});


await db.order.update({ where: { id: order.id }, data: { totalCents: total } });
return NextResponse.json({ id: order.id, totalCents: total });
}
```
