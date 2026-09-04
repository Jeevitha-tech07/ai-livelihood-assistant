'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  BookOpen,
  Smartphone,
  School,
  Wallet,
  ShoppingBag,
  TrendingUp,
  MapPin,
  LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface RoadmapStep {
  stepNumber: number;
  icon: LucideIcon;
  title: { en: string; ta: string };
  subtitle: { en: string; ta: string };
  status: 'completed' | 'current' | 'upcoming';
  duration: string;
}

interface RoadmapStepperProps {
  qualificationTitle?: string;
}

export function RoadmapStepper({ qualificationTitle }: RoadmapStepperProps) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const steps: RoadmapStep[] = [
    {
      stepNumber: 1,
      icon: Check,
      title: { en: 'Livelihood & Skill Assessment', ta: 'வாழ்வாதார மற்றும் திறன் மதிப்பீடு' },
      subtitle: { en: 'Beneficiary profile extracted & validated', ta: 'பயனாளி விவரங்கள் சேகரிக்கப்பட்டு சரிபார்க்கப்பட்டது' },
      status: 'completed',
      duration: 'Completed',
    },
    {
      stepNumber: 2,
      icon: BookOpen,
      title: {
        en: `NSQF Qualification Selection (${qualificationTitle || 'Self Employed Tailor'})`,
        ta: `NSQF தகுதித் தேர்வு (${qualificationTitle || 'சுயதொழில் தையல் கலைஞர்'})`,
      },
      subtitle: { en: 'Target NSQF Level 4 curriculum selected', ta: 'அரசு NSQF நிலை 4 பாடத்திட்டம் தேர்வு செய்யப்பட்டது' },
      status: 'completed',
      duration: 'Phase 5 Matched',
    },
    {
      stepNumber: 3,
      icon: Smartphone,
      title: { en: 'Digital Literacy & Voice App Onboarding', ta: 'டிஜிட்டல் பயிற்சி மற்றும் குரல் செயலிகள்' },
      subtitle: { en: 'Setup voice assistant & regional digital tools', ta: 'குரல் உதவியாளர் மற்றும் பயன்பாட்டு கருவிகள் அமைவு' },
      status: 'current',
      duration: 'Week 1',
    },
    {
      stepNumber: 4,
      icon: School,
      title: { en: 'PMKVY / Government ITI Center Admission', ta: 'அரசு ITI / PMKVY மைய சேர்க்கை' },
      subtitle: { en: 'Enrollment for 400-hour NSQF certified course', ta: '400 மணிநேர NSQF சான்றிதழ் படிப்பில் சேருதல்' },
      status: 'upcoming',
      duration: 'Month 1-3',
    },
    {
      stepNumber: 5,
      icon: Wallet,
      title: { en: 'PM-AJAY & Mudra Financial Grant Application', ta: 'PM-AJAY மற்றும் முத்ரா நிதி உதவி விண்ணப்பம்' },
      subtitle: { en: 'Application for ₹50,000 micro-enterprise capital grant', ta: '₹50,000 சிறு தொழில் மூலதன மானிய விண்ணப்பம்' },
      status: 'upcoming',
      duration: 'Month 3',
    },
    {
      stepNumber: 6,
      icon: ShoppingBag,
      title: { en: 'Boutique / Home Enterprise Setup', ta: 'தையல் பூட்டிக் / வீட்டக தொழில் தொடக்கம்' },
      subtitle: { en: 'Purchase machinery & launch local customer services', ta: 'இயந்திரங்கள் வாங்கி உள்ளூர் சேவைகளைத் தொடங்குதல்' },
      status: 'upcoming',
      duration: 'Month 4',
    },
    {
      stepNumber: 7,
      icon: TrendingUp,
      title: { en: 'Sustainable Income & Market Expansion', ta: 'நிலையான வருமானம் & சந்தை விரிவாக்கம்' },
      subtitle: { en: 'Online catalog & SHG group order fulfillment', ta: 'ஆன்லைன் மூலமாகவும் குழு ஆர்டர்கள் மூலமாகவும் வருமான வளர்ச்சி' },
      status: 'upcoming',
      duration: 'Month 6+',
    },
  ];

  return (
    <Card className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg mt-8">
      <CardHeader className="p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-xl font-extrabold text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>{lang === 'ta' ? 'தனிப்பயனாக்கப்பட்ட படி-படியான பாதை வரைபடம்' : 'Personalized Livelihood Action Roadmap'}</span>
            </CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'ta'
                ? 'உங்கள் இலக்கு NSQF தகுதியை அடைவதற்கான 7 படி-படியான பாதை'
                : 'Step-by-step 7-phase timeline to achieve your target NSQF qualification and sustainable livelihood'}
            </p>
          </div>
          <Badge className="bg-emerald-600 text-white font-bold text-xs px-3 py-1 self-start sm:self-center">
            7 Steps to Success
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8">
        {/* Vertical Stepper / Timeline Layout */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
          {steps.map((step) => {
            const IconComp = step.icon;

            return (
              <div key={step.stepNumber} className="relative group">
                {/* Stepper Node Circle Icon */}
                <div
                  className={`absolute -left-[35px] sm:-left-[43px] top-0.5 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-md ${
                    step.status === 'completed'
                      ? 'bg-emerald-600 text-white shadow-emerald-200 dark:shadow-none ring-4 ring-emerald-50 dark:ring-emerald-950/40'
                      : step.status === 'current'
                      ? 'bg-amber-500 text-white shadow-amber-200 dark:shadow-none ring-4 ring-amber-50 dark:ring-amber-950/40 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <IconComp className="w-5 h-5 stroke-[2.5]" />
                </div>

                {/* Step Content Card */}
                <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        Step {step.stepNumber}
                      </span>
                      <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                        {step.title[lang]}
                      </h4>
                    </div>

                    <Badge
                      variant={step.status === 'completed' ? 'default' : 'secondary'}
                      className="text-[10px] self-start sm:self-center font-semibold"
                    >
                      {step.duration}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {step.subtitle[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
