'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { NAV_LINKS } from '@/lib/constants';
import LanguageSwitcher from './LanguageSwitcher';
import Button from '@/components/ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-brand-black flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="text-xl font-heading font-bold text-white tracking-wider">
              HYPPO <span className="text-brand-orange">MOBILE</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-brand-orange transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={onClose}
                className="text-2xl font-heading font-semibold text-white hover:text-brand-orange transition-colors duration-200"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-5 px-6 pb-10">
            <LanguageSwitcher />
            <Link href="/booking" onClick={onClose} className="w-full">
              <Button variant="primary" size="lg" className="w-full">
                {t('nav.booking')}
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
