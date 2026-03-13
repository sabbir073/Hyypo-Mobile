'use client';

import { useRef, useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GooglePlacesInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  variant?: 'light' | 'dark';
}

export default function GooglePlacesInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  variant = 'light',
}: GooglePlacesInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps API is loaded
    if (typeof window !== 'undefined' && window.google?.maps?.places) {
      setIsLoaded(true);
      return;
    }

    // Poll for it (loaded via script tag)
    const interval = setInterval(() => {
      if (window.google?.maps?.places) {
        setIsLoaded(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode', 'establishment'],
      componentRestrictions: { country: 'fr' },
      fields: ['formatted_address', 'name'],
    });

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place) {
        const address = place.formatted_address || place.name || '';
        onChange(address);
      }
    });
  }, [isLoaded, onChange]);

  const isDark = variant === 'dark';

  return (
    <div className="w-full">
      {!isDark && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-brand-black mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <MapPin
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none',
            isDark ? 'text-brand-orange' : 'text-brand-gray-300'
          )}
        />
        <input
          ref={inputRef}
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full rounded-xl pl-10 pr-4 py-3 transition-all duration-200 focus:outline-none',
            isDark
              ? 'bg-white/5 border border-white/10 text-brand-white placeholder:text-brand-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30'
              : cn(
                  'border text-brand-black placeholder:text-brand-gray-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20',
                  error
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-brand-gray-200'
                )
          )}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
