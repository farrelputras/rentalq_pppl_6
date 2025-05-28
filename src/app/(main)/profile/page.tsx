'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string>('/Cynthia_PP.png')
  const [showNameModal, setShowNameModal] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const [newUsername, setNewUsername] = useState('Cynthia')
  const [newPhone, setNewPhone] = useState('+62 8279123718')

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatar(URL.createObjectURL(file))
  }

  function handleNameSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: implement rename logic
    setShowNameModal(false)
  }

  function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: implement phone update logic
    setShowPhoneModal(false)
  }

  function handleLogOutConfirm() {
    // TODO: implement logout logic
    setShowLogOutModal(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Avatar Upload Card */}
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
            <p className="mt-2 text-xs text-gray-500 text-center">
              Besar file: Max. 10.000.000 bytes (10 Megabytes).<br />
              Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
            </p>
          </div>

          {/* Profile Details Card */}
          <div className="bg-gray-100 rounded-xl p-6 flex-1 mt-6 md:mt-0 relative">
            <div className="inline-block bg-blue-600 text-white px-6 py-1 rounded-r-full">
              <h2 className="text-lg font-semibold">Profile</h2>
            </div>
            <div className="mt-6 space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Username</p>
                  <p className="font-medium">Cynthia</p>
                </div>
                <button
                  onClick={() => setShowNameModal(true)}
                  className="text-green-500 hover:underline"
                >
                  Change
                </button>
              </div>

              <div>
                <p className="text-gray-500">Password</p>
                <p className="font-medium">****************</p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">cynthiaarabella@gmail.com</p>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Phone Number</p>
                  <p className="font-medium">+62 8279123718</p>
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

        {/* Log Out Button */}
        <div className="text-center">
          <button
            onClick={() => setShowLogOutModal(true)}
            className="bg-red-500 text-white px-8 py-2 rounded-full hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>

        {/* Modals Placeholders */}
        {showNameModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <h3 className="text-xl font-semibold mb-4">Edit Username</h3>
              <hr />
              <form onSubmit={handleNameSubmit} className="mt-4 space-y-4">
                <div>
                  <p className="text-gray-500">Current Username</p>
                  <p className="font-medium">Cynthia</p>
                  <p className="text-gray-500">New Username</p>
                </div>
                <div>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={e => setNewUsername(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
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

        {showPhoneModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <h3 className="text-xl font-semibold mb-4">Edit Phone Number</h3>
              <hr />
              <form onSubmit={handlePhoneSubmit} className="mt-4 space-y-4">
                <div>
                  <p className="text-gray-500">Current Phone Number</p>
                  <p className="font-medium">+62 8279123718</p>
                  <p className="text-gray-500">New Phone Number</p>
                </div>
                <div>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
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

        {/* Log Out Confirmation Modal */}
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
