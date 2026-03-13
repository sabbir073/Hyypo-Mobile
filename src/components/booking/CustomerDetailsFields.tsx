'use client';

import { useTranslations } from 'next-intl';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import Input from '@/components/ui/Input';
import type { BookingFormData } from '@/lib/types';

interface CustomerDetailsFieldsProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
}

export default function CustomerDetailsFields({
  register,
  errors,
}: CustomerDetailsFieldsProps) {
  const t = useTranslations();

  return (
    <div>
      <h3 className="text-lg font-semibold text-brand-black mb-4">
        {t('booking.customerInfo')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label={t('booking.name')}
          id="customerName"
          type="text"
          placeholder={t('booking.name')}
          error={errors.customerName?.message}
          {...register('customerName')}
        />
        <Input
          label={t('booking.email')}
          id="customerEmail"
          type="email"
          placeholder={t('booking.email')}
          error={errors.customerEmail?.message}
          {...register('customerEmail')}
        />
        <Input
          label={t('booking.phone')}
          id="customerPhone"
          type="tel"
          placeholder={t('booking.phone')}
          error={errors.customerPhone?.message}
          {...register('customerPhone')}
        />
      </div>
    </div>
  );
}
