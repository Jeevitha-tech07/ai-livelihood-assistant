'use client';

import React, { useState, useEffect } from 'react';
import { NSQFLoadingState } from './NSQFLoadingState';
import { LivelihoodBranchMap } from './LivelihoodBranchMap';
import { NSQFQualificationCard } from './NSQFQualificationCard';
import { RecommendationsContainer } from '@/components/recommendations/RecommendationsContainer';
import { BeneficiaryProfile } from '@/types/profile';
import { NSQFQualification } from '@/types/nsqf';
import { CoreSkillNode, PathwayBranchNode } from '@/lib/nsqf/matchingEngine';
import { ShieldCheck, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface NSQFMatchingContainerProps {
  profile: BeneficiaryProfile;
}

export function NSQFMatchingContainer({ profile }: NSQFMatchingContainerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [coreNode, setCoreNode] = useState<CoreSkillNode | null>(null);
  const [matchedQualifications, setMatchedQualifications] = useState<NSQFQualification[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<PathwayBranchNode | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  useEffect(() => {
    async function fetchMatches() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/nsqf/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile }),
        });
        const data = await res.json();
        if (data.success) {
          setCoreNode(data.coreNode);
          setMatchedQualifications(data.matchedQualifications);
        }
      } catch (err) {
        console.error('NSQF Match error:', err);
      } finally {
        setTimeout(() => setIsLoading(false), 1200);
      }
    }

    fetchMatches();
  }, [profile]);

  if (isLoading) {
    return <NSQFLoadingState />;
  }

  if (showRecommendations) {
    return (
      <RecommendationsContainer
        profile={profile}
        qualifications={matchedQualifications}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{lang === 'ta' ? 'அரசு NSQF தரவு அங்கீகாரம்' : 'Verified NSQF Qualification Pathways'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          {lang === 'ta' ? 'உங்களுக்கான வாழ்வாதார வரைபடம் & NSQF தகுதிகள்' : 'Livelihood Map & Verified NSQF Qualifications'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {lang === 'ta'
            ? 'உங்கள் சுயவிவரத்தின் அடிப்படையில் கண்டறியப்பட்ட திறன் வழிகள் மற்றும் அரசு அங்கீகாரம் பெற்ற NSQF பாடத்திட்ட விவரங்கள்.'
            : 'Explore branching career pathways derived from your core skills alongside official government-certified NSQF qualifications.'}
        </p>
      </div>

      {/* Livelihood Branching Tree Diagram */}
      {coreNode && (
        <LivelihoodBranchMap
          coreNode={coreNode}
          onSelectBranch={(branch) => setSelectedBranch(branch)}
        />
      )}

      {/* Selected Branch Notification Banner */}
      {selectedBranch && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>
              Selected Pathway: <strong>{selectedBranch.title[lang]}</strong> (NSQF Level {selectedBranch.nsqfLevel})
            </span>
          </div>
          <button onClick={() => setSelectedBranch(null)} className="text-xs underline text-emerald-700">
            Clear
          </button>
        </div>
      )}

      {/* Verified NSQF Ground-Truth Qualification Cards & Skill Gap & Local Opportunity Analysis */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600" />
            <span>{lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட NSQF தகுதிகள் & உள்ளூர் வாய்ப்பு' : 'Matched NSQF Qualifications & Local Opportunities'}</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {matchedQualifications.length} official qualifications matched
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {matchedQualifications.map((qual) => (
            <NSQFQualificationCard
              key={qual.code}
              qualification={qual}
              userSkills={profile.skills || []}
              fullProfile={profile}
            />
          ))}
        </div>
      </div>

      {/* Phase 8 Action Trigger Button */}
      <div className="pt-6 text-center space-y-3">
        <Button
          onClick={() => setShowRecommendations(true)}
          size="lg"
          className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 dark:shadow-none flex items-center justify-center gap-2 group"
        >
          <span>{lang === 'ta' ? 'பரிந்துரைகள் & பாதை வரைபடம் காண்க' : 'View Ranked Recommendations & Roadmap'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
