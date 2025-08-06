"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { useEffect, useState } from "react";

interface Pesanan {
  id: number;
  basicBiaya: number;
  pickupBiaya: number;
  taxBiaya: number;
  promo: number;
  totalBiaya: number;
}

export default function BayarQRIS() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") ?? "";

  const [pesanan, setPesanan] = useState<Pesanan | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Ongoing");
  const [bukti, setBukti] = useState<File | null>(null);

  useEffect(() => {
    const fetchPesanan = async () => {
      try {
        const res = await fetch(`/api/pesanan?id=${id}`);
        const data = await res.json();
        setPesanan(data[0]);
      } catch (err) {
        console.error("Error fetching pesanan:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPesanan();
  }, [id]);

  const handleUpload = async () => {
    if (!bukti || !id) return alert("Pilih file bukti pembayaran terlebih dahulu.");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("bukti", bukti);
    formData.append("id", id);

    try {
      const res = await fetch("/api/pembayaran", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setPaymentStatus("Finished");
      } else {
        alert("Upload gagal: " + result.message);
      }
    } catch (err) {
      alert("Terjadi kesalahan saat upload.");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!pesanan) return <div className="p-4 text-red-500">Pesanan tidak ditemukan.</div>;

  return (
    <main className="mt-10 px-4">
      <Card className="w-full rounded-xl bg-white mx-auto p-6">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-6">QRIS Payment</h1>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
            <div className="flex flex-col items-center">
              <Image src="/qris_header.png" alt="QRIS Header" width={300} height={1} className="mb-4" />
              <Image src="/qris.png" alt="QRIS Code" width={300} height={300} />
              <p className="mt-4 text-center text-gray-700">Scan dan bayar sebelum</p>
              <p className="font-semibold">22:00 WIB - 17 April 2025</p>
            </div>

            <div className="space-y-4">
              <Card className="px-2">
                <CardContent>
                  <h2 className="text-xl font-semibold">Price Details</h2>
                  <hr className="my-3" />
                  <div className="text-gray-600 space-y-1">
                    <p className="flex justify-between"><span>Basic Rental</span> <span>Rp {pesanan.basicBiaya.toLocaleString()}</span></p>
                    <p className="flex justify-between"><span>Pickup Fee</span> <span>Rp {pesanan.pickupBiaya.toLocaleString()}</span></p>
                    <p className="flex justify-between"><span>Taxes & Fees</span> <span>Rp {pesanan.taxBiaya.toLocaleString()}</span></p>
                    <p className="flex justify-between text-green-600"><span>Promo</span> <span>- Rp {pesanan.promo.toLocaleString()}</span></p>
                    <hr className="my-2" />
                    <p className="flex justify-between font-bold text-blue-600"><span>Total</span> <span>Rp {pesanan.totalBiaya.toLocaleString()}</span></p>
                  </div>
                </CardContent>
              </Card>

              <Card className="px-2">
                <CardContent>
                  <h2 className="text-xl font-semibold">Payment Status</h2>
                  <hr className="my-3" />
                  <p className="flex justify-between mb-3">
                    <span>Status</span>
                    <span className={paymentStatus === "Finished" ? "text-green-600 font-bold" : "text-blue-600"}>{paymentStatus}</span>
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBukti(e.target.files?.[0] ?? null)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                      file:rounded-full file:border-0 file:text-sm file:font-semibold 
                      file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <Button
                  className="text-white font-bold"
                  style={{ backgroundColor: "#00AA5B" }}
                  disabled={isUploading}
                  onClick={handleUpload}
                >
                  {isUploading ? "Uploading..." : "Upload Bukti Pembayaran"}
                </Button>
                <Link href="/penyewaan">
                  <Button className="bg-blue-500 text-white font-bold">Back to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
