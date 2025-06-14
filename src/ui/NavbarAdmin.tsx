'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-4"
      style={{ background: 'linear-gradient(180deg, #002E63 0.31%, #005DC9 173.34%)' }}
    >
      {/* Left: Logo */}
      <Link href="/home" className="text-white text-xl font-bold flex items-center gap-2">
        <Image src="/logo.svg" alt="RentalQ Logo" width={28} height={28} />
        RentalQ
      </Link>

      {/* Right: Profile */}
      <Link href="/profile" className="flex items-center gap-2 text-white hover:underline">
        <span>Cynthia</span>
        <Image
          src="/profile.svg"
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full"
        />
      </Link>
    </nav>
  );
}
