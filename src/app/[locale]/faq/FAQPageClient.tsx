'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageHero from '@/components/shared/PageHero';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { Link } from '@/i18n/navigation';
import { FAQS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const FAQ_CATEGORIES = ['All', 'Booking', 'Pricing', 'Services', 'Vehicles', 'Cancellation'] as const;
type FAQCategory = (typeof FAQ_CATEGORIES)[number];

export default function FAQPageClient() {
  const t = useTranslations();
  const tFaq = useTranslations('faq');
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('All');

  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter((faq) => faq.category === activeCategory);

  const translatedFaqs = filteredFaqs.map((faq) => ({
    question: t(faq.question),
    answer: t(faq.answer),
  }));

  const categoryKeys: Record<FAQCategory, string> = {
    All: 'faq.categories.all',
    Booking: 'faq.categories.booking',
    Pricing: 'faq.categories.pricing',
    Services: 'faq.categories.services',
    Vehicles: 'faq.categories.vehicles',
    Cancellation: 'faq.categories.cancellation',
  };

  return (
    <>
      <PageHero title={tFaq('title')} subtitle={tFaq('subtitle')} />

      {/* FAQ Content */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          {/* Category Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {FAQ_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer',
                    activeCategory === category
                      ? 'bg-brand-orange text-white shadow-md'
                      : 'bg-brand-gray-100 text-brand-gray-800 hover:bg-brand-gray-200',
                  )}
                >
                  {t(categoryKeys[category])}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQ Accordion */}
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <FAQAccordion items={translatedFaqs} />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-gray-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-black mb-4">
                Still have questions?
              </h2>
              <p className="text-brand-gray-300 text-lg mb-8">
                Our team is ready to help you with any questions about our chauffeur services.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-semibold text-lg rounded-xl hover:bg-brand-orange-dark transition-colors duration-300"
              >
                Contact Us
              </Link>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
