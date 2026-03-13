import type { Vehicle, ServiceInfo, FAQItem, Testimonial, AirportRoute, VehicleSlug } from './types';

export const VEHICLES: Vehicle[] = [
  {
    slug: 'business-class',
    nameKey: 'vehicles.businessClass.name',
    descriptionKey: 'vehicles.businessClass.description',
    category: 'regular',
    image: '/images/vehicles/business-class.jpg',
    passengerCount: 4,
    luggageCount: 3,
    features: [
      'vehicles.features.leatherSeats',
      'vehicles.features.wifi',
      'vehicles.features.climateControl',
      'vehicles.features.phoneCharger',
      'vehicles.features.bottledWater',
    ],
    pricing: {
      airportTransfer: 150,
      hourlyRate: 90,
    },
  },
  {
    slug: 'van-xl',
    nameKey: 'vehicles.vanXl.name',
    descriptionKey: 'vehicles.vanXl.description',
    category: 'regular',
    image: '/images/vehicles/van-xl.jpg',
    passengerCount: 7,
    luggageCount: 7,
    features: [
      'vehicles.features.leatherSeats',
      'vehicles.features.wifi',
      'vehicles.features.climateControl',
      'vehicles.features.phoneCharger',
      'vehicles.features.bottledWater',
      'vehicles.features.extraLuggage',
    ],
    pricing: {
      airportTransfer: 210,
      hourlyRate: 110,
    },
  },
  {
    slug: 'first-class',
    nameKey: 'vehicles.firstClass.name',
    descriptionKey: 'vehicles.firstClass.description',
    category: 'regular',
    image: '/images/vehicles/first-class.jpg',
    passengerCount: 3,
    luggageCount: 2,
    features: [
      'vehicles.features.premiumLeather',
      'vehicles.features.wifi',
      'vehicles.features.climateControl',
      'vehicles.features.phoneCharger',
      'vehicles.features.bottledWater',
      'vehicles.features.champagne',
      'vehicles.features.newspaper',
    ],
    pricing: {
      airportTransfer: 250,
      hourlyRate: 140,
    },
  },
  {
    slug: 'mercedes-maybach',
    nameKey: 'vehicles.mercedesMaybach.name',
    descriptionKey: 'vehicles.mercedesMaybach.description',
    category: 'on-demand',
    image: '/images/vehicles/mercedes-maybach.jpg',
    passengerCount: 3,
    luggageCount: 2,
    features: [
      'vehicles.features.premiumLeather',
      'vehicles.features.wifi',
      'vehicles.features.climateControl',
      'vehicles.features.phoneCharger',
      'vehicles.features.champagne',
      'vehicles.features.massageSeats',
      'vehicles.features.privacyPartition',
    ],
    pricing: {},
  },
  {
    slug: 'van-vip',
    nameKey: 'vehicles.vanVip.name',
    descriptionKey: 'vehicles.vanVip.description',
    category: 'on-demand',
    image: '/images/vehicles/van-vip.jpg',
    passengerCount: 6,
    luggageCount: 6,
    features: [
      'vehicles.features.premiumLeather',
      'vehicles.features.wifi',
      'vehicles.features.climateControl',
      'vehicles.features.phoneCharger',
      'vehicles.features.bottledWater',
      'vehicles.features.champagne',
      'vehicles.features.entertainmentSystem',
    ],
    pricing: {},
  },
  {
    slug: 'sprinter',
    nameKey: 'vehicles.sprinter.name',
    descriptionKey: 'vehicles.sprinter.description',
    category: 'on-demand',
    image: '/images/vehicles/sprinter.jpg',
    passengerCount: 12,
    luggageCount: 12,
    features: [
      'vehicles.features.leatherSeats',
      'vehicles.features.wifi',
      'vehicles.features.climateControl',
      'vehicles.features.phoneCharger',
      'vehicles.features.bottledWater',
      'vehicles.features.extraLuggage',
      'vehicles.features.entertainmentSystem',
    ],
    pricing: {},
  },
  {
    slug: 'rolls-royce',
    nameKey: 'vehicles.rollsRoyce.name',
    descriptionKey: 'vehicles.rollsRoyce.description',
    category: 'on-demand',
    image: '/images/vehicles/rolls-royce.jpg',
    passengerCount: 3,
    luggageCount: 2,
    features: [
      'vehicles.features.premiumLeather',
      'vehicles.features.wifi',
      'vehicles.features.climateControl',
      'vehicles.features.phoneCharger',
      'vehicles.features.champagne',
      'vehicles.features.massageSeats',
      'vehicles.features.privacyPartition',
      'vehicles.features.starlightHeadliner',
    ],
    pricing: {},
  },
  {
    slug: 'bentley',
    nameKey: 'vehicles.bentley.name',
    descriptionKey: 'vehicles.bentley.description',
    category: 'on-demand',
    image: '/images/vehicles/bentley.jpg',
    passengerCount: 3,
    luggageCount: 2,
    features: [
      'vehicles.features.premiumLeather',
      'vehicles.features.wifi',
      'vehicles.features.climateControl',
      'vehicles.features.phoneCharger',
      'vehicles.features.champagne',
      'vehicles.features.massageSeats',
      'vehicles.features.handcraftedInterior',
    ],
    pricing: {},
  },
  {
    slug: 'range-rover',
    nameKey: 'vehicles.rangeRover.name',
    descriptionKey: 'vehicles.rangeRover.description',
    category: 'on-demand',
    image: '/images/vehicles/range-rover.jpg',
    passengerCount: 4,
    luggageCount: 3,
    features: [
      'vehicles.features.premiumLeather',
      'vehicles.features.wifi',
      'vehicles.features.climateControl',
      'vehicles.features.phoneCharger',
      'vehicles.features.bottledWater',
      'vehicles.features.terrainResponse',
      'vehicles.features.panoramicRoof',
    ],
    pricing: {},
  },
];

export const SERVICES: ServiceInfo[] = [
  {
    slug: 'airport-transfer',
    nameKey: 'services.airportTransfer.name',
    descriptionKey: 'services.airportTransfer.description',
    icon: 'Plane',
    features: [
      'services.airportTransfer.features.flightTracking',
      'services.airportTransfer.features.meetAndGreet',
      'services.airportTransfer.features.freeWaiting',
      'services.airportTransfer.features.fixedPrice',
      'services.airportTransfer.features.luggageAssistance',
      'services.airportTransfer.features.allAirports',
    ],
  },
  {
    slug: 'hourly',
    nameKey: 'services.hourly.name',
    descriptionKey: 'services.hourly.description',
    icon: 'Clock',
    features: [
      'services.hourly.features.flexibleSchedule',
      'services.hourly.features.multipleStops',
      'services.hourly.features.dedicatedChauffeur',
      'services.hourly.features.businessMeetings',
      'services.hourly.features.cityTours',
      'services.hourly.features.events',
    ],
  },
  {
    slug: 'custom',
    nameKey: 'services.custom.name',
    descriptionKey: 'services.custom.description',
    icon: 'Star',
    features: [
      'services.custom.features.tailoredItinerary',
      'services.custom.features.longDistance',
      'services.custom.features.weddingService',
      'services.custom.features.corporateEvents',
      'services.custom.features.wineToursChateaux',
      'services.custom.features.dedicatedSupport',
    ],
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'faq.booking.q1',
    answer: 'faq.booking.a1',
    category: 'Booking',
  },
  {
    question: 'faq.booking.q2',
    answer: 'faq.booking.a2',
    category: 'Booking',
  },
  {
    question: 'faq.booking.q3',
    answer: 'faq.booking.a3',
    category: 'Booking',
  },
  {
    question: 'faq.pricing.q1',
    answer: 'faq.pricing.a1',
    category: 'Pricing',
  },
  {
    question: 'faq.pricing.q2',
    answer: 'faq.pricing.a2',
    category: 'Pricing',
  },
  {
    question: 'faq.pricing.q3',
    answer: 'faq.pricing.a3',
    category: 'Pricing',
  },
  {
    question: 'faq.services.q1',
    answer: 'faq.services.a1',
    category: 'Services',
  },
  {
    question: 'faq.services.q2',
    answer: 'faq.services.a2',
    category: 'Services',
  },
  {
    question: 'faq.services.q3',
    answer: 'faq.services.a3',
    category: 'Services',
  },
  {
    question: 'faq.vehicles.q1',
    answer: 'faq.vehicles.a1',
    category: 'Vehicles',
  },
  {
    question: 'faq.vehicles.q2',
    answer: 'faq.vehicles.a2',
    category: 'Vehicles',
  },
  {
    question: 'faq.vehicles.q3',
    answer: 'faq.vehicles.a3',
    category: 'Vehicles',
  },
  {
    question: 'faq.cancellation.q1',
    answer: 'faq.cancellation.a1',
    category: 'Cancellation',
  },
  {
    question: 'faq.cancellation.q2',
    answer: 'faq.cancellation.a2',
    category: 'Cancellation',
  },
  {
    question: 'faq.cancellation.q3',
    answer: 'faq.cancellation.a3',
    category: 'Cancellation',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    nameKey: 'testimonials.client1.name',
    roleKey: 'testimonials.client1.role',
    contentKey: 'testimonials.client1.content',
    rating: 5,
    image: '/images/testimonials/client-1.jpg',
  },
  {
    nameKey: 'testimonials.client2.name',
    roleKey: 'testimonials.client2.role',
    contentKey: 'testimonials.client2.content',
    rating: 5,
    image: '/images/testimonials/client-2.jpg',
  },
  {
    nameKey: 'testimonials.client3.name',
    roleKey: 'testimonials.client3.role',
    contentKey: 'testimonials.client3.content',
    rating: 5,
    image: '/images/testimonials/client-3.jpg',
  },
  {
    nameKey: 'testimonials.client4.name',
    roleKey: 'testimonials.client4.role',
    contentKey: 'testimonials.client4.content',
    rating: 4,
    image: '/images/testimonials/client-4.jpg',
  },
];

export const STATS = [
  { value: '10+', labelKey: 'stats.years' },
  { value: '5000+', labelKey: 'stats.rides' },
  { value: '50+', labelKey: 'stats.cities' },
  { value: '98%', labelKey: 'stats.satisfaction' },
] as const;

export const NAV_LINKS = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.booking', path: '/booking' },
  { labelKey: 'nav.fleet', path: '/fleet' },
  { labelKey: 'nav.services', path: '/services' },
  { labelKey: 'nav.about', path: '/about' },
  { labelKey: 'nav.contact', path: '/contact' },
  { labelKey: 'nav.faq', path: '/faq' },
] as const;

export const PARTNER_LOGOS = [
  { name: 'Air France', image: '/images/partners/air-france.png' },
  { name: 'AccorHotels', image: '/images/partners/accor-hotels.png' },
  { name: 'Four Seasons', image: '/images/partners/four-seasons.png' },
  { name: 'Le Bristol', image: '/images/partners/le-bristol.png' },
  { name: 'Ritz Paris', image: '/images/partners/ritz-paris.png' },
  { name: 'Plaza Athenee', image: '/images/partners/plaza-athenee.png' },
] as const;

// Airport transfer pricing per route and vehicle
// Routes not listed here → "Price on request"
export const AIRPORT_TRANSFER_PRICES: Record<AirportRoute, Partial<Record<VehicleSlug, number>>> = {
  'paris-cdg': {
    'business-class': 150,
    'van-xl': 210,
    'first-class': 250,
  },
  'cdg-paris': {
    'business-class': 150,
    'van-xl': 210,
    'first-class': 250,
  },
  'paris-orly': {
    'business-class': 150,
    'van-xl': 210,
    'first-class': 250,
  },
  'orly-paris': {
    'business-class': 150,
    'van-xl': 210,
    'first-class': 250,
  },
  'paris-beauvais': {
    'business-class': 240,
    'van-xl': 310,
    'first-class': 380,
  },
  'beauvais-paris': {
    'business-class': 240,
    'van-xl': 310,
    'first-class': 380,
  },
  'cdg-orly': {
    'business-class': 190,
    'van-xl': 260,
    'first-class': 310,
  },
  'orly-cdg': {
    'business-class': 190,
    'van-xl': 260,
    'first-class': 310,
  },
};

export const AIRPORT_ROUTES: { value: AirportRoute; labelKey: string }[] = [
  { value: 'paris-cdg', labelKey: 'booking.routes.parisCdg' },
  { value: 'cdg-paris', labelKey: 'booking.routes.cdgParis' },
  { value: 'paris-orly', labelKey: 'booking.routes.parisOrly' },
  { value: 'orly-paris', labelKey: 'booking.routes.orlyParis' },
  { value: 'paris-beauvais', labelKey: 'booking.routes.parisBeauvais' },
  { value: 'beauvais-paris', labelKey: 'booking.routes.beauvaisParis' },
  { value: 'cdg-orly', labelKey: 'booking.routes.cdgOrly' },
  { value: 'orly-cdg', labelKey: 'booking.routes.orlyCdg' },
];
