import { NextResponse } from 'next/server';
import { getHorses, createHorse } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const breed = searchParams.get('breed') || undefined;
    const gender = searchParams.get('gender') || undefined;
    const availability = searchParams.get('availability') || undefined;
    const search = searchParams.get('search') || undefined;
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;
    const featured = searchParams.get('featured') ? searchParams.get('featured') === 'true' : undefined;
    const status = searchParams.get('status') || undefined;

    const horses = await getHorses({
      breed,
      gender,
      availability,
      search,
      minPrice,
      maxPrice,
      featured,
      status
    });

    return NextResponse.json({ horses, total: horses.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching horses' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'seller')) {
      return NextResponse.json({ error: 'Unauthorized: Admin or Seller access required.' }, { status: 403 });
    }

    const body = await req.json();
    if (!body.name || !body.breed || !body.price) {
      return NextResponse.json({ error: 'Name, breed, and price are required fields.' }, { status: 400 });
    }

    const horse = await createHorse({
      ...body,
      status: user.role === 'admin' ? (body.status || 'approved') : 'pending',
      sellerId: user.id,
      sellerName: user.name
    });

    return NextResponse.json({ horse, success: true }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating horse listing' }, { status: 500 });
  }
}
