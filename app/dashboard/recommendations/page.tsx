/**
 * @file page.tsx
 * @path /app/(dashboard)/recommendations/page.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Enterprise-grade AI Crop Recommendation engine featuring a comprehensive 
 *              master list in "All Viable Crops" alongside targeted strategic categories.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFarmLocation } from "@/hooks/use_farm_location";
import { Footer } from "@/components/layout/footer";
import {
  Sprout,
  Home,
  BarChart2,
  Calendar,
  ArrowUpRight,
  Droplets,
  DollarSign,
  MapPin,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  SlidersHorizontal,
  Sparkles
} from "lucide-react";

type TabCategory = "all" | "import" | "export" | "demanding";

interface CropItem {
  id: string;
  name: string;
  matchScore: number;
  yieldEst: string;
  waterNeed: string;
  profit: string;
  tagline: string;
  badgeText?: string;
  category: TabCategory;
}

// Master Database: "all" combines every item from other categories plus additional viable options
const CROP_DATABASE: Record<TabCategory, CropItem[]> = {
  all: [
    // Standard Viable Crops
    { id: "c1", name: "Hard Red Spring Wheat", matchScore: 96, yieldEst: "52 Bu/Acre", waterNeed: "Moderate", profit: "High", tagline: "Optimized for local soil pH and nitrogen profile.", category: "all" },
    { id: "c2", name: "Canola (InVigor L340PC)", matchScore: 92, yieldEst: "44 Bu/Acre", waterNeed: "High", profit: "Very High", tagline: "High yields projected under seasonal precipitation models.", category: "all" },
    { id: "c3", name: "Yellow Peas", matchScore: 88, yieldEst: "38 Bu/Acre", waterNeed: "Low (Fixes N2)", profit: "Medium-High", tagline: "Biological nitrogen fixation reduces total fertilizer overhead.", category: "all" },
    { id: "c4", name: "Feed Barley", matchScore: 81, yieldEst: "68 Bu/Acre", waterNeed: "Moderate", profit: "Medium", tagline: "High frost resilience during early growth cycles.", category: "all" },
    
    // Items included from Import Substitutes
    { id: "c5", name: "Cold-Hardy Haskap Berries", matchScore: 94, yieldEst: "4,200 Lbs/Acre", waterNeed: "Restricted", profit: "$4,200 / Acre", tagline: "Replaces 78% national import dependency with extreme cold tolerance.", badgeText: "Import Substitute", category: "all" },
    { id: "c6", name: "High-Tunnel Strawberries", matchScore: 91, yieldEst: "18,000 Lbs/Acre", waterNeed: "Moderate", profit: "$6,800 / Acre", tagline: "High-margin opportunity targeting local fresh market deficits.", badgeText: "Import Substitute", category: "all" },
    { id: "c7", name: "Dwarf Sea Buckthorn", matchScore: 89, yieldEst: "3,100 Lbs/Acre", waterNeed: "Low", profit: "$3,500 / Acre", tagline: "Resilient soil builder addressing specialized domestic demand.", badgeText: "Import Substitute", category: "all" },
    { id: "c8", name: "Highland Garlic (Music)", matchScore: 86, yieldEst: "8,500 Lbs/Acre", waterNeed: "Low", profit: "$5,100 / Acre", tagline: "Captures domestic supply premiums during early autumn windows.", badgeText: "Import Substitute", category: "all" },
    
    // Items included from Export Opportunities
    { id: "c9", name: "Durum Wheat (Amber)", matchScore: 95, yieldEst: "48 Bu/Acre", waterNeed: "Moderate", profit: "High", tagline: "High-grade grain suitable for EU and North African export standards.", badgeText: "Export Target", category: "all" },
    { id: "c10", name: "Kabuli Chickpeas", matchScore: 87, yieldEst: "2,100 Lbs/Acre", waterNeed: "Low", profit: "Very High", tagline: "Premium export pricing driven by global protein demand.", badgeText: "Export Target", category: "all" },
    { id: "c11", name: "Large Green Lentils", matchScore: 85, yieldEst: "1,900 Lbs/Acre", waterNeed: "Low", profit: "High", tagline: "Established international distribution channels with steady margins.", badgeText: "Export Target", category: "all" },
    
    // Items included from Regional High Demand
    { id: "c12", name: "Malting Barley (AC Metcalfe)", matchScore: 93, yieldEst: "72 Bu/Acre", waterNeed: "Moderate", profit: "High", tagline: "Direct buyer off-take agreements available from regional processors.", badgeText: "Local Buyer Demand", category: "all" },
    { id: "c13", name: "Triple Crown Oats", matchScore: 90, yieldEst: "95 Bu/Acre", waterNeed: "Moderate", profit: "Medium-High", tagline: "Supply deficit flagged by local milling facilities.", badgeText: "Local Buyer Demand", category: "all" },
    { id: "c14", name: "Brown Flaxseed", matchScore: 84, yieldEst: "32 Bu/Acre", waterNeed: "Low", profit: "High", tagline: "Surging local demand for regional crushing plants.", badgeText: "Local Buyer Demand", category: "all" },

    // Additional Viable Candidates
    { id: "c15", name: "Early-Maturing Grain Corn", matchScore: 83, yieldEst: "135 Bu/Acre", waterNeed: "High", profit: "Medium-High", tagline: "Emerging agronomic fit based on warming heat-unit trends.", category: "all" },
    { id: "c16", name: "Sunflowers (Confectionery)", matchScore: 80, yieldEst: "2,200 Lbs/Acre", waterNeed: "Moderate", profit: "High", tagline: "Deep taproots access subsoil moisture during dry late-season spans.", category: "all" },
  ],

  import: [
    { id: "c5", name: "Cold-Hardy Haskap Berries", matchScore: 94, yieldEst: "4,200 Lbs/Acre", waterNeed: "Restricted", profit: "$4,200 / Acre", tagline: "Replaces 78% national import dependency with extreme cold tolerance.", badgeText: "78% Import Replacement", category: "import" },
    { id: "c6", name: "High-Tunnel Strawberries", matchScore: 91, yieldEst: "18,000 Lbs/Acre", waterNeed: "Moderate", profit: "$6,800 / Acre", tagline: "High-margin opportunity targeting local fresh market deficits.", badgeText: "92% Import Replacement", category: "import" },
    { id: "c7", name: "Dwarf Sea Buckthorn", matchScore: 89, yieldEst: "3,100 Lbs/Acre", waterNeed: "Low", profit: "$3,500 / Acre", tagline: "Resilient soil builder addressing specialized domestic demand.", badgeText: "64% Import Replacement", category: "import" },
    { id: "c8", name: "Highland Garlic (Music)", matchScore: 86, yieldEst: "8,500 Lbs/Acre", waterNeed: "Low", profit: "$5,100 / Acre", tagline: "Captures domestic supply premiums during early autumn windows.", badgeText: "85% Import Replacement", category: "import" },
  ],

  export: [
    { id: "c9", name: "Durum Wheat (Amber)", matchScore: 95, yieldEst: "48 Bu/Acre", waterNeed: "Moderate", profit: "High", tagline: "High-grade grain suitable for EU and North African export standards.", badgeText: "Global Commodity", category: "export" },
    { id: "c10", name: "Kabuli Chickpeas", matchScore: 87, yieldEst: "2,100 Lbs/Acre", waterNeed: "Low", profit: "Very High", tagline: "Premium export pricing driven by global protein demand.", badgeText: "High Export Volume", category: "export" },
    { id: "c11", name: "Large Green Lentils", matchScore: 85, yieldEst: "1,900 Lbs/Acre", waterNeed: "Low", profit: "High", tagline: "Established international distribution channels with steady margins.", badgeText: "Global Market Lead", category: "export" },
  ],

  demanding: [
    { id: "c12", name: "Malting Barley (AC Metcalfe)", matchScore: 93, yieldEst: "72 Bu/Acre", waterNeed: "Moderate", profit: "High", tagline: "Direct buyer off-take agreements available from regional processors.", badgeText: "Local Off-Take Ready", category: "demanding" },
    { id: "c13", name: "Triple Crown Oats", matchScore: 90, yieldEst: "95 Bu/Acre", waterNeed: "Moderate", profit: "Medium-High", tagline: "Supply deficit flagged by local milling facilities.", badgeText: "Processing Deficit", category: "demanding" },
    { id: "c14", name: "Brown Flaxseed", matchScore: 84, yieldEst: "32 Bu/Acre", waterNeed: "Low", profit: "High", tagline: "Surging local demand for regional crushing plants.", badgeText: "High Regional Demand", category: "demanding" },
  ],
};

const TABS: { id: TabCategory; label: string; count: number }[] = [
  { id: "all", label: "All Viable Crops", count: CROP_DATABASE.all.length },
  { id: "import", label: "Import Substitution", count: CROP_DATABASE.import.length },
  { id: "export", label: "Export Opportunities", count: CROP_DATABASE.export.length },
  { id: "demanding", label: "Regional High Demand", count: CROP_DATABASE.demanding.length },
];

export default function RecommendationsPage() {
  const { location, isLoaded } = useFarmLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabCategory>("all");

  if (!isLoaded) return null;

  const activeCrops = CROP_DATABASE[activeTab];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans antialiased">
      
      {/* Enterprise Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            <Link href="/dashboard/main" className="flex items-center gap-2.5 group">
              <div className="bg-emerald-600 group-hover:bg-emerald-700 text-white p-2 rounded-xl transition-colors shadow-sm">
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
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
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
                    <button className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
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

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Header Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Precision Agronomic Intelligence
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Crop Suitability & Yield Models
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Evaluated against soil profile, regional microclimate, and commodity market vectors for <span className="font-semibold text-slate-800">{location.city}, {location.province}</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-700">Model v2.4 Active</span>
            </div>

            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors" title="Filter Settings">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Enterprise Segmented Tabs (NO Tab Icons) */}
        <div className="bg-slate-200/50 p-1.5 rounded-2xl flex flex-wrap lg:flex-nowrap gap-1 border border-slate-200/50">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[180px] flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`ml-2 px-2 py-0.5 rounded-md text-[10px] font-extrabold transition-colors ${
                    isActive
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-300/50 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Crop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {crop.name}
                    </h2>
                    {crop.badgeText && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                        {crop.badgeText}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                    <span className="text-xs font-extrabold text-emerald-800">{crop.matchScore}%</span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Match</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 my-3.5 leading-relaxed font-normal">
                  {crop.tagline}
                </p>

                {/* Card Data Badges (Icons kept intact inside cards) */}
                <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider mb-1">
                      Est. Yield
                    </span>
                    <span className="font-extrabold text-slate-800 text-xs">{crop.yieldEst}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                      <Droplets className="w-3 h-3 text-sky-500" /> Water
                    </span>
                    <span className="font-bold text-slate-800 text-xs">{crop.waterNeed}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-600" /> Margin
                    </span>
                    <span className="font-extrabold text-emerald-700 text-xs">{crop.profit}</span>
                  </div>
                </div>
              </div>

              {/* Linked button pointing to the field compatibility route */}
              <Link
                href={`/dashboard/recommendations/compatibility?crop=${encodeURIComponent(crop.name)}&score=${crop.matchScore}`}
                className="w-full mt-1 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-700 border border-slate-200 hover:border-emerald-600 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:shadow-xs"
              >
                <span>Analyze Field Compatibility</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}