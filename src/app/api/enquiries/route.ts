import { NextResponse } from 'next/server';
import { createEnquiry, getEnquiries, getHorseById } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const horseId = searchParams.get('horseId') || undefined;

    let enquiries = await getEnquiries({ status, search, horseId });

    // If customer, filter to only their email/phone
    if (user.role === 'customer') {
      enquiries = enquiries.filter(
        (e) => e.email.toLowerCase() === user.email.toLowerCase() || e.mobileNumber.includes(user.phone.replace(/[^0-9]/g, '').slice(-10))
      );
    }

    return NextResponse.json({ enquiries, total: enquiries.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching enquiries' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      mobileNumber,
      whatsappNumber,
      email,
      city,
      selectedHorseId,
      contactPreference,
      experienceLevel,
      message
    } = body;

    if (!fullName || !mobileNumber || !email) {
      return NextResponse.json({ error: 'Full name, mobile number, and email are required.' }, { status: 400 });
    }

    // Phone validation
    const cleanPhone = mobileNumber.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit mobile number.' }, { status: 400 });
    }

    let horseName = undefined;
    if (selectedHorseId) {
      const horse = await getHorseById(selectedHorseId);
      if (horse) {
        horseName = horse.name;
      }
    }

    const enquiry = await createEnquiry({
      horseId: selectedHorseId || undefined,
      horseName,
      customerName: fullName,
      mobileNumber: cleanPhone,
      whatsappNumber: whatsappNumber ? whatsappNumber.replace(/[^0-9+]/g, '') : cleanPhone,
      email,
      city: city || 'India',
      contactPreference: contactPreference || 'WhatsApp',
      experienceLevel: experienceLevel || 'Experienced Rider',
      message: message || ''
    });

    return NextResponse.json({
      success: true,
      enquiry,
      refNumber: enquiry.refNumber,
      message: 'Your enquiry has been received by our Stud Concierge.'
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error submitting enquiry' }, { status: 500 });
  }
}
