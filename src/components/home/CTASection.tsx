'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CTASection() {
  const t = useTranslations();

  return (
    <section className="relative bg-brand-orange py-20 md:py-28 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/[0.06]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/[0.04]" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-white/[0.03]" />
      </div>

      {/* Diagonal stripe */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 20px, white 20px, white 21px)',
        }}
      />

      <Container className="relative z-10 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
            {t('cta.title')}
          </h2>

          <p className="mt-5 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/booking">
              <Button variant="secondary" size="lg">
                {t('cta.bookNow')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <a
              href="tel:+33123456789"
              className="inline-flex items-center gap-2 px-6 py-4 text-white font-semibold text-lg hover:bg-white/10 rounded-xl transition-colors duration-300"
            >
              <Phone className="h-5 w-5" />
              {t('cta.callUs')}
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
