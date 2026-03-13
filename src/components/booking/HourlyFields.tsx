'use client';

import { useTranslations } from 'next-intl';
import { Minus, Plus, Info } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { calculatePrice } from '@/lib/pricing';
import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import type { BookingFormData } from '@/lib/types';

interface HourlyFieldsProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
}

export default function HourlyFields({
  register,
  errors,
  watch,
  setValue,
}: HourlyFieldsProps) {
  const t = useTranslations();
  const hours = watch('hours') ?? 1;
  const vehicleSlug = watch('vehicleSlug');

  const decrement = () => {
    if (hours > 1) {
      setValue('hours', hours - 1, { shouldValidate: true });
    }
  };

  const increment = () => {
    if (hours < 24) {
      setValue('hours', hours + 1, { shouldValidate: true });
    }
  };

  const priceResult =
    vehicleSlug
      ? calculatePrice('hourly', vehicleSlug, hours)
      : null;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-brand-black">
        {t('booking.hours')}
      </label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={decrement}
          disabled={hours <= 1}
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-200 cursor-pointer',
            hours <= 1
              ? 'border-brand-gray-200 text-brand-gray-200 cursor-not-allowed'
              : 'border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white',
          )}
        >
          <Minus className="w-4 h-4" />
        </button>

        <input
          type="number"
          min={1}
          max={24}
          className="w-20 text-center text-xl font-bold text-brand-black border border-brand-gray-200 rounded-xl px-3 py-2 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          {...register('hours', { valueAsNumber: true })}
        />

        <button
          type="button"
          onClick={increment}
          disabled={hours >= 24}
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-200 cursor-pointer',
            hours >= 24
              ? 'border-brand-gray-200 text-brand-gray-200 cursor-not-allowed'
              : 'border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white',
          )}
        >
          <Plus className="w-4 h-4" />
        </button>

        <span className="text-sm text-brand-gray-300 font-medium">
          {t('booking.hoursLabel')}
        </span>
      </div>

      {errors.hours?.message && (
        <p className="text-sm text-red-500">{errors.hours.message}</p>
      )}

      <div className="flex items-center gap-2 text-sm text-brand-gray-300">
        <Info className="w-4 h-4 shrink-0" />
        <span>{t('booking.maxKmNote')}</span>
      </div>

      {priceResult?.type === 'fixed' && (
        <p className="text-sm font-semibold text-brand-orange">
          {t('booking.totalPrice')}: {formatCurrency(priceResult.amount)}
        </p>
      )}
    </div>
  );
}
