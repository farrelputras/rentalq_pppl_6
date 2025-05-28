"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center font-[Poppins]">
      {/* Logo */}
      <div className="absolute top-6 left-6 z-50 flex items-center">
        <Image
          src="/logo_nyamping_blue.svg"
          alt="RentalQ Logo"
          width={120}
          height={40}
        />
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="relative bg-black rounded-xl shadow-lg w-full max-w-3xl aspect-video">
            <video
              controls
              autoPlay
              className="w-full h-full rounded-xl"
              src="/intro1.mp4"
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Integrasi QRIS untuk kemudahan transaksi
          </h1>
          <p className="text-lg text-black-700 font-semibold mb-6">
            Cukup scan sekali untuk gerbang pembayaran seamless.
          </p>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="w-48 h-12 bg-blue-700 text-white rounded-md text-sm font-bold hover:bg-blue-800 transition flex items-center justify-center">
                Mulai Sewa
              </button>
            </Link>
            <button
              onClick={() => setShowVideo(true)}
              className="w-48 h-12 bg-blue-100 text-blue-900 rounded-md text-sm font-bold hover:bg-blue-200 transition flex items-center justify-center gap-2"
            >
              1 Minute to Know <span className="text-lg">➔</span>
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/onboard3.svg"
            alt="Traveler with luggage"
            width={700}
            height={700}
            className="w-full max-w-xl h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
