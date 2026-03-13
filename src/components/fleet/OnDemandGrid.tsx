'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Users, Briefcase } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { VEHICLES } from '@/lib/constants';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function OnDemandGrid() {
  const t = useTranslations();

  const onDemandVehicles = VEHICLES.filter((v) => v.category === 'on-demand');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {onDemandVehicles.map((vehicle, index) => (
        <ScrollReveal key={vehicle.slug} delay={index * 0.1}>
          <Card hover className="h-full flex flex-col border border-brand-orange/20">
            {/* Vehicle Image */}
            <div className="relative h-52 bg-brand-gray-100 overflow-hidden">
              <Image
                src={vehicle.image}
                alt={t(vehicle.nameKey)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <Badge variant="info" className="bg-brand-orange/20 text-brand-orange border border-brand-orange/30">
                  Exclusive
                </Badge>
              </div>
            </div>

            <div className="flex flex-col flex-1 p-5">
              <h3 className="font-heading text-xl font-bold text-brand-black">
                {t(vehicle.nameKey)}
              </h3>
              <p className="mt-2 text-sm text-brand-gray-300 leading-relaxed line-clamp-3">
                {t(vehicle.descriptionKey)}
              </p>

              {/* Specs */}
              <div className="mt-4 flex items-center gap-5 text-sm">
                <div className="flex items-center gap-1.5 text-brand-gray-800">
                  <Users className="h-4 w-4 text-brand-orange" />
                  <span>{vehicle.passengerCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-brand-gray-800">
                  <Briefcase className="h-4 w-4 text-brand-orange" />
                  <span>{vehicle.luggageCount}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-5">
                <Link href="/contact" className="block">
                  <Button variant="outline" className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
                    {t('vehicles.requestQuote')}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      ))}
    </div>
  );
}
