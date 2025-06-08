// app/(main)/layout.tsx
import { ReactNode } from "react";
import Navbar from "@/ui/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {/* Background warna setengah setengah */}
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </>
  );
}
