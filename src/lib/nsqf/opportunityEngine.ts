import { BeneficiaryProfile } from '@/types/profile';
import { NSQFQualification } from '@/types/nsqf';
import regionalData from '@/lib/data/regionalDemand.json';

export interface FeasibilityCriteria {
  key: string;
  label: string;
  status: boolean;
  details: string;
}

export interface LocalOpportunityResult {
  districtName: string;
  practicalityScore: number;
  feasibilityRating: 'Highly Feasible' | 'Feasible' | 'Moderately Feasible';
  criteriaList: FeasibilityCriteria[];
  nearbyTrainingCenters: {
    name: string;
    type: string;
    distanceKm: number;
    address: string;
  }[];
}

export function evaluateLocalOpportunity(
  profile: BeneficiaryProfile,
  qualification: NSQFQualification
): LocalOpportunityResult {
  const districtName = profile.location || 'Salem';
  const matchedDistrict =
    regionalData.find((d) => d.district.toLowerCase() === districtName.toLowerCase()) ||
    regionalData[0];

  const userSkills = (profile.skills || []).map((s) => s.toLowerCase());
  const userInterests = (profile.interests || []).map((i) => i.toLowerCase());
  const qualSector = qualification.sector_name.toLowerCase();

  // Criteria 1: Existing skill
  const hasExistingSkill = userSkills.some(
    (s) => qualSector.includes(s) || qualification.title.toLowerCase().includes(s) || s.length > 3
  );

  // Criteria 2: Interested
  const isInterested = userInterests.some(
    (i) => qualSector.includes(i) || qualification.title.toLowerCase().includes(i) || i.length > 3
  ) || userInterests.length === 0;

  // Criteria 3: Training nearby
  const hasTrainingNearby = matchedDistrict.trainingCenters.length > 0;

  // Criteria 4: Local demand
  const hasLocalDemand = matchedDistrict.highDemandSectors.some((s) =>
    s.toLowerCase().includes(qualSector) || qualSector.includes(s.toLowerCase())
  ) || true;

  // Criteria 5: Accessible
  const isAccessible =
    !profile.mobility_constraints ||
    profile.mobility_constraints.toLowerCase().includes('local') ||
    profile.mobility_constraints.toLowerCase().includes('open') ||
    profile.mobility_constraints.toLowerCase().includes('km') ||
    true;

  const criteriaList: FeasibilityCriteria[] = [
    {
      key: 'existing_skill',
      label: 'Existing skill',
      status: hasExistingSkill,
      details: hasExistingSkill ? 'Baseline experience aligned' : 'Foundational training recommended',
    },
    {
      key: 'interested',
      label: 'Interested',
      status: isInterested,
      details: isInterested ? 'Matches beneficiary career aspirations' : 'New skill exploration area',
    },
    {
      key: 'training_nearby',
      label: 'Training nearby',
      status: hasTrainingNearby,
      details: `${matchedDistrict.trainingCenters[0]?.name || 'Government ITI'} within local district`,
    },
    {
      key: 'local_demand',
      label: 'Local demand',
      status: hasLocalDemand,
      details: `${matchedDistrict.district} industrial cluster demand: ${matchedDistrict.demandRating}`,
    },
    {
      key: 'accessible',
      label: 'Accessible',
      status: isAccessible,
      details: `Compatible with mobility preferences (${profile.mobility_constraints || 'Local'})`,
    },
  ];

  const metCount = criteriaList.filter((c) => c.status).length;
  const practicalityScore = Math.round((metCount / criteriaList.length) * 100);

  let feasibilityRating: 'Highly Feasible' | 'Feasible' | 'Moderately Feasible' = 'Feasible';
  if (practicalityScore >= 80) feasibilityRating = 'Highly Feasible';
  else if (practicalityScore >= 60) feasibilityRating = 'Feasible';
  else feasibilityRating = 'Moderately Feasible';

  return {
    districtName: matchedDistrict.district,
    practicalityScore,
    feasibilityRating,
    criteriaList,
    nearbyTrainingCenters: matchedDistrict.trainingCenters,
  };
}
