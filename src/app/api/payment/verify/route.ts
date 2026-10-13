import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateBookingStatus } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId
    } = await req.json();

    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeySecret) {
      return NextResponse.json({
        error: 'Payment gateway secret not configured on server. Cannot verify cryptographic signature.'
      }, { status: 501 });
    }

    // Verify Razorpay HMAC SHA256 signature
    const expectedSignature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature. Verification failed.' }, { status: 400 });
    }

    // Mark booking as confirmed & paid in database
    if (bookingId) {
      await updateBookingStatus(
        bookingId,
        'confirmed',
        'paid',
        `Advance payment of verified via Razorpay Transaction Ref: ${razorpay_payment_id}`
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      message: 'Advance payment verified and booking confirmed successfully.'
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error verifying payment' }, { status: 500 });
  }
}
