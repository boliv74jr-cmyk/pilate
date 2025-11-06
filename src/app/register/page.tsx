```tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const router = useRouter();


async function onSubmit(e: React.FormEvent) {
e.preventDefault();
setError("");
const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
if (res.ok) router.push("/"); else setError((await res.json()).error || "Register failed");
}


return (
<form onSubmit={onSubmit} className="max-w-md mx-auto bg-[var(--card)] p-6 rounded-2xl space-y-4">
<h1 className="text-2xl font-semibold">Create account</h1>
{error && <p className="text-red-400 text-sm">{error}</p>}
<input className="w-full p-2 rounded bg-black/40" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
<input className="w-full p-2 rounded bg-black/40" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input type="password" className="w-full p-2 rounded bg-black/40" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
<button className="bg-[var(--accent)] text-black px-4 py-2 rounded">Create account</button>
</form>
);
}

