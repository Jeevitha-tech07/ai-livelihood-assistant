import { BeneficiaryProfile } from '@/types/profile';
import { NSQFQualification } from '@/types/nsqf';
import { nsqfRepository } from './repository';

export interface PathwayBranchNode {
  id: string;
  title: { en: string; ta: string };
  iconType: 'Shirt' | 'Scissors' | 'Store' | 'Home' | 'ShoppingCart' | 'Wrench' | 'Zap';
  description: { en: string; ta: string };
  nsqfLevel: number;
  matchedQualificationCode: string;
  employmentType: string;
}

export interface CoreSkillNode {
  id: string;
  title: { en: string; ta: string };
  sector: string;
  iconType: string;
  description: { en: string; ta: string };
  branches: PathwayBranchNode[];
}

export interface MatchingResult {
  coreNode: CoreSkillNode;
  matchedQualifications: NSQFQualification[];
}

export async function matchBeneficiaryProfileToNSQF(
  profile: BeneficiaryProfile
): Promise<MatchingResult> {
  const allQualifications = await nsqfRepository.getAllQualifications();

  const skillsText = (profile.skills || []).join(' ').toLowerCase();
  const interestsText = (profile.interests || []).join(' ').toLowerCase();
  const currentWorkText = (profile.current_livelihood || '').toLowerCase();
  const combined = `${skillsText} ${interestsText} ${currentWorkText}`;

  let selectedQualifications: NSQFQualification[] = [];

  if (combined.includes('tailor') || combined.includes('sewing') || combined.includes('stitching') || combined.includes('cloth') || combined.includes('apparel')) {
    selectedQualifications = allQualifications.filter((q) => q.sector_name.includes('Apparel'));
  } else if (combined.includes('electric') || combined.includes('wire') || combined.includes('electronics') || combined.includes('appliance')) {
    selectedQualifications = allQualifications.filter((q) => q.sector_name.includes('Electronics'));
  } else if (combined.includes('solar') || combined.includes('green') || combined.includes('renewable')) {
    selectedQualifications = allQualifications.filter((q) => q.sector_name.includes('Green'));
  } else if (combined.includes('farm') || combined.includes('irrigation') || combined.includes('agri')) {
    selectedQualifications = allQualifications.filter((q) => q.sector_name.includes('Agriculture'));
  } else {
    // Default to Apparel/Tailoring sample tree if general
    selectedQualifications = allQualifications.slice(0, 2);
  }

  // Fallback if none matched
  if (selectedQualifications.length === 0) {
    selectedQualifications = [allQualifications[0]];
  }

  // Branching tree generation (Tailoring core example as requested in prompt)
  const coreNode: CoreSkillNode = {
    id: 'core-tailoring-1',
    title: {
      en: 'Garment Craftsmanship & Tailoring',
      ta: 'ஆடை வடிவமைப்பு மற்றும் தையல் கலை',
    },
    sector: selectedQualifications[0]?.sector_name || 'Apparel Made-ups & Home Furnishing',
    iconType: 'Shirt',
    description: {
      en: 'Core skill node derived from your tailoring experience and self-employment preference.',
      ta: 'உங்கள் தையல் கலை அனுபவத்திலிருந்து பெறப்பட்ட முதன்மை திறன் மையம்.',
    },
    branches: [
      {
        id: 'branch-1',
        title: { en: 'Garment Stitching & Custom Fitting', ta: 'ஆடை தையல் & அளவீடு' },
        iconType: 'Shirt',
        description: { en: 'Custom garment stitching and measurement tailoring.', ta: 'உடைகள் த தைத்தல் மற்றும் அளவீடு' },
        nsqfLevel: selectedQualifications[0]?.nsqf_level || 4,
        matchedQualificationCode: selectedQualifications[0]?.code || 'PWD/AMH/Q1947',
        employmentType: 'Wage & Self-Employed',
      },
      {
        id: 'branch-2',
        title: { en: 'Garment Alteration & Repair', ta: 'ஆடை சீரமைப்பு & ஆல்டரேஷன்' },
        iconType: 'Scissors',
        description: { en: 'Express alteration, fitting adjustment, and repair service.', ta: 'ஆடைகளை ஆல்டரேஷன் செய்தல் மற்றும் சீரமைத்தல்' },
        nsqfLevel: 3,
        matchedQualificationCode: 'AMH/Q0301',
        employmentType: 'Local Shop / Home-based',
      },
      {
        id: 'branch-3',
        title: { en: 'Embroidery & Artisan Crafts', ta: 'எம்பிராய்டரி & கைவினை கலை' },
        iconType: 'Store',
        description: { en: 'Decorative embroidery, Aari work, and artisanal craftwork.', ta: 'ஆரி வேலைப்பாடு மற்றும் எம்பிராய்டரி வேலைகள்' },
        nsqfLevel: 4,
        matchedQualificationCode: 'PWD/AMH/Q1947',
        employmentType: 'Self-Employed / Artisan',
      },
      {
        id: 'branch-4',
        title: { en: 'Custom Tailoring Boutique', ta: 'தையல் பூட்டிக் நிலையம்' },
        iconType: 'Store',
        description: { en: 'Establishing a neighborhood designer tailoring unit.', ta: 'சொந்தமாக தையல் பூட்டிக் கடை தொடங்குதல்' },
        nsqfLevel: 4,
        matchedQualificationCode: 'PWD/AMH/Q1947',
        employmentType: 'Micro-Enterprise / Boutique Owner',
      },
      {
        id: 'branch-5',
        title: { en: 'Home-Based Apparel Enterprise', ta: 'வீட்டு முறை தையல் தொழில்' },
        iconType: 'Home',
        description: { en: 'Flexible home-based tailoring setup for local neighborhood clients.', ta: 'வீட்டிலிருந்தபடியே ஆடை தைத்து தரும் முறை' },
        nsqfLevel: 4,
        matchedQualificationCode: 'PWD/AMH/Q1947',
        employmentType: 'Home-Based Self-Employment',
      },
      {
        id: 'branch-6',
        title: { en: 'Online E-Commerce & Retail', ta: 'ஆன்லைன் வணிகம் & ரீடெய்ல்' },
        iconType: 'ShoppingCart',
        description: { en: 'Selling custom apparel via WhatsApp and online marketplaces.', ta: 'வாட்ஸ்அப் மற்றும் ஆன்லைன் வழியாக ஆடை விற்பனை' },
        nsqfLevel: 4,
        matchedQualificationCode: 'PWD/AMH/Q1947',
        employmentType: 'Digital Self-Employment',
      },
    ],
  };

  return {
    coreNode,
    matchedQualifications: selectedQualifications,
  };
}
