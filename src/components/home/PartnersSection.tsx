'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { PARTNER_LOGOS } from '@/lib/constants';

export default function PartnersSection() {
  const t = useTranslations();

  return (
    <section className="bg-brand-white py-16 md:py-20 border-y border-brand-gray-100">
      <Container>
        <ScrollReveal>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-brand-gray-300 mb-10">
            {t('partners.title')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {PARTNER_LOGOS.map((partner, index) => (
              <div
                key={index}
                className="group flex items-center justify-center w-full h-16 px-4 rounded-xl bg-brand-gray-50 grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:bg-brand-gray-100 cursor-default"
              >
                <span className="font-heading text-sm font-bold text-brand-gray-800 text-center leading-tight group-hover:text-brand-black transition-colors duration-300">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
