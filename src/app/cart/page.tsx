```tsx
"use client";
import { useCart } from "@/components/CartProvider";
import { centsToDollars } from "@/lib/utils";


export default function CartPage() {
const { items, inc, dec, remove, totalCents } = useCart();
return (
<div className="grid lg:grid-cols-3 gap-6">
<div className="lg:col-span-2 space-y-4">
{items.length === 0 && <p>Your cart is empty.</p>}
{items.map((i) => (
<div key={i.id} className="bg-[var(--card)] p-4 rounded-2xl flex items-center gap-4">
<img src={i.image} className="w-24 h-24 object-cover rounded-lg"/>
<div className="flex-1">
<div className="font-semibold">{i.name}</div>
<div className="text-white/70 text-sm">${centsToDollars(i.priceCents)}</div>
<div className="mt-2 flex items-center gap-2">
<button onClick={()=>dec(i.id)} className="px-2 py-1 bg-black/40 rounded">-</button>
<span>{i.qty}</span>
<button onClick={()=>inc(i.id)} className="px-2 py-1 bg-black/40 rounded">+</button>
<button onClick={()=>remove(i.id)} className="ml-4 px-3 py-1 bg-red-500/80 rounded">Remove</button>
</div>
</div>
</div>
))}
</div>
<aside className="bg-[var(--card)] p-4 rounded-2xl h-fit">
<h2 className="text-xl font-semibold">Summary</h2>
<p className="mt-2">Subtotal: <b>${centsToDollars(totalCents)}</b></p>
<a href="/checkout" className="mt-4 inline-block bg-[var(--accent)] text-black px-4 py-2 rounded">Checkout</a>
</aside>
</div>
);
}
```
