import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', bookingId, enquiryId, customerName, customerEmail, customerPhone } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Valid payment amount is required.' }, { status: 400 });
    }

    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (razorpayKeyId && razorpayKeySecret) {
      // Real Razorpay Order Creation
      const authHeader = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString('base64');
      const res = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${authHeader}`
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // in paise
          currency,
          receipt: `rcpt_${bookingId || enquiryId || Date.now()}`,
          notes: {
            bookingId: bookingId || '',
            enquiryId: enquiryId || '',
            customerName: customerName || ''
          }
        })
      });

      if (res.ok) {
        const order = await res.json();
        return NextResponse.json({
          configured: true,
          provider: 'razorpay',
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: razorpayKeyId
        });
      } else {
        const errData = await res.json();
        return NextResponse.json({ error: errData.error?.description || 'Razorpay order creation failed.' }, { status: 502 });
      }
    }

    // Provider not configured - return structure with documentation instructions
    return NextResponse.json({
      configured: false,
      message: 'Payment gateway credentials (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) not set in environment variables. Offline / Concierge payment confirmation available.',
      manualBookingAllowed: true,
      advanceAmount: amount,
      currency
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating payment order' }, { status: 500 });
  }
}
