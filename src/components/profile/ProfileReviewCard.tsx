'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ProfileReviewRow } from './ProfileReviewRow';
import { BeneficiaryProfile, ProfileFieldKey } from '@/types/profile';
import { UserCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ProfileReviewCardProps {
  profile: Partial<BeneficiaryProfile>;
  onUpdateField: (fieldKey: ProfileFieldKey, newValue: string | string[]) => void;
}

export function ProfileReviewCard({ profile, onUpdateField }: ProfileReviewCardProps) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const fieldDefinitions: { key: ProfileFieldKey; label: { en: string; ta: string } }[] = [
    { key: 'education', label: { en: 'Education', ta: 'கல்வித்தகுதி' } },
    { key: 'family_occupation', label: { en: 'Family Occupation', ta: 'குடும்ப தொழில்' } },
    { key: 'current_livelihood', label: { en: 'Current Livelihood', ta: 'தற்போதைய தொழில்' } },
    { key: 'skills', label: { en: 'Skills & Experience', ta: 'திறன்கள்' } },
    { key: 'interests', label: { en: 'Interests', ta: 'ஆர்வங்கள்' } },
    { key: 'mobility_constraints', label: { en: 'Mobility & Constraints', ta: 'சுழற்சி / கட்டுப்பாடுகள்' } },
    { key: 'work_preference', label: { en: 'Work Preference', ta: 'வேலை விருப்பம்' } },
    { key: 'location', label: { en: 'Location', ta: 'இருப்பிடம்' } },
  ];

  const headers = {
    en: {
      title: 'Beneficiary Livelihood Profile',
      desc: 'Review and confirm your extracted attributes before matching with official NSQF qualifications.',
    },
    ta: {
      title: 'பயனாளியின் வாழ்வாதார சுயவிவரம்',
      desc: 'அரசு NSQF தகுதிகளுடன் ஒப்பிடும் முன் உங்கள் விவரங்களை சரிபார்த்து உறுதிசெய்யவும்.',
    },
  }[lang];

  return (
    <Card className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md">
      <CardHeader className="p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {headers.title}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {headers.desc}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-3">
        {fieldDefinitions.map((def) => (
          <ProfileReviewRow
            key={def.key}
            fieldKey={def.key}
            label={def.label[lang]}
            value={profile[def.key] || ''}
            onSave={onUpdateField}
          />
        ))}
      </CardContent>
    </Card>
  );
}
