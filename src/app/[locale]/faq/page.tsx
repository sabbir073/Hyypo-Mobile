import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { FAQS } from '@/lib/constants';
import FAQPageClient from './FAQPageClient';

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.faq' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://hyppomobile.com/${locale}/faq`,
      languages: {
        fr: 'https://hyppomobile.com/fr/faq',
        en: 'https://hyppomobile.com/en/faq',
      },
    },
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  // Build FAQ JSON-LD structured data
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: t(faq.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(faq.answer),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQPageClient />
    </>
  );
}
