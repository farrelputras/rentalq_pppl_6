"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Select, SelectContent, SelectItem } from "@/ui/Select";
import { Search } from "lucide-react";
import Link from "next/link";
import SearchBar from "@/ui/SearchBar";

type Motor = {
  id: number;
  name: string;
  transmission: string;
  cc: string;
  nopol: string;
  price: number;
  image: string;
};

const ITEMS_PER_PAGE = 5;

const RentalMotor = () => {
  const [motorList, setMotorList] = useState<Motor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMerk, setFilterMerk] = useState<string | undefined>(undefined);
  const [filterTipe, setFilterTipe] = useState<string | undefined>(undefined);
  const [filterCC, setFilterCC] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);

    const query = new URLSearchParams();
    if (filterMerk) query.append("merk", filterMerk);
    if (filterTipe) query.append("tipe", filterTipe);
    if (filterCC) query.append("cc", filterCC);
    if (sortBy) query.append("sort", sortBy);

    fetch(`/api/motor?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setMotorList(data);
        setCurrentPage(1); // reset ke halaman pertama
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load filtered motors:", err);
        setLoading(false);
      });
  }, [filterMerk, filterTipe, filterCC, sortBy]);

  const totalPages = Math.ceil(motorList.length / ITEMS_PER_PAGE);

  const paginatedMotors = motorList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="w-full mt-10 mx-15 p-4">
      <SearchBar />

      {/* Filter */}
      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center mb-4 relative z-10">
        <p className="text-md font-bold text-black-500">Filter: </p>
        <Select
          placeholder="Merk Motor"
          value={filterMerk}
          onChange={setFilterMerk}
        >
          <SelectItem value="Honda">Honda</SelectItem>
          <SelectItem value="Yamaha">Yamaha</SelectItem>
        </Select>

        <Select
          placeholder="Tipe Motor"
          value={filterTipe}
          onChange={setFilterTipe}
        >
          <SelectItem value="Matic">Matic</SelectItem>
          <SelectItem value="Manual">Manual</SelectItem>
        </Select>

        <Select
          placeholder="Jenis Mesin (CC)"
          value={filterCC}
          onChange={setFilterCC}
        >
          <SelectItem value="110">110cc</SelectItem>
          <SelectItem value="120">120cc</SelectItem>
          <SelectItem value="160">160cc</SelectItem>
        </Select>

        <Select placeholder="Sort By" value={sortBy} onChange={setSortBy}>
          <SelectItem value="Lowest Price">Lowest Price</SelectItem>
          <SelectItem value="Highest Price">Highest Price</SelectItem>
        </Select>

        {/* Tambahkan Button reset filter di sini */}
        <Button
          variant="outline"
          className="text-sm ml-auto text-red-600 border-red-600 hover:bg-red-100 rounded-full"
          onClick={() => {
            setFilterMerk(undefined);
            setFilterTipe(undefined);
            setFilterCC(undefined);
            setSortBy(undefined);
          }}
        >
          Reset Filter
        </Button>
      </div>

      {/* Motor List */}
      {loading ? (
        <p className="text-gray-500 text-center mt-10">Loading motors...</p>
      ) : (
        <div className="space-y-4">
          {paginatedMotors.map((motor) => (
            <Card
              key={motor.id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={motor.image}
                  alt={motor.name}
                  className="w-24 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{motor.name}</h3>
                  <div className="text-sm text-gray-600">
                    <p>⚙️ {motor.transmission}</p>
                    <p>🏍️ {motor.cc} CC</p>
                    <p>🪪 {motor.nopol}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Starts from</p>
                <p className="text-lg font-bold text-blue-600">
                  Rp{motor.price.toLocaleString()}
                  <span className="text-sm text-gray-500"> /day</span>
                </p>
                <Link href={`/penyewaan/${motor.id}`}>
                  <Button className="mt-2">Pilih</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="cursor-pointer text-blue-500 disabled:text-gray-300"
          >
            ◀
          </button>
          <span className="font-semibold text-blue-700">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="cursor-pointer text-blue-500 disabled:text-gray-300"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default RentalMotor;
