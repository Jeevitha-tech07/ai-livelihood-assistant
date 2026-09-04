import { LanguageOption } from '@/types/language';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    description: 'குரல் மற்றும் உரை வழியாக வாழ்வாதார வழிகாட்டல் பெறுக',
    isAvailable: true,
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🌐',
    description: 'Access NSQF skill mappings and livelihood opportunities',
    isAvailable: true,
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    flag: '🇮🇳',
    description: 'आजीविका और कौशल मार्गदर्शन प्राप्त करें (Coming Soon)',
    isAvailable: false,
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    description: 'నైపుణ్య మార్గదర్శకత్వం పొందండి (Coming Soon)',
    isAvailable: false,
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    description: 'ಕೌಶಲ್ಯ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ (Coming Soon)',
    isAvailable: false,
  },
];
