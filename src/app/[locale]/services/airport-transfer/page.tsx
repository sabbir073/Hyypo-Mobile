import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Plane, CheckCircle, Car, Users, Briefcase, ClipboardList, Send, Radar, HandMetal } from 'lucide-react';
import { VEHICLES, FAQS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageHero from '@/components/shared/PageHero';
import FAQAccordion from '@/components/shared/FAQAccordion';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.airportTransfer' });

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
      canonical: `https://hyppomobile.com/${locale}/services/airport-transfer`,
      languages: {
        fr: 'https://hyppomobile.com/fr/services/airport-transfer',
        en: 'https://hyppomobile.com/en/services/airport-transfer',
      },
    },
  };
}

export default async function AirportTransferPage() {
  const t = await getTranslations();

  const regularVehicles = VEHICLES.filter((v) => v.category === 'regular');
  const airportFaqs = FAQS.filter((f) => f.category === 'Booking' || f.category === 'Pricing').slice(0, 4);

  const steps = [
    { key: 'step1', icon: ClipboardList },
    { key: 'step2', icon: Send },
    { key: 'step3', icon: Radar },
    { key: 'step4', icon: HandMetal },
  ] as const;

  const benefits = ['benefit1', 'benefit2', 'benefit3', 'benefit4', 'benefit5', 'benefit6'] as const;

  return (
    <>
      {/* Hero */}
      <PageHero
        title={t('services.airportTransfer.detailTitle')}
        subtitle={t('services.airportTransfer.detailSubtitle')}
      />

      {/* Description */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-brand-orange/10 flex items-center justify-center mb-8">
                <Plane className="h-10 w-10 text-brand-orange" />
              </div>
              <p className="text-lg text-brand-gray-300 leading-relaxed">
                {t('services.airportTransfer.detailDescription')}
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-brand-gray-50">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('howItWorks.title')}
              subtitle="Your seamless airport transfer experience in four simple steps."
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.key} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-xl">
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-brand-orange/20" />
                      )}
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-bold text-brand-black">
                      {t(`services.airportTransfer.detailProcess.${step.key}Title`)}
                    </h3>
                    <p className="mt-2 text-sm text-brand-gray-300 leading-relaxed">
                      {t(`services.airportTransfer.detailProcess.${step.key}Description`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Pricing Table */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title="Airport Transfer Pricing"
              subtitle="Transparent, fixed pricing with no hidden fees or surge charges."
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {regularVehicles.map((vehicle, index) => (
              <ScrollReveal key={vehicle.slug} delay={index * 0.1}>
                <Card hover className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-brand-gray-800 to-brand-black flex items-center justify-center">
                    <Car className="h-8 w-8 text-brand-orange/60" />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold text-brand-black">
                    {t(vehicle.nameKey)}
                  </h3>
                  <div className="mt-3 flex items-center justify-center gap-4 text-sm text-brand-gray-300">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-brand-orange" />
                      {vehicle.passengerCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4 text-brand-orange" />
                      {vehicle.luggageCount}
                    </span>
                  </div>
                  <div className="mt-auto pt-6">
                    <p className="text-3xl font-bold text-brand-orange">
                      {formatCurrency(vehicle.pricing.airportTransfer!)}
                    </p>
                    <p className="mt-1 text-sm text-brand-gray-300">Fixed price</p>
                  </div>
                  <div className="mt-6">
                    <Link href={`/booking?service=airport-transfer&vehicle=${vehicle.slug}`} className="block">
                      <Button className="w-full">{t('common.bookNow')}</Button>
                    </Link>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-brand-gray-50">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('services.airportTransfer.detailWhyChoose')}
            />
          </ScrollReveal>

          <div className="mt-12 max-w-3xl mx-auto">
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                {benefits.map((key) => (
                  <div key={key} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <CheckCircle className="h-6 w-6 text-brand-orange shrink-0 mt-0.5" />
                    <p className="text-brand-gray-800 leading-relaxed">
                      {t(`services.airportTransfer.detailBenefits.${key}`)}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('faq.title')}
              subtitle="Common questions about our airport transfer service."
            />
          </ScrollReveal>

          <div className="mt-12 max-w-3xl mx-auto">
            <ScrollReveal delay={0.2}>
              <FAQAccordion
                items={airportFaqs.map((faq) => ({
                  question: t(faq.question),
                  answer: t(faq.answer),
                }))}
              />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-black">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                {t('services.airportTransfer.detailTitle')}
              </h2>
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                {t('services.airportTransfer.detailSubtitle')}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking?service=airport-transfer">
                  <Button size="lg">{t('common.bookNow')}</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-black">
                    {t('common.contactUs')}
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
