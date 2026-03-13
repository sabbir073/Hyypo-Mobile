'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: 'fr' | 'en') => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center bg-brand-gray-800/50 rounded-full p-0.5 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => switchLocale('fr')}
        className={cn(
          'px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer',
          locale === 'fr'
            ? 'bg-brand-orange text-white'
            : 'text-white/70 hover:text-white',
        )}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => switchLocale('en')}
        className={cn(
          'px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer',
          locale === 'en'
            ? 'bg-brand-orange text-white'
            : 'text-white/70 hover:text-white',
        )}
      >
        EN
      </button>
    </div>
  );
}
