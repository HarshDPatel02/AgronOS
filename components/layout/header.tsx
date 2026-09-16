/**
 * @file header.tsx
 * @path /components/layout/header.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Header component with functional routing and responsive drawer navigation.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sprout,
  ChevronDown,
  User,
  Settings,
  Bell,
  LogOut,
  MapPin,
  Calendar,
  BarChart2,
  Menu,
  X,
} from "lucide-react";

export interface HeaderProps {
  city: string;
  onResetLocation: () => void;
  darkMode?: boolean;
  onToggleTheme?: () => void;
}

export function Header({ city, onResetLocation }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Perform any auth cleanup/logout state logic here if needed
    router.push("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 md:gap-6">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="bg-emerald-600 text-white p-2 rounded-xl shadow-sm">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Agron<span className="text-emerald-600">OS</span>
            </span>
          </Link>

          {/* Navigation Links (Desktop/Full-Screen) */}
          <nav className="hidden md:flex items-center gap-1">
            <button 
              onClick={onResetLocation}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-black transition-colors hover:bg-emerald-100/80 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{city}</span>
            </button>

            <Link 
              href="/dashboard/recommendations" 
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-bold transition-colors"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Crop Recommendations</span>
            </Link>

            <Link 
              href="/dashboard/rotation" 
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-bold transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Crop Rotation Plan</span>
            </Link>
          </nav>
        </div>

        {/* User Profile & Dropdown */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pl-3 rounded-2xl bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200 cursor-pointer"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-extrabold text-slate-900 leading-tight">Robert Smith</p>
                <p className="text-[10px] font-bold text-slate-500">robert.smith@agronos.com</p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                RS
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 pr-1" />
            </button>

            {/* Profile Menu Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-black text-slate-900">Robert Smith</p>
                  <p className="text-[11px] font-medium text-slate-500">robert.smith@agronos.com</p>
                </div>

                <div className="py-1">
                  <button className="w-full px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer">
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Edit Profile & Farm</span>
                  </button>
                  <button className="w-full px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer">
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>System Preferences</span>
                  </button>
                  <button className="w-full px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer">
                    <Bell className="w-4 h-4 text-slate-500" />
                    <span>Alert Settings</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Slide-Down Navigation Menu for Half-Screen Split & Mobile Views */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1.5 shadow-lg animate-in slide-in-from-top duration-200">
          <button 
            onClick={() => {
              onResetLocation();
              closeMobileMenu();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-black transition-colors hover:bg-emerald-100/80 cursor-pointer mb-2"
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{city}</span>
          </button>

          <Link 
            href="/dashboard/recommendations" 
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
          >
            <BarChart2 className="w-4 h-4 text-slate-500" />
            <span>Crop Recommendations</span>
          </Link>

          <Link 
            href="/dashboard/rotation" 
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
          >
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Crop Rotation Plan</span>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;