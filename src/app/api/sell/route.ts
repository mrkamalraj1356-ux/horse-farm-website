import { NextResponse } from 'next/server';
import { createSellerSubmission, getSellerSubmissions } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;

    let submissions;
    if (user.role === 'admin') {
      submissions = await getSellerSubmissions({ status });
    } else if (user.role === 'seller') {
      submissions = await getSellerSubmissions({ status, sellerId: user.id });
    } else {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ submissions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching submissions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();

    const {
      fullName,
      mobileNumber,
      whatsappNumber,
      email,
      city,
      horseName,
      breed = 'Marwari',
      age,
      gender = 'Male',
      height,
      expectedPrice,
      description,
      images = [],
      videoUrl
    } = body;

    if (!fullName || !mobileNumber || !email || !horseName || !expectedPrice) {
      return NextResponse.json({ error: 'Please fill in all mandatory consignment details.' }, { status: 400 });
    }

    const cleanPhone = mobileNumber.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit mobile number.' }, { status: 400 });
    }

    const submission = await createSellerSubmission({
      sellerId: user?.id,
      sellerName: fullName,
      mobileNumber: cleanPhone,
      whatsappNumber: whatsappNumber ? whatsappNumber.replace(/[^0-9+]/g, '') : cleanPhone,
      email,
      city: city || 'Rajasthan, India',
      horseName,
      breed,
      age: parseInt(age) || 4,
      gender,
      height: height || '15.2 hands',
      expectedPrice,
      description: description || 'Consignment submitted for evaluation.',
      images: images.length > 0 ? images : ['/horses/sultan/sultan-1.jpg'],
      videoUrl
    });

    return NextResponse.json({
      success: true,
      submission,
      refId: submission.refId,
      message: 'Horse consignment dossier logged. The Stud Evaluation Board will review the pedigree and veterinary records.'
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error submitting consignment' }, { status: 500 });
  }
}
