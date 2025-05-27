"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { useParams } from "next/navigation";
import motorList from "@/app/data/motorlist"; // ← import dari file eksternal
import { FileText, Info } from "lucide-react";
import { Card, CardContent } from "@/components/Card";
import Radio from "@/components/Radio";
import { Button } from "@/components/Button"

const OrderDetailPage = () => {
  const { id } = useParams();

  const motor = motorList.find((m) => m.id === id);

  const [selected, setSelected] = useState("qris");

  if (!motor) {
    return (
      <main className="p-6 max-w-3xl mx-auto text-center">
        <h1 className="text-xl font-semibold text-red-600">
          Motor tidak ditemukan
        </h1>
        <p className="text-gray-600 mt-2">
          Pastikan URL sudah benar atau pilih motor lain.
        </p>
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

  const options = [
    {
      label: "QRIS",
      value: "qris",
      icon: "/qris_icon.svg", // update to your actual image path
    },
    {
      label: "Bank Transfer",
      value: "transfer",
      icon: "/transfer_icon.svg", // update to your actual image path
    },
  ];

  return (
    <main className="w-full mt-10 mx-15 p-4">
      <>
        <SearchBar />
      </>

      {/* Info Order */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Motor Info */}
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
          <div className="flex gap-4">
            <Image
              src={motor.image}
              alt={motor.name}
              width={200}
              height={100}
            />
            <div>
              <h2 className="text-2xl font-bold">{motor.name}</h2>
              <div className="flex gap-4 text-lg mt-2 text-black font-bold">
                <span>🛵 {motor.transmission}</span>
                <span>⚙️ {motor.cc}</span>
                <span>🪑 {motor.seats}</span>
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

          {/* Rental Duration */}
          <Card className="rounded-lg px-2 my-4">
            <CardContent>
              <p className="flex justify-between">
                <span className="text-lg font-semibold">Rental Duration</span>
                <span className="font-medium" style={{ color: "#468BF2" }}>
                  2 Day(s)
                </span>
              </p>
              <hr className="mt-3 mb-3 border-gray-300" />
              <p className="flex justify-between text-gray-500 font-bold mb-2">
                <span>Start</span>
                <span>End</span>
              </p>
              <p className="flex justify-between text-gray-500 font-medium mb-0.5">
                <span>Thursday, 17 April 2025</span>
                <span>Sunday, 20 April 2025</span>
              </p>
              <p
                className="flex justify-between text-lg font-bold mb-1"
                style={{ color: "#468BF2" }}
              >
                <span>10:00 WIB</span>
                <span>10:00 WIB</span>
              </p>
            </CardContent>
          </Card>

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

      {/* Payment Method */}
        <Card className="rounded-lg px-2">
          <CardContent>
            <h1 className="text-xl font-semibold">Choose Payment Method</h1>
              <hr className="mt-3 mb-3 border-gray-300" />
              <Radio options={options} selected={selected} onChange={setSelected} />
              <Button className="w-full mt-4">
                Pesan
              </Button>
          </CardContent>
        </Card>

      </div>

    </main>
  );
};

export default OrderDetailPage;
