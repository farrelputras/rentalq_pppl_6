'use client'

import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface UserData {
  username: string
  nama: string
  email: string
  noTelp: string
  fotoUser: string
  role: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [avatar, setAvatar] = useState<string>('')
  const [showNameModal, setShowNameModal] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [email, setEmail] = useState('')

  const [successUsername, setSuccessUsername] = useState('')
  const [successPhone, setSuccessPhone] = useState('')
  const [successAvatar, setSuccessAvatar] = useState('')

  useEffect(() => {
    const stored: UserData = {
      username: localStorage.getItem('username') || '',
      nama: localStorage.getItem('nama') || '',
      email: localStorage.getItem('email') || '',
      noTelp: localStorage.getItem('noTelp') || '',
      fotoUser: localStorage.getItem('fotoUser') || '/Cynthia_PP.png',
      role: localStorage.getItem('role') || '',
    }
    setAvatar(stored.fotoUser)
    setNewUsername(stored.username)
    setNewPhone(stored.noTelp)
    setEmail(stored.email)
  }, [])

  async function updateUsername() {
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newUsername }),
    })
    if (res.ok) {
      localStorage.setItem('username', newUsername)
      setSuccessUsername('Perubahan berhasil disimpan.')
      setTimeout(() => setSuccessUsername(''), 3000)
      setShowNameModal(false)
    } else {
      const err = await res.json()
      alert(err.message || 'Gagal update username')
    }
  }

  async function updatePhone() {
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPhone }),
    })
    if (res.ok) {
      localStorage.setItem('noTelp', newPhone)
      setSuccessPhone('Perubahan berhasil disimpan.')
      setTimeout(() => setSuccessPhone(''), 3000)
      setShowPhoneModal(false)
    } else {
      const err = await res.json()
      alert(err.message || 'Gagal update no telepon')
    }
  }

  async function updateAvatar(file: File) {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('avatar', file)
    const res = await fetch('/api/profile', {
      method: 'POST',
      body: formData,
    })
    if (res.ok) {
      const data = await res.json()
      if (data.photo) {
        setAvatar(data.photo)
        localStorage.setItem('fotoUser', data.photo)
        setSuccessAvatar('Perubahan berhasil disimpan.')
        setTimeout(() => setSuccessAvatar(''), 3000)
      }
    } else {
      alert('Gagal update foto')
    }
  }

  function handleNameSubmit(e: FormEvent) {
    e.preventDefault()
    updateUsername()
  }

  function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault()
    updatePhone()
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatar(URL.createObjectURL(file))
    updateAvatar(file)
  }

  function handleLogOutConfirm() {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Avatar Upload */}
          <div className="bg-white rounded-xl shadow p-6 w-full md:w-1/3 flex flex-col items-center">
            <div className="w-40 h-40 mb-4 rounded-full border-4 border-blue-800 overflow-hidden">
              <Image
                src={avatar}
                alt="avatar"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              id="avatar-upload"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => document.getElementById('avatar-upload')?.click()}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Pilih Foto
            </button>
            {successAvatar && (
              <p className="text-green-600 text-sm mt-2">{successAvatar}</p>
            )}
            <p className="mt-2 text-xs text-gray-500 text-center">
              Besar file: Max. 10.000.000 bytes (10 Megabytes).<br />
              Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
            </p>
          </div>

          {/* Profile Info */}
          <div className="bg-gray-100 rounded-xl p-6 flex-1 mt-6 md:mt-0 relative">
            <div className="inline-block bg-blue-600 text-white px-6 py-1 rounded-r-full">
              <h2 className="text-lg font-semibold">Profile</h2>
            </div>
            <div className="mt-6 space-y-5">
              {/* Username */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500">Username</p>
                  <p className="font-medium">{newUsername}</p>
                  {successUsername && (
                    <p className="text-green-600 text-sm mt-1">
                      {successUsername}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowNameModal(true)}
                  className="text-green-500 hover:underline"
                >
                  Change
                </button>
              </div>
              {/* Password */}
              <div>
                <p className="text-gray-500">Password</p>
                <p className="font-medium">****************</p>
              </div>
              {/* Email */}
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{email}</p>
              </div>
              {/* Phone */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500">Phone Number</p>
                  <p className="font-medium">{newPhone}</p>
                  {successPhone && (
                    <p className="text-green-600 text-sm mt-1">
                      {successPhone}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowPhoneModal(true)}
                  className="text-green-500 hover:underline"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Log Out */}
        <div className="text-center">
          <button
            onClick={() => setShowLogOutModal(true)}
            className="bg-red-500 text-white px-8 py-2 rounded-full hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>

        {/* Modal Username */}
        {showNameModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <h3 className="text-xl font-semibold mb-4">Edit Username</h3>
              <hr />
              <form onSubmit={handleNameSubmit} className="mt-4 space-y-4">
                <div>
                  <p className="text-gray-500">New Username</p>
                </div>
                <input
                  type="text"
                  value={newUsername}
                  onChange={e => setNewUsername(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowNameModal(false)}
                    className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Phone */}
        {showPhoneModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <h3 className="text-xl font-semibold mb-4">Edit Phone Number</h3>
              <hr />
              <form onSubmit={handlePhoneSubmit} className="mt-4 space-y-4">
                <div>
                  <p className="text-gray-500">New Phone Number</p>
                </div>
                <input
                  type="text"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowPhoneModal(false)}
                    className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Logout */}
        {showLogOutModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Confirm Log Out</h3>
              <hr />
              <p className="mt-4 text-gray-700">Are you sure you want to log out?</p>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowLogOutModal(false)}
                  className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLogOutConfirm}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}