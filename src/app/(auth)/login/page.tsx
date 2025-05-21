'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Left half */}
      <div className="w-1/2 bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Image src="/rentalq-icon.svg" alt="RentalQ Logo" width={160} height={160} />
        </div>
      </div>

      {/* Right half — langsung jadi card */}
      <div className="w-1/2 bg-white rounded-l-[3rem] shadow-lg flex items-center justify-center p-10">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold text-blue-600">Selamat Datang Kembali,</h2>
          <p className="mt-2 text-gray-500">Log in sekarang untuk lanjut</p>

          <form className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Your email address"
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Your password"
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Belum memiliki akun?{' '}
            <a href="/register" className="font-medium text-blue-600 hover:underline">
              Daftar disini
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}