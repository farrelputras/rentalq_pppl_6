'use client';
import { useState } from 'react';

interface Booking {
  id: number;
  tanggalSewa: string;
  tanggalKembali: string;
  startTime: string;
  endTime: string;
  jenisMotor: string;
  status: 'Selesai' | 'Dibatalkan' | 'Diproses';
  gambar: string;
  inv: string;
  total: string;
}

const dummyBookings: Booking[] = [
  {
    id: 1,
    tanggalSewa: 'Thursday, 17 April 2025',
    tanggalKembali: 'Sunday, 20 April 2025',
    startTime: '10:00 WIB',
    endTime: '10:00 WIB',
    jenisMotor: 'Honda BeAT All New 2025',
    status: 'Selesai',
    gambar: '/Honda_Beat_All_New_2025.png',
    inv: 'INV/20250417/HBAN/846191238564',
    total: 'Rp45.000',
  }
];

export default function RiwayatPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'Semua' | 'Selesai' | 'Dibatalkan' | 'Diproses'>('Semua');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = dummyBookings.filter((b) =>
    (filterStatus === 'Semua' || b.status === filterStatus) &&
    b.jenisMotor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 font-[Poppins] min-h-screen w-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4 rounded-xl mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Rental Motor</h2>
          <p className="text-sm text-gray-500">
            Thu, 17 April 2025, 10:00 WIB - Sun, 20 April 2025, 10:00 WIB
          </p>
        </div>
        <button className="flex items-center gap-2 text-[#468BF2] text-sm font-medium border border-[#468BF2] px-3 py-1 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          Change Search
        </button>
      </div>

      {/* Filter Tab */}
      <div className="flex items-center gap-3 pl-2 mb-6">
        <span className="text-sm font-medium text-gray-600">Status:</span>
        {[
          { label: 'All', value: 'Semua' },
          { label: 'Ongoing', value: 'Diproses' },
          { label: 'Finished', value: 'Selesai' },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilterStatus(value as any)}
            className={`px-4 py-1 rounded-full border text-sm transition ${
              filterStatus === value
                ? 'bg-[#468BF2] text-white font-semibold'
                : 'bg-white text-gray-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Booking List */}
      <div className="grid gap-4">
        {filteredBookings.map((b) => (
          <div key={b.id} className="bg-white rounded-xl border shadow-sm p-4 flex items-center justify-between gap-4">
            <img src={b.gambar} alt={b.jenisMotor} className="w-28 h-20 object-cover rounded-lg" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  b.status === 'Selesai' ? 'bg-green-200 text-green-800'
                  : b.status === 'Diproses' ? 'bg-[#468BF2] text-white'
                  : 'bg-red-100 text-red-700'
                }`}>{b.status}</span>
                <span className="text-xs text-gray-500">{b.inv}</span>
              </div>
              <h3 className="text-base font-semibold">{b.jenisMotor}</h3>
              <div className="flex text-sm text-gray-500 mt-2 gap-30">
                <div className="min-w-[150px]">
                  <p className="text-xs">Start</p>
                  <p>{b.tanggalSewa}</p>
                  <p className="text-blue-600 font-semibold">{b.startTime}</p>
                </div>
                <div className="min-w-[150px]">
                  <p className="text-xs">End</p>
                  <p>{b.tanggalKembali}</p>
                  <p className="text-blue-600 font-semibold">{b.endTime}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end min-w-[160px] h-full">
              <div className="mb-6">
                <p className="text-s text-gray-400 text-right">Total</p>
                <p className="text-blue-600 text-xl font-bold">{b.total}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedBooking(b)}
                  className="text-[#468BF2] text-base font-semibold px-4 py-2 rounded-md border border-[#468BF2]"
                >
                  Details
                </button>
                <button className="bg-[#468BF2] text-white text-base font-semibold px-5 py-2 rounded-md">
                  Order Lagi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl w-full max-w-xl overflow-hidden">
            {/* Header Biru */}
            <div className="bg-[#468BF2] flex justify-between items-center px-6 py-3">
              <h2 className="text-white font-semibold text-base">Detail Transaksi</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-white text-xl font-bold hover:opacity-80"
              >
                ×
              </button>
            </div>

            {/* Konten */}
            <div className="p-6 space-y-6">
              {/* Pesanan Selesai */}
              <div>
                <h2 className="text-green-600 font-semibold text-base mb-2">Pesanan Selesai</h2>
                <hr className="mb-3" />
                <div className="grid grid-cols-2 text-sm">
                  <p className="text-gray-500">Nomor Pesanan</p>
                  <p className="text-green-600 font-medium text-right">{selectedBooking.inv}</p>
                  <p className="text-gray-500 mt-2">Tanggal & Waktu Pesanan</p>
                  <p className="text-right mt-2">
                    {selectedBooking.tanggalSewa}, {selectedBooking.startTime}
                  </p>
                </div>
              </div>

              {/* Detail Order */}
              <div>
                <h2 className="font-semibold text-base mb-2">Detail Order</h2>
                <hr className="mb-3" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={selectedBooking.gambar} alt={selectedBooking.jenisMotor} className="w-16 h-14 object-cover rounded-md" />
                    <div>
                      <h3 className="font-semibold text-sm">{selectedBooking.jenisMotor}</h3>
                      <p className="text-xs text-gray-500">1x Rp50.000</p>
                    </div>
                  </div>
                  <button className="bg-[#468BF2] text-white text-sm font-semibold px-4 py-1 rounded-md">Order Lagi</button>
                </div>
              </div>

              {/* Rincian Pembayaran */}
              <div>
                <h2 className="font-semibold text-base mb-2">Rincian Pembayaran</h2>
                <hr className="mb-3" />
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <p className="text-gray-500">Basic Rental</p>
                    <p className="text-gray-700">Rp50.000</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Pick-up in other location</p>
                    <p className="text-gray-700">Rp0</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Taxes & fees</p>
                    <p className="text-gray-700">Rp0</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">
                      Promo used <span className="font-semibold">(CODE: <span className="italic">RENTQUE</span>)</span>
                    </p>
                    <p className="text-green-600 font-medium">- Rp5.000</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="font-semibold text-sm">Total Price</p>
                    <p className="text-blue-600 font-bold">{selectedBooking.total}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
