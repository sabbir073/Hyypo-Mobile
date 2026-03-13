'use client';

import { useTranslations } from 'next-intl';
import { Plane, Clock, Star, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SERVICES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

const iconMap: Record<string, typeof Plane> = {
  Plane,
  Clock,
  Star,
};

const startingPrices: Record<string, number | null> = {
  'airport-transfer': 140,
  hourly: 90,
  custom: null,
};

export default function ServicesSection() {
  const t = useTranslations();

  return (
    <section className="bg-brand-white py-20 md:py-28">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title={t('services.title')}
            subtitle={t('services.subtitle')}
          />
        </ScrollReveal>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Star;
            const price = startingPrices[service.slug];

            return (
              <ScrollReveal key={service.slug} delay={index * 0.15}>
                <Card hover className="h-full flex flex-col p-8">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-orange/10 text-brand-orange mb-6">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-brand-black">
                    {t(service.nameKey)}
                  </h3>

                  <p className="mt-3 text-brand-gray-300 leading-relaxed flex-1">
                    {t(service.descriptionKey)}
                  </p>

                  <div className="mt-6 pt-6 border-t border-brand-gray-100">
                    {price ? (
                      <p className="text-sm text-brand-gray-300">
                        <span className="text-brand-black font-semibold">
                          {t('common.from')} {formatCurrency(price)}
                        </span>
                        {service.slug === 'hourly' && (
                          <span className="ml-1">/ {t('common.perHour')}</span>
                        )}
                      </p>
                    ) : (
                      <p className="text-sm font-semibold text-brand-orange">
                        {t('common.contactUs')}
                      </p>
                    )}

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center mt-4 text-brand-orange font-semibold text-sm hover:gap-3 gap-2 transition-all duration-300"
                    >
                      {t('common.learnMore')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
