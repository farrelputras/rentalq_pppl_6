// app/(main)/layout.tsx
import { ReactNode } from "react";
import Navbar from "@/ui/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="h-1/5 bg-[#0C59B3]" />
        <div className="h-1/2 bg-[#E6EEF7]" />
      </div>

      {/* Foreground */}
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
