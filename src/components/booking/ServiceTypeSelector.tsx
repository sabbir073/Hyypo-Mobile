'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Plane, Clock, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ServiceType } from '@/lib/types';

interface ServiceTypeSelectorProps {
  value: ServiceType | '';
  onChange: (type: ServiceType) => void;
  error?: string;
}

const serviceOptions: {
  type: ServiceType;
  icon: typeof Plane;
  nameKey: string;
  descKey: string;
}[] = [
  {
    type: 'airport-transfer',
    icon: Plane,
    nameKey: 'booking.airport',
    descKey: 'booking.airportDesc',
  },
  {
    type: 'hourly',
    icon: Clock,
    nameKey: 'booking.hourly',
    descKey: 'booking.hourlyDesc',
  },
  {
    type: 'custom',
    icon: Wrench,
    nameKey: 'booking.custom',
    descKey: 'booking.customDesc',
  },
];

export default function ServiceTypeSelector({
  value,
  onChange,
  error,
}: ServiceTypeSelectorProps) {
  const t = useTranslations();

  return (
    <div>
      <h3 className="text-lg font-semibold text-brand-black mb-4">
        {t('booking.serviceType')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceOptions.map((option) => {
          const isSelected = value === option.type;
          const Icon = option.icon;

          return (
            <motion.button
              key={option.type}
              type="button"
              onClick={() => onChange(option.type)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={isSelected ? { scale: 1 } : { scale: 1 }}
              className={cn(
                'relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-colors duration-200 cursor-pointer text-center',
                isSelected
                  ? 'border-brand-orange bg-brand-orange/5'
                  : 'border-brand-gray-200 bg-white hover:border-brand-gray-300',
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center w-14 h-14 rounded-xl transition-colors duration-200',
                  isSelected
                    ? 'bg-brand-orange text-white'
                    : 'bg-brand-gray-100 text-brand-gray-800',
                )}
              >
                <Icon className="w-7 h-7" />
              </div>
              <span
                className={cn(
                  'text-base font-semibold transition-colors duration-200',
                  isSelected ? 'text-brand-orange' : 'text-brand-black',
                )}
              >
                {t(option.nameKey)}
              </span>
              <span className="text-sm text-brand-gray-300 leading-relaxed">
                {t(option.descKey)}
              </span>
              {isSelected && (
                <motion.div
                  layoutId="serviceIndicator"
                  className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center"
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
