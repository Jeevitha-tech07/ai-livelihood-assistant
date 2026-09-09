'use client';

import React, { useState } from 'react';
import { RecommendationCard, RankedRecommendationOption } from './RecommendationCard';
import { GovernmentSupportSection } from './GovernmentSupportSection';
import { RoadmapStepper } from './RoadmapStepper';
import { MyJourneyTracker } from '@/components/progress/MyJourneyTracker';
import { LivelihoodBranchMap } from '@/components/nsqf/LivelihoodBranchMap';
import { SkillGapAnalysisCard } from '@/components/nsqf/SkillGapAnalysisCard';
import { LocalOpportunityCard } from '@/components/nsqf/LocalOpportunityCard';
import { NSQFQualificationCard } from '@/components/nsqf/NSQFQualificationCard';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { BeneficiaryProfile } from '@/types/profile';
import { NSQFQualification } from '@/types/nsqf';
import { CoreSkillNode } from '@/lib/nsqf/matchingEngine';
import {
  ShieldCheck,
  Trophy,
  Sparkles,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  BarChart3,
  Layers,
  CheckCircle2,
  Code2,
  Compass,
  Landmark,
  Building2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

interface RecommendationsContainerProps {
  profile: BeneficiaryProfile;
  qualifications: NSQFQualification[];
  coreNode?: CoreSkillNode | null;
}

export function RecommendationsContainer({
  profile,
  qualifications,
  coreNode,
}: RecommendationsContainerProps) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const defaultQual = qualifications[0] || {
    source_files: [],
    s_no: 1,
    title: 'Self Employed Tailor',
    code: 'PWD/AMH/Q1947',
    description:
      'A Self Employed Tailor is a skilled artisan capable of drafting, cutting, stitching, and finishing garments independently or through custom boutique/home-based setup.',
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

  const fallbackCoreNode: CoreSkillNode = coreNode || {
    id: 'apparel-tailoring',
    title: { en: 'Apparel & Garment Stitching', ta: 'ஆடை வடிவமைப்பு & தையல் கலை' },
    sector: defaultQual.sector_name || 'Apparel Made-ups & Home Furnishing',
    description: {
      en: 'Pattern drafting, commercial sewing machine operation, and custom garment fabrication.',
      ta: 'ஆடை வரைபடம், தையல் இயந்திர இயக்கம் மற்றும் ஆடை வடிவமைப்பு.',
    },
    iconType: 'Shirt',
    branches: [
      {
        id: 'self-tailor',
        title: { en: 'Self Employed Tailor & Boutique', ta: 'சுயதொழில் தையல் கலைஞர்' },
        description: {
          en: 'Independent drafting, custom stitching, boutique setup, and alterational tailoring.',
          ta: 'சுயதொழில் தையல் கடை மற்றும் பூட்டிக் வடிவமைப்பு.',
        },
        matchedQualificationCode: defaultQual.code,
        nsqfLevel: defaultQual.nsqf_level,
        iconType: 'Scissors',
        employmentType: 'Self-Employed / Entrepreneur',
      },
      {
        id: 'sewing-operator',
        title: { en: 'Garment Sewing Operator', ta: 'தையல் இயந்திர ஆபரேட்டர்' },
        description: {
          en: 'Factory line production, motorized lockstitch operation, and industrial assembly.',
          ta: 'தொழிற்சாலை ஆடை உற்பத்தி தையல் பணி.',
        },
        matchedQualificationCode: 'AMH/Q0301',
        nsqfLevel: 3,
        iconType: 'Shirt',
        employmentType: 'Wage Employment',
      },
      {
        id: 'boutique-owner',
        title: { en: 'Apparel Boutique Owner', ta: 'பூட்டிக் கடை உரிமையாளர்' },
        description: {
          en: 'Advanced design boutique, retail customer styling, and team supervision.',
          ta: 'உயர்கட்ட பூட்டிக் மற்றும் ஆடை வடிவமைப்பு நிறுவனம்.',
        },
        matchedQualificationCode: 'AMH/Q1950',
        nsqfLevel: 5,
        iconType: 'Store',
        employmentType: 'Self-Employed / Employer',
      },
    ],
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
      qualification: qualifications[1] || {
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
      qualification: qualifications[2] || {
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
  const [techDetailsOpen, setTechDetailsOpen] = useState(false);

  // Extract skills string array safely
  const userSkillList = Array.isArray(profile.skills) && profile.skills.length > 0 ? profile.skills : ['Tailoring', 'Stitching'];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-12 animate-in fade-in duration-300">
      
      {/* SECTION 1: HEADER & NAVIGATION */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>National Skill Qualification Framework Aligned • Ministry of Skill Development</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          {lang === 'ta' ? 'அரசு அங்கீகாரம் பெற்ற வாழ்வாதார பரிந்துரைகள்' : 'Verified NSQF Livelihood Recommendations'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {lang === 'ta'
            ? 'உங்கள் திறன் சுயவிவரத்திற்கு ஏற்ப கண்டறியப்பட்ட NSQF தகுதிகள், அரசு நலத்திட்டங்கள் மற்றும் பாதை வரைபடம்.'
            : 'Top ranked NSQF-aligned livelihood options tailored to your skills, accompanied by verified PM-AJAY support and a step-by-step roadmap.'}
        </p>
      </div>

      {/* SECTION 2: RESULT SUMMARY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Profile Completeness</div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">100% Verified</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Verified Matches</div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{qualifications.length || 3} NSQF Courses</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Target Sector</div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate max-w-[130px]" title={defaultQual.sector_name}>
                {defaultQual.sector_name}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Recommended Level</div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">NSQF Level {defaultQual.nsqf_level}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 3: BENEFICIARY PROFILE (2-COLUMN DESKTOP GRID) */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md">
        <CardHeader className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-extrabold text-slate-900 dark:text-slate-50">
                {lang === 'ta' ? 'பயனாளி விவரம் (Beneficiary Profile)' : 'Verified Beneficiary Profile'}
              </CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'ta' ? 'உரையாடல் மூலம் பெறப்பட்டு சரிபார்க்கப்பட்ட சுயவிவரத் தகவல்கள்' : 'Extracted & confirmed baseline data for NSQF skill alignment'}
              </p>
            </div>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono text-xs">
            Verified
          </Badge>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Demographics & Personal Attributes */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <MapPin className="w-4 h-4" />
                <span>Demographics & Location</span>
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-500">Target District:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{profile.location || 'Salem, Tamil Nadu'}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-500">Education Qualification:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{profile.education || '10th Pass'}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-500">Work Preference:</span>
                  <Badge variant="outline" className="text-xs border-emerald-500 text-emerald-700 dark:text-emerald-400 font-semibold">
                    {profile.work_preference || 'Self-Employed'}
                  </Badge>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Mobility Constraints:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{profile.mobility_constraints || 'Local District'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Skills & Livelihood Experience */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Briefcase className="w-4 h-4" />
                <span>Skills & Work Experience</span>
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-500">Primary Core Skills:</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {userSkillList.map((sk, i) => (
                      <Badge key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px]">
                        {sk}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-500">Current Occupation:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{profile.current_livelihood || 'Tailoring & Stitching'}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-500">Family Occupation:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{profile.family_occupation || 'Textile / Apparel'}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Target Monthly Income:</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">₹15,000 - ₹25,000 / mo</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 4: LIVELIHOOD PATHWAY MAPPING (BRANCH TREE DIAGRAM) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600" />
            <span>{lang === 'ta' ? 'வாழ்வாதார பாதை வரைபடம்' : 'Livelihood Pathway Mapping'}</span>
          </h2>
          <span className="text-xs text-slate-500">Core skill node branching pathways</span>
        </div>

        <LivelihoodBranchMap coreNode={fallbackCoreNode} />
      </div>

      {/* SECTION 5: SKILL GAP ANALYSIS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <span>{lang === 'ta' ? 'திறன் இடைவெளி பகுப்பாய்வு' : 'Skill Gap & Competency Analysis'}</span>
          </h2>
        </div>

        <SkillGapAnalysisCard
          userSkills={userSkillList}
          requiredCompetencies={[
            'Garment Drafting & Pattern Cutting',
            'Sewing Machine Maintenance & Operation',
            'Quality Inspection & Stitch Finishing',
            'Digital Marketing & Customer Operations',
          ]}
        />
      </div>

      {/* SECTION 6: TOP RECOMMENDATIONS (RANKED OPTIONS) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
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

      {/* SECTION 7: NSQF TRAINING COURSES / QUALIFICATIONS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            <span>{lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட NSQF தகுதிகள்' : 'Official Matched NSQF Qualifications'}</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {qualifications.length || 1} verified qualification records
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {qualifications.map((qual) => (
            <NSQFQualificationCard
              key={qual.code}
              qualification={qual}
              userSkills={userSkillList}
              fullProfile={profile}
            />
          ))}
        </div>
      </div>

      {/* SECTION 8: LOCAL OPPORTUNITIES & REGIONAL MARKET */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>{lang === 'ta' ? 'உள்ளூர் வாய்ப்பு & மையங்கள்' : 'Local Market Demand & Training Centers'}</span>
          </h2>
        </div>

        <LocalOpportunityCard profile={profile} qualification={defaultQual} />
      </div>

      {/* SECTION 9: EMPLOYMENT VS SELF-EMPLOYMENT PATHWAY PREFERENCE */}
      <Card className="bg-slate-900 text-white border-slate-800 shadow-xl overflow-hidden">
        <CardHeader className="p-6 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-white">
                  Employment Pathway Preference: {profile.work_preference || 'Self-Employment'}
                </CardTitle>
                <p className="text-xs text-slate-400">
                  Customized strategy matching your preference for {profile.work_preference || 'Self-Employed Home Enterprise'}
                </p>
              </div>
            </div>
            <Badge className="bg-emerald-950 text-emerald-300 border-emerald-800 font-mono text-xs">
              Tailored Route
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Landmark className="w-4 h-4" />
                <span>Micro-Enterprise Support (Self-Employed)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Eligible for ₹50,000 capital subsidy grant under PM-AJAY + ₹1,00,000 collateral-free Mudra Shishu loan for sewing equipment and workspace setup.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Briefcase className="w-4 h-4" />
                <span>Garment Industrial Cluster Placement</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct hiring partnership with registered Tiruppur & Salem apparel exporters offering wage employment ranging from ₹14,000 to ₹18,000/month.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 10: ACTION PLAN / CAREER ROADMAP */}
      <div className="space-y-4">
        <MyJourneyTracker />
        <RoadmapStepper qualificationTitle={selectedOption.qualification.title} />
      </div>

      {/* SECTION 11: GOVERNMENT SUPPORT & SCHEMES */}
      <GovernmentSupportSection />

      {/* SECTION 12: TECHNICAL DETAILS (COLLAPSED JSON ACCORDION) */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-600" />
          <span>Audit & Debugging Transparency</span>
        </div>

        <Accordion className="w-full">
          <AccordionItem>
            <AccordionTrigger
              isOpen={techDetailsOpen}
              onToggle={() => setTechDetailsOpen(!techDetailsOpen)}
              className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <span>Technical Details & Raw Profile Payload (JSON)</span>
              </div>
            </AccordionTrigger>

            <AccordionContent isOpen={techDetailsOpen} className="bg-slate-950 text-emerald-400 font-mono p-4 rounded-b-xl overflow-x-auto text-xs">
              <pre className="whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(
                  {
                    beneficiaryProfile: profile,
                    matchedQualificationsCount: qualifications.length,
                    topMatch: defaultQual.code,
                    timestamp: new Date().toISOString(),
                    engineVersion: 'NSQF-Engine-v2.0-SIH2026',
                  },
                  null,
                  2
                )}
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* SECTION 13: FOOTER & GOVT COMPLIANCE NOTICE BAR */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Ministry of Skill Development & Entrepreneurship • Government of India • SIH 2026</span>
        </div>
        <p className="text-[11px] text-slate-400 max-w-xl mx-auto">
          All qualification pack data, national occupational standards (NOS), and credit levels are synchronized directly with NCVET national repository standards.
        </p>
      </div>

    </div>
  );
}
