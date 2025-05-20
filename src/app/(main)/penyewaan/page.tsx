"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Search } from "lucide-react";

const RentalMotor = () => {
  const [selectedMotor, setSelectedMotor] = useState(null);

  const motorList = [
    {
      name: "Honda BeAT All New 2025",
      transmission: "Automatic",
      cc: "110cc",
      seats: "2 Seats",
      price: "Rp50.000",
      image: "/motor-beat.png"
    },
    {
      name: "Honda Vario ABS 2025",
      transmission: "Automatic",
      cc: "160cc",
      seats: "2 Seats",
      price: "Rp75.000",
      image: "/motor-vario.png"
    }
  ];

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

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Merk Motor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="honda">Honda</SelectItem>
            <SelectItem value="yamaha">Yamaha</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Tipe Motor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="matic">Matic</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Jenis Mesin (CC)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="110">110cc</SelectItem>
            <SelectItem value="160">160cc</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[120px] ml-auto">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
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
              <Button className="mt-2">Pilih</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <span className="text-gray-400">◀</span>
        <span className="text-blue-600 font-bold">1</span>
        <span className="text-gray-400">▶</span>
      </div>
    </div>
  );
};

export default RentalMotor;
