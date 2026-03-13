'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function NewsletterSection() {
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In production, integrate with an email service
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="bg-brand-black py-16 md:py-20">
      <Container className="max-w-2xl">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-white">
              {t('newsletter.title')}
            </h2>
            <p className="mt-3 text-brand-gray-200 leading-relaxed">
              {t('newsletter.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            {submitted ? (
              <div className="flex items-center justify-center gap-3 bg-brand-orange/10 border border-brand-orange/20 rounded-xl px-6 py-4 text-brand-orange font-medium">
                <CheckCircle className="h-5 w-5" />
                {t('common.success')}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-brand-white placeholder:text-brand-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 focus:outline-none transition-all duration-200"
                />
                <Button type="submit" size="md" className="shrink-0">
                  {t('newsletter.subscribe')}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </form>

          <p className="mt-4 text-center text-xs text-brand-gray-300">
            {t('newsletter.privacy')}
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
