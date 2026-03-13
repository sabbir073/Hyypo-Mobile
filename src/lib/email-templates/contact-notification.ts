import type { ContactFormData } from '../types';

export function buildContactNotificationHtml(contact: ContactFormData): string {
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
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">New Contact Message</h1>
            <p style="margin:8px 0 0;color:#e87c2a;font-size:14px;font-weight:600;">Hyppo Mobile</p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:24px;">
            <!-- Subject -->
            <div style="margin-bottom:20px;padding:14px 16px;background-color:#fff7ed;border-left:4px solid #e87c2a;border-radius:0 8px 8px 0;">
              <p style="margin:0;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Subject</p>
              <p style="margin:4px 0 0;color:#1a1a1a;font-size:16px;font-weight:600;">${contact.subject}</p>
            </div>

            <!-- Sender Details -->
            <h2 style="margin:0 0 12px;font-size:16px;color:#1a1a1a;">From</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;margin-bottom:20px;">
              <tr style="background-color:#fafafa;">
                <td style="padding:10px 14px;color:#666;font-size:14px;width:30%;">Name</td>
                <td style="padding:10px 14px;font-size:14px;font-weight:600;">${contact.name}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#666;font-size:14px;">Email</td>
                <td style="padding:10px 14px;font-size:14px;">
                  <a href="mailto:${contact.email}" style="color:#e87c2a;text-decoration:none;">${contact.email}</a>
                </td>
              </tr>
              <tr style="background-color:#fafafa;">
                <td style="padding:10px 14px;color:#666;font-size:14px;">Phone</td>
                <td style="padding:10px 14px;font-size:14px;">
                  <a href="tel:${contact.phone}" style="color:#e87c2a;text-decoration:none;">${contact.phone}</a>
                </td>
              </tr>
            </table>

            <!-- Message -->
            <h2 style="margin:0 0 12px;font-size:16px;color:#1a1a1a;">Message</h2>
            <div style="padding:16px;background-color:#fafafa;border:1px solid #e5e5e5;border-radius:8px;">
              <p style="margin:0;color:#333;font-size:14px;line-height:1.7;white-space:pre-wrap;">${contact.message}</p>
            </div>

            <!-- Reply Button -->
            <div style="margin-top:24px;text-align:center;">
              <a href="mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}"
                 style="display:inline-block;padding:12px 32px;background-color:#e87c2a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;">
                Reply to ${contact.name}
              </a>
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
