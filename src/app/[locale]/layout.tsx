import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleMapsScript from '@/components/shared/GoogleMapsScript';
import '@/styles/globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/icon.svg',
    },
    manifest: '/site.webmanifest',
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
      canonical: `https://hyppomobile.com/${locale}`,
      languages: {
        fr: 'https://hyppomobile.com/fr',
        en: 'https://hyppomobile.com/en',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hyppo Mobile',
    url: 'https://hyppomobile.com',
    logo: 'https://hyppomobile.com/images/logo.png',
    description:
      locale === 'fr'
        ? 'Service VTC et chauffeur prive premium a Paris et dans toute la France.'
        : 'Premium private chauffeur service in Paris and across France.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Avenue des Champs-Elysees',
      addressLocality: 'Paris',
      postalCode: '75008',
      addressCountry: 'FR',
    },
    telephone: '+33123456789',
    email: 'contact@hyppomobile.com',
    sameAs: [
      'https://facebook.com/hyppomobile',
      'https://instagram.com/hyppomobile',
      'https://linkedin.com/company/hyppomobile',
    ],
  };

  return (
    <html lang={locale} className={`${playfairDisplay.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <GoogleMapsScript />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
