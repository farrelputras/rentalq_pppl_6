"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";

export default function BayarQRIS() {
  const router = useRouter();

  return (
    // Card
    <Card className="w-full rounded-xl bg-white mt-10 ml-15 mr-15 mb-8 px-10">
      <CardContent>
        {/* Left Side */}
        <h1 className="text-2xl font-semibold mt-4 mb-8 text-black text-center">
          Please Scan the QR Code for Payment
        </h1>
        <div className="flex gap-8">
          <div className="flex flex-col items-center px-14">
            <Image
              src="/qris_header.png"
              alt="QRIS Header Static"
              width={300}
              height={1}
              className="mb-6"
            />
            <Image
              src="/qris.png"
              alt="QRIS Code Dynamic"
              width={360}
              height={360}
            />
            <p className="mt-4 text-black text-center">
              Payment will expire in <b>12 hours.</b>{" "}
            </p>
            <p>Please complete it before</p>
            <p className="mb-6">
              <b>22:00:00 17-04-2025</b>
            </p>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Price Details */}
            <Card className="shadow-md rounded-lg px-2">
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
                  <span style={{color: "#2EB938"}}>- Rp. 5.000</span>
                </p>
                <hr className="mt-3 mb-3 border-gray-300" />
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Total Price</span>
                  <span style={{color: "#468BF2"}}>Rp. 45.000</span>
                </p>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card className="shadow-md rounded-lg px-2">
              <CardContent>
                <h1 className="text-xl font-semibold">Payment Status</h1>
                <hr className="mt-3 mb-3 border-gray-300" />
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Created on</span>
                  <span>10:00:00 17-04-2025</span>
                </p>
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Expiry  </span>
                  <span>22:00:00 17-04-2025</span>
                </p>
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Taxes & fees</span>
                  <span>Rp. 0</span>
                </p>
                <p className="flex justify-between text-gray-500 font-semibold mb-1">
                  <span>Status</span>
                  <span style={{color: "#468BF2"}}>Ongoing</span>
                </p>
              </CardContent>
            </Card>

            {/* Button Upload & Back */}
            <div className="flex justify-end">
              <div className="flex flex-col sm:flex-row gap-4">
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
        </div>
      </CardContent>
    </Card>
  );
}
