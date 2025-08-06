"use client";

import Link from "next/link";
import { Button } from "@/ui/Button";
import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const idPencarian = searchParams.get("idPencarian");

  const [waktuLabel, setWaktuLabel] = useState("Input waktu sewa kendaraan");

  useEffect(() => {
    const fetchWaktu = async () => {
      if (!idPencarian) return;

      try {
        const res = await fetch(`/api/pencarian?id=${idPencarian}`);
        const data = await res.json();

        const start = new Date(data.waktuAmbil);
        const end = new Date(data.waktuKembali);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          setWaktuLabel("Input waktu sewa kendaraan");
          return;
        }

        const startLabel = start.toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const endLabel = end.toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        setWaktuLabel(`${startLabel} - ${endLabel}`);
      } catch (err) {
        console.error("Gagal ambil data waktu pencarian:", err);
        setWaktuLabel("Input waktu sewa kendaraan");
      }
    };

    fetchWaktu();
  }, [idPencarian]);

  return (
    <div className="flex items-center justify-between mb-4 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center gap-3">
        {/* Tombol back */}
        <Link href="/penyewaan" className="text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-6 h-6" />
        </Link>

        {/* Judul dan tanggal */}
        <div>
          <h1 className="text-3xl font-semibold">Rental Motor</h1>
          <p className="text-lg text-gray-500">{waktuLabel}</p>
        </div>
      </div>

      {/* Change Search */}
      <Button variant="outline" className="flex gap-2 items-center">
        <Search size={16} /> Change Search
      </Button>
    </div>
  );
}
