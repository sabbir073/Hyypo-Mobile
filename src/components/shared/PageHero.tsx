'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gradientRef.current || backgroundImage) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(gradientRef.current, {
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1008 25%, #0A0A0A 50%, #15100a 75%, #0A0A0A 100%)',
      duration: 3,
      ease: 'power1.inOut',
    })
    .to(gradientRef.current, {
      background: 'linear-gradient(225deg, #0A0A0A 0%, #1c0f04 20%, #0f0a06 50%, #0A0A0A 80%, #140d06 100%)',
      duration: 3,
      ease: 'power1.inOut',
    })
    .to(gradientRef.current, {
      background: 'linear-gradient(45deg, #120c05 0%, #0A0A0A 30%, #1a1008 60%, #0A0A0A 100%)',
      duration: 3,
      ease: 'power1.inOut',
    })
    .to(gradientRef.current, {
      background: 'linear-gradient(315deg, #0A0A0A 0%, #150e07 35%, #0A0A0A 65%, #1c0f04 100%)',
      duration: 3,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [backgroundImage]);

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-brand-black',
      )}
    >
      {/* Background layer */}
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/60 to-brand-black/90" />
        </>
      ) : (
        <div
          ref={gradientRef}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1008 25%, #0A0A0A 50%, #15100a 75%, #0A0A0A 100%)',
          }}
        />
      )}

      {/* Grid lines — small boxes */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.6)_100%)]" />

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <motion.div
              className="h-1 w-16 bg-brand-orange rounded-full mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>
        </motion.div>
        {subtitle && (
          <motion.p
            className="mt-5 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom fade */}
      <div className="h-12 bg-gradient-to-t from-brand-white to-transparent relative z-10" />
    </section>
  );
}
