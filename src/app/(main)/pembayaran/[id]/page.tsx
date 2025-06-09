"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import SearchBar from "@/ui/SearchBar";
import { Card, CardContent } from "@/ui/Card";
import Radio from "@/ui/Radio";
import Link from "next/link";

interface Pesanan {
  id: number;
  tanggalSewa: string;
  tanggalKembali: string;
  startTime: string;
  endTime: string;
  jenisMotor: string;
  transmisi: string;
  cc: number;
  nopol: string;
  status: string;
  gambar: string;
  inv: number;
  basicBiaya: number;
  pickupBiaya: number;
  taxBiaya: number;
  promo: number;
  totalBiaya: number;
}

export default function OrderDetailPage() {
  const rentalPeriod = {
    start: "Thursday, 17 April 2025 10:00 WIB",
    end: "Sunday, 20 April 2025 10:00 WIB",
    days: 2,
  };

  const { id } = useParams();

  const [pesanan, setPesanan] = useState<Pesanan | null>(null);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPesanan = async () => {
      try {
        const res = await fetch(`/api/pesanan?id=${id}`);
        if (!res.ok) throw new Error("Gagal fetch");
        const data = await res.json();
        setPesanan(data[0]);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPesanan();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!pesanan)
    return <div className="p-4 text-red-500">Pesanan tidak ditemukan.</div>;

  const options = [
    { label: "QRIS", value: "qris", icon: "/qris_icon.svg" },
    { label: "Bank Transfer", value: "transfer", icon: "/transfer_icon.svg" },
  ];

  return (
    <main className="w-full mt-10 mx-15 p-4">
      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* MOTOR INFO */}
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
          <div className="flex gap-4">
            <Image
              src={`/${pesanan.gambar}`}
              alt={pesanan.jenisMotor}
              width={200}
              height={100}
            />
            <div>
              <h2 className="text-2xl font-bold">{pesanan.jenisMotor}</h2>
              <div className="flex gap-4 text-lg mt-2 font-bold">
                <span>🛵 {pesanan.transmisi}</span>
                <span>⚙️ {pesanan.cc}</span>
                <span>🪪 {pesanan.nopol}</span>
              </div>
            </div>
          </div>

          {/* Durasi Sewa */}
          <Card className="rounded-lg px-2 my-4">
            <CardContent>
              <p className="flex justify-between text-lg font-semibold">
                <span>Rental Duration</span>
                <span style={{ color: "#468BF2" }}>
                  {rentalPeriod.days} Day(s)
                </span>
              </p>
              <hr className="my-3 border-gray-300" />
              <p className="flex justify-between text-gray-500 font-medium">
                <span>{rentalPeriod.start}</span>
                <span>{rentalPeriod.end}</span>
              </p>
            </CardContent>
          </Card>

          {/* Harga */}
          <Card className="rounded-lg px-2">
            <CardContent>
              <h1 className="text-xl font-semibold">Price Details</h1>
              <hr className="my-3 border-gray-300" />
              <p className="flex justify-between text-gray-500 font-semibold">
                <span>Basic Rental</span>
                <span>Rp {pesanan.basicBiaya.toLocaleString()}</span>
              </p>
              <p className="flex justify-between text-gray-500 font-semibold">
                <span>Pick-up in other location</span>
                <span>Rp {pesanan.pickupBiaya.toLocaleString()}</span>
              </p>
              <p className="flex justify-between text-gray-500 font-semibold">
                <span>Taxes & fees</span>
                <span>Rp {pesanan.taxBiaya.toLocaleString()}</span>
              </p>
              <p className="flex justify-between text-gray-500 font-semibold">
                <span>Promo used (RENTQUE)</span>
                <span className="text-green-600">
                  - Rp {pesanan.taxBiaya.toLocaleString()}
                </span>
              </p>
              <hr className="my-3 border-gray-300" />
              <p className="flex justify-between text-lg font-bold text-blue-600">
                <span>Total Price</span>
                <span>Rp {pesanan.totalBiaya.toLocaleString()}</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Metode Pembayaran */}
        <Card className="rounded-lg px-2">
          <CardContent>
            <h1 className="text-xl font-semibold">Choose Payment Method</h1>
            <hr className="my-3 border-gray-300" />
            <Radio
              options={options}
              selected={selected}
              onChange={setSelected}
            />
            <Link
              href={`/pembayaran/${selected}?id=${id}`}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-center block"
            >
              Bayar
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
