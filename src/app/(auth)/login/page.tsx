'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Login gagal')
      }

      // Jika berhasil, redirect ke /home
      router.push('/home')
    } catch (err: any) {
      // Beri tipe 'any' pada err agar tidak dianggap unknown
      setErrorMsg(err.message || 'Terjadi kesalahan saat login.')
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left half */}
      <div className="w-1/2 bg-gradient-to-b from-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Image src="/rentalq-icon.svg" alt="RentalQ Logo" width={160} height={160} />
        </div>
      </div>

      {/* Right half */}
      <div className="w-1/2 bg-white rounded-l-[3rem] shadow-lg flex items-center justify-center p-10">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold text-blue-600">Selamat Datang Kembali,</h2>
          <p className="mt-2 text-gray-500">Log in sekarang untuk lanjut</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 text-gray-500"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>

            {/* Tampilkan error jika ada */}
            {errorMsg && (
              <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="cursor-pointer block w-full rounded-full bg-blue-600 py-3 text-white font-medium text-center hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Belum memiliki akun?{' '}
            <a href="/register" className="font-medium text-blue-600 hover:underline">
              Daftar di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}