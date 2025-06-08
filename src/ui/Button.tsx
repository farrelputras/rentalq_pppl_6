"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function buttonVariants(variant: "default" | "outline" = "default") {
  return variant === "outline"
    ? "border border-blue-500 text-blue-500 bg-white"
    : "bg-blue-500 text-white";
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className, ...props }) => {
  const baseClass = "px-4 py-2 rounded cursor-pointer transition-colors duration-200";
  const variantClass =
    variant === "outline"
      ? "border border-blue-500 text-blue-500 bg-white hover:bg-blue-50"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button className={`${baseClass} ${variantClass} ${className || ""}`} {...props} />
  );
};
