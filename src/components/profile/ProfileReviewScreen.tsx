'use client';

import React, { useState } from 'react';
import { ProfileReviewCard } from './ProfileReviewCard';
import { Button } from '@/components/ui/button';
import { Check, ShieldCheck } from 'lucide-react';
import { BeneficiaryProfile, ProfileFieldKey } from '@/types/profile';
import { useLanguage } from '@/context/LanguageContext';

interface ProfileReviewScreenProps {
  initialProfile: Partial<BeneficiaryProfile>;
  onConfirmProfile: (profile: BeneficiaryProfile) => void;
  onEditInChat?: () => void;
}

export function ProfileReviewScreen({
  initialProfile,
  onConfirmProfile,
}: ProfileReviewScreenProps) {
  const [profile, setProfile] = useState<Partial<BeneficiaryProfile>>(initialProfile);
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const handleUpdateField = (fieldKey: ProfileFieldKey, newValue: string | string[]) => {
    setProfile((prev) => ({
      ...prev,
      [fieldKey]: newValue,
    }));
  };

  const handleConfirm = () => {
    // Fill defaults for any empty fields if needed
    const completeProfile: BeneficiaryProfile = {
      location: profile.location || 'Tamil Nadu',
      education: profile.education || 'Not specified',
      family_occupation: profile.family_occupation || 'General',
      current_livelihood: profile.current_livelihood || 'General',
      skills: Array.isArray(profile.skills) && profile.skills.length > 0 ? profile.skills : ['Basic vocational'],
      interests: Array.isArray(profile.interests) && profile.interests.length > 0 ? profile.interests : ['General'],
      mobility_constraints: profile.mobility_constraints || 'Local',
      work_preference: profile.work_preference || 'Wage employment',
    };

    onConfirmProfile(completeProfile);
  };

  const text = {
    en: {
      badge: 'Step 4 of Assessment',
      title: 'Review & Confirm Profile',
      subtitle: 'Click any pencil icon to update your responses before finding matching NSQF opportunities.',
      confirmBtn: 'Confirm & Continue',
      dataIntegrity: 'Ground-truth guarantee: NSQF qualification data is retrieved directly from official government records.',
    },
    ta: {
      badge: 'மதிப்பீட்டின்படி நிலை 4',
      title: 'சுயவிவரத்தைச் சரிபார்த்து உறுதிசெய்யவும்',
      subtitle: 'NSQF தகுதிகளை ஒப்பிடும் முன் விவரங்களை மாற்ற பென்சில் குறியீட்டைக் கிளிக் செய்யவும்.',
      confirmBtn: 'உறுதிசெய்து தொடரவும்',
      dataIntegrity: 'அரசு NSQF தரவுத்தளத்திலிருந்து நேரடி உண்மைத் தரவு பெறப்படுகிறது.',
    },
  }[lang];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          {text.badge}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          {text.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          {text.subtitle}
        </p>
      </div>

      {/* Main Editable Card */}
      <ProfileReviewCard profile={profile} onUpdateField={handleUpdateField} />

      {/* Data Guarantee Note & Confirm Button */}
      <div className="space-y-4 max-w-xl mx-auto text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          🔒 {text.dataIntegrity}
        </p>

        {/* Primary Confirm & Continue Button with Check Icon */}
        <Button
          onClick={handleConfirm}
          size="lg"
          className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 dark:shadow-none flex items-center justify-center gap-2 group"
        >
          <Check className="w-6 h-6 stroke-[3]" />
          <span>{text.confirmBtn}</span>
        </Button>
      </div>
    </div>
  );
}
