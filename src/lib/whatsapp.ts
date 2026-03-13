import type { BookingFormData } from './types';

export async function sendBookingWhatsApp(
  booking: BookingFormData,
  priceInfo: string
): Promise<boolean> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const businessNumber = process.env.WHATSAPP_BUSINESS_NUMBER;

  if (!accessToken || !phoneNumberId || !businessNumber) {
    console.warn('WhatsApp credentials not configured');
    return false;
  }

  const message = formatBookingMessage(booking, priceInfo);

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: businessNumber,
          type: 'text',
          text: { body: message },
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('WhatsApp send failed:', error);
    return false;
  }
}

function formatBookingMessage(
  booking: BookingFormData,
  priceInfo: string
): string {
  const lines = [
    '--- NEW BOOKING ---',
    '',
    `Service: ${formatServiceType(booking.serviceType)}`,
    `Vehicle: ${booking.vehicleSlug}`,
    '',
    '-- Customer --',
    `Name: ${booking.customerName}`,
    `Email: ${booking.customerEmail}`,
    `Phone: ${booking.customerPhone}`,
    '',
    '-- Trip Details --',
    `Date: ${booking.date}`,
    `Time: ${booking.time}`,
    `Pickup: ${booking.pickupLocation}`,
    `Dropoff: ${booking.dropoffLocation}`,
  ];

  if (booking.airportRoute) {
    lines.push(`Airport Route: ${booking.airportRoute}`);
  }
  if (booking.flightNumber) {
    lines.push(`Flight: ${booking.flightNumber}`);
  }
  if (booking.hours) {
    lines.push(`Hours: ${booking.hours}`);
  }
  if (booking.notes) {
    lines.push('', `Notes: ${booking.notes}`);
  }

  lines.push('', `Price: ${priceInfo}`, '', '--- END ---');

  return lines.join('\n');
}

function formatServiceType(type: string): string {
  const labels: Record<string, string> = {
    'airport-transfer': 'Airport Transfer',
    hourly: 'Hourly Chauffeur',
    custom: 'Custom Journey',
  };
  return labels[type] ?? type;
}
