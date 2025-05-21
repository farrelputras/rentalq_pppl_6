"use client";

import React, { useState } from "react";

interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  children,
  placeholder = "Pilih opsi",
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");

  const handleSelect = (val: string) => {
    setSelected(val);
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-xs">
      <SelectTrigger onClick={() => setOpen(!open)}>
        <SelectValue value={selected} placeholder={placeholder} />
      </SelectTrigger>
      {open && (
        <SelectContent>
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement<any>, {
              onSelect: handleSelect,
            })
          )}
        </SelectContent>
      )}
    </div>
  );
};

const SelectTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div
    className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer bg-white"
    {...props}
  >
    {children}
  </div>
);

// ✅ Diperbaiki: Gunakan value dan placeholder secara eksplisit
const SelectValue: React.FC<{ value?: string; placeholder?: string }> = ({
  value,
  placeholder,
}) => (
  <span className={value ? "text-black" : "text-gray-400"}>
    {value && value !== "" ? value : placeholder}
  </span>
);

const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div
    className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md"
    {...props}
  >
    {children}
  </div>
);

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  onSelect?: (value: string) => void;
}

const SelectItem: React.FC<SelectItemProps> = ({
  value,
  children,
  onSelect,
}) => {
  return (
    <div
      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
      onClick={() => onSelect?.(value)}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
