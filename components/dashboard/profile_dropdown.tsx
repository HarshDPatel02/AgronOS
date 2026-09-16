/**
 * @file profile_dropdown.tsx
 * @path /components/dashboard/profile_dropdown.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Interactive navigation profile menu containing user session details & theme toggle.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, ChevronDown, UserCheck, Moon, Sliders, Bell, LogOut } from "lucide-react";

interface ProfileProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onResetLocation: () => void;
}

export function ProfileDropdown({ darkMode, onToggleTheme, onResetLocation }: ProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
      >
        <User className="w-4 h-4 text-emerald-600" />
        <span>Robert Smith</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full pt-2 w-64 z-50">
          <div className="rounded-2xl shadow-xl border p-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 mb-1">
              <p className="text-xs font-bold">Robert Smith</p>
              <p className="text-[11px] text-slate-400">robert.smith@agronos.com</p>
            </div>

            <button
              onClick={onResetLocation}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              Edit Profile & Farm
            </button>

            <button
              onClick={onToggleTheme}
              className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <div className="flex items-center gap-2.5">
                <Moon className="w-4 h-4 text-indigo-500" />
                <span>Dark Mode</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                {darkMode ? "ON" : "OFF"}
              </span>
            </button>

            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-700">
              <Sliders className="w-4 h-4 text-amber-500" />
              System Preferences
            </button>

            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-700">
              <Bell className="w-4 h-4 text-blue-500" />
              Alert Settings
            </button>

            <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
              <button
                onClick={() => router.push("/")}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}