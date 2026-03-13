import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageHero from '@/components/shared/PageHero';
import ContactForm from '@/components/shared/ContactForm';
import MapEmbed from '@/components/shared/MapEmbed';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.contact' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://hyppomobile.com/${locale}/contact`,
      languages: {
        fr: 'https://hyppomobile.com/fr/contact',
        en: 'https://hyppomobile.com/en/contact',
      },
    },
  };
}

const contactCards = [
  {
    icon: Phone,
    labelKey: 'info.phone' as const,
    href: 'tel:+33123456789',
  },
  {
    icon: Mail,
    labelKey: 'info.email' as const,
    href: 'mailto:contact@hyppomobile.com',
  },
  {
    icon: MessageCircle,
    labelKey: 'info.whatsapp' as const,
    href: 'https://wa.me/33612345678',
  },
  {
    icon: MapPin,
    labelKey: 'info.address' as const,
    href: 'https://maps.google.com/?q=123+Avenue+des+Champs-Elysees+75008+Paris',
  },
];

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      {/* Contact Form + Info */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Contact Form */}
            <ScrollReveal direction="left">
              <div className="bg-brand-gray-50 rounded-2xl p-6 sm:p-8 lg:p-10">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-black mb-6">
                  {t('send')}
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>

            {/* Right: Contact Info */}
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-black">
                  {t('info.title')}
                </h2>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <a
                        key={card.labelKey}
                        href={card.href}
                        target={card.href.startsWith('http') ? '_blank' : undefined}
                        rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-4 p-5 bg-brand-gray-50 rounded-xl border border-brand-gray-200 hover:border-brand-orange hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-orange/20 transition-colors">
                          <Icon className="w-5 h-5 text-brand-orange" />
                        </div>
                        <span className="text-sm text-brand-gray-800 leading-relaxed">
                          {t(card.labelKey)}
                        </span>
                      </a>
                    );
                  })}
                </div>

                {/* Business Hours */}
                <div className="p-5 bg-brand-gray-50 rounded-xl border border-brand-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h3 className="font-semibold text-brand-black">Business Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm text-brand-gray-800">
                    <div className="flex justify-between">
                      <span>Monday - Sunday</span>
                      <span className="font-medium">{t('info.hours')}</span>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="p-5 bg-brand-gray-50 rounded-xl border border-brand-gray-200">
                  <h3 className="font-semibold text-brand-black mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { name: 'Facebook', href: 'https://facebook.com/hyppomobile' },
                      { name: 'Instagram', href: 'https://instagram.com/hyppomobile' },
                      { name: 'LinkedIn', href: 'https://linkedin.com/company/hyppomobile' },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-brand-black text-white text-sm rounded-lg hover:bg-brand-gray-800 transition-colors"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-brand-gray-50">
        <Container>
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-black text-center mb-8">
              Find Us
            </h2>
            <MapEmbed />
          </ScrollReveal>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-black text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Ready to book?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Start your journey with Hyppo Mobile today.
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-semibold text-lg rounded-xl hover:bg-brand-orange-dark transition-colors duration-300"
              >
                Book Now
              </Link>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
