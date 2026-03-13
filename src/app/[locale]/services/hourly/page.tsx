import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Clock, CheckCircle, Car, Users, Briefcase, CalendarCheck, Route, UserCheck } from 'lucide-react';
import { VEHICLES, FAQS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageHero from '@/components/shared/PageHero';
import FAQAccordion from '@/components/shared/FAQAccordion';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.hourly' });

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
      canonical: `https://hyppomobile.com/${locale}/services/hourly`,
      languages: {
        fr: 'https://hyppomobile.com/fr/services/hourly',
        en: 'https://hyppomobile.com/en/services/hourly',
      },
    },
  };
}

export default async function HourlyServicePage() {
  const t = await getTranslations();

  const regularVehicles = VEHICLES.filter((v) => v.category === 'regular');
  const hourlyFaqs = FAQS.filter((f) => f.category === 'Services' || f.category === 'Pricing').slice(0, 4);

  const benefits = ['benefit1', 'benefit2', 'benefit3', 'benefit4', 'benefit5', 'benefit6'] as const;
  const scenarios = ['scenario1', 'scenario2', 'scenario3', 'scenario4', 'scenario5', 'scenario6'] as const;

  return (
    <>
      {/* Hero */}
      <PageHero
        title={t('services.hourly.detailTitle')}
        subtitle={t('services.hourly.detailSubtitle')}
      />

      {/* Description */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-brand-orange/10 flex items-center justify-center mb-8">
                <Clock className="h-10 w-10 text-brand-orange" />
              </div>
              <p className="text-lg text-brand-gray-300 leading-relaxed">
                {t('services.hourly.detailDescription')}
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
              subtitle="Book your dedicated chauffeur in a few simple steps."
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { num: 1, icon: CalendarCheck, title: 'Choose Date & Hours', desc: 'Select your preferred date, starting time, and the number of hours you need.' },
              { num: 2, icon: Car, title: 'Select Your Vehicle', desc: 'Pick from our premium fleet. Each vehicle comes with a professional chauffeur.' },
              { num: 3, icon: Route, title: 'Enjoy Full Flexibility', desc: 'Make unlimited stops, change your route on the fly, and travel at your own pace.' },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.num} delay={index * 0.1}>
                  <Card className="p-8 text-center h-full">
                    <div className="w-14 h-14 mx-auto rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-lg">
                      {step.num}
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-bold text-brand-black">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-gray-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </Card>
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
              title="Hourly Chauffeur Rates"
              subtitle="Transparent hourly pricing. Maximum 20 km per hour included."
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
                      {formatCurrency(vehicle.pricing.hourlyRate!)}
                    </p>
                    <p className="mt-1 text-sm text-brand-gray-300">
                      {t('vehicles.perHour')}
                    </p>
                    <p className="mt-1 text-xs text-brand-gray-200">
                      Max 20 km/hr included
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link href={`/booking?service=hourly&vehicle=${vehicle.slug}`} className="block">
                      <Button className="w-full">{t('common.bookNow')}</Button>
                    </Link>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Ideal For */}
      <section className="py-20 bg-brand-gray-50">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title="Ideal For"
              subtitle="Our hourly chauffeur service is perfect for a wide range of occasions."
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {scenarios.map((key, index) => (
              <ScrollReveal key={key} delay={index * 0.05}>
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-brand-orange shrink-0" />
                  <span className="text-sm text-brand-gray-800">
                    {t(`services.hourly.detailIdealFor.${key}`)}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('services.hourly.detailWhyChoose')}
            />
          </ScrollReveal>

          <div className="mt-12 max-w-3xl mx-auto">
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                {benefits.map((key) => (
                  <div key={key} className="flex items-start gap-3 bg-brand-gray-50 rounded-xl p-4">
                    <CheckCircle className="h-6 w-6 text-brand-orange shrink-0 mt-0.5" />
                    <p className="text-brand-gray-800 leading-relaxed">
                      {t(`services.hourly.detailBenefits.${key}`)}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-brand-gray-50">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('faq.title')}
              subtitle="Common questions about our hourly chauffeur service."
            />
          </ScrollReveal>

          <div className="mt-12 max-w-3xl mx-auto">
            <ScrollReveal delay={0.2}>
              <FAQAccordion
                items={hourlyFaqs.map((faq) => ({
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
                {t('services.hourly.detailTitle')}
              </h2>
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                {t('services.hourly.detailSubtitle')}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking?service=hourly">
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
