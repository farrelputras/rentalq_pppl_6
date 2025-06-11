'use client';

import Image from 'next/image';
import Navbar from '@/ui/NavbarAdmin';

export default function AdminDashboard() {
  const dummyData = Array.from({ length: 10 }, (_, i) => ({
    id: `B250315-2H`,
    date: 'Jan 6, 2025',
    status: 'Active',
    name: [
      'Olivia Rhye', 'Phoenix Baker', 'Lana Steiner', 'Demi Wilkinson',
      'Candice Wu', 'Natali Craig', 'Drew Cano', 'Orlando Diggs',
      'Andi Lane', 'Kate Morrison'
    ][i],
    email: `user${i}@untitledui.com`,
    payment: 'Monthly subscription',
    valid: false,
  }));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-6 mt-4">
        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-6 py-4">ID Persewaan</th>
                <th className="px-6 py-4">Tanggal Pesan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Bukti Pembayaran</th>
                <th className="px-6 py-4">Valid</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-3 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-3 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      ● {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap flex items-center gap-3">
                    <Image
                      src="/profileavatar.svg"
                      alt={item.name}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-gray-500 text-xs">{item.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">{item.payment}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="text-green-600 font-semibold mr-2">YA</span>
                    <span className="text-red-600 font-semibold">TIDAK</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
