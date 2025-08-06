'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/ui/NavbarAdmin';

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pesanan')
      .then((res) => res.json())
      .then((res) => {
        console.log('RESPON API PESANAN:', res);
        setData(res);
      })
      .catch((err) => console.error('Failed to fetch pesanan', err))
      .finally(() => setLoading(false));
  }, []);

  const handleVerifikasi = async (id: number, valid: boolean) => {
    try {
      const res = await fetch('/api/verifikasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idPesanan: id, valid }),
      });

      const result = await res.json();
      if (result.success) {
        alert('Status berhasil diupdate');
        setData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: valid ? 'Dikonfirmasi' : 'Dibatalkan' } : item
          )
        );
      } else {
        alert('Gagal update status.');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat verifikasi.');
    }
  };

  const renderData = loading
    ? Array.from({ length: 5 }).map((_, i) => ({
        id: '...',
        tanggalSewa: '...',
        status: '...',
        customerName: '...',
        customerEmail: '...',
        metodeBayar: '...',
        statusBayar: null,
        buktiPembayaran: null,
      }))
    : data;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-6 mt-4">
        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Metode</th>
                <th className="px-6 py-4">Bukti</th>
                <th className="px-6 py-4">Valid</th>
              </tr>
            </thead>
            <tbody>
              {renderData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-3">{item.id}</td>
                  <td className="px-6 py-3">
                    {item.tanggalSewa !== '...'
                      ? new Date(item.tanggalSewa).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : '...'}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                        ${item.status === 'Selesai'
                          ? 'bg-blue-100 text-blue-700'
                          : item.status === 'Dibatalkan'
                          ? 'bg-red-100 text-red-700'
                          : item.status === 'Dikonfirmasi'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      • {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="font-medium text-gray-900">{item.customerName}</div>
                    <div className="text-gray-500 text-xs">{item.customerEmail}</div>
                  </td>
                  <td className="px-6 py-3 capitalize">{item.metodeBayar}</td>
                  <td className="px-6 py-3">
                    {item.buktiPembayaran ? (
                      <a
                        href={`/${item.buktiPembayaran}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Lihat Bukti
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">Belum Upload</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {item.status === 'Menunggu Konfirmasi' && item.buktiPembayaran ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleVerifikasi(item.id, true)}
                          className="text-green-600 font-semibold hover:underline"
                        >
                          YA
                        </button>
                        <button
                          onClick={() => handleVerifikasi(item.id, false)}
                          className="text-red-600 font-semibold hover:underline"
                        >
                          TIDAK
                        </button>
                      </div>
                    ) : item.status === 'Dikonfirmasi' ? (
                      <span className="text-green-600 font-semibold">YA</span>
                    ) : item.status === 'Dibatalkan' ? (
                      <span className="text-red-600 font-semibold">TIDAK</span>
                    ) : (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && data.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    Tidak ada pesanan ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
