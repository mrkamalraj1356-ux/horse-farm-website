import { NextResponse } from 'next/server';
import { reviewSellerSubmission, logAdminAction } from '@/lib/db';
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
    const { status, adminNotes } = await req.json();

    if (status !== 'approved' && status !== 'rejected') {
      return NextResponse.json({ error: 'Status must be approved or rejected.' }, { status: 400 });
    }

    const updated = await reviewSellerSubmission(id, status, adminNotes, user.id);
    if (!updated) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    await logAdminAction(
      user.email,
      `SUBMISSION_${status.toUpperCase()}`,
      'SellerSubmission',
      id,
      `Admin ${status} horse consignment "${updated.horseName}" (${updated.refId}).`
    );

    return NextResponse.json({ success: true, submission: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating submission' }, { status: 500 });
  }
}
