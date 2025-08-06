"use client";

import Link from "next/link";
import { Wallet, FileText, Info } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
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
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id;
  const idPencarian = searchParams.get("idPencarian");

  const [motor, setMotor] = useState<Motor | null>(null);
  const [loading, setLoading] = useState(true);

  const [rentalPeriod, setRentalPeriod] = useState<{
    startLabel: string;
    endLabel: string;
    duration: number;
    waktuAmbil: string;
    waktuKembali: string;
  } | null>(null);

  useEffect(() => {
    const fetchMotor = async () => {
      try {
        const res = await fetch(`/api/motor?id=${id}`);
        const data = await res.json();
        setMotor(data[0]);
      } catch (error) {
        console.error("Error fetching motor:", error);
        setMotor(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMotor();
  }, [id]);

  useEffect(() => {
    const fetchPencarian = async () => {
      if (!idPencarian) return;

      try {
        const res = await fetch(`/api/pencarian?id=${idPencarian}`);
        const data = await res.json();

        const start = new Date(data.waktuAmbil.replace(" ", "T"));
        const end = new Date(data.waktuKembali.replace(" ", "T"));

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          console.error("Format waktu tidak valid");
          return;
        }

        const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        const waktuAmbil = data.waktuAmbil;
        const waktuKembali = data.waktuKembali;

        const startLabel = start.toLocaleString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const endLabel = end.toLocaleString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        setRentalPeriod({ startLabel, endLabel, duration, waktuAmbil, waktuKembali });
      } catch (err) {
        console.error("Error fetching pencarian:", err);
      }
    };

    fetchPencarian();
  }, [idPencarian]);

  const handlePesan = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!motor || !rentalPeriod) return;

    const toMySQLDateTime = (date: Date) => {
      const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return local.toISOString().slice(0, 19).replace("T", " ");
    };

    const waktuAmbil = toMySQLDateTime(new Date(rentalPeriod.waktuAmbil.replace(" ", "T")));
    const waktuKembali = toMySQLDateTime(new Date(rentalPeriod.waktuKembali.replace(" ", "T")));

    const payload = {
      idKendaraan: motor.id,
      idUser: 1,
      idBayar: 1,
      waktuAmbil,
      waktuKembali,
      basicBiaya: motor.price * rentalPeriod.duration,
      pickupBiaya: 0,
      taxBiaya: 0,
      promo: 0,
      totalBiaya: motor.price * rentalPeriod.duration,
    };

    try {
      const res = await fetch("/api/pesanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/pembayaran/${data.insertedId}?idPencarian=${idPencarian}`);
      } else {
        alert("Gagal membuat pesanan");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!motor) return <div className="p-4 text-red-500">Motor tidak ditemukan.</div>;

  return (
    <main className="w-full mt-10 mx-15 p-4">
      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
          <div className="flex gap-4">
            <Image src={`/${motor.image}`} alt={motor.name} width={200} height={100} />
            <div>
              <h2 className="text-2xl font-bold">{motor.name}</h2>
              <div className="flex gap-4 text-lg mt-2 text-black font-bold">
                <span>🛵 {motor.transmission}</span>
                <span>⚙️ {motor.cc}</span>
                <span>🪪 {motor.nopol}</span>
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

          <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" /> Rental Policy
            </h3>
            <ul className="text-sm list-disc list-inside text-gray-700">
              <li>Batas waktu penggunaan maksimal 24 jam per hari sewa</li>
              <li>Penggunaan dibatasi hanya dalam kota</li>
              <li>Kembalikan bahan bakar sesuai dengan saat diterima</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="w-6 h-6 text-yellow-500" /> Important Information
            </h3>
            <ul className="text-sm mb-1 list-disc list-inside text-black">
              <strong>Sebelum memesan:</strong>
              <li className="text-gray-700">Pastikan Anda sudah membaca semua kebutuhan untuk menyewa.</li>
              <strong>Setelah memesan:</strong>
              <li className="text-gray-700">
                Pihak <span className="text-blue-500 font-semibold">RentalQ</span> akan menghubungi Anda untuk verifikasi.
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
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
              Rp {(motor.price * (rentalPeriod?.duration || 1)).toLocaleString()}
            </p>
          </div>

          <Link
            href=""
            onClick={handlePesan}
            ref={linkRef}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-center block"
          >
            Pesan
          </Link>
        </div>
      </div>
    </main>
  );
}
