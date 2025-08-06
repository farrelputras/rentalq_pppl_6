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

  const handleVerifikasi = async (idPesanan: number, valid: boolean) => {
    try {
      const res = await fetch('/api/validasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idPesanan, valid }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Status pesanan berhasil diperbarui.');
        window.location.reload();
      } else {
        alert('Gagal memperbarui status pesanan.');
      }
    } catch (err) {
      alert('Terjadi kesalahan.');
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
                <th className="px-6 py-4">Tanggal Pesan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Metode Bayar</th>
                <th className="px-6 py-4">Validasi</th>
              </tr>
            </thead>
            <tbody>
              {renderData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-3 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {item.tanggalSewa !== '...'
                      ? new Date(item.tanggalSewa).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : '...'}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
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
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.customerName}</div>
                    <div className="text-gray-500 text-xs">{item.customerEmail}</div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap capitalize">{item.metodeBayar}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {item.statusBayar && item.buktiPembayaran ? (
                      <div className="flex flex-col gap-1">
                        <a
                          href={item.buktiPembayaran}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          Lihat Bukti
                        </a>
                        <div className="flex gap-2">
                          <button
                            className="text-green-600 font-semibold"
                            onClick={() => handleVerifikasi(item.id, true)}
                          >
                            YA
                          </button>
                          <button
                            className="text-red-600 font-semibold"
                            onClick={() => handleVerifikasi(item.id, false)}
                          >
                            TIDAK
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && data.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
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
