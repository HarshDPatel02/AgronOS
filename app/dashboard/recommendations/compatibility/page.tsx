/**
 * @file page.tsx
 * @path /app/(dashboard)/recommendations/compatibility/page.tsx
 * @language TypeScript (TSX / React)
 * @framework Next.js 14+ (App Router) & Tailwind CSS
 * @project AgronOS - Precision Agriculture Platform
 * @description In-depth field compatibility analysis model evaluating soil chemistry, moisture, 
 *              frost parameters, and risk mitigation profiles for specific crop selections.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFarmLocation } from "@/hooks/use_farm_location";
import { Footer } from "@/components/layout/footer";
import {
  Sprout,
  Home,
  BarChart2,
  Calendar,
  MapPin,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  TrendingUp,
  Droplets,
  Thermometer,
  Layers,
  Sparkles,
  Download,
  Share2,
  PlusCircle,
  Loader2
} from "lucide-react";

function CompatibilityContent() {
  const router = useRouter();
  const { location, isLoaded } = useFarmLocation();
  const searchParams = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const cropName = searchParams.get("crop") || "Hard Red Spring Wheat";
  const matchScore = searchParams.get("score") || "96";

  const handleAddToRotation = async () => {
    setIsAdding(true);

    try {
      // Build query flags indicating AI checks are bypassed
      const params = new URLSearchParams({
        crop: cropName,
        score: matchScore,
        status: "farmer_suggested",
        bypassAi: "true"
      });

      // Updated path to target /dashboard/rotation instead of /rotation
      router.push(`/dashboard/rotation?${params.toString()}`);
    } catch (error) {
      console.error("Failed to add crop to rotation:", error);
      setIsAdding(false);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans antialiased">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            <Link href="/dashboard/main" className="flex items-center gap-2.5 group">
              <div className="bg-emerald-600 group-hover:bg-emerald-700 text-white p-2 rounded-xl transition-colors shadow-xs">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Agron<span className="text-emerald-600">OS</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100/80 border border-slate-200/60 text-slate-700 text-xs font-semibold mr-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{location.city}, {location.province}</span>
              </div>

              <Link
                href="/dashboard/main"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 text-xs font-semibold transition-colors"
              >
                <Home className="w-4 h-4 text-slate-400" />
                <span>Home</span>
              </Link>

              <Link
                href="/dashboard/recommendations"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/60 text-xs font-bold transition-colors"
              >
                <BarChart2 className="w-4 h-4 text-emerald-600" />
                <span>Crop Recommendations</span>
              </Link>

              <Link
                href="/dashboard/rotation"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 text-xs font-semibold transition-colors"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Crop Rotation Plan</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 p-1 pl-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-tight">Robert Smith</p>
                  <p className="text-[10px] font-medium text-slate-500">robert.smith@agronos.com</p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  RS
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 pr-0.5" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200/80 shadow-xl py-1 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Robert Smith</p>
                    <p className="text-[11px] font-medium text-slate-500">robert.smith@agronos.com</p>
                  </div>

                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Edit Profile & Farm</span>
                    </button>
                    <button className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>System Preferences</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => router.push("/")}
                      className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Back Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/dashboard/recommendations"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Crop Recommendations</span>
          </Link>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Share Report</span>
            </button>
            <button className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs transition-colors">
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Compatibility Header Banner */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Agronomic Soil Telemetry Breakdown
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {cropName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Field compatibility report generated for registered acres in <span className="font-semibold text-slate-800">{location.city}, {location.province}</span>.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-emerald-50/80 border border-emerald-200/80 p-4 rounded-xl min-w-[240px]">
            <div className="p-3 bg-emerald-600 text-white rounded-xl font-black text-xl shadow-xs">
              {matchScore}%
            </div>
            <div>
              <p className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">Overall Match</p>
              <p className="text-xs font-medium text-emerald-700 mt-0.5">Optimal agronomic conditions detected.</p>
            </div>
          </div>
        </div>

        {/* Core Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Soil pH Match</span>
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-lg font-extrabold text-slate-900">6.8 pH</p>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Ideal range (6.2 - 7.2)
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Moisture Index</span>
              <Droplets className="w-4 h-4 text-sky-500" />
            </div>
            <p className="text-lg font-extrabold text-slate-900">420 mm / yr</p>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Sufficient rainfall profile
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Frost Free Window</span>
              <Thermometer className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-lg font-extrabold text-slate-900">118 Days</p>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Satisfies 105-day maturation
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Nitrogen Balance</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-lg font-extrabold text-slate-900">48 lbs / Acre</p>
            <p className="text-xs font-medium text-amber-600 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Low supplement needed
            </p>
          </div>
        </div>

        {/* Detailed Agronomic Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Soil & Environmental Compatibility Breakdown
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700">Nitrogen Absorption Rate</span>
                  <span className="text-emerald-700">92% Optimal</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700">Subsoil Water Retention</span>
                  <span className="text-emerald-700">88% Optimal</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700">Soil Organic Matter (SOM)</span>
                  <span className="text-amber-600">74% Moderate</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "74%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700">Pest & Disease Resistance Index</span>
                  <span className="text-emerald-700">95% High</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Agronomist Recommendation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The target field exhibits outstanding chemical structure and moisture alignment for <span className="font-bold text-slate-800">{cropName}</span>. Soil N2 depletion is low following the prior crop rotation cycle. A light nitrogen starter application during seeding will maximize potential yield performance.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              Risk Mitigation & Notes
            </h2>

            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-900">Optimal Frost Tolerance</p>
                <p className="text-[11px] font-medium text-emerald-700 mt-0.5">High early-season resilience prevents freeze risk during early spring planting windows.</p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs font-bold text-amber-900">Late Season Dry Spells</p>
                <p className="text-[11px] font-medium text-amber-700 mt-0.5">Monitor late August precipitation; subsoil reserves should cover growth maturity.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToRotation}
              disabled={isAdding}
              className="w-full flex items-center justify-center gap-2 mt-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Adding to Rotation...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Add to Crop Rotation Schedule</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-500 font-medium">
              Adds directly as a verified farmer selection (bypasses recalculation).
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function CompatibilityPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-slate-500">Loading compatibility analysis...</div>}>
      <CompatibilityContent />
    </Suspense>
  );
}