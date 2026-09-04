'use client';

import React from 'react';
import { MapPin, Navigation, Building2 } from 'lucide-react';

interface RegionalMapThumbnailProps {
  districtName: string;
  trainingCenters: {
    name: string;
    type: string;
    distanceKm: number;
    address: string;
  }[];
}

export function RegionalMapThumbnail({
  districtName,
  trainingCenters,
}: RegionalMapThumbnailProps) {
  return (
    <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-white shadow-inner flex flex-col justify-between p-4">
      {/* Background Stylized Vector Map Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-30 stroke-emerald-500/40 stroke-1 pointer-events-none">
        <defs>
          <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
        {/* District Radius Circle */}
        <circle cx="50%" cy="50%" r="65" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeDasharray="4 4" />
      </svg>

      {/* Map Header Overlay */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>{districtName} District (10km Radius)</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
          <Navigation className="w-3 h-3 animate-pulse" />
          <span>Regional Hub</span>
        </div>
      </div>

      {/* Interactive Map Pins */}
      <div className="relative z-10 flex items-center justify-center my-auto">
        {/* Central Beneficiary Pin */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-900 ring-4 ring-emerald-500/30 group-hover:scale-110 transition-transform">
            <MapPin className="w-4 h-4 fill-white" />
          </div>
          <span className="text-[10px] font-bold bg-slate-950/90 text-slate-200 px-2 py-0.5 rounded-md mt-1 border border-slate-800">
            Your Location
          </span>
        </div>

        {/* Nearby ITI Pin 1 */}
        <div className="absolute left-[20%] top-[25%] flex flex-col items-center group cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
            <Building2 className="w-3 h-3" />
          </div>
          <span className="text-[9px] font-medium bg-slate-950/90 text-blue-300 px-1.5 py-0.5 rounded mt-0.5 border border-blue-900 hidden sm:block">
            {trainingCenters[0]?.name || 'Government ITI'} ({trainingCenters[0]?.distanceKm || 4}km)
          </span>
        </div>
      </div>

      {/* Footer Training Center Badge */}
      <div className="relative z-10 flex items-center justify-between text-xs bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 truncate">
          <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate text-slate-200 font-medium">
            Nearest Hub: <strong>{trainingCenters[0]?.name || 'Government ITI'}</strong> ({trainingCenters[0]?.distanceKm || 4.2} km)
          </span>
        </div>
        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded shrink-0">
          Verified Center
        </span>
      </div>
    </div>
  );
}
