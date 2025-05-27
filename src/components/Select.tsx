"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // pastikan sudah install lucide-react

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
  placeholder = "filter",
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");
  const [selectedLabel, setSelectedLabel] = useState("");

  const handleSelect = (val: string, label?: string) => {
    setSelected(val);
    setSelectedLabel(label || val);
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-xs">
      <SelectTrigger onClick={() => setOpen(!open)}>
        <SelectValue value={selectedLabel} placeholder={placeholder} />
        <ChevronDown className="w-8 h-6 text-blue-500 ml-2"/>

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
    className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-1.5 text-sm cursor-pointer bg-white w-full shadow-sm hover:shadow-md transition"
    {...props}
  >
    {children}
  </div>
);

const SelectValue: React.FC<{ value?: string; placeholder?: string }> = ({
  value,
  placeholder,
}) => (
  <span
    className={`text-sm font-semibold ${
      value ? "text-blue-600" : "text-blue-600 font-bold"
    }`}
  >
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
  label?: string;
  children: React.ReactNode;
  onSelect?: (value: string, label?: string) => void;
}

const SelectItem: React.FC<SelectItemProps> = ({
  value,
  label,
  children,
  onSelect,
}) => {
  const handleClick = () => {
    const labelToUse = label || (typeof children === "string" ? children : "");
    onSelect?.(value, labelToUse);
  };

  return (
    <div
      className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
