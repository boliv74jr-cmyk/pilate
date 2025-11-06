```tsx
postcode: payload.postcode,
deliveryNotes: payload.deliveryNotes || undefined,
stairs: payload.stairs === "on",
preferredWindow: payload.preferredWindow || undefined,
})
});
if (!res.ok) { setError((await res.json()).error || "Order failed"); return; }
clear();
const data = await res.json();
router.push(`/`);
alert(`Order #${data.id} placed! Total $${centsToDollars(data.totalCents)}`);
}


return (
<div className="grid lg:grid-cols-3 gap-6">
<form onSubmit={placeOrder} className="lg:col-span-2 bg-[var(--card)] p-6 rounded-2xl space-y-3">
<h1 className="text-2xl font-semibold">Delivery details</h1>
{error && <p className="text-red-400 text-sm">{error}</p>}
<div className="grid sm:grid-cols-2 gap-3">
<input name="fullName" placeholder="Full name" className="p-2 rounded bg-black/40" required />
<input name="email" placeholder="Email" className="p-2 rounded bg-black/40" required />
<input name="phone" placeholder="Phone" className="p-2 rounded bg-black/40" required />
<input name="addressLine1" placeholder="Address line 1" className="p-2 rounded bg-black/40" required />
<input name="addressLine2" placeholder="Address line 2 (optional)" className="p-2 rounded bg-black/40" />
<input name="suburb" placeholder="Suburb" className="p-2 rounded bg-black/40" required />
<input name="state" placeholder="State" className="p-2 rounded bg-black/40" required />
<input name="postcode" placeholder="Postcode" className="p-2 rounded bg-black/40" required />
</div>
<div className="grid sm:grid-cols-2 gap-3 mt-2">
<label className="flex items-center gap-2"><input type="checkbox" name="stairs" /> Stairs at delivery?</label>
<select name="preferredWindow" className="p-2 rounded bg-black/40">
<option value="">Preferred delivery window (optional)</option>
<option>Weekday 9am–12pm</option>
<option>Weekday 12pm–3pm</option>
<option>Weekday 3pm–6pm</option>
<option>Saturday 9am–1pm</option>
</select>
</div>
<textarea name="deliveryNotes" placeholder="Delivery notes (e.g., gate codes, pets, leave at door)" className="w-full p-2 rounded bg-black/40" />
<button className="bg-[var(--accent)] text-black px-4 py-2 rounded">Place order</button>
</form>


<aside className="bg-[var(--card)] p-6 rounded-2xl h-fit">
<h2 className="text-xl font-semibold">Order summary</h2>
<ul className="mt-2 space-y-2">
{items.map(i => (
<li key={i.id} className="flex justify-between text-sm">
<span>{i.name} × {i.qty}</span>
<span>${centsToDollars(i.priceCents * i.qty)}</span>
</li>
))}
</ul>
<hr className="my-3 border-white/10" />
<p>Total: <b>${centsToDollars(totalCents)}</b></p>
</aside>
</div>
);
}
```
