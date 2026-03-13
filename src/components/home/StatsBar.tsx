'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { STATS } from '@/lib/constants';

export default function StatsBar() {
  const t = useTranslations();

  return (
    <section className="bg-brand-black py-12 md:py-16">
      <Container>
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-orange">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="mt-2 text-sm md:text-base text-brand-gray-200 font-medium">
                  {t(stat.labelKey)}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
