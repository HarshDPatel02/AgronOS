/**
 * @file region_profile_card.tsx
 * @path /components/dashboard/region_profile_card.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Sidebar card displaying active farm region details and trigger for editing.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import React from "react";
import { MapPin, Edit3 } from "lucide-react";
import { FarmLocation } from "@/types/farm";

interface CardProps {
  location: FarmLocation;
  onChangeRegion: () => void;
}

export function RegionProfileCard({ location, onChangeRegion }: CardProps) {
  return (
    <div className="lg:col-span-1 border rounded-3xl p-6 shadow-sm h-fit bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
        <MapPin className="w-4 h-4 text-emerald-600" />
        Active Region Profile
      </h2>

      <div className="space-y-3 text-xs">
        {[
          { label: "Address", val: location.farmAddress },
          { label: "City", val: location.city },
          { label: "Region / Province", val: `${location.province}, ${location.country}` },
          { label: "Postal Code", val: location.postalCode },
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl border bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
            <span className="text-slate-400 block">{item.label}</span>
            <span className="font-bold text-slate-800 dark:text-slate-100">{item.val}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onChangeRegion}
        className="w-full mt-4 font-semibold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200"
      >
        <Edit3 className="w-3.5 h-3.5" />
        Change Region
      </button>
    </div>
  );
}