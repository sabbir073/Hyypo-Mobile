import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}

export default function Card({ className, children, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300',
        hover && 'hover:scale-[1.02] hover:shadow-xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
