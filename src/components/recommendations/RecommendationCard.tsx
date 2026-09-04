'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
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
  const [showWhyAccordion, setShowWhyAccordion] = useState(false);
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <Badge className="bg-amber-500 text-white font-extrabold text-xs px-3 py-1 shadow-md shadow-amber-200 dark:shadow-none flex items-center gap-1.5">
          <Trophy className="w-4 h-4 fill-white" />
          <span>🥇 Rank #1 Recommendation</span>
        </Badge>
      );
    }
    if (rank === 2) {
      return (
        <Badge className="bg-slate-700 text-white font-bold text-xs px-3 py-1 flex items-center gap-1.5">
          <Medal className="w-4 h-4" />
          <span>🥈 Rank #2 Recommendation</span>
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="font-bold text-xs px-3 py-1 flex items-center gap-1.5">
        <Medal className="w-4 h-4 text-amber-700" />
        <span>🥉 Rank #3 Recommendation</span>
      </Badge>
    );
  };

  return (
    <Card
      className={`w-full transition-all duration-200 border-2 ${
        isSelected
          ? 'border-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-lg ring-2 ring-emerald-500/20'
          : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 bg-white dark:bg-slate-900 shadow-sm'
      }`}
    >
      <CardHeader className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          {getRankBadge(option.rank)}

          <CardTitle className="text-xl font-extrabold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <span>{option.qualification.title}</span>
          </CardTitle>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Sector: <strong className="text-slate-700 dark:text-slate-300">{option.qualification.sector_name}</strong> | Code: {option.qualification.code}
          </p>
        </div>

        {/* Match Percentage Ring */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="relative w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border-4 border-emerald-500 flex flex-col items-center justify-center text-center shadow-inner">
            <span className="text-base font-black text-emerald-700 dark:text-emerald-300 leading-none">
              {option.matchPercentage}%
            </span>
            <span className="text-[9px] uppercase font-bold text-emerald-600">Match</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {option.qualification.description}
        </p>

        {/* Info Icon triggering Expandable "Why this recommendation?" Accordion */}
        <div className="space-y-2">
          <AccordionItem className="border border-emerald-200 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/30">
            <AccordionTrigger
              isOpen={showWhyAccordion}
              onToggle={() => setShowWhyAccordion(!showWhyAccordion)}
              className="text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100/50"
            >
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Why this recommendation? (Livelihood Reasoning)</span>
              </div>
            </AccordionTrigger>

            <AccordionContent isOpen={showWhyAccordion}>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg text-xs leading-relaxed text-slate-700 dark:text-slate-300 border border-emerald-200 dark:border-emerald-800">
                {option.whyExplanation[lang]}
              </div>
            </AccordionContent>
          </AccordionItem>
        </div>

        {/* Training Path (BookOpen icon) & Training Centre Finder (School, Phone, Map icons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
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

        {/* Select Action Button */}
        <Button
          onClick={() => onSelectOption && onSelectOption(option)}
          className={`w-full py-3 rounded-xl font-bold text-sm ${
            isSelected
              ? 'bg-emerald-700 text-white'
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
