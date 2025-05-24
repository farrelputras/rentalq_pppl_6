// app/(main)/layout.tsx
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />

      {/* Background warna setengah setengah */}
      <main
        className="flex-1 flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom, #0C59B3 30%, #E6EEF7 30%)",
        }}
      >
        {children}
      </main>
    </>
  );
}
