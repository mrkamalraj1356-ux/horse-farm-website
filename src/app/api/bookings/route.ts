import { NextResponse } from 'next/server';
import { createBooking, getBookings, getHorseById, getFarmhousePackages, getExperiences } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || undefined;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    let bookings = await getBookings({ type, status, search });

    // If customer, show only their bookings
    if (user.role === 'customer') {
      bookings = bookings.filter(
        (b) => b.email.toLowerCase() === user.email.toLowerCase() || b.mobileNumber.includes(user.phone.replace(/[^0-9]/g, '').slice(-10))
      );
    }

    return NextResponse.json({ bookings, total: bookings.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching bookings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      mobile,
      whatsapp,
      email,
      type = 'horse',
      targetId,
      preferredDate,
      timeSlot = 'Morning (09:00 AM - 12:00 PM)',
      guests = 1,
      purpose = 'Private Viewing & Trial',
      packageId,
      packageName,
      message,
      advanceAmount
    } = body;

    if (!name || !mobile || !email || !preferredDate) {
      return NextResponse.json({ error: 'Guest name, mobile number, email, and preferred date are required.' }, { status: 400 });
    }

    const cleanPhone = mobile.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: 'Please enter a valid mobile number.' }, { status: 400 });
    }

    // Determine target name
    let targetName = 'Yog Maya Range Sanctuary Visit';
    if (type === 'horse' && targetId) {
      const horse = await getHorseById(targetId);
      if (horse) targetName = `${horse.name} (${horse.breed})`;
    } else if (type === 'farmhouse') {
      const pkgs = await getFarmhousePackages();
      const pkg = pkgs.find((p) => p.id === packageId);
      if (pkg) targetName = `Yog Maya Range - ${pkg.name}`;
      else targetName = packageName || 'Yog Maya Range Farmhouse Event';
    } else if (type === 'experience') {
      const exps = await getExperiences();
      const exp = exps.find((e) => e.id === targetId);
      if (exp) targetName = exp.title;
      else targetName = targetId || 'Equestrian Experience';
    }

    const booking = await createBooking({
      type,
      targetId: targetId || packageId,
      targetName,
      customerName: name,
      mobileNumber: cleanPhone,
      whatsappNumber: whatsapp ? whatsapp.replace(/[^0-9+]/g, '') : cleanPhone,
      email,
      preferredDate,
      timeSlot,
      guestsCount: Number(guests) || 1,
      bookingPurpose: purpose,
      packageId,
      packageName: packageName || targetName,
      advanceAmount: advanceAmount ? Number(advanceAmount) : undefined,
      paymentStatus: 'unpaid',
      message: message || ''
    });

    return NextResponse.json({
      success: true,
      booking,
      bookingCode: booking.bookingCode,
      message: 'Booking request registered. Our concierge will contact you to finalize the schedule.'
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating booking' }, { status: 500 });
  }
}
