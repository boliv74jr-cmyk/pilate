```tsx
"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { useEffect, useState } from "react";


export default function NavBar() {
const { items } = useCart();
const [count, setCount] = useState(0);
useEffect(() => setCount(items.reduce((s, p) => s + p.qty, 0)), [items]);


return (
<header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
<div className="max-w-6xl mx-auto flex items-center justify-between p-3">
<Link href="/" className="text-xl font-semibold">Pilates Store</Link>
<nav className="flex gap-4 items-center">
<Link href="/">Shop</Link>
<Link href="/cart" className="relative">
Cart
{count > 0 && (
<span className="absolute -right-3 -top-2 text-xs bg-[var(--accent)] text-black px-1.5 py-0.5 rounded">
{count}
</span>
)}
</Link>
<Link href="/login">Account</Link>
</nav>
</div>
</header>
);
}
```
