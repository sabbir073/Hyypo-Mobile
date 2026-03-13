'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState('0');

  // Parse leading number and suffix
  const match = value.match(/^(\d+)(.*)/);
  const numericPart = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView) return;

    if (numericPart === 0) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(motionValue, numericPart, {
      duration,
      ease: 'easeOut',
    });

    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(`${latest}${suffix}`);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, numericPart, suffix, duration, motionValue, rounded, value]);

  return <span ref={ref}>{displayValue}</span>;
}
