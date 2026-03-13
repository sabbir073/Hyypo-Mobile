import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Award, Shield, Star, Clock } from 'lucide-react';
import { STATS } from '@/lib/constants';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import PageHero from '@/components/shared/PageHero';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.about' });

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
      canonical: `https://hyppomobile.com/${locale}/about`,
      languages: {
        fr: 'https://hyppomobile.com/fr/about',
        en: 'https://hyppomobile.com/en/about',
      },
    },
  };
}

const VALUES = [
  { icon: Award, titleKey: 'about.values.excellence.title', descKey: 'about.values.excellence.description' },
  { icon: Clock, titleKey: 'about.values.reliability.title', descKey: 'about.values.reliability.description' },
  { icon: Shield, titleKey: 'about.values.discretion.title', descKey: 'about.values.discretion.description' },
  { icon: Star, titleKey: 'about.values.personalization.title', descKey: 'about.values.personalization.description' },
] as const;

export default async function AboutPage() {
  const t = await getTranslations();

  return (
    <>
      {/* Hero */}
      <PageHero
        title={t('about.title')}
        subtitle={t('about.subtitle')}
      />

      {/* Our Story */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <SectionHeading
                  title={t('about.story.title')}
                  centered={false}
                />
                <div className="mt-8 space-y-5 text-brand-gray-300 leading-relaxed">
                  <p>{t('about.story.p1')}</p>
                  <p>{t('about.story.p2')}</p>
                  <p>{t('about.story.p3')}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="h-80 lg:h-[450px] rounded-2xl bg-gradient-to-br from-brand-orange/20 via-brand-gray-100 to-brand-orange/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-brand-orange/20 flex items-center justify-center">
                    <Award className="h-12 w-12 text-brand-orange" />
                  </div>
                  <p className="mt-4 font-heading text-2xl font-bold text-brand-black">
                    Est. 2014
                  </p>
                  <p className="mt-1 text-brand-gray-300 text-sm">Paris, France</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20 bg-brand-gray-50">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <SectionHeading title={t('about.mission.title')} />
              <p className="mt-8 text-lg text-brand-gray-300 leading-relaxed">
                {t('about.mission.description')}
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('about.values.title')}
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.titleKey} delay={index * 0.1}>
                  <Card className="p-8 text-center h-full">
                    <div className="w-16 h-16 mx-auto rounded-full bg-brand-orange/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-brand-orange" />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-bold text-brand-black">
                      {t(value.titleKey)}
                    </h3>
                    <p className="mt-3 text-sm text-brand-gray-300 leading-relaxed">
                      {t(value.descKey)}
                    </p>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-brand-gray-50">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <SectionHeading title={t('about.team.title')} />
              <p className="mt-8 text-lg text-brand-gray-300 leading-relaxed">
                {t('about.team.description')}
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-brand-black">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <ScrollReveal key={stat.labelKey}>
                <div className="text-center">
                  <p className="font-heading text-4xl md:text-5xl font-bold text-brand-orange">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="mt-2 text-white/70 text-sm md:text-base">
                    {t(stat.labelKey)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-black">
                Experience the Hyppo Mobile difference
              </h2>
              <p className="mt-4 text-brand-gray-300 text-lg leading-relaxed">
                {t('cta.subtitle')}
              </p>
              <div className="mt-8">
                <Link href="/booking">
                  <Button size="lg">{t('common.bookNow')}</Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
