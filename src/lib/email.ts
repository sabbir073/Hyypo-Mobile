import nodemailer from 'nodemailer';
import type { BookingFormData, ContactFormData } from './types';
import { buildBookingNotificationHtml } from './email-templates/booking-notification';
import { buildBookingConfirmationHtml } from './email-templates/booking-confirmation';
import { buildContactNotificationHtml } from './email-templates/contact-notification';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_ADDRESS = process.env.SMTP_FROM || 'noreply@hyppomobile.com';
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'contact@hyppomobile.com';

export async function sendBookingNotification(
  booking: BookingFormData,
  priceInfo: string
): Promise<void> {
  const html = buildBookingNotificationHtml(booking, priceInfo);

  await transporter.sendMail({
    from: `"Hyppo Mobile" <${FROM_ADDRESS}>`,
    to: BUSINESS_EMAIL,
    subject: `New Booking: ${booking.customerName} - ${booking.serviceType} (${booking.date})`,
    html,
  });
}

export async function sendBookingConfirmation(
  booking: BookingFormData,
  priceInfo: string
): Promise<void> {
  const html = buildBookingConfirmationHtml(booking, priceInfo);

  await transporter.sendMail({
    from: `"Hyppo Mobile" <${FROM_ADDRESS}>`,
    to: booking.customerEmail,
    subject: `Booking Confirmation - Hyppo Mobile (${booking.date})`,
    html,
  });
}

export async function sendContactNotification(
  contact: ContactFormData
): Promise<void> {
  const html = buildContactNotificationHtml(contact);

  await transporter.sendMail({
    from: `"Hyppo Mobile Website" <${FROM_ADDRESS}>`,
    to: BUSINESS_EMAIL,
    replyTo: contact.email,
    subject: `Contact Form: ${contact.subject} - ${contact.name}`,
    html,
  });
}
