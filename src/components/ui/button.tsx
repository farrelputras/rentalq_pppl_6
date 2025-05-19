"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"; // tambahkan properti variant di sini
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className, ...props }) => {
  const baseClass = "px-4 py-2 rounded";
  const variantClass =
    variant === "outline"
      ? "border border-blue-500 text-blue-500 bg-white"
      : "bg-blue-500 text-white";

  return (
    <button className={`${baseClass} ${variantClass} ${className || ""}`} {...props} />
  );
};
