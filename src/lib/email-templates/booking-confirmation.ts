import type { BookingFormData } from '../types';

export function buildBookingConfirmationHtml(
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
      ? `<tr><td style="padding:10px 16px;color:#666;font-size:14px;">Airport Route</td><td style="padding:10px 16px;font-size:14px;font-weight:600;text-align:right;">${booking.airportRoute}</td></tr>`
      : '',
    booking.flightNumber
      ? `<tr style="background-color:#fafafa;"><td style="padding:10px 16px;color:#666;font-size:14px;">Flight Number</td><td style="padding:10px 16px;font-size:14px;font-weight:600;text-align:right;">${booking.flightNumber}</td></tr>`
      : '',
    booking.hours
      ? `<tr><td style="padding:10px 16px;color:#666;font-size:14px;">Duration</td><td style="padding:10px 16px;font-size:14px;font-weight:600;text-align:right;">${booking.hours} hours</td></tr>`
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
          <td style="background-color:#1a1a1a;padding:32px 24px;text-align:center;">
            <h1 style="margin:0;color:#e87c2a;font-size:26px;font-weight:700;">Hyppo Mobile</h1>
            <p style="margin:8px 0 0;color:#ffffff;font-size:16px;">Premium Chauffeur Service</p>
          </td>
        </tr>

        <!-- Thank You -->
        <tr>
          <td style="padding:32px 24px 16px;text-align:center;">
            <div style="width:64px;height:64px;background-color:#fff7ed;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;line-height:64px;font-size:28px;">
              &#10003;
            </div>
            <h2 style="margin:0 0 8px;font-size:22px;color:#1a1a1a;">Booking Confirmed!</h2>
            <p style="margin:0;color:#666;font-size:15px;">
              Thank you, ${booking.customerName}. Your ride has been booked successfully.
            </p>
          </td>
        </tr>

        <!-- Booking Summary -->
        <tr>
          <td style="padding:0 24px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:10px;overflow:hidden;">
              <tr style="background-color:#1a1a1a;">
                <td colspan="2" style="padding:12px 16px;color:#ffffff;font-size:15px;font-weight:600;">Booking Summary</td>
              </tr>
              <tr style="background-color:#fafafa;">
                <td style="padding:10px 16px;color:#666;font-size:14px;">Service</td>
                <td style="padding:10px 16px;font-size:14px;font-weight:600;text-align:right;">${serviceLabels[booking.serviceType] ?? booking.serviceType}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;color:#666;font-size:14px;">Vehicle</td>
                <td style="padding:10px 16px;font-size:14px;font-weight:600;text-align:right;">${booking.vehicleSlug}</td>
              </tr>
              <tr style="background-color:#fafafa;">
                <td style="padding:10px 16px;color:#666;font-size:14px;">Date</td>
                <td style="padding:10px 16px;font-size:14px;font-weight:600;text-align:right;">${booking.date}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;color:#666;font-size:14px;">Time</td>
                <td style="padding:10px 16px;font-size:14px;font-weight:600;text-align:right;">${booking.time}</td>
              </tr>
              <tr style="background-color:#fafafa;">
                <td style="padding:10px 16px;color:#666;font-size:14px;">Pickup</td>
                <td style="padding:10px 16px;font-size:14px;text-align:right;">${booking.pickupLocation}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;color:#666;font-size:14px;">Dropoff</td>
                <td style="padding:10px 16px;font-size:14px;text-align:right;">${booking.dropoffLocation}</td>
              </tr>
              ${optionalRows}
            </table>

            <!-- Price -->
            <div style="margin-top:16px;padding:16px;background-color:#fff7ed;border:2px solid #e87c2a;border-radius:10px;text-align:center;">
              <p style="margin:0;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Total Price</p>
              <p style="margin:6px 0 0;color:#e87c2a;font-size:28px;font-weight:700;">${priceInfo}</p>
            </div>
          </td>
        </tr>

        <!-- What's Next -->
        <tr>
          <td style="padding:0 24px 24px;">
            <div style="padding:20px;background-color:#f9f9f9;border-radius:10px;">
              <h3 style="margin:0 0 12px;font-size:16px;color:#1a1a1a;">What happens next?</h3>
              <ul style="margin:0;padding:0 0 0 18px;color:#666;font-size:14px;line-height:2;">
                <li>Your chauffeur details will be sent before your ride.</li>
                <li>We will track your flight for airport transfers.</li>
                <li>You can modify your booking up to 6 hours before pickup.</li>
              </ul>
            </div>
          </td>
        </tr>

        <!-- Contact -->
        <tr>
          <td style="padding:0 24px 24px;text-align:center;">
            <p style="margin:0 0 8px;color:#666;font-size:14px;">Need to make changes?</p>
            <p style="margin:0;font-size:14px;">
              Call us at <a href="tel:+33123456789" style="color:#e87c2a;text-decoration:none;font-weight:600;">+33 1 23 45 67 89</a>
              or WhatsApp <a href="https://wa.me/33612345678" style="color:#e87c2a;text-decoration:none;font-weight:600;">+33 6 12 34 56 78</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#1a1a1a;padding:20px;text-align:center;">
            <p style="margin:0 0 4px;color:#e87c2a;font-size:14px;font-weight:600;">Hyppo Mobile</p>
            <p style="margin:0;color:#999;font-size:12px;">123 Avenue des Champs-Elysees, 75008 Paris, France</p>
            <p style="margin:4px 0 0;color:#999;font-size:11px;">This is an automated message. Please do not reply directly to this email.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
