import type { MetadataRoute } from 'next';

const BASE_URL = 'https://hyppomobile.com';
const LOCALES = ['fr', 'en'];

const PAGES = [
  '',
  '/booking',
  '/fleet',
  '/services',
  '/services/airport-transfer',
  '/services/hourly',
  '/services/custom',
  '/about',
  '/contact',
  '/faq',
  '/terms',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/booking' ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
