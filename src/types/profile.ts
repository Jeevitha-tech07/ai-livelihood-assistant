export interface BeneficiaryProfile {
  location: string;
  education: string;
  family_occupation: string;
  current_livelihood: string;
  skills: string[];
  interests: string[];
  mobility_constraints: string;
  work_preference: string;
}

export type ProfileFieldKey = keyof BeneficiaryProfile;

export interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  fieldTargeted?: ProfileFieldKey;
  audioPlaying?: boolean;
}

export interface QuestionStep {
  key: ProfileFieldKey;
  label: {
    en: string;
    ta: string;
  };
  prompt: {
    en: string;
    ta: string;
  };
  placeholder: {
    en: string;
    ta: string;
  };
}
