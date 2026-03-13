'use client';

import { useTranslations } from 'next-intl';
import { Shield, Clock, MapPin, Car, Timer, Languages } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import ScrollReveal from '@/components/ui/ScrollReveal';

const features = [
  { icon: Shield, titleKey: 'whyChooseUs.professionalChauffeurs.title', descKey: 'whyChooseUs.professionalChauffeurs.description' },
  { icon: Clock, titleKey: 'whyChooseUs.availability.title', descKey: 'whyChooseUs.availability.description' },
  { icon: MapPin, titleKey: 'whyChooseUs.allOfFrance.title', descKey: 'whyChooseUs.allOfFrance.description' },
  { icon: Car, titleKey: 'whyChooseUs.luxuryFleet.title', descKey: 'whyChooseUs.luxuryFleet.description' },
  { icon: Timer, titleKey: 'whyChooseUs.punctuality.title', descKey: 'whyChooseUs.punctuality.description' },
  { icon: Languages, titleKey: 'whyChooseUs.multilingualDrivers.title', descKey: 'whyChooseUs.multilingualDrivers.description' },
];

export default function WhyChooseUs() {
  const t = useTranslations();

  return (
    <section className="bg-brand-gray-50 py-20 md:py-28">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title={t('whyChooseUs.title')}
            subtitle={t('whyChooseUs.subtitle')}
          />
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card hover className="h-full p-7">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange mb-5">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-brand-black">
                    {t(feature.titleKey)}
                  </h3>

                  <p className="mt-3 text-sm text-brand-gray-300 leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
