// src/app/layout.tsx
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import Navbar from '@/ui/Navbar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RentalQ',
  description: 'Motorcycle rental platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`h-full w-full ${poppins.variable}`}>
      <body className="h-full w-full bg-white antialiased"
      style={{
          background:"#E6EEF7",
        }}>
        
        {children}
      </body>
    </html>
  );
}
