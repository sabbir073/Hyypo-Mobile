'use client';

import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/lib/utils';
import { VEHICLES } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';

export default function FleetComparison() {
  const t = useTranslations();

  const regularVehicles = VEHICLES.filter((v) => v.category === 'regular');

  return (
    <section className="py-16 md:py-20 bg-brand-gray-50">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Fleet Comparison"
            subtitle="Compare all vehicles at a glance to find the perfect fit for your journey."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Mobile: Card layout */}
          <div className="mt-10 grid grid-cols-1 gap-4 md:hidden">
            {regularVehicles.map((vehicle) => (
              <div
                key={vehicle.slug}
                className="bg-white rounded-2xl p-5 border border-brand-gray-100 shadow-sm"
              >
                <h4 className="font-heading text-lg font-bold text-brand-black">
                  {t(vehicle.nameKey)}
                </h4>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-brand-gray-300">{t('vehicles.passengers')}</span>
                    <span className="font-medium text-brand-black">{vehicle.passengerCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-300">{t('vehicles.luggage')}</span>
                    <span className="font-medium text-brand-black">{vehicle.luggageCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-300">Airport Transfer</span>
                    <span className="font-semibold text-brand-orange">
                      {vehicle.pricing.airportTransfer
                        ? `${t('common.from')} ${formatCurrency(vehicle.pricing.airportTransfer)}`
                        : t('vehicles.requestQuote')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-300">Hourly Rate</span>
                    <span className="font-semibold text-brand-orange">
                      {vehicle.pricing.hourlyRate
                        ? `${formatCurrency(vehicle.pricing.hourlyRate)} / ${t('common.perHour')}`
                        : '—'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table layout */}
          <div className="mt-12 hidden md:block overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b-2 border-brand-orange/20">
                  <th className="py-4 px-3 text-left text-sm font-semibold text-brand-gray-300 uppercase tracking-wider">
                    Feature
                  </th>
                  {VEHICLES.map((vehicle) => (
                    <th
                      key={vehicle.slug}
                      className="py-4 px-2 text-center text-xs lg:text-sm font-bold text-brand-black"
                    >
                      {t(vehicle.nameKey)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-gray-100 hover:bg-white transition-colors">
                  <td className="py-4 px-3 text-sm font-medium text-brand-gray-800">
                    {t('vehicles.passengers')}
                  </td>
                  {VEHICLES.map((vehicle) => (
                    <td key={vehicle.slug} className="py-4 px-2 text-center text-sm text-brand-black">
                      {vehicle.passengerCount}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-brand-gray-100 hover:bg-white transition-colors">
                  <td className="py-4 px-3 text-sm font-medium text-brand-gray-800">
                    {t('vehicles.luggage')}
                  </td>
                  {VEHICLES.map((vehicle) => (
                    <td key={vehicle.slug} className="py-4 px-2 text-center text-sm text-brand-black">
                      {vehicle.luggageCount}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-brand-gray-100 hover:bg-white transition-colors">
                  <td className="py-4 px-3 text-sm font-medium text-brand-gray-800">
                    Airport Transfer
                  </td>
                  {VEHICLES.map((vehicle) => (
                    <td key={vehicle.slug} className="py-4 px-2 text-center text-sm font-semibold">
                      {vehicle.pricing.airportTransfer ? (
                        <span className="text-brand-orange">
                          {formatCurrency(vehicle.pricing.airportTransfer)}
                        </span>
                      ) : (
                        <span className="text-brand-gray-300 text-xs">Quote</span>
                      )}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-3 text-sm font-medium text-brand-gray-800">
                    Hourly Rate
                  </td>
                  {VEHICLES.map((vehicle) => (
                    <td key={vehicle.slug} className="py-4 px-2 text-center text-sm font-semibold">
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
