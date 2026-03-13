import { z } from 'zod';

const serviceTypes = ['airport-transfer', 'hourly', 'custom'] as const;

const vehicleSlugs = [
  'business-class',
  'van-xl',
  'first-class',
  'mercedes-maybach',
  'van-vip',
  'sprinter',
  'rolls-royce',
  'bentley',
  'range-rover',
] as const;

const airportRoutes = [
  'paris-cdg',
  'cdg-paris',
  'paris-orly',
  'orly-paris',
  'paris-beauvais',
  'beauvais-paris',
  'cdg-orly',
  'orly-cdg',
] as const;

export const bookingFormSchema = z
  .object({
    serviceType: z.enum(serviceTypes),
    vehicleSlug: z.enum(vehicleSlugs),
    customerName: z.string().min(2, 'Name must be at least 2 characters'),
    customerEmail: z.string().email('Invalid email address'),
    customerPhone: z.string().min(8, 'Phone must be at least 8 characters'),
    pickupLocation: z.string().min(3, 'Pickup location is required'),
    dropoffLocation: z.string().min(3, 'Dropoff location is required'),
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    hours: z.number().min(1).max(24).optional(),
    airportRoute: z.enum(airportRoutes).optional(),
    flightNumber: z.string().optional(),
    notes: z.string().optional(),
    locale: z.string().default('fr'),
  })
  .refine(
    (data) => {
      if (data.serviceType === 'airport-transfer') {
        return !!data.airportRoute;
      }
      return true;
    },
    { message: 'Please select an airport route', path: ['airportRoute'] }
  )
  .refine(
    (data) => {
      if (data.serviceType === 'hourly') {
        return data.hours !== undefined && data.hours >= 1 && data.hours <= 24;
      }
      return true;
    },
    { message: 'Number of hours is required (1-24)', path: ['hours'] }
  );

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone must be at least 8 characters'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type BookingFormInput = z.input<typeof bookingFormSchema>;
export type ContactFormInput = z.input<typeof contactFormSchema>;
