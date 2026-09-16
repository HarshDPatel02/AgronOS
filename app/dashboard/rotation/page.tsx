/**
 * @file page.tsx
 * @path /app/(dashboard)/rotation/page.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Multi-year crop rotation planner optimized for dynamic URL query parsing,
 *              simple crop selection, automated background date fetching, and regional suitability checks.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

"use client";

import React, { useState, useEffect, Suspense } from "react";
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
  Sparkles,
  Plus,
  Compass,
  UserCheck,
  ArrowRight,
  Clock,
  AlertTriangle,
  Bot,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

type RotationItem = {
  id: string;
  season: string;
  startDate: string;
  endDate: string;
  daysToMaturity: number;
  crop: string;
  role: string;
  status: "Active" | "Planned";
  source: "App" | "Farmer";
  score?: string;
};

type ViewMode = "multi-year" | "seasonal";

function RotationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { location, isLoaded } = useFarmLocation();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("multi-year");
  const [activeSeasonTab, setActiveSeasonTab] = useState<"summer" | "winter">("summer");

  // Continuous Multi-Year Succession Plan
  const [multiYearPlan, setMultiYearPlan] = useState<RotationItem[]>([
    {
      id: "1",
      season: "2026 Season A",
      startDate: "May 10, 2026",
      endDate: "Aug 23, 2026",
      daysToMaturity: 105,
      crop: "Yellow Peas",
      role: "Nitrogen Fixation & Pulse Break",
      status: "Active",
      source: "App"
    },
    {
      id: "2",
      season: "2026-2027 Winter",
      startDate: "Aug 24, 2026",
      endDate: "Apr 28, 2027",
      daysToMaturity: 247,
      crop: "Fall Rye (Cover Crop)",
      role: "Subsoil Anti-Erosion & Organic Biomass",
      status: "Planned",
      source: "App"
    },
    {
      id: "3",
      season: "2027 Season B",
      startDate: "Apr 29, 2027",
      endDate: "Aug 17, 2027",
      daysToMaturity: 110,
      crop: "Hard Red Spring Wheat",
      role: "High-Value Cereals (Residual Nitrogen Utilizer)",
      status: "Planned",
      source: "App"
    },
    {
      id: "4",
      season: "2027-2028 Winter",
      startDate: "Aug 18, 2027",
      endDate: "May 05, 2028",
      daysToMaturity: 261,
      crop: "Hairy Vetch & Winter Oats",
      role: "Overwinter Nitrogen Sequestration & Soil Structure",
      status: "Planned",
      source: "App"
    },
    {
      id: "5",
      season: "2028 Season C",
      startDate: "May 06, 2028",
      endDate: "Sep 08, 2028",
      daysToMaturity: 125,
      crop: "Canola (InVigor L340PC)",
      role: "Brassica Oilseed Break (Weed Strategy)",
      status: "Planned",
      source: "App"
    }
  ]);

  // Seasonal Breakdown Data
  const seasonalPlans: Record<"summer" | "winter", RotationItem[]> = {
    summer: [
      { id: "s1", season: "Summer 2026", startDate: "May 10", endDate: "Aug 23", daysToMaturity: 105, crop: "Yellow Peas", role: "Pulse Legume Break", status: "Active", source: "App" },
      { id: "s2", season: "Summer 2027", startDate: "Apr 29", endDate: "Aug 17", daysToMaturity: 110, crop: "Hard Red Spring Wheat", role: "Cash Cereal Crop", status: "Planned", source: "App" },
      { id: "s3", season: "Summer 2028", startDate: "May 06", endDate: "Sep 08", daysToMaturity: 125, crop: "Canola", role: "Brassica Weed Strategy", status: "Planned", source: "App" }
    ],
    winter: [
      { id: "w1", season: "Winter 2026-2027", startDate: "Aug 24", endDate: "Apr 28", daysToMaturity: 247, crop: "Fall Rye", role: "Soil Armor & Overwinter Bio-Cover", status: "Planned", source: "App" },
      { id: "w2", season: "Winter 2027-2028", startDate: "Aug 18", endDate: "May 05", daysToMaturity: 261, crop: "Hairy Vetch Mix", role: "Biomass Build & Winter Nitrogen Storage", status: "Planned", source: "App" }
    ]
  };

  // Simplified Add Crop Form State
  const [isAddingCrop, setIsAddingCrop] = useState(false);
  const [newCrop, setNewCrop] = useState("");

  // Regional Warning Modal State
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [pendingCropItem, setPendingCropItem] = useState<RotationItem | null>(null);
  const [unsuitableReason, setUnsuitableReason] = useState("");

  // Unsuitable crops for local soil/climate
  const UNSUITABLE_CROPS = ["cotton", "rice", "sugarcane", "cassava", "citrus", "pineapple", "coffee", "banana", "cocoa"];

  // Read and import incoming crop selections from URL search parameters (e.g., from Compatibility Page)
  useEffect(() => {
    const cropParam = searchParams.get("crop");
    const scoreParam = searchParams.get("score");
    const statusParam = searchParams.get("status");
    const bypassAi = searchParams.get("bypassAi");

    if (cropParam) {
      const isFarmerDirect = statusParam === "farmer_suggested" || bypassAi === "true";

      setMultiYearPlan((prevPlan) => {
        // Prevent adding exact duplicate crops to the end of the rotation
        if (prevPlan.some((item) => item.crop.toLowerCase() === cropParam.toLowerCase())) {
          return prevPlan;
        }

        const newEntry: RotationItem = {
          id: `incoming-${Date.now()}`,
          season: "2028-2029 Planned",
          startDate: "May 12, 2028",
          endDate: "Sep 15, 2028",
          daysToMaturity: 126,
          crop: cropParam,
          role: isFarmerDirect
            ? "Direct Farmer Selection (Bypassed AI recalculation after compatibility validation)"
            : "Suggested Crop Addition",
          status: "Planned",
          source: "Farmer",
          score: scoreParam || undefined
        };

        return [...prevPlan, newEntry];
      });
    }
  }, [searchParams]);

  if (!isLoaded) return null;

  const handleAddFarmerCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrop.trim()) return;

    const newItem: RotationItem = {
      id: Date.now().toString(),
      season: "2028-2029 Planned",
      startDate: "Pending AI Search",
      endDate: "Pending AI Search",
      daysToMaturity: 0,
      crop: newCrop,
      role: "Custom Crop (AI processing dates & agronomics in background)",
      status: "Planned",
      source: "Farmer"
    };

    // Regional Suitability Validation
    const isUnsuitable = UNSUITABLE_CROPS.some((item) => newCrop.toLowerCase().includes(item));

    if (isUnsuitable) {
      setUnsuitableReason(
        `This crop (${newCrop}) is not suitable for your land due to soil conditions, thermal units, or regional climate factors in ${location.city}, ${location.province}.`
      );
      setPendingCropItem(newItem);
      setShowWarningModal(true);
      return;
    }

    setMultiYearPlan((prev) => [...prev, newItem]);
    resetForm();
  };

  const handleConfirmUnsuitableCrop = () => {
    if (pendingCropItem) {
      setMultiYearPlan((prev) => [...prev, pendingCropItem]);
    }
    setShowWarningModal(false);
    setPendingCropItem(null);
    resetForm();
  };

  const resetForm = () => {
    setNewCrop("");
    setIsAddingCrop(false);
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans antialiased relative">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 text-xs font-semibold transition-colors"
              >
                <BarChart2 className="w-4 h-4 text-slate-400" />
                <span>Crop Recommendations</span>
              </Link>

              <Link
                href="/dashboard/rotation"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/60 text-xs font-bold transition-colors"
              >
                <Calendar className="w-4 h-4 text-emerald-600" />
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
                      onClick={handleLogout}
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

      {/* Regional Warning Pop-up Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-extrabold text-slate-900 mb-2">
              Unsuitable Crop Warning
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {unsuitableReason}
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowWarningModal(false)}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Change Crop
              </button>
              <button
                onClick={handleConfirmUnsuitableCrop}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-colors"
              >
                Add Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Continuous Agronomic Succession
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Crop Growth & Succession Matrix
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enter crops of interest or import recommendations. Growth schedules and maturity periods are retrieved by AI in the background.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddingCrop(!isAddingCrop)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Custom Crop
            </button>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("multi-year")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "multi-year"
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200/80 shadow-2xs"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Continuous Multi-Year Sequence
            </button>
            <button
              onClick={() => setViewMode("seasonal")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "seasonal"
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200/80 shadow-2xs"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Seasonal Breakdown
            </button>
          </div>

          {viewMode === "seasonal" && (
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveSeasonTab("summer")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeSeasonTab === "summer" ? "bg-white text-emerald-800 shadow-2xs" : "text-slate-600"
                }`}
              >
                Summer Growth
              </button>
              <button
                onClick={() => setActiveSeasonTab("winter")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeSeasonTab === "winter" ? "bg-white text-emerald-800 shadow-2xs" : "text-slate-600"
                }`}
              >
                Winter Cover
              </button>
            </div>
          )}
        </div>

        {/* Form: Add Custom Crop */}
        {isAddingCrop && (
          <form onSubmit={handleAddFarmerCrop} className="bg-white border border-emerald-200 p-5 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-600" /> Add Crop of Interest
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                <Bot className="w-3.5 h-3.5 text-emerald-600" /> AI will search dates & duration in background
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 w-full">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Crop Name</label>
                <input
                  type="text"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-emerald-600"
                  placeholder="e.g., Soybeans, Corn, Cotton, Rice..."
                  required
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto pt-4 sm:pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingCrop(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shrink-0"
                >
                  Save Crop
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-medium pt-1">
              * Try typing <span className="font-bold text-slate-600">"Cotton"</span> or <span className="font-bold text-slate-600">"Rice"</span> to test regional soil and climate warnings.
            </p>
          </form>
        )}

        {/* Rotation Sequence Display */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {(viewMode === "multi-year" ? multiYearPlan : seasonalPlans[activeSeasonTab]).map((item, idx, arr) => (
              <React.Fragment key={item.id}>
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                  
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-extrabold text-slate-700 text-xs shrink-0 mt-1 sm:mt-0">
                      0{idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-extrabold text-slate-900">{item.season}</span>
                        
                        {item.source === "App" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md text-[10px] font-bold border border-emerald-200">
                            <Compass className="w-3 h-3 text-emerald-600" /> App Suggestion
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-800 rounded-md text-[10px] font-bold border border-amber-200">
                            <UserCheck className="w-3 h-3 text-amber-600" /> Farmer Interest
                          </span>
                        )}

                        {item.score && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md text-[10px] font-bold border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {item.score}% Compatibility
                          </span>
                        )}
                      </div>

                      <h2 className="text-base font-extrabold text-slate-900">{item.crop}</h2>
                      <p className="text-xs text-slate-500 mt-0.5">{item.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{item.startDate}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-800">{item.endDate}</span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-[11px] font-extrabold shadow-2xs">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>
                        {item.daysToMaturity > 0 ? `${item.daysToMaturity} Days Growth` : "AI Processing..."}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        item.status === "Active"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                </div>

                {viewMode === "multi-year" && idx < arr.length - 1 && (
                  <div className="bg-slate-100/60 py-1.5 px-6 flex items-center justify-between border-y border-slate-200/40 text-[11px] font-semibold text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span>Continuous Field Transition</span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function RotationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-slate-500">Loading crop rotation schedule...</div>}>
      <RotationContent />
    </Suspense>
  );
}