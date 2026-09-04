export type LanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'mr' | 'bn';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
  isAvailable: boolean;
}
