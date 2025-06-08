"use client";

import Link from "next/link";
import { Button } from "@/ui/Button";
import { ArrowLeft, Search } from "lucide-react";
import motorList from "@/app/data/motorlist";

export default function SearchBar() {
  const rentalPeriod = {
    start: "Thursday, 17 April 2025 10:00 WIB",
    end: "Sunday, 20 April 2025 10:00 WIB",
    days: 2,
  };

  return (
    <div className="flex items-center justify-between mb-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        {/* Tombol back */}
        <Link href="/penyewaan" className="text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-6 h-6" />
        </Link>

        {/* Judul dan tanggal */}
        <div>
          <h1 className="text-xl font-semibold">Rental Motor</h1>
          <p className="text-sm text-gray-500">
            {rentalPeriod.start} - {rentalPeriod.end}
          </p>
        </div>
      </div>

      {/* Change Search */}
      <Button variant="outline" className="flex gap-2 items-center">
        <Search size={16} /> Change Search
      </Button>
    </div>
  );
}
