'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Compass, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function NSQFLoadingState() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 space-y-8 flex flex-col items-center justify-center min-h-[60vh]">
      {/* Animated Icon Header */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 ring-8 ring-emerald-50 dark:ring-emerald-950/30">
        <Compass className="w-8 h-8 animate-spin" />
        <Loader2 className="w-4 h-4 absolute top-1 right-1 animate-spin text-emerald-700 dark:text-emerald-300" />
      </div>

      {/* Main Required Loading Text */}
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2">
          <span>Matching your skills to verified NSQF pathways...</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Searching ground-truth local NSQF dataset records</span>
        </p>
      </div>

      {/* Skeleton Mockup Cards */}
      <div className="w-full max-w-2xl space-y-4">
        <Card className="border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-1/3 rounded-lg" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-3 w-3/4 rounded" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
