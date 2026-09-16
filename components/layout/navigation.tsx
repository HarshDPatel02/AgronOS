/**
 * @file navigation.tsx
 * @path /components/layout/navigation.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Main application navigation link list.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import React from "react";
import Link from "next/link";
import { Home, BarChart3, Calendar } from "lucide-react";

interface NavigationProps {
  city: string;
}

export function Navigation({ city }: NavigationProps) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-3.5 py-2 text-sm font-bold text-emerald-700 bg-emerald-50 rounded-lg dark:bg-emerald-950/50 dark:text-emerald-400"
      >
        <Home className="w-4 h-4" />
        Home ({city || "Saved Region"})
      </Link>
      <Link
        href="/recommendations"
        className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        <BarChart3 className="w-4 h-4" />
        Crop Recommendations
      </Link>
      <Link
        href="/rotation"
        className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        <Calendar className="w-4 h-4" />
        Crop Rotation Plan
      </Link>
    </nav>
  );
}