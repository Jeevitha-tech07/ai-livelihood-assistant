import { NextResponse } from 'next/server';
import { matchBeneficiaryProfileToNSQF } from '@/lib/nsqf/matchingEngine';
import { BeneficiaryProfile } from '@/types/profile';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile } = body as { profile: BeneficiaryProfile };

    if (!profile) {
      return NextResponse.json({ error: 'Missing beneficiary profile' }, { status: 400 });
    }

    const result = await matchBeneficiaryProfileToNSQF(profile);

    return NextResponse.json({
      success: true,
      coreNode: result.coreNode,
      matchedQualifications: result.matchedQualifications,
    });
  } catch (error) {
    console.error('NSQF Match API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
