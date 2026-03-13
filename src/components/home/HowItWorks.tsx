'use client';

import { useTranslations } from 'next-intl';
import { Search, Car, CalendarCheck, ThumbsUp } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const steps = [
  { icon: Search, titleKey: 'howItWorks.step1.title', descKey: 'howItWorks.step1.description' },
  { icon: CalendarCheck, titleKey: 'howItWorks.step2.title', descKey: 'howItWorks.step2.description' },
  { icon: Car, titleKey: 'howItWorks.step3.title', descKey: 'howItWorks.step3.description' },
  { icon: ThumbsUp, titleKey: 'howItWorks.step4.title', descKey: 'howItWorks.step4.description' },
];

export default function HowItWorks() {
  const t = useTranslations();

  return (
    <section className="bg-brand-white py-20 md:py-28">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title={t('howItWorks.title')}
            subtitle={t('howItWorks.subtitle')}
          />
        </ScrollReveal>

        <div className="mt-14 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-orange/20 via-brand-orange/40 to-brand-orange/20" />

          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <div className="flex flex-col items-center text-center relative">
                    {/* Numbered circle */}
                    <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-brand-orange text-white shadow-lg shadow-brand-orange/25">
                      <Icon className="h-10 w-10" />
                      <span className="absolute -top-1 -right-1 flex items-center justify-center w-8 h-8 rounded-full bg-brand-black text-white text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 font-heading text-lg font-bold text-brand-black">
                      {t(step.titleKey)}
                    </h3>

                    <p className="mt-3 text-sm text-brand-gray-300 leading-relaxed max-w-xs">
                      {t(step.descKey)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
