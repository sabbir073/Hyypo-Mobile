'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { FAQS } from '@/lib/constants';

export default function FAQPreview() {
  const t = useTranslations();

  const previewFaqs = FAQS.slice(0, 4).map((faq) => ({
    question: t(faq.question),
    answer: t(faq.answer),
  }));

  return (
    <section className="bg-brand-gray-50 py-20 md:py-28">
      <Container className="max-w-3xl">
        <ScrollReveal>
          <SectionHeading
            title={t('faq.title')}
            subtitle={t('faq.subtitle')}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12">
            <FAQAccordion items={previewFaqs} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mt-10 text-center">
            <Link href="/faq">
              <Button variant="outline">
                {t('common.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
