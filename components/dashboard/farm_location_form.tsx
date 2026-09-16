/**
 * @file farm_location_form.tsx
 * @path /components/dashboard/farm_location_form.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Form component enabling producers to input and save geographic farm parameters.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import React, { useState } from "react";
import { MapPin, RefreshCw, ArrowRight } from "lucide-react";
import { FarmLocation } from "@/types/farm";
import { Input } from "@/components/ui/input";

interface FormProps {
  initialValues: FarmLocation;
  isFetching: boolean;
  onSave: (location: FarmLocation) => void;
}

export function FarmLocationForm({ initialValues, isFetching, onSave }: FormProps) {
  const [form, setForm] = useState<FarmLocation>(initialValues);

  const handleChange = (key: keyof FarmLocation, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-xl w-full mx-auto border rounded-3xl p-8 shadow-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <div className="text-center mb-6">
        <div className="inline-flex p-3 bg-emerald-100 dark:bg-emerald-950/50 rounded-full text-emerald-700 dark:text-emerald-400 mb-3">
          <MapPin className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Configure Regional Farm Profile</h1>
        <p className="text-xs mt-1 text-slate-400">
          Enter your location once. We will persist soil and climate profile data to your account homepage.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Street Address"
          value={form.farmAddress}
          onChange={(e) => handleChange("farmAddress", e.target.value)}
          placeholder="e.g. 123 Agricultural Way"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="e.g. Regina"
          />
          <Input
            label="State / Province"
            value={form.province}
            onChange={(e) => handleChange("province", e.target.value)}
            placeholder="e.g. Saskatchewan"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Postal / PIN Code"
            value={form.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            placeholder="e.g. S4P 3Y2"
          />
          <Input
            label="Country"
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
            placeholder="e.g. Canada"
          />
        </div>

        <button
          type="button"
          onClick={() => onSave(form)}
          disabled={isFetching}
          className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-base disabled:opacity-50"
        >
          {isFetching ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Saving & Fetching Regional Profile...
            </>
          ) : (
            <>
              Save Region & View Metrics
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}