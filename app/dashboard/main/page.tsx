/**
 * @file page.tsx
 * @path /app/(dashboard)/dashboard/page.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Main dashboard orchestrator page providing public access to
 *              environmental telemetry metrics and field location controls.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Sprout,
  RefreshCw,
  BarChart3,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Layers,
  Waves,
  FlaskConical,
} from "lucide-react";

interface TelemetryData {
  highTemp: number;
  lowTemp: number;
  currentTemp: number;
  windSpeed: number;
  windGust: number;
  currentUv: number;
  maxUv: number;
  humidity: number;
  dewPoint: number;
  vpd: number;
}

export default function DashboardPage() {
  // Address State
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Validation Error Tracking
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);

  // Evaluation Control State
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Dynamic Telemetry Data State
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);

  // Handle Form Evaluation Submit
  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!address.trim()) {
      setAddressError(true);
      hasError = true;
    }

    if (!city.trim()) {
      setCityError(true);
      hasError = true;
    }

    if (!province.trim()) {
      setProvinceError(true);
      hasError = true;
    }

    if (!postalCode.trim()) {
      setPostalCodeError(true);
      hasError = true;
    }

    if (hasError) return;

    setIsEvaluating(true);

    try {
      const queryParams = new URLSearchParams({
        address,
        city,
        province,
        postalCode,
      });

      const res = await fetch(`/api/weather?${queryParams.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setTelemetry({
          highTemp: data.highTemp,
          lowTemp: data.lowTemp,
          currentTemp: data.currentTemp,
          windSpeed: data.windSpeed,
          windGust: data.windGust,
          currentUv: data.currentUv,
          maxUv: data.maxUv,
          humidity: data.humidity,
          dewPoint: data.dewPoint,
          vpd: data.vpd,
        });
        setIsEvaluated(true);
      } else {
        console.error("API Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch telemetry data:", error);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Clear fields to change address
  const handleReset = () => {
    setAddress("");
    setCity("");
    setProvince("");
    setPostalCode("");
    setAddressError(false);
    setCityError(false);
    setProvinceError(false);
    setPostalCodeError(false);
    setIsEvaluated(false);
    setTelemetry(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
      <Header
        city={city && !cityError ? city : "Select Farm Region"}
        onResetLocation={handleReset}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Farm Address Setup Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="bg-emerald-600 text-white p-2.5 rounded-2xl shadow-md">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Farm Location & Telemetry Setup
              </h2>
              <p className="text-xs font-bold text-slate-500">
                Enter your agricultural field location to evaluate region-specific telemetry metrics
              </p>
            </div>
          </div>

          <form onSubmit={handleEvaluate} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Farm Address Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-0.5">
                  Farm Address <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. East 54th Avenue"
                  value={address}
                  onFocus={() => {
                    if (addressError) setAddressError(false);
                  }}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (addressError) setAddressError(false);
                  }}
                  className={`w-full px-3.5 py-3 rounded-xl border text-sm font-bold transition-all outline-none ${
                    addressError
                      ? "border-2 border-red-500 text-red-600 bg-red-50 focus:ring-red-600"
                      : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  }`}
                />
              </div>

              {/* City Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-0.5">
                  City / Town <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vancouver"
                  value={city}
                  onFocus={() => {
                    if (cityError) setCityError(false);
                  }}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (cityError) setCityError(false);
                  }}
                  className={`w-full px-3.5 py-3 rounded-xl border text-sm font-bold transition-all outline-none ${
                    cityError
                      ? "border-2 border-red-500 text-red-600 bg-red-50 focus:ring-red-600"
                      : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  }`}
                />
              </div>

              {/* Province Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-0.5">
                  Province / State <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. British Columbia"
                  value={province}
                  onFocus={() => {
                    if (provinceError) setProvinceError(false);
                  }}
                  onChange={(e) => {
                    setProvince(e.target.value);
                    if (provinceError) setProvinceError(false);
                  }}
                  className={`w-full px-3.5 py-3 rounded-xl border text-sm font-bold transition-all outline-none ${
                    provinceError
                      ? "border-2 border-red-500 text-red-600 bg-red-50 focus:ring-red-600"
                      : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  }`}
                />
              </div>

              {/* Postal Code Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-0.5">
                  Postal Code / Zip <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. V5P 1Y2"
                  value={postalCode}
                  onFocus={() => {
                    if (postalCodeError) setPostalCodeError(false);
                  }}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                    if (postalCodeError) setPostalCodeError(false);
                  }}
                  className={`w-full px-3.5 py-3 rounded-xl border text-sm font-bold transition-all outline-none ${
                    postalCodeError
                      ? "border-2 border-red-500 text-red-600 bg-red-50 focus:ring-red-600"
                      : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  }`}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Change Address
              </button>

              <button
                type="submit"
                disabled={isEvaluating}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <BarChart3 className="w-4 h-4 stroke-[2.5]" />
                {isEvaluating ? "Evaluating Field Data..." : "Evaluate Analytics"}
              </button>
            </div>
          </form>
        </div>

        {/* Environmental Telemetry Panel */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Environmental & Soil Metrics
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                {isEvaluated
                  ? `Telemetry active for ${city}, ${province}`
                  : "Awaiting field evaluation to display live microclimate metrics"}
              </p>
            </div>
            {isEvaluated && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Evaluation Active
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Air Temperature */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-600">
                  Air Temperature
                </span>
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Thermometer className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">
                  {isEvaluated && telemetry ? `${telemetry.currentTemp}°C` : "—"}
                </p>
                <p className="text-xs font-bold mt-0.5">
                  {isEvaluated && telemetry ? (
                    <span>
                      <span className="text-emerald-700">
                        H: {telemetry.highTemp}°C
                      </span>{" "}
                      <span className="text-slate-400">|</span>{" "}
                      <span className="text-sky-700">
                        L: {telemetry.lowTemp}°C
                      </span>
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[11px]">
                      Evaluation required
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Soil Type */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-600">
                  Soil Type
                </span>
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-xl font-black text-slate-900">
                  {isEvaluated ? "Loam (Clay-Silt)" : "—"}
                </p>
                <p className="text-[11px] font-bold text-slate-500 mt-1">
                  {isEvaluated
                    ? "High organic content"
                    : "Evaluation required"}
                </p>
              </div>
            </div>

            {/* Wind Telemetry */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-600">
                  Wind Telemetry
                </span>
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Wind className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">
                  {isEvaluated && telemetry ? `${telemetry.windSpeed} km/h` : "—"}
                </p>
                <p className="text-xs font-bold mt-0.5">
                  {isEvaluated && telemetry ? (
                    <span className="text-amber-700 font-extrabold">
                      Gusts: up to {telemetry.windGust} km/h
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[11px]">
                      Evaluation required
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Solar Index */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-600">
                  Solar Index (UV)
                </span>
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <Sun className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">
                  {isEvaluated && telemetry ? `${telemetry.currentUv} UV` : "—"}
                </p>
                <p className="text-xs font-bold mt-0.5">
                  {isEvaluated && telemetry ? (
                    <span className="text-slate-700">
                      Peak:{" "}
                      <span className="font-black text-amber-700">
                        {telemetry.maxUv} UV
                      </span>
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[11px]">
                      Evaluation required
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Water Sources */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-600">
                  Water Sources
                </span>
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Waves className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">
                  {isEvaluated ? "Well & Reservoir" : "—"}
                </p>
                <p className="text-[11px] font-bold text-slate-500 mt-1">
                  {isEvaluated
                    ? "Stable irrigation capacity"
                    : "Evaluation required"}
                </p>
              </div>
            </div>

            {/* Soil Nutrients */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-600">
                  Soil Nutrients (N-P-K)
                </span>
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <FlaskConical className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">
                  {isEvaluated ? "N: High | P: Med | K: High" : "—"}
                </p>
                <p className="text-[11px] font-bold text-slate-500 mt-1">
                  {isEvaluated
                    ? "pH: 6.5 (Optimal balance)"
                    : "Evaluation required"}
                </p>
              </div>
            </div>

            {/* Air Humidity & Microclimate */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between h-36 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-600">
                  Air Humidity & Microclimate
                </span>
                <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                  <Droplets className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-3">
                  <p className="text-2xl font-black text-slate-900">
                    {isEvaluated && telemetry ? `${telemetry.humidity}% RH` : "—"}
                  </p>
                  {isEvaluated && telemetry && (
                    <span className="text-xs font-bold text-slate-500">
                      Dew Pt:{" "}
                      <span className="text-slate-800 font-extrabold">
                        {telemetry.dewPoint}°C
                      </span>
                      {" "} | VPD:{" "}
                      <span className="text-slate-800 font-extrabold">
                        {telemetry.vpd} kPa
                      </span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-bold text-slate-500 mt-1 flex items-center gap-2">
                  {isEvaluated && telemetry ? (
                    <>
                      <span className="text-emerald-700 font-extrabold">
                        {telemetry.humidity >= 40 && telemetry.humidity <= 70
                          ? "Optimal Transpiration Zone"
                          : telemetry.humidity > 70
                          ? "High Fungal Pathogen Risk"
                          : "High Transpiration Strain"}
                      </span>
                      <span className="text-slate-300">|</span>
                      <span>Target: 40% – 65% RH</span>
                    </>
                  ) : (
                    "Evaluation required"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}