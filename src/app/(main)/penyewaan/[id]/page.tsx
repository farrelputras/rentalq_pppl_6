"use client";

import Link from "next/link";
import { ArrowLeft, Wallet, Clock, FileText, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import SearchBar from "@/ui/SearchBar";

interface Motor {
  id: number;
  name: string;
  transmission: string;
  cc: number;
  nopol: string;
  price: number;
  image: string;
}

export default function DetailMotorPage() {
  const rentalPeriod = {
    start: "Thursday, 17 April 2025 10:00 WIB",
    end: "Sunday, 20 April 2025 10:00 WIB",
    days: 2,
  };

  const params = useParams();
  const id = params?.id;

  const [motor, setMotor] = useState<Motor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotor = async () => {
      try {
        const res = await fetch(`/api/motor?id=${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data motor");
        const data = await res.json();
        setMotor(data[0]); // Ambil elemen pertama dari array
      } catch (error) {
        console.error("Error fetching motor:", error);
        setMotor(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMotor();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!motor)
    return <div className="p-4 text-red-500">Motor tidak ditemukan.</div>;

  return (
    <main className="w-full mt-10 mx-15 p-4">
      <>
        <SearchBar />
      </>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Motor Info */}
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
          <div className="flex gap-4">
            <Image
              src={`/${motor.image}`}
              alt={motor.name}
              width={200}
              height={100}
            />
            <div>
              <h2 className="text-2xl font-bold">{motor.name}</h2>
              <div className="flex gap-4 text-lg mt-2 text-black font-bold">
                <span>🛵 {motor.transmission}</span>
                <span>⚙️ {motor.cc}</span>
                <span>🪪 {motor.nopol}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Anti Theft Alarm", "12L Baggages", "LED Headlights"].map(
                  (feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-600 text-white font-bold py-1.5 px-4 rounded-full"
                    >
                      {feature}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Rental Policy */}
          <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              Rental Policy
            </h3>
            <ul className="text-sm list-disc list-inside text-gray-700">
              <li>Batas waktu penggunaan maksimal 24 jam per hari sewa</li>
              <li>
                Penggunaan dibatasi hanya dalam kota. Jika digunakan di luar
                kota, biaya tambahan akan dikenakan
              </li>
              <li>Kembalikan bahan bakar sesuai dengan saat diterima</li>
            </ul>
          </div>

          {/* Important Info */}
          <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="w-6 h-6 text-yellow-500" />
              Important Information
            </h3>
            <ul className="text-sm mb-1 list-disc list-inside text-black">
              <strong>Sebelum memesan:</strong>
              <li className="text-gray-700">
                Pastikan Anda sudah membaca semua kebutuhan untuk menyewa.
              </li>
              <strong>Setelah memesan:</strong>
              <li className="text-gray-700">
                Pihak{" "}
                <span className="text-blue-500 font-semibold">RentalQ</span>{" "}
                akan mengontak penyewa melalui nomor yang dicantumkan untuk
                verifikasi.
              </li>
            </ul>
          </div>
        </div>

        {/* Rental Summary */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
            <Clock className="w-8 h-6 text-blue-700" />
            Rental Duration
          </h3>
          <div className="text-lg text-gray-700">
            <p>
              Start:{" "}
              <span className="text-blue-600 font-medium">
                {rentalPeriod.start}
              </span>
            </p>
            <p>
              End:{" "}
              <span className="text-blue-600 font-medium">
                {rentalPeriod.end}
              </span>
            </p>
            <p className="mt-1">
              Duration:{" "}
              <span className="font-semibold">{rentalPeriod.days} Day(s)</span>
            </p>
          </div>

          <hr className="my-4" />

          <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
            <Wallet className="w-8 h-6 text-blue-600" />
            Price Details
          </h3>
          <div className="text-md text-gray-700 space-y-1">
            <p className="flex justify-between">
              <span>Basic Rental:</span>
              <span>Rp {motor.price.toLocaleString()}</span>
            </p>
            <p className="flex justify-between">
              <span>Pick-up in other location:</span>
              <span>Rp0</span>
            </p>
            <p className="flex justify-between">
              <span>Taxes & Fees:</span>
              <span>Rp0</span>
            </p>
            <p className="font-semibold">Total Price: </p>
            <p className="text-lg font-bold mt-2 text-blue-600">
              Rp {motor.price.toLocaleString()}
            </p>
          </div>

          <Link
            href={`/pembayaran/${id}`}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-center block"
          >
            Pesan
          </Link>
        </div>
      </div>
    </main>
  );
}
