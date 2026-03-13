'use client';

import { useTranslations } from 'next-intl';
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Input from '@/components/ui/Input';
import { AIRPORT_ROUTES } from '@/lib/constants';
import type { BookingFormData, AirportRoute } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AirportFieldsProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
}

export default function AirportFields({ register, errors, setValue, watch }: AirportFieldsProps) {
  const t = useTranslations();
  const selectedRoute = watch('airportRoute');

  const handleRouteSelect = (route: AirportRoute) => {
    setValue('airportRoute', route, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      {/* Airport Route Selector */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-3">
          {t('booking.selectRoute')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {AIRPORT_ROUTES.map((route) => (
            <button
              key={route.value}
              type="button"
              onClick={() => handleRouteSelect(route.value)}
              className={cn(
                'px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer text-left border-2',
                selectedRoute === route.value
                  ? 'border-brand-orange bg-brand-orange/5 text-brand-orange'
                  : 'border-brand-gray-200 text-brand-gray-800 hover:border-brand-gray-300 bg-white'
              )}
            >
              {t(route.labelKey)}
            </button>
          ))}
        </div>
        {errors.airportRoute?.message && (
          <p className="mt-2 text-sm text-red-500">{errors.airportRoute.message}</p>
        )}
      </div>

      {/* Flight Number */}
      <Input
        label={t('booking.flightNumber')}
        id="flightNumber"
        placeholder="e.g. AF1234"
        error={errors.flightNumber?.message}
        {...register('flightNumber')}
      />
    </div>
  );
}
