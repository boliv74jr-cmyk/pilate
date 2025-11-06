```tsx
import "./globals.css";
import "@/styles/theme.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import { CartProvider } from "@/components/CartProvider";


const inter = Inter({ subsets: ["latin"] });


export const metadata = { title: "Pilates Store", description: "Pilates items in Tweed style" };


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className={`${inter.className} bg-[var(--bg)] text-white`}>
<CartProvider>
<NavBar />
<main className="max-w-6xl mx-auto p-4">{children}</main>
</CartProvider>
</body>
</html>
);
}
```
