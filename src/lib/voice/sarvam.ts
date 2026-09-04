/**
 * Server-side Sarvam Voice & Speech Service
 * 
 * Reads SARVAM_API_KEY from environment variables on server-side.
 * Makes HTTP REST calls to Sarvam API endpoints for Speech-to-Text and Text-to-Speech.
 */

export interface STTResponse {
  transcript: string;
  languageCode: string;
}

export interface TTSRequest {
  text: string;
  targetLanguageCode: string;
}

export interface ISarvamService {
  speechToText(audioBuffer: Buffer, languageCode?: string): Promise<STTResponse>;
  textToSpeech(request: TTSRequest): Promise<Buffer>;
}

export class SarvamService implements ISarvamService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.SARVAM_API_KEY || '';
  }

  getApiKey(): string {
    return this.apiKey;
  }

  private mapLanguageCode(code?: string): string {
    if (!code) return 'ta-IN';
    const clean = code.toLowerCase().trim();
    if (clean === 'ta' || clean === 'ta-in' || clean === 'tamil') return 'ta-IN';
    if (clean === 'hi' || clean === 'hi-in' || clean === 'hindi') return 'hi-IN';
    if (clean === 'en' || clean === 'en-in' || clean === 'english') return 'en-IN';
    if (clean === 'te' || clean === 'te-in' || clean === 'telugu') return 'te-IN';
    if (clean === 'kn' || clean === 'kn-in' || clean === 'kannada') return 'kn-IN';
    return 'ta-IN';
  }

  async speechToText(audioBuffer: Buffer, languageCode?: string): Promise<STTResponse> {
    const targetLang = this.mapLanguageCode(languageCode);

    // SAFE LOGGING (NO API KEYS)
    console.log("Selected language:", languageCode);
    console.log("STT language:", targetLang);

    if (this.apiKey) {
      try {
        console.log('[SarvamService STT] Sending audio buffer to Sarvam API, length:', audioBuffer.length, 'lang:', targetLang);
        
        const formData = new FormData();
        const blob = new Blob([Uint8Array.from(audioBuffer)], { type: 'audio/wav' });
        formData.append('file', blob, 'recording.wav');
        formData.append('model', 'saarika:v1');
        formData.append('language_code', targetLang);

        const response = await fetch('https://api.sarvam.ai/speech-to-text', {
          method: 'POST',
          headers: {
            'api-subscription-key': this.apiKey,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('[SarvamService STT] Received transcript from Sarvam:', data.transcript);
          return {
            transcript: data.transcript || '',
            languageCode: data.language_code || targetLang,
          };
        } else {
          const errorText = await response.text();
          console.error('[SarvamService STT API Error]:', response.status, errorText);
        }
      } catch (err) {
        console.error('[SarvamService STT Network Exception]:', err);
      }
    } else {
      console.warn('[SarvamService STT] SARVAM_API_KEY is not set in environment');
    }

    return {
      transcript: '',
      languageCode: targetLang,
    };
  }

  async textToSpeech(request: TTSRequest): Promise<Buffer> {
    const targetLang = this.mapLanguageCode(request.targetLanguageCode);

    // Clean text: strip markdown/formatting tags so TTS gets pure plain text
    const cleanText = request.text
      .replace(/```[a-z]*\n?/gi, '')
      .replace(/```/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/#+\s*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    const ttsModel = 'bulbul:v3';
    const ttsSpeaker = 'ratan';

    // SAFE LOGGING (NO API KEYS)
    console.log("TTS text:", cleanText);
    console.log("TTS language:", targetLang === 'ta-IN' ? 'Tamil' : 'English');
    console.log("TTS language_code:", targetLang);
    console.log("TTS model:", ttsModel);
    console.log("TTS speaker:", ttsSpeaker);

    if (this.apiKey) {
      try {
        console.log('[SarvamService TTS] Sending text to Sarvam API:', {
          textSnippet: cleanText.substring(0, 40),
          targetLang,
          model: ttsModel,
          speaker: ttsSpeaker,
        });

        const response = await fetch('https://api.sarvam.ai/text-to-speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': this.apiKey,
          },
          body: JSON.stringify({
            inputs: [cleanText],
            target_language_code: targetLang,
            speaker: ttsSpeaker,
            pitch: 0,
            pace: 1.0,
            loudness: 1.5,
            speech_sample_rate: 24000,
            enable_preprocessing: true,
            model: ttsModel,
          }),
        });

        console.log("TTS HTTP status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("TTS audio count:", data.audios?.length);
          if (data.audios && data.audios[0]) {
            console.log('[SarvamService TTS] Base64 audio decoded successfully');
            return Buffer.from(data.audios[0], 'base64');
          }
        } else {
          const errorText = await response.text();
          console.error('[SarvamService TTS API Error]:', response.status, errorText);
        }
      } catch (err) {
        console.error('[SarvamService TTS Network Exception]:', err);
      }
    } else {
      console.warn('[SarvamService TTS] SARVAM_API_KEY is not set in environment');
    }

    return Buffer.from('');
  }
}

export const sarvamService = new SarvamService();
