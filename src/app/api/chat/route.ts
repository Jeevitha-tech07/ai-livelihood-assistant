import { NextResponse } from 'next/server';
import { geminiService } from '@/lib/ai/gemini';
import { ProfileFieldKey } from '@/types/profile';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fieldKey, userResponse, currentProfile, language = 'en' } = body as {
      fieldKey: ProfileFieldKey;
      userResponse: string;
      currentProfile: Record<string, unknown>;
      language?: string;
    };

    if (!fieldKey || userResponse === undefined) {
      return NextResponse.json({ error: 'Missing fieldKey or userResponse' }, { status: 400 });
    }

    const { updatedProfile, aiResponse } = await geminiService.extractProfileTurn(
      fieldKey,
      userResponse,
      currentProfile,
      language
    );

    return NextResponse.json({
      success: true,
      fieldKey,
      extractedValue: updatedProfile[fieldKey],
      updatedProfile,
      aiResponse,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
