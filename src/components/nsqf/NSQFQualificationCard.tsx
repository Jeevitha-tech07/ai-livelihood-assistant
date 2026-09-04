'use client';

import React from 'react';
import { NSQFQualification } from '@/types/nsqf';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { SkillGapAnalysisCard } from './SkillGapAnalysisCard';
import { LocalOpportunityCard } from './LocalOpportunityCard';
import { BeneficiaryProfile } from '@/types/profile';
import { useLanguage } from '@/context/LanguageContext';

interface NSQFQualificationCardProps {
  qualification: NSQFQualification;
  userSkills?: string[];
  fullProfile?: BeneficiaryProfile;
}

export function NSQFQualificationCard({
  qualification,
  userSkills = [],
  fullProfile,
}: NSQFQualificationCardProps) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const defaultCompetencies = [
    'Garment Drafting & Pattern Cutting',
    'Sewing Machine Maintenance & Operation',
    'Quality Inspection & Stitch Finishing',
    'Digital Marketing & Online Customer Management',
  ];

  const profileObj: BeneficiaryProfile = fullProfile || {
    location: 'Salem',
    education: '10th pass',
    family_occupation: 'Tailoring',
    current_livelihood: 'Stitching',
    skills: userSkills.length > 0 ? userSkills : ['stitching'],
    interests: ['tailoring'],
    mobility_constraints: 'Local',
    work_preference: 'Self-employed',
  };

  return (
    <Card className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all">
      <CardHeader className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-semibold border-emerald-500 text-emerald-700 dark:text-emerald-400">
              {qualification.sector_name}
            </Badge>
            <span className="text-xs font-mono text-slate-400">Code: {qualification.code}</span>
          </div>

          <CardTitle className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-50">
            {qualification.title}
          </CardTitle>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Awarding Body: <strong className="text-slate-700 dark:text-slate-300">{qualification.awarding_body}</strong>
          </p>
        </div>

        {/* Official NSQF Level Badge (Ground Truth) */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-center shadow-md">
            <div className="text-[10px] uppercase tracking-wider text-emerald-100">Official Level</div>
            <div className="text-2xl leading-none font-black">NSQF {qualification.nsqf_level}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {qualification.description}
        </p>

        {/* Training Hours Split (Theory, Practical, Employability, OJT) */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Training Delivery Hours ({qualification.maximum_notational_hours} Total Hours)</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-slate-500 text-[10px] font-semibold">Theory</div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                {qualification.training_delivery_hours.Theory || 0} hrs
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <div className="text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">Practical</div>
              <div className="font-bold text-emerald-950 dark:text-emerald-200 text-sm mt-0.5">
                {qualification.training_delivery_hours.Practical || 0} hrs
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-slate-500 text-[10px] font-semibold">Employability</div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                {qualification.training_delivery_hours.EmployabilitySkills || 0} hrs
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-slate-500 text-[10px] font-semibold">Mandatory OJT</div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                {qualification.training_delivery_hours.OJT_Mandatory || 0} hrs
              </div>
            </div>
          </div>
        </div>

        {/* Progression Pathway & Occupation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              {lang === 'ta' ? 'அடுத்தகட்ட வளர்ச்சி வழி' : 'Progression Pathway:'}
            </span>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              {qualification.progression_pathway}
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              {lang === 'ta' ? 'பரிந்துரைக்கப்பட்ட பணி வாய்ப்பு' : 'Proposed Occupations:'}
            </span>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              {qualification.proposed_occupation}
            </p>
          </div>
        </div>

        {/* Phase 6: Skill Gap Analysis Section */}
        <SkillGapAnalysisCard
          userSkills={profileObj.skills}
          requiredCompetencies={defaultCompetencies}
        />

        {/* Phase 7: Local Opportunity Analysis & Regional Map Section */}
        <LocalOpportunityCard profile={profileObj} qualification={qualification} />
      </CardContent>
    </Card>
  );
}
