'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

interface BookingConfirmationProps {
  onReset: () => void;
}

export default function BookingConfirmation({
  onReset,
}: BookingConfirmationProps) {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
      >
        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-heading text-3xl md:text-4xl font-bold text-brand-black mb-4"
      >
        {t('booking.success.title')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-brand-gray-300 max-w-md mb-8 leading-relaxed"
      >
        {t('booking.success.message')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="outline" onClick={onReset}>
          {t('booking.bookAnother')}
        </Button>
      </motion.div>
    </motion.div>
  );
}
