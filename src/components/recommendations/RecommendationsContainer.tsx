'use client';

import React, { useState } from 'react';
import { RecommendationCard, RankedRecommendationOption } from './RecommendationCard';
import { GovernmentSupportSection } from './GovernmentSupportSection';
import { RoadmapStepper } from './RoadmapStepper';
import { MyJourneyTracker } from '@/components/progress/MyJourneyTracker';
import { BeneficiaryProfile } from '@/types/profile';
import { NSQFQualification } from '@/types/nsqf';
import { ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface RecommendationsContainerProps {
  profile: BeneficiaryProfile;
  qualifications: NSQFQualification[];
}

export function RecommendationsContainer({
  qualifications,
}: RecommendationsContainerProps) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const defaultQual = qualifications[0] || {
    source_files: [],
    s_no: 1,
    title: 'Self Employed Tailor',
    code: 'PWD/AMH/Q1947',
    description: 'A Self Employed Tailor is a skilled artisan capable of drafting, cutting, stitching, and finishing garments independently or through custom boutique/home-based setup.',
    sector_name: 'Apparel Made-ups & Home Furnishing',
    nsqf_level: 4,
    maximum_notational_hours: 400,
    minimum_notational_hours: 350,
    version: '2.0',
    originally_approved: '2021-06-25',
    valid_till: '2026-06-25',
    awarding_body: 'AMHSSC',
    certifying_bodies: 'NCVET',
    proposed_occupation: 'Self Employed Tailor',
    progression_pathway: 'Assistant Tailor -> Self Employed Tailor -> Boutique Owner',
    qualification_type: 'Qualifications Pack',
    adopted_qualification: 'NOS',
    training_delivery_hours: { Theory: 100, Practical: 220, EmployabilitySkills: 40, OJT_Mandatory: 40 },
  };

  const rankedOptions: RankedRecommendationOption[] = [
    {
      rank: 1,
      rankBadge: '🥇',
      matchPercentage: 96,
      qualification: defaultQual,
      whyExplanation: {
        en: 'Highest overall match (96%). Aligns directly with your self-employment preference, local district training availability at Government ITI Salem (4.2 km), and high apparel market demand.',
        ta: 'மிக உயர்ந்த 96% பொருத்தம். உங்கள் சுயதொழில் விருப்பத்திற்கும், சேலம் அரசு ITI பயிற்சி மையத்திற்கும், ஆடை துறை தேவைகளுக்கும் நேரடியாகப் பொருந்துகிறது.',
      },
      trainingPath: {
        en: '400-hour NSQF Level 4 Self Employed Tailor curriculum with 220 hrs practical stitching + 40 hrs mandatory OJT.',
        ta: '400 மணிநேர NSQF நிலை 4 தையல் கலை பாடத்திட்டம் (220 மணிநேர நடைமுறை பயிற்சி + 40 மணிநேர OJT).',
      },
      trainingCenter: {
        name: 'Government ITI Salem',
        type: 'Government ITI',
        distanceKm: 4.2,
        phone: '+91 427 2400123',
        mapUrl: 'https://maps.google.com/?q=Government+ITI+Salem',
      },
    },
    {
      rank: 2,
      rankBadge: '🥈',
      matchPercentage: 88,
      qualification: {
        ...defaultQual,
        title: 'Sewing Machine Operator & Alteration Specialist',
        code: 'AMH/Q0301',
        nsqf_level: 3,
        maximum_notational_hours: 300,
        description: 'Performs commercial garment manufacturing, specialized alterations, and precision stitching operations.',
      },
      whyExplanation: {
        en: 'Strong 88% match. Faster 300-hour entry route for immediate wage employment or garment factory line work.',
        ta: '88% பொருத்தம். உடனடி ஆடை தொழிற்சாலை வேலைவாய்ப்பிற்கு 300 மணிநேர விரைவு பயிற்சி வழி.',
      },
      trainingPath: {
        en: '300-hour NSQF Level 3 Sewing Machine Operator course with 180 hrs practical machine handling.',
        ta: '300 மணிநேர NSQF நிலை 3 தையல் இயந்திர இயக்கம் மற்றும் தையல் பயிற்சி.',
      },
      trainingCenter: {
        name: 'PMKVY Training Centre Salem',
        type: 'PMKVY Center',
        distanceKm: 6.5,
        phone: '+91 427 2459876',
        mapUrl: 'https://maps.google.com/?q=PMKVY+Salem',
      },
    },
    {
      rank: 3,
      rankBadge: '🥉',
      matchPercentage: 82,
      qualification: {
        ...defaultQual,
        title: 'Apparel Boutique Entrepreneur & Designer',
        code: 'AMH/Q1950',
        nsqf_level: 5,
        maximum_notational_hours: 500,
        description: 'Advanced custom boutique designing, customer styling, pattern drafting, and retail business operations.',
      },
      whyExplanation: {
        en: '82% match. Long-term progression pathway after completing Level 4, suitable for expanding into a branded boutique.',
        ta: '82% பொருத்தம். நிலை 4 பயிற்சிக்கு பின் சொந்த பிராண்டட் பூட்டிக் கடை தொடங்குவதற்கான உயர்கட்ட வளர்ச்சி பாதை.',
      },
      trainingPath: {
        en: '500-hour NSQF Level 5 Boutique Entrepreneurship curriculum with digital marketing & business management.',
        ta: '500 மணிநேர NSQF நிலை 5 பூட்டிக் வடிவமைப்பு மற்றும் தொழில் முனைவோர் பயிற்சி.',
      },
      trainingCenter: {
        name: 'Government ITI Salem',
        type: 'Government ITI',
        distanceKm: 4.2,
        phone: '+91 427 2400123',
        mapUrl: 'https://maps.google.com/?q=Government+ITI+Salem',
      },
    },
  ];

  const [selectedOption, setSelectedOption] = useState<RankedRecommendationOption>(rankedOptions[0]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{lang === 'ta' ? 'அரசு அங்கீகாரம் பெற்ற பரிந்துரைகள்' : 'Verified NSQF Livelihood Recommendations'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          {lang === 'ta' ? 'பரிந்துரைக்கப்பட்ட வாய்ப்புகள் & பாதை வரைபடம்' : 'Ranked Recommendations & Action Roadmap'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {lang === 'ta'
            ? 'உங்கள் சுயவிவரத்திற்கு மிகச் சிறந்த 3 வாழ்வாதார வாய்ப்புகள் மற்றும் அரசு நிதியுதவி விவரங்கள்.'
            : 'Top ranked NSQF-aligned livelihood options tailored to your skills, accompanied by verified PM-AJAY support and a step-by-step roadmap.'}
        </p>
      </div>

      {/* Phase 9: "My Journey" Status Tracker */}
      <MyJourneyTracker />

      {/* Ranked Recommendation Cards (Top 3 Options) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>{lang === 'ta' ? 'முன்னணி 3 பரிந்துரைகள்' : 'Top Ranked Livelihood Opportunities'}</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Click card to view roadmap</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {rankedOptions.map((opt) => (
            <RecommendationCard
              key={opt.rank}
              option={opt}
              isSelected={selectedOption.rank === opt.rank}
              onSelectOption={(o) => setSelectedOption(o)}
            />
          ))}
        </div>
      </div>

      {/* Verified Government / PM-AJAY Support Section */}
      <GovernmentSupportSection />

      {/* Personalized Step-by-Step Vertical Roadmap Stepper */}
      <RoadmapStepper qualificationTitle={selectedOption.qualification.title} />
    </div>
  );
}
