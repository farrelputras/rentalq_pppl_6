import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
// import Navbar from '@/components/Navbar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'], // Add other weights as needed
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RentalQ',
  description: 'Motorcycle rental platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-[#E6EEF7] font-sans">
        {/* <Navbar /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}