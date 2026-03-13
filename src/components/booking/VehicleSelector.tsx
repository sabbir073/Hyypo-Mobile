'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users, Briefcase } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import { VEHICLES } from '@/lib/constants';
import type { ServiceType, VehicleSlug } from '@/lib/types';

interface VehicleSelectorProps {
  value: VehicleSlug | '';
  onChange: (slug: VehicleSlug) => void;
  serviceType: ServiceType | '';
  error?: string;
}

export default function VehicleSelector({
  value,
  onChange,
  serviceType,
  error,
}: VehicleSelectorProps) {
  const t = useTranslations();

  return (
    <div>
      <h3 className="text-lg font-semibold text-brand-black mb-4">
        {t('booking.vehicleSelection')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {VEHICLES.map((vehicle, index) => {
          const isSelected = value === vehicle.slug;
          const isOnDemand = vehicle.category === 'on-demand';

          let priceDisplay: string | null = null;
          if (!isOnDemand && serviceType === 'airport-transfer' && vehicle.pricing.airportTransfer) {
            priceDisplay = formatCurrency(vehicle.pricing.airportTransfer);
          } else if (!isOnDemand && serviceType === 'hourly' && vehicle.pricing.hourlyRate) {
            priceDisplay = `${formatCurrency(vehicle.pricing.hourlyRate)} / ${t('common.perHour')}`;
          }

          return (
            <motion.button
              key={vehicle.slug}
              type="button"
              onClick={() => onChange(vehicle.slug)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative flex flex-col rounded-2xl border-2 overflow-hidden transition-colors duration-200 cursor-pointer text-left',
                isSelected
                  ? 'border-brand-orange shadow-lg shadow-brand-orange/10'
                  : 'border-brand-gray-200 bg-white hover:border-brand-gray-300',
              )}
            >
              {/* Vehicle Image */}
              <div className="relative h-36 bg-brand-gray-100 overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={t(vehicle.nameKey)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {isOnDemand && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="quote">{t('common.requestQuote')}</Badge>
                  </div>
                )}
              </div>

              {/* Card content */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h4
                  className={cn(
                    'font-semibold text-base',
                    isSelected ? 'text-brand-orange' : 'text-brand-black',
                  )}
                >
                  {t(vehicle.nameKey)}
                </h4>

                <div className="flex items-center gap-4 text-sm text-brand-gray-300">
                  <span className="inline-flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {vehicle.passengerCount}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {vehicle.luggageCount}
                  </span>
                </div>

                {priceDisplay && (
                  <div className="mt-auto pt-2">
                    <Badge variant="price">
                      {serviceType === 'airport-transfer'
                        ? priceDisplay
                        : priceDisplay}
                    </Badge>
                  </div>
                )}

                {isOnDemand && !priceDisplay && (
                  <div className="mt-auto pt-2">
                    <Badge variant="info">{t('common.requestQuote')}</Badge>
                  </div>
                )}
              </div>

              {isSelected && (
                <motion.div
                  className="absolute top-3 left-3 w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
