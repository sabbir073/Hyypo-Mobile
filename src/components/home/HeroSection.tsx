'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Calendar, Clock, ArrowRight, Plane, Timer, Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import GooglePlacesInput from '@/components/ui/GooglePlacesInput';
import { cn } from '@/lib/utils';
import type { ServiceType } from '@/lib/types';

const serviceOptions: { type: ServiceType; icon: typeof Plane; labelKey: string }[] = [
  { type: 'airport-transfer', icon: Plane, labelKey: 'booking.airportTransfer' },
  { type: 'hourly', icon: Timer, labelKey: 'booking.hourlyChauffeur' },
  { type: 'custom', icon: Star, labelKey: 'booking.customJourney' },
];

export default function HeroSection() {
  const t = useTranslations();
  const [serviceType, setServiceType] = useState<ServiceType>('airport-transfer');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const bookingParams = new URLSearchParams({
    serviceType: serviceType,
    ...(pickup && { pickup }),
    ...(dropoff && { dropoff }),
    ...(date && { date }),
    ...(time && { time }),
  });

  return (
    <section className="relative min-h-[600px] h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-gray-900 to-brand-black" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-orange/10 blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.h1
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-brand-gray-200 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            >
              <Link href="/booking">
                <Button size="lg">
                  {t('common.bookNow')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-brand-white/30 text-brand-white hover:bg-brand-white/10 hover:text-brand-white hover:border-brand-white/50">
                  {t('common.learnMore')}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right - Booking Form */}
          <motion.div
            className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {/* Service Type Selector */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {serviceOptions.map((opt) => {
                const Icon = opt.icon;
                const isActive = serviceType === opt.type;
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setServiceType(opt.type)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer',
                      isActive
                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/25'
                        : 'bg-white/5 text-brand-gray-200 hover:bg-white/10'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-center leading-tight">{t(opt.labelKey)}</span>
                  </button>
                );
              })}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <GooglePlacesInput
                id="hero-pickup"
                label={t('booking.pickupLocation')}
                placeholder={t('booking.pickupPlaceholder')}
                value={pickup}
                onChange={setPickup}
                variant="dark"
              />

              <GooglePlacesInput
                id="hero-dropoff"
                label={t('booking.dropoffLocation')}
                placeholder={t('booking.dropoffPlaceholder')}
                value={dropoff}
                onChange={setDropoff}
                variant="dark"
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-gray-300" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder={t('booking.datePlaceholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-brand-white placeholder:text-brand-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 focus:outline-none transition-all duration-200 [color-scheme:dark]"
                  />
                </div>

                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-gray-300" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder={t('booking.timePlaceholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-brand-white placeholder:text-brand-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 focus:outline-none transition-all duration-200 [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <Link href={`/booking?${bookingParams.toString()}`} className="block mt-6">
              <Button className="w-full" size="lg">
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
