import type { AirportRoute } from './types';

/**
 * Keywords that identify each airport in addresses
 */
const AIRPORT_KEYWORDS: Record<string, string[]> = {
  cdg: [
    'charles de gaulle',
    'cdg',
    'roissy',
    'aéroport de paris-charles',
    'aeroport de paris-charles',
    'paris-charles-de-gaulle',
    'roissy-en-france',
    'terminal cdg',
  ],
  orly: [
    'orly',
    'ory',
    'aéroport de paris-orly',
    'aeroport de paris-orly',
    'paris-orly',
  ],
  beauvais: [
    'beauvais',
    'tillé',
    'tille',
    'aéroport de beauvais',
    'aeroport de beauvais',
    'paris-beauvais',
    'beauvais-tillé',
  ],
};

/**
 * Keywords that identify "Paris" (city, not airport)
 */
const PARIS_KEYWORDS = [
  'paris',
  'île-de-france',
  'ile-de-france',
  'champs-élysées',
  'champs-elysees',
  'montmartre',
  'louvre',
  'tour eiffel',
  'eiffel tower',
  'la défense',
  'la defense',
  'opéra',
  'opera',
  'bastille',
  'marais',
  'saint-germain',
  'pigalle',
  'république',
  'republique',
  'nation',
  'châtelet',
  'chatelet',
  'gare du nord',
  'gare de lyon',
  'gare montparnasse',
  'gare de l\'est',
  'gare saint-lazare',
  'disneyland',
  'versailles',
];

type AirportCode = 'cdg' | 'orly' | 'beauvais';

function detectAirport(address: string): AirportCode | null {
  const lower = address.toLowerCase();
  for (const [code, keywords] of Object.entries(AIRPORT_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return code as AirportCode;
    }
  }
  return null;
}

function detectParis(address: string): boolean {
  const lower = address.toLowerCase();
  // Check it's Paris-area but NOT an airport
  const isAirport = detectAirport(address) !== null;
  if (isAirport) return false;
  return PARIS_KEYWORDS.some((kw) => lower.includes(kw));
}

/**
 * Detects the airport route from pickup and dropoff addresses.
 * Returns the matching AirportRoute or null if no match.
 */
export function detectAirportRoute(
  pickup: string,
  dropoff: string
): AirportRoute | null {
  if (!pickup || !dropoff) return null;

  const pickupAirport = detectAirport(pickup);
  const dropoffAirport = detectAirport(dropoff);
  const pickupIsParis = detectParis(pickup);
  const dropoffIsParis = detectParis(dropoff);

  // Paris → Airport
  if (pickupIsParis && dropoffAirport) {
    switch (dropoffAirport) {
      case 'cdg': return 'paris-cdg';
      case 'orly': return 'paris-orly';
      case 'beauvais': return 'paris-beauvais';
    }
  }

  // Airport → Paris
  if (pickupAirport && dropoffIsParis) {
    switch (pickupAirport) {
      case 'cdg': return 'cdg-paris';
      case 'orly': return 'orly-paris';
      case 'beauvais': return 'beauvais-paris';
    }
  }

  // Airport → Airport (CDG ↔ Orly)
  if (pickupAirport === 'cdg' && dropoffAirport === 'orly') return 'cdg-orly';
  if (pickupAirport === 'orly' && dropoffAirport === 'cdg') return 'orly-cdg';

  // No match — price on request
  return null;
}

/**
 * Returns a human-readable label for the detected route.
 */
export function getRouteLabel(route: AirportRoute): { from: string; to: string } {
  const labels: Record<AirportRoute, { from: string; to: string }> = {
    'paris-cdg': { from: 'Paris', to: 'CDG' },
    'cdg-paris': { from: 'CDG', to: 'Paris' },
    'paris-orly': { from: 'Paris', to: 'Orly' },
    'orly-paris': { from: 'Orly', to: 'Paris' },
    'paris-beauvais': { from: 'Paris', to: 'Beauvais' },
    'beauvais-paris': { from: 'Beauvais', to: 'Paris' },
    'cdg-orly': { from: 'CDG', to: 'Orly' },
    'orly-cdg': { from: 'Orly', to: 'CDG' },
  };
  return labels[route];
}
