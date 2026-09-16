/**
 * @file button.tsx
 * @path /components/ui/button.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Standard design system button primitive.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles = "font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50";
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md py-3.5 px-6",
    secondary: "bg-slate-800 hover:bg-slate-900 text-white shadow-md py-3.5 px-6",
    outline: "border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2.5 px-4",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}