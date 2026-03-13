import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'price' | 'quote' | 'info';

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  price: 'bg-brand-orange text-white',
  quote: 'bg-brand-gray-800 text-white',
  info: 'bg-brand-orange/10 text-brand-orange',
};

export default function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
