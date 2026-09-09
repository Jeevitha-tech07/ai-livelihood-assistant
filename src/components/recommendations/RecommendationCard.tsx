'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  Medal,
  Info,
  BookOpen,
  School,
  Phone,
  Map,
  Check,
  ChevronRight,
} from 'lucide-react';
import { NSQFQualification } from '@/types/nsqf';
import { useLanguage } from '@/context/LanguageContext';

export interface RankedRecommendationOption {
  rank: number;
  rankBadge: string; // 🥇, 🥈, 🥉
  matchPercentage: number;
  qualification: NSQFQualification;
  whyExplanation: { en: string; ta: string };
  trainingPath: { en: string; ta: string };
  trainingCenter: {
    name: string;
    type: string;
    distanceKm: number;
    phone: string;
    mapUrl: string;
  };
}

interface RecommendationCardProps {
  option: RankedRecommendationOption;
  isSelected?: boolean;
  onSelectOption?: (option: RankedRecommendationOption) => void;
}

export function RecommendationCard({
  option,
  isSelected,
  onSelectOption,
}: RecommendationCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const isRank1 = option.rank === 1;

  return (
    <Card
      className={`w-full transition-all duration-200 border-2 rounded-2xl overflow-hidden ${
        isRank1
          ? 'border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/30 shadow-lg ring-1 ring-emerald-500/30'
          : isSelected
          ? 'border-emerald-500 bg-white dark:bg-slate-900 shadow-md'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-emerald-300'
      }`}
    >
      {/* Top Banner / Rank Badge & Title */}
      <CardHeader className="p-5 sm:p-6 border-b border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                isRank1
                  ? 'bg-amber-500 text-white shadow-sm'
                  : option.rank === 2
                  ? 'bg-slate-700 text-white'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {option.rank === 1 && <Trophy className="w-3.5 h-3.5 fill-white" />}
              {option.rank !== 1 && <Medal className="w-3.5 h-3.5" />}
              <span>#{option.rank} Recommendation</span>
            </span>

            <Badge variant="outline" className="text-xs font-mono border-slate-300 dark:border-slate-700">
              NSQF Level {option.qualification.nsqf_level}
            </Badge>
          </div>

          <CardTitle className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50">
            {option.qualification.title}
          </CardTitle>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Sector: <strong className="text-slate-700 dark:text-slate-300">{option.qualification.sector_name}</strong> | Code: {option.qualification.code}
          </p>
        </div>

        {/* Match Percentage Badge Ring */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div
            className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-center shadow-inner border-2 ${
              isRank1
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200'
            }`}
          >
            <span className="text-lg font-black leading-none">{option.matchPercentage}%</span>
            <span className="text-[9px] uppercase font-bold tracking-wider opacity-90">Match</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 space-y-5">
        {/* Why it matches */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          <strong className="text-emerald-800 dark:text-emerald-400 block mb-1">
            Why this matches:
          </strong>
          {option.whyExplanation[lang]}
        </div>

        {/* Skills & Gap Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Relevant Skills
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {option.qualification.proposed_occupation}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Skill Gap Summary
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {option.qualification.maximum_notational_hours} hrs accredited training
            </span>
          </div>
        </div>

        {/* Expandable Details Accordion */}
        <div className="space-y-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400 py-1.5 hover:underline"
          >
            <span className="flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              <span>{showDetails ? 'Hide Details' : 'View Full Training & Location Details →'}</span>
            </span>
            <span>{showDetails ? '▲' : '▼'}</span>
          </button>

          {showDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2 animate-in fade-in duration-200">
              {/* Training Path */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>NSQF Training Path ({option.qualification.maximum_notational_hours} Hours)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {option.trainingPath[lang]}
                </p>
              </div>

              {/* Training Centre Finder */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                  <School className="w-4 h-4 text-emerald-600" />
                  <span>Nearby Training Centre ({option.trainingCenter.distanceKm} km away)</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-semibold">
                  {option.trainingCenter.name} ({option.trainingCenter.type})
                </p>
                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>{option.trainingCenter.phone}</span>
                  </span>
                  <a
                    href={option.trainingCenter.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-emerald-600 hover:underline font-semibold"
                  >
                    <Map className="w-3 h-3" />
                    <span>Open Map</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Select Action Button */}
        <Button
          onClick={() => onSelectOption && onSelectOption(option)}
          className={`w-full py-3 rounded-xl font-bold text-sm ${
            isSelected
              ? 'bg-emerald-800 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {isSelected ? (
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Selected Target Opportunity</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>Select Option for Roadmap</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
