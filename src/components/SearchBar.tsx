'use client';

import { Button } from "@/components/Button";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
      <div className="bg-white shadow-md p-4 rounded-xl mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Rental Motor</h2>
          <p className="text-sm text-gray-500">Thu, 17 April 2025, 10:00 WIB - Sun, 20 April 2025, 10:00 WIB</p>
        </div>
        <Button variant="outline" className="flex gap-2 items-center">
          <Search size={16} /> Change Search
        </Button>
      </div>
    );
}