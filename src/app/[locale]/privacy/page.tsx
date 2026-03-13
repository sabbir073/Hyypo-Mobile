import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageHero from '@/components/shared/PageHero';
import { Link } from '@/i18n/navigation';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.privacy' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://hyppomobile.com/${locale}/privacy`,
      languages: {
        fr: 'https://hyppomobile.com/fr/privacy',
        en: 'https://hyppomobile.com/en/privacy',
      },
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

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

              {/* Contact for Data Requests */}
              <div className="mt-12 p-6 bg-brand-gray-50 rounded-2xl border border-brand-gray-200">
                <h3 className="font-heading text-lg font-semibold text-brand-black mb-2">
                  Data Protection Requests
                </h3>
                <p className="text-brand-gray-800 mb-3">
                  To exercise your rights under the GDPR or to make a data protection request, please contact our Data Protection Officer.
                </p>
                <div className="space-y-1 text-brand-gray-800">
                  <p>
                    Email:{' '}
                    <a
                      href="mailto:privacy@hyppomobile.com"
                      className="text-brand-orange font-medium hover:text-brand-orange-dark transition-colors"
                    >
                      privacy@hyppomobile.com
                    </a>
                  </p>
                  <p>Address: 123 Avenue des Champs-Elysees, 75008 Paris, France</p>
                </div>
              </div>

              {/* Links */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/terms"
                  className="text-brand-orange font-medium hover:text-brand-orange-dark transition-colors"
                >
                  Read our Terms &amp; Conditions
                </Link>
                <span className="text-brand-gray-200">|</span>
                <Link
                  href="/contact"
                  className="text-brand-orange font-medium hover:text-brand-orange-dark transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
