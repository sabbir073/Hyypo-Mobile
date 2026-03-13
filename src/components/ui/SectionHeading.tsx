import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black">
        {title}
      </h2>
      <div
        className={cn(
          'mt-4 h-1 w-16 rounded-full bg-brand-orange',
          centered && 'mx-auto',
        )}
      />
      {subtitle && (
        <p className="mt-4 text-lg text-brand-gray-300 max-w-2xl leading-relaxed"
           style={centered ? { marginLeft: 'auto', marginRight: 'auto' } : undefined}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
