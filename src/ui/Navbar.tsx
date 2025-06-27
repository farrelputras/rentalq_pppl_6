"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type UserProfile = {
  nama: string;
  fotoUser: string;
};

export default function Navbar() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const nama = localStorage.getItem("nama");
    const fotoUser = localStorage.getItem("fotoUser");

    if (nama && fotoUser !== null) {
      setUser({ nama, fotoUser });
    }
  }, []);

  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-4"
      style={{
        background: "linear-gradient(180deg, #002E63 0.31%, #005DC9 173.34%)",
      }}
    >
      {/* Left: Logo */}
      <Link
        href="/home"
        className="text-white text-xl font-bold flex items-center gap-2"
      >
        <Image
          src="/icons/rentalq-icon-white.svg"
          alt="RentalQ Logo"
          width={28}
          height={28}
        />
        RentalQ
      </Link>

      {/* Middle: Navigation Links */}
      <div className="flex gap-6">
        <Link
          href="/home"
          className={`font-bold text-white ${
            pathname === "/home" ? "underline" : "hover:underline"
          }`}
        >
          Home
        </Link>
        <Link
          href="/penyewaan"
          className={`font-bold text-white ${
            pathname === "/penyewaan" ? "underline" : "hover:underline"
          }`}
        >
          Penyewaan
        </Link>
        <Link
          href="/riwayat"
          className={`font-bold text-white ${
            pathname === "/riwayat" ? "underline" : "hover:underline"
          }`}
        >
          Riwayat Pemesanan
        </Link>
      </div>

      {/* Right: Profile */}
      <Link
        href="/profile"
        className="flex items-center gap-2 text-white hover:underline"
      >
        <span>{user?.nama ?? "Loading..."}</span>
        <Image
          src={user?.fotoUser || "/profile.svg"}
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      </Link>
    </nav>
  );
}
