export type CompetencyStatus = 'met' | 'partial' | 'missing';

export interface CompetencyEvaluation {
  competencyName: string;
  status: CompetencyStatus;
  scorePercentage: number;
  matchedSkills: string[];
}

export interface SkillGapAnalysisResult {
  evaluations: CompetencyEvaluation[];
  overallMatchScore: number;
}

/**
 * Deterministic Skill Gap Analysis Engine
 * 
 * Compares user skills vs required qualification competencies using exact/fuzzy keyword matching.
 * MUST NOT use model generation for status or score calculation.
 */
export function analyzeSkillGap(
  userSkills: string[],
  requiredCompetencies: string[]
): SkillGapAnalysisResult {
  const normalizedUserSkills = (userSkills || []).map((s) => s.toLowerCase().trim());
  const userText = normalizedUserSkills.join(' ');

  let totalScore = 0;

  const evaluations: CompetencyEvaluation[] = (requiredCompetencies || []).map((comp) => {
    const compLower = comp.toLowerCase();
    const compWords = compLower.split(/\s+/).filter((w) => w.length > 3);

    const directMatches = normalizedUserSkills.filter(
      (skill) => compLower.includes(skill) || skill.split(/\s+/).some((sw) => sw.length > 3 && compLower.includes(sw))
    );

    const keywordMatchCount = compWords.filter((word) => userText.includes(word)).length;

    let status: CompetencyStatus = 'missing';
    let scorePercentage = 0;

    if (directMatches.length > 0 || (compWords.length > 0 && keywordMatchCount >= compWords.length)) {
      status = 'met';
      scorePercentage = 100;
    } else if (keywordMatchCount > 0) {
      status = 'partial';
      scorePercentage = 50;
    } else {
      status = 'missing';
      scorePercentage = 0;
    }

    totalScore += scorePercentage;

    return {
      competencyName: comp,
      status,
      scorePercentage,
      matchedSkills: directMatches,
    };
  });

  const overallMatchScore =
    evaluations.length > 0 ? Math.round(totalScore / evaluations.length) : 0;

  return {
    evaluations,
    overallMatchScore,
  };
}
