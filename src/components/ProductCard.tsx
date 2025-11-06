```tsx
"use client";
import { centsToDollars } from "@/lib/utils";
import { useCart } from "./CartProvider";


export type Product = { id: number; slug: string; name: string; description: string; image: string; priceCents: number };


export default function ProductCard({ p }: { p: Product }) {
const { add } = useCart();
return (
<div className="bg-[var(--card)] rounded-2xl p-4 shadow-md hover:shadow-xl transition">
<img src={p.image} alt={p.name} className="w-full aspect-[4/3] object-cover rounded-xl" />
<div className="mt-3 flex items-center justify-between">
<div>
<h3 className="font-semibold">{p.name}</h3>
<p className="text-white/70 text-sm">${centsToDollars(p.priceCents)}</p>
</div>
<button onClick={() => add({ id: p.id, name: p.name, image: p.image, priceCents: p.priceCents })}
className="bg-[var(--accent)] text-black px-3 py-1.5 rounded-lg">Add</button>
</div>
</div>
);
}
```
