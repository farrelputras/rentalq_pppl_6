"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/ui/Card";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const waktuAmbil = `${pickupDate} ${pickupTime}`;
    const waktuKembali = `${returnDate} ${returnTime}`;

    if (
      isNaN(new Date(waktuAmbil).getTime()) ||
      isNaN(new Date(waktuKembali).getTime())
    ) {
      alert("Input waktu tidak valid");
      return;
    }

    const res = await fetch("/api/pencarian", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idUser: 1, waktuAmbil, waktuKembali }),
    });

    const data = await res.json();
    if (data.success) {
      router.push(`/penyewaan?idPencarian=${data.id}`);
    } else {
      alert("Gagal menyimpan pencarian");
    }
  };

  const testimonials = {
    Alka: "Bookingnya gampang, motor datang tepat waktu. Helm bersih, motor irit, dan ngga rewel. Worth it banget buat liburan singkat 👍👍",
    Dia: "Motor mulus, bensin full, pelayanan juga ramah banget. Enak dipake keliling kota, recommended lah",
    Lily: "Suka banget sama pelayanannya! Motornya bener-bener ngebantu explore tempat-tempat seru. Thank you~ 💕",
    Yere: "Mantul mantul mantap betul. Harga oke, motor siap jalan, staff-nya profesional. Pasti balik sewa di sini lagi😁👍",
  };

  return (
    <div className="px-4 py-8 min-h-screen">
      <div className="w-full mb-8">
        <Image
          src="/images/homepage/bannerhomepage.svg"
          alt="Banner Promo"
          width={1200}
          height={400}
          className="w-full rounded-2xl object-cover"
        />
      </div>

      <form
        className="bg-white p-6 rounded-xl shadow-md mb-6"
        onSubmit={handleSearch}
      >
        <div className="flex items-end gap-4 flex-wrap">
          {/* Input tanggal & waktu */}
          {[
            {
              label: "Tanggal Sewa",
              type: "date",
              value: pickupDate,
              onChange: setPickupDate,
            },
            {
              label: "Waktu Pengambilan (WIB)",
              type: "time",
              value: pickupTime,
              onChange: setPickupTime,
            },
            {
              label: "Tanggal Selesai Sewa",
              type: "date",
              value: returnDate,
              onChange: setReturnDate,
            },
            {
              label: "Waktu Pengembalian (WIB)",
              type: "time",
              value: returnTime,
              onChange: setReturnTime,
            },
          ].map((item, i) => (
            <div key={i} className="flex-1 min-w-[200px]">
              <label className="block mb-1 text-[#0C59B3] text-xs font-normal">
                {item.label}
              </label>
              <input
                type={item.type}
                value={item.value}
                onChange={(e) => item.onChange(e.target.value)}
                className="w-full h-12 px-3 rounded border border-gray-300 bg-white text-base outline-none"
              />
            </div>
          ))}

          {/* Button search */}
          <button
            type="submit"
            className="cursor-pointer flex-none w-12 h-12 rounded bg-blue-600 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 40 40"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M25.8337 23.3333H24.517L24.0504 22.8833C25.6837 20.9833 26.667 18.5167 26.667 15.8333C26.667 9.85 21.817 5 15.8337 5C9.85037 5 5.00037 9.85 5.00037 15.8333C5.00037 21.8167 9.85037 26.6667 15.8337 26.6667C18.517 26.6667 20.9837 25.6833 22.8837 24.05L23.3337 24.5167V25.8333L31.667 34.15L34.1504 31.6667L25.8337 23.3333ZM15.8337 23.3333C11.6837 23.3333 8.3337 19.9833 8.3337 15.8333C8.3337 11.6833 11.6837 8.33333 15.8337 8.33333C19.9837 8.33333 23.3337 11.6833 23.3337 15.8333C23.3337 19.9833 19.9837 23.3333 15.8337 23.3333Z" />
            </svg>
          </button>
        </div>
      </form>

      {/* Testimoni */}
      <div>
        <h2 className="mb-4 text-[#0C59B3] font-bold text-2xl">Apa Kata Mereka?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {(["Alka", "Dia", "Lily", "Yere"] as const).map((name) => (
            <Card
              key={name}
              className="text-center w-full max-w-[415px]"
              style={{
                height: "140px",
                borderRadius: "17px",
                background: "#468BF2",
                color: "white",
              }}
            >
              <div className="flex h-full items-center gap-4 p-3">
                <div className="flex flex-col items-center min-w-[100px]">
                  <Image
                    src={`/images/homepage/${name}-PP.svg`}
                    alt={name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <h4 className="mt-2 font-bold text-lg">{name}</h4>
                </div>
                <p className="flex-grow text-sm leading-relaxed text-justify">
                  {testimonials[name]}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center mt-6">
        <p className="text-[#0C59B3] font-semibold text-xl mr-2">
          Tunggu apalagi? Gunakan
        </p>
        <Image
          src="/icons/rentalq-logo-nyamping.svg"
          alt="RentalQ Logo"
          width={120}
          height={120}
          className="mr-2"
        />
        <p className="text-[#0C59B3] font-semibold text-xl">sekarang juga!</p>
      </div>
    </div>
  );
}
