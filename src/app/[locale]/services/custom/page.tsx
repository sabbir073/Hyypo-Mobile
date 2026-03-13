import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Star, CheckCircle, Car, Users, Briefcase, Heart, Building2, MapPin, Wine, Globe, Sparkles } from 'lucide-react';
import { VEHICLES, FAQS } from '@/lib/constants';
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
  const t = await getTranslations({ locale, namespace: 'meta.custom' });

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
      canonical: `https://hyppomobile.com/${locale}/services/custom`,
      languages: {
        fr: 'https://hyppomobile.com/fr/services/custom',
        en: 'https://hyppomobile.com/en/services/custom',
      },
    },
  };
}

const CUSTOM_EXAMPLES = [
  { icon: Heart, title: 'Weddings', desc: 'Luxury bridal car service with decorated vehicles, uniformed chauffeur, and coordination with your wedding planner.' },
  { icon: Building2, title: 'Corporate Events', desc: 'Executive transportation for conferences, retreats, and corporate functions with multiple vehicles and precise timing.' },
  { icon: Wine, title: 'Wine Tours', desc: 'Curated day trips to Champagne, Bordeaux, and Loire Valley with expert chauffeurs who know every vineyard.' },
  { icon: MapPin, title: 'Multi-Day Tours', desc: 'Extended journeys across France and Europe with overnight accommodations and a dedicated chauffeur throughout.' },
  { icon: Globe, title: 'Cross-Border Travel', desc: 'Seamless private car service from Paris to Brussels, Geneva, London, and other European destinations.' },
  { icon: Sparkles, title: 'Special Occasions', desc: 'Anniversary celebrations, birthday surprises, proposal journeys, and other memorable moments with premium vehicles.' },
] as const;

export default async function CustomServicePage() {
  const t = await getTranslations();

  const allVehicles = VEHICLES;
  const customFaqs = FAQS.filter((f) => f.category === 'Services' || f.category === 'Cancellation').slice(0, 4);

  const benefits = ['benefit1', 'benefit2', 'benefit3', 'benefit4', 'benefit5', 'benefit6'] as const;
  const popularJourneys = ['journey1', 'journey2', 'journey3', 'journey4', 'journey5', 'journey6'] as const;

  return (
    <>
      {/* Hero */}
      <PageHero
        title={t('services.custom.detailTitle')}
        subtitle={t('services.custom.detailSubtitle')}
      />

      {/* Description */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-brand-orange/10 flex items-center justify-center mb-8">
                <Star className="h-10 w-10 text-brand-orange" />
              </div>
              <p className="text-lg text-brand-gray-300 leading-relaxed">
                {t('services.custom.detailDescription')}
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Pricing Notice */}
      <section className="py-16 bg-brand-gray-50">
        <Container>
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <Badge variant="quote" className="px-6 py-2 text-sm mb-6">
                Custom Pricing
              </Badge>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-black">
                No fixed pricing &mdash; contact us for a personalized quote
              </h2>
              <p className="mt-4 text-brand-gray-300 leading-relaxed">
                Every custom journey is unique. Share your requirements and our team will craft a tailored proposal with transparent pricing within one hour.
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg">{t('common.requestQuote')}</Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Custom Service Examples */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title="Custom Service Examples"
              subtitle="From dream weddings to cross-border business travel, we make it happen."
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CUSTOM_EXAMPLES.map((example, index) => {
              const Icon = example.icon;
              return (
                <ScrollReveal key={example.title} delay={index * 0.1}>
                  <Card className="p-8 h-full">
                    <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-brand-orange" />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-bold text-brand-black">
                      {example.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-gray-300 leading-relaxed">
                      {example.desc}
                    </p>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Popular Journeys */}
      <section className="py-20 bg-brand-gray-50">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title="Popular Custom Journeys"
              subtitle="Some of the most requested bespoke itineraries by our clients."
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {popularJourneys.map((key, index) => (
              <ScrollReveal key={key} delay={index * 0.05}>
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-brand-orange shrink-0" />
                  <span className="text-sm text-brand-gray-800">
                    {t(`services.custom.detailPopular.${key}`)}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Available Vehicles */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title="All Vehicles Available"
              subtitle="For custom journeys, our entire fleet is at your disposal, including exclusive on-demand vehicles."
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVehicles.map((vehicle, index) => (
              <ScrollReveal key={vehicle.slug} delay={index * 0.05}>
                <Card className="p-5 flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-brand-gray-800 to-brand-black flex items-center justify-center">
                    <Car className="h-7 w-7 text-brand-orange/50" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-heading text-base font-bold text-brand-black truncate">
                      {t(vehicle.nameKey)}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-brand-gray-300">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-brand-orange" />
                        {vehicle.passengerCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3 text-brand-orange" />
                        {vehicle.luggageCount}
                      </span>
                      {vehicle.category === 'on-demand' && (
                        <Badge variant="info" className="text-[10px] px-2 py-0.5">
                          Exclusive
                        </Badge>
                      )}
                    </div>
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
              title={t('services.custom.detailWhyChoose')}
            />
          </ScrollReveal>

          <div className="mt-12 max-w-3xl mx-auto">
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                {benefits.map((key) => (
                  <div key={key} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <CheckCircle className="h-6 w-6 text-brand-orange shrink-0 mt-0.5" />
                    <p className="text-brand-gray-800 leading-relaxed">
                      {t(`services.custom.detailBenefits.${key}`)}
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
              subtitle="Common questions about custom journeys."
            />
          </ScrollReveal>

          <div className="mt-12 max-w-3xl mx-auto">
            <ScrollReveal delay={0.2}>
              <FAQAccordion
                items={customFaqs.map((faq) => ({
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
                {t('services.custom.detailTitle')}
              </h2>
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                {t('services.custom.detailSubtitle')}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">{t('common.requestQuote')}</Button>
                </Link>
                <Link href="/fleet">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-black">
                    View Fleet
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
