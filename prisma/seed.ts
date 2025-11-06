```ts
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();


async function main() {
const products = [
{
slug: "reformer-loops",
name: "Reformer Loops",
description: "Premium padded reformer hand/foot loops for comfortable workouts.",
image: "/products/reformer-loops.jpg",
priceCents: 3999,
inStock: 25,
},
{
slug: "pilates-ring",
name: "Pilates Ring (Magic Circle)",
description: "Light resistance ring for toning arms and thighs.",
image: "/products/pilates-ring.jpg",
priceCents: 2999,
inStock: 40,
},
{
slug: "yoga-mat",
name: "Cushioned Mat",
description: "Non‑slip, 6mm cushioned mat ideal for Pilates and yoga.",
image: "/products/mat.jpg",
priceCents: 4999,
inStock: 60,
},
];


for (const p of products) {
await db.product.upsert({
where: { slug: p.slug },
update: p,
create: p,
});
}


console.log("Seeded products ✅");
}


main().finally(() => db.$disconnect());
```
