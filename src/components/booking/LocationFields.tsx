'use client';

import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { BookingFormData } from '@/lib/types';
import GooglePlacesInput from '@/components/ui/GooglePlacesInput';

interface LocationFieldsProps {
  errors: FieldErrors<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
}

export default function LocationFields({
  errors,
  setValue,
  watch,
}: LocationFieldsProps) {
  const t = useTranslations();
  const pickupLocation = watch('pickupLocation') || '';
  const dropoffLocation = watch('dropoffLocation') || '';

  return (
    <div>
      <h3 className="text-lg font-semibold text-brand-black mb-4">
        {t('booking.tripDetails')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GooglePlacesInput
          id="pickupLocation"
          label={t('booking.pickupLocation')}
          placeholder={t('booking.pickupLocation')}
          value={pickupLocation}
          onChange={(val) => setValue('pickupLocation', val, { shouldValidate: true })}
          error={errors.pickupLocation?.message}
        />
        <GooglePlacesInput
          id="dropoffLocation"
          label={t('booking.dropoffLocation')}
          placeholder={t('booking.dropoffLocation')}
          value={dropoffLocation}
          onChange={(val) => setValue('dropoffLocation', val, { shouldValidate: true })}
          error={errors.dropoffLocation?.message}
        />
      </div>
    </div>
  );
}
