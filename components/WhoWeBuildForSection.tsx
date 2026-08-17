"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AudiencePillar {
  number: string;
  title: string;
  headline: string;
  image: string;
  alt: string;
  tags: string[];
}

const AUDIENCE_PILLARS: AudiencePillar[] = [
  {
    number: "01",
    title: "Entrepreneurs & Founders",
    headline: "Founders building new brands that need to stand out.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80",
    alt: "Entrepreneurs & Founder Brand Architecture",
    tags: ["Brand Positioning", "Visual Identity", "Pitch Decks"],
  },
  {
    number: "02",
    title: "Product Businesses",
    headline: "Tactile packaging and physical brand presence.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80",
    alt: "Product Based Business Packaging Craft",
    tags: ["Structural Packaging", "Surface Graphics", "3D Mockups"],
  },
  {
    number: "03",
    title: "Digital-First Companies",
    headline: "Digital teams building intuitive web applications.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80",
    alt: "Digital First Company WebGL & UI Systems",
    tags: ["Web Applications", "UI/UX Systems", "WebGL Motion"],
  },
];

/**
 * Ultra-Minimalist & Clean Who We Build For Section
 * Features:
 * - Monumental "WHO WE BUILD FOR" title
 * - Zero unnecessary labeling, zero mono clutter, zero text walls
 * - 3 Clean, spacious cards with high-res photography & concise 1-line headlines
 * - Warm #F5F3EF studio substrate background
 */
export function WhoWeBuildForSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".minimal-audience-card");
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: idx * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#F5F3EF] text-[#0E0E0E] py-16 lg:py-24 select-none"
    >
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-14 space-y-16">
        
        {/* 1. CLEAN TITLE HEADER */}
        <div className="border-b border-stone-300 pb-8">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter uppercase font-sans text-[#0E0E0E] leading-[0.9]">
            WHO WE BUILD FOR
          </h1>
        </div>

        {/* 2. MINIMALIST 3-COLUMN CARD GRID (ZERO CLUTTER) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {AUDIENCE_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="minimal-audience-card bg-white border border-stone-300 rounded-md overflow-hidden p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-xl transition-all duration-500 group"
            >
              {/* Card Header: Number & Title */}
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block">
                  {pillar.number}
                </span>

                <h2 className="text-2xl sm:text-3xl font-light font-sans tracking-tight text-[#0E0E0E]">
                  {pillar.title}
                </h2>

                <p className="font-sans text-stone-700 text-sm sm:text-base leading-relaxed font-normal pt-1">
                  {pillar.headline}
                </p>
              </div>

              {/* Clean Widescreen Photography */}
              <div className="relative w-full h-[260px] sm:h-[300px] rounded-xs overflow-hidden bg-stone-100 border border-stone-200">
                <Image
                  src={pillar.image}
                  alt={pillar.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>

              {/* Minimal Deliverable Tags */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-stone-600 font-bold uppercase">
                  {pillar.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-stone-100 border border-stone-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
