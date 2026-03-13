import { cn } from '@/lib/utils';

interface MapEmbedProps {
  className?: string;
}

export default function MapEmbed({ className }: MapEmbedProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const src = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=123+Avenue+des+Champs-Elysees,+75008+Paris,+France&zoom=15`
    : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.3586763980653!2d2.2986765!3d48.8698439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0xcbb47407434935db!2sAv.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris%2C%20France!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr';

  return (
    <div className={cn('w-full rounded-2xl overflow-hidden shadow-lg', className)}>
      <iframe
        src={src}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Hyppo Mobile - Paris Office Location"
      />
    </div>
  );
}
