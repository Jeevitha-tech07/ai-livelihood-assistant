import { BeneficiaryProfile, ProfileFieldKey } from '@/types/profile';

/**
 * Server-side Gemini Service
 * 
 * Reads GEMINI_API_KEY from environment variables on server-side.
 * Makes HTTP REST calls to Google Gemini API (gemini-2.5-flash) for structured profile extraction.
 * 
 * IMPORTANT DATA INTEGRITY RULE:
 * Gemini extracts beneficiary profile attributes (skills, education, constraints, etc.)
 * but MUST NOT invent or fabricate official NSQF levels, codes, titles, or validity.
 */

export class GeminiService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

  getApiKey(): string {
    return this.apiKey;
  }

  /**
   * Extracts structured JSON field from user response turn.
   * Uses Gemini API generateContent when GEMINI_API_KEY is present, with heuristic fallback.
   */
  async extractProfileTurn(
    fieldKey: ProfileFieldKey,
    userResponse: string,
    currentProfile: Partial<BeneficiaryProfile>,
    language: string = 'en'
  ): Promise<{ updatedProfile: Partial<BeneficiaryProfile>; aiResponse?: string }> {
    const trimmed = userResponse.trim();
    const updated: Partial<BeneficiaryProfile> = { ...currentProfile };

    const isTamil = language === 'ta' || language === 'ta-IN';
    const langInstruction = isTamil
      ? 'Respond in Tamil. Use simple, natural Tamil suitable for a rural beneficiary.'
      : 'Respond in English.';

    if (!trimmed) {
      return { updatedProfile: updated };
    }

    const generatedAiText: string | undefined = undefined;

    if (this.apiKey) {
      try {
        console.log('[GeminiService] Calling Gemini API with Language Directive:', langInstruction);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `You are an AI assistant analyzing beneficiary responses for a livelihood program in India.
Language Directive: "${langInstruction}"
Target profile field to extract: "${fieldKey}".
Beneficiary's response: "${trimmed}".

Extract the value for "${fieldKey}".
Return strictly valid JSON only in this format:
{"${fieldKey}": ${fieldKey === 'skills' || fieldKey === 'interests' ? '["extracted_value"]' : '"extracted_value"'}}`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleanedText = responseText.replace(/```json|```/g, '').trim();
          const parsed = JSON.parse(cleanedText);
          if (parsed && parsed[fieldKey]) {
            updated[fieldKey] = parsed[fieldKey];
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, using fallback extraction:', err);
      }
    }

    // Heuristic extraction fallback when API key is unpopulated or network request is offline
    if (!updated[fieldKey]) {
      if (fieldKey === 'skills' || fieldKey === 'interests') {
        const items = trimmed
          .split(/[,;\n\s]+/)
          .map((s) => s.trim())
          .filter(Boolean);
        updated[fieldKey] = items.length > 0 ? items : [trimmed];
      } else {
        updated[fieldKey] = trimmed;
      }
    }

    return { updatedProfile: updated, aiResponse: generatedAiText };
  }
}

export const geminiService = new GeminiService();
