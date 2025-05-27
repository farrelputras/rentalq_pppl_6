"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";

export default function BayarTransfer() {
  const router = useRouter();

  return (
    // Card
    <Card className="w-full max-w rounded-xl bg-white mt-10 ml-15 mr-15 mb-8 px-10">
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
                  <h1 className="text-lg font-medium">PT. RentalQ Indonesia</h1>
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
                  <span>Rp. 50.000</span>
                </p>
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Pick-up in other location</span>
                  <span>Rp. 0</span>
                </p>
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Taxes & fees</span>
                  <span>Rp. 0</span>
                </p>
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Promo used (CODE: RENTQUE)</span>
                  <span style={{ color: "#2EB938" }}>- Rp. 5.000</span>
                </p>
                <hr className="mt-3 mb-3 border-gray-300" />
                <p className="flex justify-between text-gray-500 text-lg font-bold mb-1">
                  <span>Total Price</span>
                  <span style={{ color: "#468BF2" }}>Rp. 45.000</span>
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
                <span style={{ color: "#468BF2" }}>Ongoing</span>
              </p>
            </CardContent>
          </Card>

          {/* Button Upload & Back */}
          <div className="flex justify-end">
            <div className="flex flex-col sm:flex-row mt-4 gap-4">
              <Button
                className="w-full sm:w-auto text-white font-bold cursor-pointer"
                style={{ backgroundColor: "#00AA5B" }}
              >
                Upload Bukti Pembayaran
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
  );
}
