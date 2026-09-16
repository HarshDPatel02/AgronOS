/**
 * @file page.tsx
 * @path /app/page.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Minimalist, centered landing page providing primary access routes.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

"use client";

import React from "react";
import Link from "next/link";
import { Sprout, LogIn, UserPlus, HelpCircle } from "lucide-react";

export default function CenteredLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-6 font-sans">
      
      {/* Top Bar Navigation */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-emerald-600 text-white p-2 rounded-xl shadow-sm">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-wide">
            Agron<span className="text-emerald-600">OS</span>
          </span>
        </Link>

        <Link 
          href="/about" 
          className="text-slate-600 hover:text-emerald-700 font-semibold text-sm transition-colors flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4" />
          About Us
        </Link>
      </header>

      {/* Hero Section: Centered Brand Name & Direct Action Buttons */}
      <main className="w-full max-w-2xl mx-auto my-auto text-center px-4">
        
        {/* Brand Icon & Name */}
        <div className="inline-flex p-5 bg-emerald-100/80 rounded-full text-emerald-700 mb-6 shadow-sm border border-emerald-200">
          <Sprout className="w-12 h-12" />
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight">
          Agron<span className="text-emerald-600">OS</span>
        </h1>

        <p className="text-slate-600 text-lg md:text-xl mt-4 max-w-lg mx-auto font-medium leading-relaxed">
          Climate-Adaptive Agriculture & Import-Replacement Intelligence
        </p>

        {/* Login & Sign Up Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          
          {/* Log In Button */}
          <Link href="/auth/login" className="w-full sm:w-1/2">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-base cursor-pointer">
              <LogIn className="w-5 h-5" />
              Log In
            </button>
          </Link>

          {/* Sign Up Button */}
          <Link href="/auth/signup" className="w-full sm:w-1/2">
            <button className="w-full bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 font-bold py-4 px-6 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 text-base cursor-pointer">
              <UserPlus className="w-5 h-5 text-emerald-600" />
              Sign Up
            </button>
          </Link>

        </div>

      

      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto text-center py-4 text-xs text-slate-500">
        © 2026 AgronOS Technologies Inc. Designed for maximum legibility and ease of use.
      </footer>

    </div>
  );
}