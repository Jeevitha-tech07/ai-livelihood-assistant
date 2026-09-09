'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function WelcomeHero() {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      badge: 'Government NSQF Aligned',
      title: 'AI Voice Livelihood Assistant',
      subtitle:
        'Discover official NSQF skill qualifications, government-aligned career pathways, and customized livelihood opportunities in your preferred language.',
    },
    ta: {
      badge: 'அரசு NSQF தரநிலை கொண்டது',
      title: 'செயற்கை நுண்ணறிவு வாழ்வாதார உதவியாளர்',
      subtitle:
        'அரசு அங்கீகாரம் பெற்ற NSQF திறன் தகுதிகள் மற்றும் உங்களுக்கான வேலைவாய்ப்பு வழிகளை உங்கள் தாய்மொழியில் கண்டறியுங்கள்.',
    },
  };

  const text = content[currentLanguage as keyof typeof content] || content.en;

  return (
    <div className="flex flex-col items-center text-center space-y-5 max-w-2xl mx-auto">
      {/* Social Impact / Government Tech Identity Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>{text.badge} • Ministry of Skill Development & Entrepreneurship Framework</span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
        {text.title}
      </h1>

      {/* One-Line Value Proposition */}
      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
        {text.subtitle}
      </p>
    </div>
  );
}
