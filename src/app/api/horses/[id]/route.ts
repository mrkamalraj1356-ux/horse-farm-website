import { NextResponse } from 'next/server';
import { getHorseById, updateHorse, deleteHorse, recordHorseView } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const horse = await getHorseById(id);
    if (!horse) {
      return NextResponse.json({ error: 'Horse not found' }, { status: 404 });
    }

    // Increment view count asynchronously
    await recordHorseView(id);

    return NextResponse.json({ horse });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching horse' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required.' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const updated = await updateHorse(id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Horse not found' }, { status: 404 });
    }

    return NextResponse.json({ horse: updated, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating horse' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required.' }, { status: 403 });
    }

    const { id } = await params;
    const success = await deleteHorse(id);
    if (!success) {
      return NextResponse.json({ error: 'Horse not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error deleting horse' }, { status: 500 });
  }
}
