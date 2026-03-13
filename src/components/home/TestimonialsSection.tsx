'use client';

import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { TESTIMONIALS } from '@/lib/constants';

export default function TestimonialsSection() {
  const t = useTranslations();

  return (
    <section className="bg-brand-black py-20 md:py-28">
      <Container>
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white">
              {t('testimonials.title')}
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-brand-orange mx-auto" />
            <p className="mt-4 text-lg text-brand-gray-200 max-w-2xl mx-auto leading-relaxed">
              {t('testimonials.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.12}>
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-7 h-full flex flex-col transition-all duration-300 hover:bg-white/[0.07]">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-brand-orange/40 mb-4" />

                {/* Content */}
                <p className="text-brand-gray-200 leading-relaxed flex-1 italic">
                  &ldquo;{t(testimonial.contentKey)}&rdquo;
                </p>

                {/* Bottom */}
                <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-brand-white">
                      {t(testimonial.nameKey)}
                    </p>
                    <p className="text-sm text-brand-gray-300 mt-0.5">
                      {t(testimonial.roleKey)}
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? 'text-brand-orange fill-brand-orange'
                            : 'text-brand-gray-300/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
