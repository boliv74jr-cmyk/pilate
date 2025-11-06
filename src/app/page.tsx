```tsx
import ProductCard from "@/components/ProductCard";


async function getProducts() {
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/products`, { cache: "no-store" });
return res.json();
}


export default async function Page() {
const products = await getProducts();
return (
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{products.map((p: any) => (<ProductCard key={p.id} p={p} />))}
</div>
);
}
```
