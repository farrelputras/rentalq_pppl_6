"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Search } from "lucide-react";
import Link from "next/link";
import motorList from "@/app/data/motorlist"; // ← import dari file eksternal

const RentalMotor = () => {
  const [selectedMotor, setSelectedMotor] = useState(null);

  return (
    <div className="p-4">
      {/* Search Summary */}
      <div className="bg-white shadow-md p-4 rounded-xl mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Rental Motor</h2>
          <p className="text-sm text-gray-500">Thu, 17 April 2025, 10:00 WIB - Sun, 20 April 2025, 10:00 WIB</p>
        </div>
        <Button variant="outline" className="flex gap-2 items-center">
          <Search size={16} /> Change Search
        </Button>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center mb-4 relative z-10 mx-4">
        <p className="text-md font-bold text-black-500">Filter: </p>
        <Select placeholder="Merk Motor">
          <SelectContent>
            <SelectItem value="honda">Honda</SelectItem>
            <SelectItem value="yamaha">Yamaha</SelectItem>
          </SelectContent>
        </Select>
        <Select placeholder="Tipe Motor">
          <SelectContent>
            <SelectItem value="matic">Matic</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>
        <Select placeholder="Jenis Mesin (CC)">
          <SelectContent>
            <SelectItem value="110">110cc</SelectItem>
            <SelectItem value="160">160cc</SelectItem>
          </SelectContent>
        </Select>
        <Select placeholder="Sort By">
          <SelectContent>
            <SelectItem value="lowest">Lowest Price</SelectItem>
            <SelectItem value="highest">Highest Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Motor List */}
      <div className="space-y-4">
        {motorList.map((motor, index) => (
          <Card key={index} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <img src={motor.image} alt={motor.name} className="w-24 h-20 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold text-lg">{motor.name}</h3>
                <div className="text-sm text-gray-600">
                  <p>⚙️ {motor.transmission}</p>
                  <p>🏍️ {motor.cc}</p>
                  <p>👥 {motor.seats}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Starts from</p>
              <p className="text-lg font-bold text-blue-600">{motor.price}<span className="text-sm text-gray-500"> /day</span></p>
              <Link href={`/penyewaan/${motor.id}`}>
                <Button className="mt-2">Pilih</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <span className="text-blue-400">◀</span>
        <span className="text-blue-600 font-bold">1</span>
        <span className="text-blue-400">▶</span>
      </div>
    </div>
  );
};

export default RentalMotor;
