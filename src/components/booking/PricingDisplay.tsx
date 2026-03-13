'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Tag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { calculatePrice } from '@/lib/pricing';
import type { ServiceType, VehicleSlug, AirportRoute } from '@/lib/types';

interface PricingDisplayProps {
  serviceType: ServiceType | '';
  vehicleSlug: VehicleSlug | '';
  hours?: number;
  airportRoute?: AirportRoute;
}

export default function PricingDisplay({
  serviceType,
  vehicleSlug,
  hours,
  airportRoute,
}: PricingDisplayProps) {
  const t = useTranslations();

  const hasSelection = serviceType && vehicleSlug;
  const result = hasSelection
    ? calculatePrice(serviceType as ServiceType, vehicleSlug as VehicleSlug, hours, airportRoute)
    : null;

  return (
    <div className="flex items-center gap-3">
      <AnimatePresence mode="wait">
        {!hasSelection && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-brand-gray-300"
          >
            <Tag className="w-5 h-5" />
            <span className="text-sm font-medium">
              {t('booking.priceSummary')}
            </span>
          </motion.div>
        )}

        {hasSelection && result?.type === 'fixed' && (
          <motion.div
            key={`fixed-${result.amount}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-baseline gap-2"
          >
            <span className="text-2xl md:text-3xl font-bold text-brand-orange">
              {formatCurrency(result.amount)}
            </span>
            {serviceType === 'hourly' && hours && hours > 0 && (
              <span className="text-sm text-brand-gray-300 font-medium">
                ({hours} {t('booking.hoursLabel')})
              </span>
            )}
          </motion.div>
        )}

        {hasSelection && result?.type === 'quote' && (
          <motion.div
            key="quote"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Info className="w-5 h-5 text-brand-orange" />
            <span className="text-base font-semibold text-brand-black">
              {t('booking.priceOnRequest')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
