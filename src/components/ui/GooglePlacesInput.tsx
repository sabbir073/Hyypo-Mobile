'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
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

interface Suggestion {
  text: string;
  placeId: string;
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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionTokenRef = useRef<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check if Google Maps is loaded
  useEffect(() => {
    const checkLoaded = () => {
      if (typeof window !== 'undefined' && window.google?.maps?.places) {
        setIsLoaded(true);
        return true;
      }
      return false;
    };

    if (checkLoaded()) return;

    const interval = setInterval(() => {
      if (checkLoaded()) clearInterval(interval);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Create session token when loaded
  useEffect(() => {
    if (isLoaded) {
      try {
        sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
      } catch {
        // Ignore if session token creation fails
      }
    }
  }, [isLoaded]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const fetchSuggestions = useCallback(
    async (input: string) => {
      if (!isLoaded || !input || input.length < 2) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      try {
        // Use the new Places API (New) - AutocompleteSuggestion
        const { suggestions: results } =
          await (google.maps.places as any).AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input,
            sessionToken: sessionTokenRef.current,
            includedRegionCodes: ['FR'],
          });

        if (results && results.length > 0) {
          const mapped: Suggestion[] = results.map((s: any) => ({
            text: s.placePrediction?.text?.text || s.placePrediction?.description || '',
            placeId: s.placePrediction?.placeId || '',
          }));
          setSuggestions(mapped);
          setShowDropdown(true);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      } catch {
        // Fallback: try legacy AutocompleteService if new API not available
        try {
          const service = new google.maps.places.AutocompleteService();
          service.getPlacePredictions(
            {
              input,
              componentRestrictions: { country: 'fr' },
              types: ['geocode', 'establishment'],
              sessionToken: sessionTokenRef.current,
            },
            (predictions, status) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                predictions
              ) {
                setSuggestions(
                  predictions.map((p) => ({
                    text: p.description,
                    placeId: p.place_id,
                  }))
                );
                setShowDropdown(true);
              } else {
                setSuggestions([]);
                setShowDropdown(false);
              }
            }
          );
        } catch {
          setSuggestions([]);
          setShowDropdown(false);
        }
      }
    },
    [isLoaded]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);

    // Debounce API calls
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 300);
  };

  const handleSelect = (suggestion: Suggestion) => {
    onChange(suggestion.text);
    setSuggestions([]);
    setShowDropdown(false);
    // Reset session token after selection
    try {
      sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
    } catch {
      // Ignore
    }
  };

  const isDark = variant === 'dark';

  return (
    <div className="w-full relative">
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
            'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none z-10',
            isDark ? 'text-brand-orange' : 'text-brand-gray-300'
          )}
        />
        <input
          ref={inputRef}
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          autoComplete="off"
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

      {/* Suggestions dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className={cn(
            'absolute z-50 left-0 right-0 mt-1 rounded-xl shadow-xl overflow-hidden border max-h-60 overflow-y-auto',
            isDark
              ? 'bg-brand-gray-900 border-white/10'
              : 'bg-white border-brand-gray-100'
          )}
        >
          {suggestions.map((suggestion, i) => (
            <button
              key={`${suggestion.placeId}-${i}`}
              type="button"
              onClick={() => handleSelect(suggestion)}
              className={cn(
                'w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer flex items-start gap-2',
                isDark
                  ? 'text-brand-gray-200 hover:bg-white/10'
                  : 'text-brand-black hover:bg-brand-gray-50',
                i < suggestions.length - 1 &&
                  (isDark
                    ? 'border-b border-white/5'
                    : 'border-b border-brand-gray-50')
              )}
            >
              <MapPin
                className={cn(
                  'w-4 h-4 mt-0.5 shrink-0',
                  isDark ? 'text-brand-orange' : 'text-brand-gray-300'
                )}
              />
              <span className="line-clamp-2">{suggestion.text}</span>
            </button>
          ))}
        </div>
      )}

      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}
