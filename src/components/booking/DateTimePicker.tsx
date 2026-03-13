'use client';

import { useTranslations } from 'next-intl';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Calendar, Clock } from 'lucide-react';
import type { BookingFormData } from '@/lib/types';

interface DateTimePickerProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
}

export default function DateTimePicker({
  register,
  errors,
}: DateTimePickerProps) {
  const t = useTranslations();

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="w-full">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-brand-black mb-1.5"
        >
          {t('booking.date')}
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-300 pointer-events-none" />
          <input
            id="date"
            type="date"
            min={today}
            className={`w-full border rounded-xl pl-10 pr-4 py-3 text-brand-black transition-all duration-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none ${
              errors.date
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-brand-gray-200'
            }`}
            {...register('date')}
          />
        </div>
        {errors.date?.message && (
          <p className="mt-1.5 text-sm text-red-500">
            {errors.date.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="time"
          className="block text-sm font-medium text-brand-black mb-1.5"
        >
          {t('booking.time')}
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-300 pointer-events-none" />
          <input
            id="time"
            type="time"
            className={`w-full border rounded-xl pl-10 pr-4 py-3 text-brand-black transition-all duration-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none ${
              errors.time
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-brand-gray-200'
            }`}
            {...register('time')}
          />
        </div>
        {errors.time?.message && (
          <p className="mt-1.5 text-sm text-red-500">
            {errors.time.message}
          </p>
        )}
      </div>
    </div>
  );
}
