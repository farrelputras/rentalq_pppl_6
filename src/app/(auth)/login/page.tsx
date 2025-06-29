"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login gagal");
      }

      // Simpan data user/admin ke localStorage
      const data = result.data;
      if (result.role === "admin") {
        localStorage.setItem("role", "admin");
        localStorage.setItem("id", data.idAdmin);
        localStorage.setItem("username", data.username);
        localStorage.setItem("nama", data.nama);
        localStorage.setItem("email", data.email);
        localStorage.setItem("noTelp", data.noTelp || "");
        localStorage.setItem("fotoUser", data.fotoUser || "");
        router.push("/admin");
      } else {
        localStorage.setItem("role", "user");
        localStorage.setItem("id", data.idUser);
        localStorage.setItem("username", data.username);
        localStorage.setItem("nama", data.nama);
        localStorage.setItem("email", data.email);
        localStorage.setItem("noTelp", data.noTelp || "");
        localStorage.setItem("fotoUser", data.fotoUser || "");
        router.push("/home");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message || "Terjadi kesalahan saat login.");
      } else {
        setErrorMsg("Terjadi kesalahan saat login.");
      }
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left half */}
      <div className="w-1/2 bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Image
            src="/icons/rentalq-logo.svg"
            alt="RentalQ Logo"
            width={160}
            height={160}
          />
        </div>
      </div>

      {/* Right half */}
      <div className="w-1/2 bg-white rounded-l-[3rem] shadow-lg flex items-center justify-center p-10">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold text-blue-600 text-center">
            <b>Selamat Datang Kembali,</b>
          </h2>
          <p className="mt-2 text-gray-500 text-center">Log in sekarang untuk lanjut</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-m font-medium text-black"
              >
                <b>Email address</b>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-m font-medium text-black"
              >
                <b>Password</b>
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-5 text-black"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
            )}

            <div className="text-right">
              <a href="forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="cursor-pointer block w-full rounded-xl bg-blue-600 py-3 text-white font-medium text-center hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Belum memiliki akun?{" "}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              <b>Daftar di sini</b>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
