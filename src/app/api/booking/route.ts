import { NextResponse } from 'next/server';
import { bookingFormSchema } from '@/lib/validators';
import { calculatePrice } from '@/lib/pricing';
import { sendBookingWhatsApp } from '@/lib/whatsapp';
import {
  sendBookingNotification,
  sendBookingConfirmation,
} from '@/lib/email';
import { formatCurrency } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = bookingFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.issues },
        { status: 400 }
      );
    }

    const booking = result.data;
    const price = calculatePrice(
      booking.serviceType,
      booking.vehicleSlug,
      booking.hours
    );

    const priceInfo =
      price.type === 'fixed'
        ? formatCurrency(price.amount)
        : 'Custom quote required';

    // Send notifications in parallel
    const results = await Promise.allSettled([
      sendBookingWhatsApp(booking, priceInfo),
      sendBookingNotification(booking, priceInfo),
      sendBookingConfirmation(booking, priceInfo),
    ]);

    // Log any failures but don't fail the request
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const labels = ['WhatsApp', 'Business Email', 'Customer Email'];
        console.error(`${labels[index]} notification failed:`, result.reason);
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { success: false, errors: [{ message: 'Internal server error' }] },
      { status: 500 }
    );
  }
}
