"use client";

import { useState } from "react";
import Image from "next/image";

type Option = {
  label: string;
  value: string;
  icon: string; // path to icon
};

type RadioProps = {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
};

export default function Radio({ options, selected, onChange }: RadioProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center justify-between p-4 border rounded cursor-pointer transition ${
            selected === option.value
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-4">
            <Image src={option.icon} alt={option.label} width={32} height={32} />
            <span className="text-base font-semibold text-black">{option.label}</span>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selected === option.value ? "border-blue-600" : "border-blue-400"
            }`}
          >
            {selected === option.value && (
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            )}
          </div>
          <input
            type="radio"
            name="paymentMethod"
            value={option.value}
            checked={selected === option.value}
            onChange={() => onChange(option.value)}
            className="hidden"
          />
        </label>
      ))}
    </div>
  );
}
