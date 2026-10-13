import { NextResponse } from 'next/server';
import { updateBookingStatus } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required.' }, { status: 403 });
    }

    const { id } = await params;
    const { status, paymentStatus, note } = await req.json();

    const updated = await updateBookingStatus(id, status, paymentStatus, note);
    if (!updated) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating booking' }, { status: 500 });
  }
}
