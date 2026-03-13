export type ServiceType = 'airport-transfer' | 'hourly' | 'custom';

export type VehicleCategory = 'regular' | 'on-demand';

export type VehicleSlug =
  | 'business-class'
  | 'van-xl'
  | 'first-class'
  | 'mercedes-maybach'
  | 'van-vip'
  | 'sprinter'
  | 'rolls-royce'
  | 'bentley'
  | 'range-rover';

export type AirportRoute =
  | 'paris-cdg'
  | 'cdg-paris'
  | 'paris-orly'
  | 'orly-paris'
  | 'paris-beauvais'
  | 'beauvais-paris'
  | 'cdg-orly'
  | 'orly-cdg';

export interface Vehicle {
  slug: VehicleSlug;
  nameKey: string;
  descriptionKey: string;
  category: VehicleCategory;
  image: string;
  passengerCount: number;
  luggageCount: number;
  features: string[];
  pricing: {
    airportTransfer?: number;
    hourlyRate?: number;
  };
}

export interface BookingFormData {
  serviceType: ServiceType;
  vehicleSlug: VehicleSlug;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  hours?: number;
  airportRoute?: AirportRoute;
  flightNumber?: string;
  notes?: string;
  locale: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type PriceResult =
  | { type: 'fixed'; amount: number }
  | { type: 'quote' };

export interface ServiceInfo {
  slug: ServiceType;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  nameKey: string;
  roleKey: string;
  contentKey: string;
  rating: number;
  image: string;
}
