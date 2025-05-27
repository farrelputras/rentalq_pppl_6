"use client";

import Link from "next/link";
import { ArrowLeft, Wallet, Clock, FileText, Info } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import motorList from "@/app/data/motorlist"; // pastikan path-nya sesuai struktur project kamu

const RentalDetailPage = () => {
  const { id } = useParams();

  const motor = motorList.find((m) => m.id === id);

  if (!motor) {
    return (
      <main className="p-6 max-w-3xl mx-auto text-center">
        <h1 className="text-xl font-semibold text-red-600">Motor tidak ditemukan</h1>
        <p className="text-gray-600 mt-2">Pastikan URL sudah benar atau pilih motor lain.</p>
      </main>
    );
  }

  const rentalPeriod = {
    start: "Thursday, 17 April 2025 10:00 WIB",
    end: "Sunday, 20 April 2025 10:00 WIB",
    days: 2,
  };

  const price = {
    basic: parseInt(motor.price.replace(/[^\d]/g, ""), 10),
    total: parseInt(motor.price.replace(/[^\d]/g, ""), 10), // sementara, belum dihitung per hari
  };

  return (
    <main className="p-6 max-w-screen mx-3">
        <div className="flex items-center gap-4 mb-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            {/* Tombol back */}
            <Link href="/penyewaan" className="text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-6 h-6" />
            </Link>

            {/* Judul dan tanggal */}
            <div>
            <h1 className="text-xl font-semibold">Rental Motor</h1>
            <p className="text-sm text-gray-600">{rentalPeriod.start} - {rentalPeriod.end}</p>
            </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Motor Info */}
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
          <div className="flex gap-4">
            <Image src={motor.image} alt={motor.name} width={200} height={100} />
            <div>
              <h2 className="text-2xl font-bold">{motor.name}</h2>
              <div className="flex gap-4 text-lg mt-2 text-black font-bold">
                <span>🛵 {motor.transmission}</span>
                <span>⚙️ {motor.cc}</span>
                <span>🪑 {motor.seats}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Anti Theft Alarm", "12L Baggages", "LED Headlights"].map((feature, idx) => (
                  <span key={idx} className="text-xs bg-blue-600 text-white font-bold py-1.5 px-4 rounded-full">
                    {feature}
                  </span>
                ))}
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
              <li>Penggunaan dibatasi hanya dalam kota. Jika digunakan di luar kota, biaya tambahan akan dikenakan</li>
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
                    Pihak <span className="text-blue-500 font-semibold">RentalQ</span> akan mengontak penyewa melalui nomor yang dicantumkan untuk verifikasi.
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
            <p>Start: <span className="text-blue-600 font-medium">{rentalPeriod.start}</span></p>
            <p>End: <span className="text-blue-600 font-medium">{rentalPeriod.end}</span></p>
            <p className="mt-1">Duration: <span className="font-semibold">{rentalPeriod.days} Day(s)</span></p>
          </div>

          <hr className="my-4" />

          <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
            <Wallet className="w-8 h-6 text-blue-600" />
            Price Details
          </h3>
          <div className="text-md text-gray-700 space-y-1">
            <p className="flex justify-between">
                <span>Basic Rental:</span>
                <span>Rp{price.basic.toLocaleString()}</span>
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
            <p className="text-lg font-bold mt-2 text-blue-600">Rp{price.total.toLocaleString()}</p>
          </div>

          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Pesan
          </button>
        </div>
      </div>
    </main>
  );
};

export default RentalDetailPage;
