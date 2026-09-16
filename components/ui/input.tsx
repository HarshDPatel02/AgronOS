/**
 * @file input.tsx
 * @path /components/ui/input.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Form input primitive with labels and theme support.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase mb-1 text-slate-600 dark:text-slate-300">{label}</label>
      <input
        {...props}
        className="w-full border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 dark:text-white"
      />
    </div>
  );
}