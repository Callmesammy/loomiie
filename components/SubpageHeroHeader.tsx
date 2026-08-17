"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SubpageHeroHeaderProps {
  badge?: string;
  line1?: string;
  line2?: string;
  bannerImage?: string;
  bannerAlt?: string;
  secondaryImage?: string;
}

/**
 * Editorial Sub-Page Hero Header Component
 * Proportional, elegant typography matching brandappart.com layout:
 * - Sleek narrow horizontal banner strip (~80px tall)
 * - Tagline badge
 * - Balanced, proportional headline typography
 */
export function SubpageHeroHeader({
  badge = "[LOOMIE STUDIO]",
  line1 = "DIGITAL MARKETING &",
  line2 = "STUDIO DISCIPLINES",
  bannerImage = "/images/about/brand-architecture.jpg",
  bannerAlt = "Studio Banner",
  secondaryImage = "/images/about/marketing-strategy.jpg",
}: SubpageHeroHeaderProps) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const banners = [bannerImage, secondaryImage];

  // Periodic subtle banner swap animation
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
        setIsFading(false);
      }, 400);
    }, 6500);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section className="relative w-full bg-[#F5F3EF] text-[#0E0E0E] pt-20 pb-8 px-6 sm:px-12 md:px-16 overflow-hidden select-none border-b border-stone-300">
      <div className="max-w-[1850px] mx-auto w-full space-y-4">
        {/* 1. Sleek Narrow Horizontal Banner Strip (~60px-80px tall) */}
        <div className="relative w-full h-14 sm:h-16 md:h-20 overflow-hidden rounded-md border border-stone-300 bg-stone-900 group cursor-pointer">
          <Image
            src={banners[currentBannerIndex]}
            alt={bannerAlt}
            fill
            priority
            quality={95}
            sizes="100vw"
            className={`object-cover transition-all duration-1000 ease-out group-hover:scale-105 ${
              isFading ? "opacity-0 scale-95 blur-xs" : "opacity-100 scale-100 blur-none"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* 2. Tagline Badge Under Banner Left */}
        <div className="font-mono text-xs font-bold tracking-widest uppercase text-stone-500 pt-1">
          {badge}
        </div>

        {/* 3. Proportional Balanced Headline Layout */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight leading-[1.05] text-[#0E0E0E] font-sans">
            {line1} {line2}
          </h1>
        </div>
      </div>
    </section>
  );
}
