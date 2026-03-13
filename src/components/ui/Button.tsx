import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-orange text-white hover:bg-brand-orange-dark focus:ring-brand-orange/50 active:bg-brand-orange-dark/90',
  secondary:
    'bg-brand-black text-white hover:bg-brand-gray-800 focus:ring-brand-black/50 active:bg-brand-gray-900',
  outline:
    'border-2 border-brand-orange text-brand-orange bg-transparent hover:bg-brand-orange hover:text-white focus:ring-brand-orange/50 active:bg-brand-orange-dark active:border-brand-orange-dark active:text-white',
  ghost:
    'bg-transparent text-brand-black hover:bg-brand-gray-100 focus:ring-brand-gray-200 active:bg-brand-gray-200',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, asChild, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
