import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageHero from '@/components/shared/PageHero';
import { Link } from '@/i18n/navigation';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.terms' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://hyppomobile.com/${locale}/terms`,
      languages: {
        fr: 'https://hyppomobile.com/fr/terms',
        en: 'https://hyppomobile.com/en/terms',
      },
    },
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  const sections = [
    { titleKey: 'section1.title', contentKey: 'section1.content' },
    { titleKey: 'section2.title', contentKey: 'section2.content' },
    { titleKey: 'section3.title', contentKey: 'section3.content' },
    { titleKey: 'section4.title', contentKey: 'section4.content' },
    { titleKey: 'section5.title', contentKey: 'section5.content' },
    { titleKey: 'section6.title', contentKey: 'section6.content' },
    { titleKey: 'section7.title', contentKey: 'section7.content' },
  ] as const;

  return (
    <>
      <PageHero title={t('title')} />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              {/* Last Updated & Intro */}
              <div className="mb-10">
                <p className="text-sm text-brand-gray-300 mb-4">{t('lastUpdated')}</p>
                <p className="text-brand-gray-800 leading-relaxed text-lg">
                  {t('intro')}
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-10">
                {sections.map((section) => (
                  <div key={section.titleKey}>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-brand-black mb-3">
                      {t(section.titleKey)}
                    </h2>
                    <p className="text-brand-gray-800 leading-relaxed">
                      {t(section.contentKey)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Privacy Reference */}
              <div className="mt-12 p-6 bg-brand-gray-50 rounded-2xl border border-brand-gray-200">
                <h3 className="font-heading text-lg font-semibold text-brand-black mb-2">
                  Privacy Policy
                </h3>
                <p className="text-brand-gray-800 mb-3">
                  For information about how we handle your personal data, please refer to our Privacy Policy.
                </p>
                <Link
                  href="/privacy"
                  className="text-brand-orange font-medium hover:text-brand-orange-dark transition-colors"
                >
                  Read our Privacy Policy
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-10 p-6 bg-brand-gray-50 rounded-2xl border border-brand-gray-200">
                <h3 className="font-heading text-lg font-semibold text-brand-black mb-2">
                  Contact Information
                </h3>
                <p className="text-brand-gray-800">
                  If you have questions about these terms, please contact us at{' '}
                  <a
                    href="mailto:contact@hyppomobile.com"
                    className="text-brand-orange font-medium hover:text-brand-orange-dark transition-colors"
                  >
                    contact@hyppomobile.com
                  </a>{' '}
                  or visit our{' '}
                  <Link
                    href="/contact"
                    className="text-brand-orange font-medium hover:text-brand-orange-dark transition-colors"
                  >
                    contact page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
