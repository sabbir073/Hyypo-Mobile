import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...rest }, ref) => {
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-brand-black mb-1.5"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full border border-brand-gray-200 rounded-xl px-4 py-3 text-brand-black placeholder:text-brand-gray-300 transition-all duration-200',
            'focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className,
          )}
          {...rest}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
