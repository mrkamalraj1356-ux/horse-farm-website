import { NextResponse } from 'next/server';
import { getNotifications, markNotificationRead } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const notifications = await getNotifications(user.role);
    return NextResponse.json({ notifications, unreadCount: notifications.filter(n => !n.read).length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching notifications' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json();
    const success = await markNotificationRead(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating notification' }, { status: 500 });
  }
}
