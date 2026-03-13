import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import Container from '@/components/ui/Container';
import BookingForm from '@/components/booking/BookingForm';
import type { ServiceType } from '@/lib/types';

interface BookingPageProps {
  searchParams: Promise<{
    serviceType?: string;
    pickup?: string;
    dropoff?: string;
    date?: string;
    time?: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

const validServiceTypes: ServiceType[] = [
  'airport-transfer',
  'hourly',
  'custom',
];

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const resolvedParams = await searchParams;
  const t = await getTranslations('booking');

  const defaultServiceType = validServiceTypes.includes(
    resolvedParams.serviceType as ServiceType,
  )
    ? (resolvedParams.serviceType as ServiceType)
    : undefined;

  return (
    <main>
      <PageHero
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <section className="py-8 md:py-14 bg-brand-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
              <BookingForm
                variant="full"
                defaultServiceType={defaultServiceType}
                defaultPickup={resolvedParams.pickup}
                defaultDropoff={resolvedParams.dropoff}
                defaultDate={resolvedParams.date}
                defaultTime={resolvedParams.time}
              />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
