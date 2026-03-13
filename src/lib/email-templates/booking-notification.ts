import type { BookingFormData } from '../types';

export function buildBookingNotificationHtml(
  booking: BookingFormData,
  priceInfo: string
): string {
  const serviceLabels: Record<string, string> = {
    'airport-transfer': 'Airport Transfer',
    hourly: 'Hourly Chauffeur',
    custom: 'Custom Journey',
  };

  const optionalRows = [
    booking.airportRoute
      ? `<tr><td style="padding:8px 12px;color:#666;font-size:14px;">Airport Route</td><td style="padding:8px 12px;font-size:14px;font-weight:600;">${booking.airportRoute}</td></tr>`
      : '',
    booking.flightNumber
      ? `<tr><td style="padding:8px 12px;color:#666;font-size:14px;">Flight Number</td><td style="padding:8px 12px;font-size:14px;font-weight:600;">${booking.flightNumber}</td></tr>`
      : '',
    booking.hours
      ? `<tr><td style="padding:8px 12px;color:#666;font-size:14px;">Hours</td><td style="padding:8px 12px;font-size:14px;font-weight:600;">${booking.hours}</td></tr>`
      : '',
    booking.notes
      ? `<tr><td style="padding:8px 12px;color:#666;font-size:14px;">Notes</td><td style="padding:8px 12px;font-size:14px;">${booking.notes}</td></tr>`
      : '',
  ]
    .filter(Boolean)
    .join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:24px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background-color:#1a1a1a;padding:24px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">New Booking Received</h1>
            <p style="margin:8px 0 0;color:#e87c2a;font-size:14px;font-weight:600;">Hyppo Mobile</p>
          </td>
        </tr>
        <!-- Content -->
        <tr>
          <td style="padding:24px;">
            <h2 style="margin:0 0 16px;font-size:18px;color:#1a1a1a;">Customer Details</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
              <tr style="background-color:#fafafa;">
                <td style="padding:8px 12px;color:#666;font-size:14px;width:40%;">Name</td>
                <td style="padding:8px 12px;font-size:14px;font-weight:600;">${booking.customerName}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;color:#666;font-size:14px;">Email</td>
                <td style="padding:8px 12px;font-size:14px;"><a href="mailto:${booking.customerEmail}" style="color:#e87c2a;">${booking.customerEmail}</a></td>
              </tr>
              <tr style="background-color:#fafafa;">
                <td style="padding:8px 12px;color:#666;font-size:14px;">Phone</td>
                <td style="padding:8px 12px;font-size:14px;"><a href="tel:${booking.customerPhone}" style="color:#e87c2a;">${booking.customerPhone}</a></td>
              </tr>
            </table>

            <h2 style="margin:24px 0 16px;font-size:18px;color:#1a1a1a;">Booking Details</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
              <tr style="background-color:#fafafa;">
                <td style="padding:8px 12px;color:#666;font-size:14px;width:40%;">Service</td>
                <td style="padding:8px 12px;font-size:14px;font-weight:600;">${serviceLabels[booking.serviceType] ?? booking.serviceType}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;color:#666;font-size:14px;">Vehicle</td>
                <td style="padding:8px 12px;font-size:14px;font-weight:600;">${booking.vehicleSlug}</td>
              </tr>
              <tr style="background-color:#fafafa;">
                <td style="padding:8px 12px;color:#666;font-size:14px;">Date</td>
                <td style="padding:8px 12px;font-size:14px;font-weight:600;">${booking.date}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;color:#666;font-size:14px;">Time</td>
                <td style="padding:8px 12px;font-size:14px;font-weight:600;">${booking.time}</td>
              </tr>
              <tr style="background-color:#fafafa;">
                <td style="padding:8px 12px;color:#666;font-size:14px;">Pickup</td>
                <td style="padding:8px 12px;font-size:14px;">${booking.pickupLocation}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;color:#666;font-size:14px;">Dropoff</td>
                <td style="padding:8px 12px;font-size:14px;">${booking.dropoffLocation}</td>
              </tr>
              ${optionalRows}
            </table>

            <!-- Price -->
            <div style="margin-top:24px;padding:16px;background-color:#fff7ed;border:1px solid #e87c2a;border-radius:8px;text-align:center;">
              <p style="margin:0;color:#666;font-size:14px;">Estimated Price</p>
              <p style="margin:4px 0 0;color:#e87c2a;font-size:24px;font-weight:700;">${priceInfo}</p>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color:#fafafa;padding:16px;text-align:center;border-top:1px solid #e5e5e5;">
            <p style="margin:0;color:#999;font-size:12px;">Hyppo Mobile - Premium Chauffeur Service Paris</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
