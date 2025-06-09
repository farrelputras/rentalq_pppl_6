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

export default function BayarTransfer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [pesanan, setPesanan] = useState<Pesanan | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Ongoing");

  useEffect(() => {
    const fetchPesanan = async () => {
      try {
        const res = await fetch(`/api/pesanan?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch pesanan");
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

  if (loading) return <div className="p-4">Loading...</div>;
  if (!pesanan)
    return <div className="p-4 text-red-500">Pesanan tidak ditemukan.</div>;

  return (
    <div className="relative">
      {isUploading && (
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.8)] z-[9999] flex items-center justify-center mt-10 w-full mx-auto mb-8 rounded-xl">
          <p className="text-xl font-semibold text-gray-700 animate-pulse">
            Uploading...
          </p>
        </div>
      )}
      {/* Card */}
      <Card className="w-full rounded-xl bg-white mt-10 w-full mx-auto mb-8 px-10">
        <CardContent>
          <h1 className="text-2xl font-semibold mt-4 mb-8 text-black text-center">
            Please Transfer to the Bank Account Number Below
          </h1>
          {/* Left Side */}
          <div className="grid grid-cols-1 md:grid-cols-[4fr_11fr] gap-8">
            <Card className="rounded-lg px-2">
              <CardContent>
                <h1 className="text-xl font-semibold">Transfer to:</h1>
                <hr className="mt-3 mb-3 border-gray-300" />
                <div className="flex gap-2 items-center mb-2">
                  <Image
                    src="/bank_logo.png"
                    alt="Logo Bank"
                    width={80}
                    height={80}
                  />
                  <div>
                    <h1 className="text-xl font-semibold">Piggy Bank</h1>
                    <h1 className="text-lg font-medium">
                      PT. RentalQ Indonesia
                    </h1>
                  </div>
                </div>
                <p className="text-gray-500 font-semibold mb-0.5">
                  Bank Account Number
                </p>
                <h1 className="text-xl font-semibold">127836189231893719</h1>
              </CardContent>
            </Card>

            {/* Right Side */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Price Details */}
              <Card className="rounded-lg px-2">
                <CardContent>
                  <h1 className="text-xl font-semibold">Price Details</h1>
                  <hr className="mt-3 mb-3 border-gray-300" />
                  <p className="flex justify-between text-gray-500 font-semibold mb-1">
                    <span>Basic Rental</span>
                    <span>Rp {pesanan.basicBiaya.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between text-gray-500 font-semibold mb-1">
                    <span>Pick-up in other location</span>
                    <span>Rp {pesanan.pickupBiaya.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between text-gray-500 font-semibold mb-1">
                    <span>Taxes & fees</span>
                    <span>Rp {pesanan.taxBiaya.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between text-gray-500 font-semibold mb-1">
                    <span>Promo used (CODE: RENTQUE)</span>
                    <span className="text-green-600">
                      - Rp {pesanan.promo.toLocaleString()}
                    </span>
                  </p>
                  <hr className="mt-3 mb-3 border-gray-300" />
                  <p className="flex justify-between text-gray-500 text-lg font-bold mb-1">
                    <span>Total Price</span>
                    <span className="text-blue-600">
                      Rp {pesanan.totalBiaya.toLocaleString()}
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <Card className="rounded-lg mt-6 px-2">
              <CardContent>
                <h1 className="text-xl font-semibold">Payment Status</h1>
                <hr className="mt-3 mb-3 border-gray-300" />
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Created on</span>
                  <span>10:00:00 17-04-2025</span>
                </p>
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Expiry </span>
                  <span>22:00:00 17-04-2025</span>
                </p>
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Taxes & fees</span>
                  <span>Rp. 0</span>
                </p>
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Status</span>
                  <span
                    className={
                      paymentStatus === "Finished"
                        ? "text-green-600 font-bold"
                        : "text-blue-600 font-semibold"
                    }
                  >
                    {paymentStatus}
                  </span>
                </p>
              </CardContent>
            </Card>

            {/* Button Upload & Back */}
            <div className="flex justify-end">
              <div className="flex flex-col sm:flex-row mt-4 gap-4">
                <Button
                  className="w-full sm:w-auto text-white font-bold cursor-pointer"
                  style={{ backgroundColor: "#00AA5B" }}
                  disabled={isUploading}
                  onClick={() => {
                    setIsUploading(true);
                    setTimeout(() => {
                      setPaymentStatus("Finished");
                      setIsUploading(false);
                    }, 3000);
                  }}
                >
                  {isUploading ? "Uploading..." : "Upload Bukti Pembayaran"}
                </Button>

                <Link href="/penyewaan">
                  <Button
                    className="w-full sm:w-auto text-white font-bold cursor-pointer"
                    style={{ backgroundColor: "#468BF2" }}
                    onClick={() => {
                      router.push("/penyewaan");
                    }}
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
