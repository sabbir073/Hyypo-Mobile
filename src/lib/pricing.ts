import type { ServiceType, VehicleSlug, PriceResult, AirportRoute } from './types';
import { VEHICLES, AIRPORT_TRANSFER_PRICES } from './constants';

export function calculatePrice(
  serviceType: ServiceType,
  vehicleSlug: VehicleSlug,
  hours?: number,
  airportRoute?: AirportRoute
): PriceResult {
  if (serviceType === 'custom') {
    return { type: 'quote' };
  }

  const vehicle = VEHICLES.find((v) => v.slug === vehicleSlug);

  if (!vehicle) {
    return { type: 'quote' };
  }

  if (vehicle.category === 'on-demand') {
    return { type: 'quote' };
  }

  if (serviceType === 'airport-transfer') {
    if (!airportRoute) {
      return { type: 'quote' };
    }
    const routePrices = AIRPORT_TRANSFER_PRICES[airportRoute];
    if (!routePrices) {
      return { type: 'quote' };
    }
    const price = routePrices[vehicleSlug];
    if (price !== undefined) {
      return { type: 'fixed', amount: price };
    }
    return { type: 'quote' };
  }

  if (serviceType === 'hourly') {
    if (vehicle.pricing.hourlyRate !== undefined && hours && hours > 0) {
      return { type: 'fixed', amount: vehicle.pricing.hourlyRate * hours };
    }
    return { type: 'quote' };
  }

  return { type: 'quote' };
}
