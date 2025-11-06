```tsx
"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";


export type CartItem = { id: number; name: string; priceCents: number; image: string; qty: number };


type Ctx = {
items: CartItem[];
add: (item: Omit<CartItem, "qty">) => void;
inc: (id: number) => void;
dec: (id: number) => void;
remove: (id: number) => void;
clear: () => void;
totalCents: number;
};


const CartCtx = createContext<Ctx | null>(null);


export function CartProvider({ children }: { children: React.ReactNode }) {
const [items, setItems] = useState<CartItem[]>([]);


useEffect(() => {
const raw = localStorage.getItem("cart");
if (raw) setItems(JSON.parse(raw));
}, []);
useEffect(() => {
localStorage.setItem("cart", JSON.stringify(items));
}, [items]);


const api: Ctx = useMemo(() => ({
items,
add: (i) => setItems((prev) => {
const e = prev.find((p) => p.id === i.id);
if (e) return prev.map((p) => (p.id === i.id ? { ...p, qty: p.qty + 1 } : p));
return [...prev, { ...i, qty: 1 }];
}),
inc: (id) => setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))),
dec: (id) => setItems((prev) => prev.flatMap((p) => (p.id === id ? (p.qty > 1 ? [{ ...p, qty: p.qty - 1 }] : []) : [p]))),
remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
clear: () => setItems([]),
totalCents: items.reduce((s, p) => s + p.priceCents * p.qty, 0),
}), [items]);


return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}


export const useCart = () => {
const ctx = useContext(CartCtx);
if (!ctx) throw new Error("useCart must be used within CartProvider");
return ctx;
};
```
