import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { VEHICLES } from '@/lib/constants';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageHero from '@/components/shared/PageHero';
import VehicleDetailCard from '@/components/fleet/VehicleDetailCard';
import FleetComparison from '@/components/fleet/FleetComparison';
import OnDemandGrid from '@/components/fleet/OnDemandGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.fleet' });

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
      canonical: `https://hyppomobile.com/${locale}/fleet`,
      languages: {
        fr: 'https://hyppomobile.com/fr/fleet',
        en: 'https://hyppomobile.com/en/fleet',
      },
    },
  };
}

export default async function FleetPage() {
  const t = await getTranslations();

  const regularVehicles = VEHICLES.filter((v) => v.category === 'regular');

  return (
    <>
      {/* Hero */}
      <PageHero
        title={t('fleet.title')}
        subtitle={t('fleet.subtitle')}
      />

      {/* Regular Fleet Section */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('fleet.regularSection')}
              subtitle={t('fleet.regularDescription')}
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularVehicles.map((vehicle, index) => (
              <VehicleDetailCard
                key={vehicle.slug}
                vehicle={vehicle}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* On-Demand Section */}
      <section className="py-20 bg-brand-gray-50">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('fleet.onDemandSection')}
              subtitle={t('fleet.onDemandDescription')}
            />
          </ScrollReveal>

          <div className="mt-12">
            <OnDemandGrid />
          </div>
        </Container>
      </section>

      {/* Comparison Section */}
      <FleetComparison />

      {/* CTA Section */}
      <section className="py-20 bg-brand-black">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                Can&apos;t decide? Contact us for a recommendation.
              </h2>
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                Our team will help you choose the perfect vehicle for your journey based on your needs and preferences.
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg">{t('common.contactUs')}</Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
