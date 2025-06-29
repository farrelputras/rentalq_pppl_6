'use client';

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    if (password.length < 6) {
      setErrorMsg("Password harus minimal 6 karakter.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, phone }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Registrasi gagal");
      router.push("/login");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan.");
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left half */}
      <div className="w-1/2 bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
        <Image
          src="/icons/rentalq-logo.svg"
          alt="RentalQ Logo"
          width={160}
          height={160}
        />
      </div>

      {/* Right half */}
      <div className="w-1/2 bg-white rounded-l-[3rem] shadow-lg flex items-center justify-center p-10">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold text-blue-600 text-center">
            <b>Selamat Datang di RentalQ!</b>
          </h2>
          <p className="mt-2 text-gray-500 text-center">
            Mohon untuk hanya memberikan informasi yang dibutuhkan
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-m font-medium text-black">
                <b>Username</b>
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Your username"
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-m font-medium text-black">
                <b>Email Address</b>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-m font-medium text-black">
                <b>Password</b>
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-5 text-black"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-m font-medium text-black">
                <b>Phone Number</b>
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Your phone number"
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Error message */}
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition"
            >
              Daftar
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Sudah punya akun?{" "}
            <a href="/login" className="font-medium text-blue-600 hover:underline">
              <b>Login</b>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
