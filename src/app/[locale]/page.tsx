import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import ServicesSection from '@/components/home/ServicesSection';
import FleetPreview from '@/components/home/FleetPreview';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServiceAreas from '@/components/home/ServiceAreas';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PartnersSection from '@/components/home/PartnersSection';
import FAQPreview from '@/components/home/FAQPreview';
import CTASection from '@/components/home/CTASection';
import NewsletterSection from '@/components/home/NewsletterSection';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: 'Hyppo Mobile',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      url: `https://hyppomobile.com/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      canonical: `https://hyppomobile.com/${locale}`,
      languages: {
        fr: 'https://hyppomobile.com/fr',
        en: 'https://hyppomobile.com/en',
      },
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <FleetPreview />
      <HowItWorks />
      <WhyChooseUs />
      <ServiceAreas />
      <TestimonialsSection />
      <PartnersSection />
      <FAQPreview />
      <CTASection />
      <NewsletterSection />
    </>
  );
}
