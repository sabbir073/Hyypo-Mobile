'use client';

import { useTranslations } from 'next-intl';
import { Check, MapPin } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const areaKeys = [
  'serviceAreas.paris',
  'serviceAreas.airports',
  'serviceAreas.riviera',
  'serviceAreas.loire',
  'serviceAreas.champagne',
  'serviceAreas.bordeaux',
  'serviceAreas.normandy',
  'serviceAreas.international',
];

export default function ServiceAreas() {
  const t = useTranslations();

  return (
    <section className="bg-brand-white py-20 md:py-28">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <ScrollReveal direction="left">
            <SectionHeading
              title={t('serviceAreas.title')}
              subtitle={t('serviceAreas.subtitle')}
              centered={false}
            />

            <ul className="mt-8 space-y-4">
              {areaKeys.map((key, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-brand-gray-300 leading-relaxed">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Right - Decorative Map Visual */}
          <ScrollReveal direction="right">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-gray-900 to-brand-black aspect-[4/3] flex items-center justify-center shadow-2xl">
              {/* Decorative concentric circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border border-brand-orange/10" />
                <div className="absolute w-60 h-60 rounded-full border border-brand-orange/15" />
                <div className="absolute w-40 h-40 rounded-full border border-brand-orange/20" />
                <div className="absolute w-20 h-20 rounded-full bg-brand-orange/10 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-brand-orange" />
                </div>
              </div>

              {/* City labels */}
              <div className="absolute top-[20%] left-[25%] text-brand-gray-200/60 text-xs font-medium">
                Normandy
              </div>
              <div className="absolute top-[15%] right-[20%] text-brand-gray-200/60 text-xs font-medium">
                Champagne
              </div>
              <div className="absolute bottom-[30%] left-[15%] text-brand-gray-200/60 text-xs font-medium">
                Loire Valley
              </div>
              <div className="absolute bottom-[20%] right-[15%] text-brand-gray-200/60 text-xs font-medium">
                Bordeaux
              </div>
              <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 mt-14">
                <span className="text-brand-orange font-heading font-bold text-lg">Paris</span>
              </div>

              {/* Dotted routes */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
                <line x1="200" y1="150" x2="100" y2="60" stroke="rgba(249,115,22,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="200" y1="150" x2="320" y2="45" stroke="rgba(249,115,22,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="200" y1="150" x2="60" y2="210" stroke="rgba(249,115,22,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="200" y1="150" x2="340" y2="240" stroke="rgba(249,115,22,0.2)" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
