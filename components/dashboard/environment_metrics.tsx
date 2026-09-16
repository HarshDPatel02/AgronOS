/**
 * @file environment_metrics.tsx
 * @path /components/dashboard/environment_metrics.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Main environmental dashboard panel displaying soil chemistry and regional weather metrics.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import React from "react";
import Link from "next/link";
import { Sparkles, Thermometer, Layers, Droplets, Activity, Sun, BarChart3, Calendar, ArrowRight } from "lucide-react";
import { DEFAULT_METRICS } from "@/constants/farm_data";

interface MetricsProps {
  city: string;
  province: string;
}

export function EnvironmentMetrics({ city, province }: MetricsProps) {
  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="border rounded-3xl p-6 md:p-8 shadow-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Regional Environmental Data</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Stored parameters for {city}, {province}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" /> Live Sync Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <Thermometer className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Temperature</span>
            </div>
            <div className="text-xl font-extrabold text-slate-800 dark:text-slate-100">{DEFAULT_METRICS.tempCurrent}</div>
            <span className="text-xs text-slate-400 mt-1 block">Min Winter: {DEFAULT_METRICS.tempMinWinter}</span>
          </div>

          <div className="border p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <Layers className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Soil Profile</span>
            </div>
            <div className="text-xl font-extrabold text-slate-800 dark:text-slate-100">{DEFAULT_METRICS.soilPh}</div>
            <span className="text-xs text-slate-400 mt-1 block">Organic Matter: {DEFAULT_METRICS.organicMatter}</span>
          </div>

          <div className="border p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <Droplets className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Water & Moisture</span>
            </div>
            <div className="text-xl font-extrabold text-slate-800 dark:text-slate-100">{DEFAULT_METRICS.moisture}</div>
            <span className="text-xs text-slate-400 mt-1 block">{DEFAULT_METRICS.waterAvailability}</span>
          </div>

          <div className="border p-4 rounded-2xl sm:col-span-2 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <Activity className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Nutrient Profile (NPK)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
              <div className="p-2 rounded-lg border text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                <span className="text-slate-400 block font-semibold">Nitrogen</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{DEFAULT_METRICS.nitrogen}</span>
              </div>
              <div className="p-2 rounded-lg border text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                <span className="text-slate-400 block font-semibold">Phosphorus</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{DEFAULT_METRICS.phosphorus}</span>
              </div>
              <div className="p-2 rounded-lg border text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                <span className="text-slate-400 block font-semibold">Potassium</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{DEFAULT_METRICS.potassium}</span>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <Sun className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Solar Exposure</span>
            </div>
            <div className="text-xl font-extrabold text-slate-800 dark:text-slate-100">{DEFAULT_METRICS.sunshineHours}</div>
            <span className="text-xs text-slate-400 mt-1 block">Optimal photosynthesis exposure</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-end gap-3 border-slate-100 dark:border-slate-700">
          <Link href="/recommendations">
            <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-sm">
              <BarChart3 className="w-4 h-4" />
              View Crop Recommendations
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/rotation">
            <button className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              View Rotation Plan
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}