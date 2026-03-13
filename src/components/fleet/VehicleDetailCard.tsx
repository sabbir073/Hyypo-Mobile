'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Users, Briefcase } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn, formatCurrency } from '@/lib/utils';
import type { Vehicle } from '@/lib/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface VehicleDetailCardProps {
  vehicle: Vehicle;
  index: number;
}

export default function VehicleDetailCard({ vehicle, index }: VehicleDetailCardProps) {
  const t = useTranslations();

  const isOnDemand = vehicle.category === 'on-demand';

  return (
    <ScrollReveal delay={index * 0.15}>
      <Card hover className="h-full flex flex-col">
        {/* Image area */}
        <div className="relative h-64 bg-brand-gray-100 overflow-hidden">
          <Image
            src={vehicle.image}
            alt={t(vehicle.nameKey)}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {isOnDemand && (
            <div className="absolute top-4 right-4">
              <Badge variant="quote">On-Demand</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Name & description */}
          <h3 className="font-heading text-2xl font-bold text-brand-black">
            {t(vehicle.nameKey)}
          </h3>
          <p className="mt-2 text-brand-gray-300 leading-relaxed text-sm">
            {t(vehicle.descriptionKey)}
          </p>

          {/* Specs row */}
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-2 text-brand-gray-800">
              <Users className="h-4 w-4 text-brand-orange" />
              <span className="text-sm font-medium">
                {vehicle.passengerCount} {t('vehicles.passengers')}
              </span>
            </div>
            <div className="flex items-center gap-2 text-brand-gray-800">
              <Briefcase className="h-4 w-4 text-brand-orange" />
              <span className="text-sm font-medium">
                {vehicle.luggageCount} {t('vehicles.luggage')}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-auto pt-6">
            {!isOnDemand ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-brand-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-brand-gray-300 mb-1">Airport Transfer</p>
                  <p className="text-lg font-bold text-brand-black">
                    {formatCurrency(vehicle.pricing.airportTransfer!)}
                  </p>
                </div>
                <div className="bg-brand-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-brand-gray-300 mb-1">
                    {t('vehicles.perHour')}
                  </p>
                  <p className="text-lg font-bold text-brand-black">
                    {formatCurrency(vehicle.pricing.hourlyRate!)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <Badge variant="quote" className="px-6 py-2 text-sm">
                  {t('vehicles.requestQuote')}
                </Badge>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4">
            {!isOnDemand ? (
              <Link href={`/booking?vehicle=${vehicle.slug}`} className="block">
                <Button className="w-full">{t('fleet.bookThisVehicle')}</Button>
              </Link>
            ) : (
              <Link href={`/contact`} className="block">
                <Button variant="outline" className="w-full">
                  {t('fleet.requestQuoteFor')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </ScrollReveal>
  );
}
