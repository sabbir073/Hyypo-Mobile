'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Users, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { VEHICLES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function FleetPreview() {
  const t = useTranslations();
  const regularVehicles = VEHICLES.filter((v) => v.category === 'regular');

  return (
    <section className="bg-brand-gray-50 py-20 md:py-28">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title={t('vehicles.title')}
            subtitle={t('vehicles.subtitle')}
          />
        </ScrollReveal>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {regularVehicles.map((vehicle, index) => (
            <ScrollReveal key={vehicle.slug} delay={index * 0.15}>
              <Card hover className="h-full flex flex-col">
                {/* Vehicle Image */}
                <div className="relative h-52 bg-brand-gray-100 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={t(vehicle.nameKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="price">
                      {t('common.from')} {formatCurrency(vehicle.pricing.airportTransfer!)}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-xl font-bold text-brand-black">
                    {t(vehicle.nameKey)}
                  </h3>

                  <p className="mt-2 text-sm text-brand-gray-300 leading-relaxed flex-1">
                    {t(vehicle.descriptionKey)}
                  </p>

                  {/* Capacity */}
                  <div className="mt-4 flex items-center gap-6 text-sm text-brand-gray-300">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-brand-orange" />
                      {vehicle.passengerCount} {t('vehicles.passengers')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-brand-orange" />
                      {vehicle.luggageCount} {t('vehicles.luggage')}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="mt-4 pt-4 border-t border-brand-gray-100 flex items-center justify-between text-sm">
                    <div>
                      <span className="text-brand-gray-300">{t('vehicles.from')}: </span>
                      <span className="font-bold text-brand-black">
                        {formatCurrency(vehicle.pricing.airportTransfer!)}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-brand-black">
                        {formatCurrency(vehicle.pricing.hourlyRate!)}
                      </span>
                      <span className="text-brand-gray-300"> / {t('common.perHour')}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href={`/booking?vehicle=${vehicle.slug}`} className="block mt-5">
                    <Button className="w-full" size="sm">
                      {t('common.bookNow')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Fleet Link */}
        <ScrollReveal>
          <div className="mt-12 text-center">
            <Link href="/fleet">
              <Button variant="outline" size="lg">
                {t('common.viewAll')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
