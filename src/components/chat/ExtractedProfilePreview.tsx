'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BeneficiaryProfile } from '@/types/profile';
import { CheckCircle2, Circle, UserCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ExtractedProfilePreviewProps {
  profile: Partial<BeneficiaryProfile>;
}

export function ExtractedProfilePreview({ profile }: ExtractedProfilePreviewProps) {
  const { currentLanguage } = useLanguage();

  const fieldLabels: Record<keyof BeneficiaryProfile, { en: string; ta: string }> = {
    location: { en: 'Location', ta: 'இருப்பிடம்' },
    education: { en: 'Education', ta: 'கல்வித்தகுதி' },
    family_occupation: { en: 'Family Background', ta: 'குடும்ப தொழில்' },
    current_livelihood: { en: 'Current Livelihood', ta: 'தற்போதைய தொழில்' },
    skills: { en: 'Skills & Experience', ta: 'திறன்கள் & அனுபவம்' },
    interests: { en: 'Interests & Aspirations', ta: 'ஆர்வங்கள்' },
    mobility_constraints: { en: 'Mobility & Constraints', ta: 'சுழற்சி / கட்டுப்பாடுகள்' },
    work_preference: { en: 'Work Preference', ta: 'வேலை விருப்பம்' },
  };

  const fields: (keyof BeneficiaryProfile)[] = [
    'location',
    'education',
    'family_occupation',
    'current_livelihood',
    'skills',
    'interests',
    'mobility_constraints',
    'work_preference',
  ];

  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  return (
    <Card className="w-full bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-none">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-600" />
          {lang === 'ta' ? 'பிரித்தெடுக்கப்பட்ட சுயவிவரம் (Extracted JSON)' : 'Extracted Profile JSON'}
        </CardTitle>
        <Badge variant="outline" className="text-[10px] bg-white dark:bg-slate-950 font-mono">
          Structured JSON
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {fields.map((key) => {
            const rawVal = profile[key];
            const hasVal = Array.isArray(rawVal) ? rawVal.length > 0 : Boolean(rawVal);
            const displayVal = Array.isArray(rawVal)
              ? rawVal.join(', ')
              : (rawVal as string) || '';

            return (
              <div
                key={key}
                className={`p-2.5 rounded-xl border transition-all ${
                  hasVal
                    ? 'bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800 text-slate-900 dark:text-slate-100'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between font-semibold mb-1 text-[11px]">
                  <span>{fieldLabels[key][lang]}</span>
                  {hasVal ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 shrink-0" />
                  )}
                </div>

                <div className="text-xs truncate font-medium">
                  {hasVal ? (
                    <span className="text-emerald-950 dark:text-emerald-200">{displayVal}</span>
                  ) : (
                    <span className="italic text-slate-400">Not provided yet</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
