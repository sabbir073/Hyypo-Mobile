import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Plane, Clock, Star, CheckCircle } from 'lucide-react';
import { SERVICES, VEHICLES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageHero from '@/components/shared/PageHero';

const ICON_MAP: Record<string, typeof Plane> = {
  Plane,
  Clock,
  Star,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.services' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: 'Hyppo Mobile',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      canonical: `https://hyppomobile.com/${locale}/services`,
      languages: {
        fr: 'https://hyppomobile.com/fr/services',
        en: 'https://hyppomobile.com/en/services',
      },
    },
  };
}

function getStartingPrice(serviceSlug: string): string | null {
  const regularVehicles = VEHICLES.filter((v) => v.category === 'regular');

  if (serviceSlug === 'airport-transfer') {
    const prices = regularVehicles
      .map((v) => v.pricing.airportTransfer)
      .filter(Boolean) as number[];
    return prices.length > 0 ? formatCurrency(Math.min(...prices)) : null;
  }

  if (serviceSlug === 'hourly') {
    const prices = regularVehicles
      .map((v) => v.pricing.hourlyRate)
      .filter(Boolean) as number[];
    return prices.length > 0 ? formatCurrency(Math.min(...prices)) : null;
  }

  return null;
}

export default async function ServicesPage() {
  const t = await getTranslations();

  return (
    <>
      {/* Hero */}
      <PageHero
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      />

      {/* Service Cards */}
      <section className="py-20">
        <Container>
          <div className="space-y-12">
            {SERVICES.map((service, index) => {
              const Icon = ICON_MAP[service.icon] || Star;
              const startingPrice = getStartingPrice(service.slug);

              return (
                <ScrollReveal key={service.slug} delay={index * 0.15}>
                  <Card className="p-0 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                      {/* Icon & visual area */}
                      <div className="bg-gradient-to-br from-brand-black to-brand-gray-900 p-10 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-full bg-brand-orange/20 flex items-center justify-center">
                          <Icon className="h-10 w-10 text-brand-orange" />
                        </div>
                        <h3 className="mt-6 font-heading text-2xl md:text-3xl font-bold text-white">
                          {t(service.nameKey)}
                        </h3>
                        {startingPrice && (
                          <p className="mt-3 text-brand-orange text-lg font-semibold">
                            {t('common.from')} {startingPrice}
                          </p>
                        )}
                        {!startingPrice && (
                          <p className="mt-3 text-brand-orange text-lg font-semibold">
                            {t('common.requestQuote')}
                          </p>
                        )}
                      </div>

                      {/* Content area */}
                      <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col">
                        <p className="text-brand-gray-300 leading-relaxed text-lg">
                          {t(service.descriptionKey)}
                        </p>

                        {/* Features list */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.features.map((featureKey) => (
                            <div key={featureKey} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                              <span className="text-sm text-brand-gray-800">
                                {t(featureKey)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-auto pt-8">
                          <Link href={`/services/${service.slug}`}>
                            <Button>{t('common.learnMore')}</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
