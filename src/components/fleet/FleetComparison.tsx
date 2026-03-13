'use client';

import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/lib/utils';
import { VEHICLES } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';

export default function FleetComparison() {
  const t = useTranslations();

  return (
    <section className="py-20 bg-brand-gray-50">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Fleet Comparison"
            subtitle="Compare all vehicles at a glance to find the perfect fit for your journey."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b-2 border-brand-orange/20">
                  <th className="py-4 px-3 text-left text-sm font-semibold text-brand-gray-300 uppercase tracking-wider">
                    Feature
                  </th>
                  {VEHICLES.map((vehicle) => (
                    <th
                      key={vehicle.slug}
                      className="py-4 px-3 text-center text-sm font-bold text-brand-black"
                    >
                      {t(vehicle.nameKey)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Passengers row */}
                <tr className="border-b border-brand-gray-100 hover:bg-white transition-colors">
                  <td className="py-4 px-3 text-sm font-medium text-brand-gray-800">
                    {t('vehicles.passengers')}
                  </td>
                  {VEHICLES.map((vehicle) => (
                    <td key={vehicle.slug} className="py-4 px-3 text-center text-sm text-brand-black">
                      {vehicle.passengerCount}
                    </td>
                  ))}
                </tr>

                {/* Luggage row */}
                <tr className="border-b border-brand-gray-100 hover:bg-white transition-colors">
                  <td className="py-4 px-3 text-sm font-medium text-brand-gray-800">
                    {t('vehicles.luggage')}
                  </td>
                  {VEHICLES.map((vehicle) => (
                    <td key={vehicle.slug} className="py-4 px-3 text-center text-sm text-brand-black">
                      {vehicle.luggageCount}
                    </td>
                  ))}
                </tr>

                {/* Airport price row */}
                <tr className="border-b border-brand-gray-100 hover:bg-white transition-colors">
                  <td className="py-4 px-3 text-sm font-medium text-brand-gray-800">
                    Airport Transfer
                  </td>
                  {VEHICLES.map((vehicle) => (
                    <td key={vehicle.slug} className="py-4 px-3 text-center text-sm font-semibold">
                      {vehicle.pricing.airportTransfer ? (
                        <span className="text-brand-orange">
                          {formatCurrency(vehicle.pricing.airportTransfer)}
                        </span>
                      ) : (
                        <span className="text-brand-gray-300">Quote</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Hourly rate row */}
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-3 text-sm font-medium text-brand-gray-800">
                    Hourly Rate
                  </td>
                  {VEHICLES.map((vehicle) => (
                    <td key={vehicle.slug} className="py-4 px-3 text-center text-sm font-semibold">
                      {vehicle.pricing.hourlyRate ? (
                        <span className="text-brand-orange">
                          {formatCurrency(vehicle.pricing.hourlyRate)}
                        </span>
                      ) : (
                        <span className="text-brand-gray-300">&mdash;</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
