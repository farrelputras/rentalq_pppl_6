'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export default function HomePage() {
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [pickupTime, setPickupTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [motorType, setMotorType] = useState('');

  return (
    <div className="px-4 py-8 bg-[#f1f5f9] min-h-screen">
      {/* Banner */}
      <div className="bg-blue-700 text-white p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-3xl font-bold">Nyetir Seru buat Pengguna Baru!</h2>
          <p className="text-lg">Pakai aja code <span className="font-extrabold bg-white text-blue-700 px-2 py-1 rounded">RENTQUE</span></p>
        </div>
        <div className="mt-4 md:mt-0">
          {/* Replace with your actual banner image later */}
          <Image src="/public/bannerhomepage.png" alt="Promo Banner" width={300} height={300} />
        </div>
      </div>

      {/* Form Pencarian */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <select
          className="border rounded px-4 py-2 w-full"
          value={motorType}
          onChange={(e) => setMotorType(e.target.value)}
        >
          <option value="">Select Here</option>
          <option value="honda">Honda</option>
          <option value="yamaha">Yamaha</option>
        </select>

        <div>
          <Calendar
            selected={pickupDate}
            onSelect={setPickupDate}
            className="rounded border"
          />
        </div>

        <input
          type="time"
          className="border rounded px-4 py-2 w-full"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
        />

        <div>
          <Calendar
            selected={returnDate}
            onSelect={setReturnDate}
            className="rounded border"
          />
        </div>

        <input
          type="time"
          className="border rounded px-4 py-2 w-full"
          value={returnTime}
          onChange={(e) => setReturnTime(e.target.value)}
        />
      </div>

      {/* Testimoni */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-blue-700 mb-4">Apa Kata Mereka?</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              name: 'Alka',
              text: 'Bookingnya gampang, motor datang tepat waktu. Helm bersih, motor irit, dan ngga rewel. Worth it banget buat liburan singkat 👍👍'
            },
            {
              name: 'Dia',
              text: 'Motor mulus, bensin full, pelayanan juga ramah banget. Enak dipake keliling kota, recommended lah'
            },
            {
              name: 'Lily',
              text: 'Suka banget sama pelayanannya! Motornya bener-bener ngebantu explore tempat-tempat seru. Thank you~ 💕'
            },
            {
              name: 'Yere',
              text: 'Mantul mantul mantap betul. Harga oke, motor siap jalan, staff-nya profesional. Pasti balik sewa di sini lagi😎👍'
            },
          ].map((item, idx) => (
            <Card key={idx} className="bg-blue-100">
              <CardContent className="p-4">
                <p className="font-bold mb-2">{item.name}</p>
                <p className="text-sm">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12 text-blue-700 font-bold text-lg">
        Tunggu apalagi? gunakan <span className="text-blue-900">RentalQ</span> sekarang juga!
      </div>
    </div>
  );
} 