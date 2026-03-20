'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, MapPin, Navigation, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import { bookingFormSchema } from '@/lib/validators';
import { detectAirportRoute, getRouteLabel } from '@/lib/route-detection';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import Input from '@/components/ui/Input';
import ServiceTypeSelector from './ServiceTypeSelector';
import VehicleSelector from './VehicleSelector';
import HourlyFields from './HourlyFields';
import LocationFields from './LocationFields';
import DateTimePicker from './DateTimePicker';
import CustomerDetailsFields from './CustomerDetailsFields';
import PricingDisplay from './PricingDisplay';
import BookingConfirmation from './BookingConfirmation';
import type { ServiceType, VehicleSlug, AirportRoute, BookingFormData } from '@/lib/types';

const VALID_SERVICE_TYPES: ServiceType[] = ['airport-transfer', 'hourly', 'custom'];
const VALID_VEHICLE_SLUGS: VehicleSlug[] = [
  'business-class', 'van-xl', 'first-class', 'mercedes-maybach',
  'van-vip', 'sprinter', 'rolls-royce', 'bentley', 'range-rover',
];

interface BookingFormProps {
  variant: 'compact' | 'full';
  defaultServiceType?: ServiceType;
  defaultPickup?: string;
  defaultDropoff?: string;
  defaultDate?: string;
  defaultTime?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: 'auto' as const,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, y: -10, height: 0 },
};

// --- Full Booking Form ---

function FullBookingForm({
  defaultServiceType,
  defaultPickup,
  defaultDropoff,
  defaultDate,
  defaultTime,
}: Omit<BookingFormProps, 'variant'>) {
  const t = useTranslations();
  const locale = useLocale();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [detectedRoute, setDetectedRoute] = useState<AirportRoute | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema) as any,
    defaultValues: {
      serviceType: defaultServiceType || ('' as unknown as ServiceType),
      vehicleSlug: '' as unknown as VehicleSlug,
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      pickupLocation: defaultPickup || '',
      dropoffLocation: defaultDropoff || '',
      date: defaultDate || '',
      time: defaultTime || '',
      hours: 1,
      airportRoute: undefined,
      flightNumber: '',
      notes: '',
      locale,
    },
  });

  const serviceType = watch('serviceType');
  const vehicleSlug = watch('vehicleSlug');
  const hours = watch('hours');
  const airportRoute = watch('airportRoute');
  const pickupLocation = watch('pickupLocation');
  const dropoffLocation = watch('dropoffLocation');

  // Auto-detect airport route from addresses
  useEffect(() => {
    if (serviceType === 'airport-transfer' && pickupLocation && dropoffLocation) {
      const route = detectAirportRoute(pickupLocation, dropoffLocation);
      setDetectedRoute(route);
      setValue('airportRoute', route || undefined, { shouldValidate: false });
    } else {
      setDetectedRoute(null);
      setValue('airportRoute', undefined, { shouldValidate: false });
    }
  }, [serviceType, pickupLocation, dropoffLocation, setValue]);

  // Friendly error message helper
  const getFieldError = (fieldName: keyof BookingFormData): string | undefined => {
    const error = errors[fieldName]?.message;
    if (!error) return undefined;
    if (fieldName === 'serviceType' && !VALID_SERVICE_TYPES.includes(serviceType)) {
      return t('validation.selectService');
    }
    if (fieldName === 'vehicleSlug' && !VALID_VEHICLE_SLUGS.includes(vehicleSlug)) {
      return t('validation.selectVehicle');
    }
    return error;
  };

  const handleServiceChange = (type: ServiceType) => {
    setValue('serviceType', type, { shouldValidate: true });
  };

  const handleVehicleChange = (slug: VehicleSlug) => {
    setValue('vehicleSlug', slug, { shouldValidate: true });
  };

  const handleReset = () => {
    reset();
    setIsSubmitted(false);
    setSubmitError(null);
    setDetectedRoute(null);
  };

  if (isSubmitted) {
    return <BookingConfirmation onReset={handleReset} />;
  }

  const getMissingFieldsSummary = (): string[] => {
    const missing: string[] = [];
    if (errors.serviceType) missing.push(t('booking.serviceType'));
    if (errors.vehicleSlug) missing.push(t('booking.vehicleSelection'));
    if (errors.pickupLocation) missing.push(t('booking.pickupLocation'));
    if (errors.dropoffLocation) missing.push(t('booking.dropoffLocation'));
    if (errors.date) missing.push(t('booking.date'));
    if (errors.time) missing.push(t('booking.time'));
    if (errors.customerName) missing.push(t('booking.name'));
    if (errors.customerEmail) missing.push(t('booking.email'));
    if (errors.customerPhone) missing.push(t('booking.phone'));
    if (serviceType === 'hourly' && errors.hours) missing.push(t('booking.hours'));
    return missing;
  };

  const onSubmit = async (data: BookingFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) {
        throw new Error('Failed to submit booking');
      }
      setIsSubmitted(true);
    } catch {
      setSubmitError(t('booking.submitError'));
    }
  };

  const missingFields = Object.keys(errors).length > 0 ? getMissingFieldsSummary() : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* 1. Service Type */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <ServiceTypeSelector
          value={serviceType}
          onChange={handleServiceChange}
          error={getFieldError('serviceType')}
        />
      </motion.section>

      {/* 2. Vehicle Selection */}
      <AnimatePresence>
        {serviceType && (
          <motion.section
            key="vehicle"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
          >
            <VehicleSelector
              value={vehicleSlug}
              onChange={handleVehicleChange}
              serviceType={serviceType}
              error={getFieldError('vehicleSlug')}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3. Location Fields (Pickup & Dropoff with Google Places) */}
      <AnimatePresence>
        {serviceType && (
          <motion.section
            key="location"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
          >
            <LocationFields
              errors={errors}
              setValue={setValue}
              watch={watch}
            />

            {/* Auto-detected route badge for airport transfer */}
            {serviceType === 'airport-transfer' && pickupLocation && dropoffLocation && (
              <div className="mt-4">
                {detectedRoute ? (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                    <Navigation className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-green-700">
                        {t('booking.routeDetected')}: {getRouteLabel(detectedRoute).from} → {getRouteLabel(detectedRoute).to}
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        {t('booking.fixedPriceApplied')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-amber-700">
                        {t('booking.customRoute')}
                      </p>
                      <p className="text-xs text-amber-600 mt-0.5">
                        {t('booking.priceOnRequestNote')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3b. Flight number for airport transfers */}
      <AnimatePresence>
        {serviceType === 'airport-transfer' && (
          <motion.section
            key="flight"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
          >
            <div className="flex items-center gap-2 mb-3">
              <Plane className="w-5 h-5 text-brand-orange" />
              <h3 className="text-lg font-semibold text-brand-black">
                {t('booking.flightDetails')}
              </h3>
            </div>
            <Input
              label={t('booking.flightNumber')}
              id="flightNumber"
              placeholder="e.g. AF1234"
              error={errors.flightNumber?.message}
              {...register('flightNumber')}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3c. Hourly Fields */}
      <AnimatePresence>
        {serviceType === 'hourly' && (
          <motion.section
            key="hourly"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
          >
            <HourlyFields
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* 4. Date & Time */}
      <AnimatePresence>
        {serviceType && (
          <motion.section
            key="datetime"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
          >
            <h3 className="text-lg font-semibold text-brand-black mb-4">
              {t('booking.dateTime')}
            </h3>
            <DateTimePicker register={register} errors={errors} />
          </motion.section>
        )}
      </AnimatePresence>

      {/* 5. Customer Details */}
      <AnimatePresence>
        {serviceType && (
          <motion.section
            key="customer"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
          >
            <CustomerDetailsFields register={register} errors={errors} />
          </motion.section>
        )}
      </AnimatePresence>

      {/* 6. Notes */}
      <AnimatePresence>
        {serviceType && (
          <motion.section
            key="notes"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
          >
            <Textarea
              label={t('booking.notes')}
              id="notes"
              placeholder={t('booking.notesPlaceholder')}
              error={errors.notes?.message}
              {...register('notes')}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Validation summary */}
      {missingFields.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-700">{t('validation.pleaseFillRequired')}</p>
            <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
              {missingFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Submit error */}
      {submitError && (
        <p className="text-sm text-red-500 text-center">{submitError}</p>
      )}

      {/* 7. Sticky Bottom Bar */}
      <div className="sticky bottom-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="bg-white border-t border-brand-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <PricingDisplay
              serviceType={serviceType}
              vehicleSlug={vehicleSlug}
              hours={hours}
              airportRoute={airportRoute}
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="min-w-[180px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('booking.submitting')}
                </>
              ) : (
                t('booking.submit')
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

// --- Main Export ---

export default function BookingForm({
  variant,
  ...rest
}: BookingFormProps) {
  if (variant === 'compact') {
    return null; // Compact form is handled by HeroSection directly
  }
  return <FullBookingForm {...rest} />;
}
