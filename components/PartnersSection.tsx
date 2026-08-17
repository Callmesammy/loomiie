"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, ShieldCheck, Layers, Cpu, Radio } from "lucide-react";

interface PartnerItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const PARTNER_ITEMS: PartnerItem[] = [
  {
    id: "tech-engine",
    number: "01",
    category: "FRONT-END ARCHITECTURE",
    title: "Next.js 15 & Vercel Enterprise Engine",
    description:
      "Engineering ultra-fast edge server rendering, ISR hydration, and sub-100ms global latency for mission-critical web applications.",
    image: "/images/partners/digital-engine.jpg",
    tags: ["Next.js 15", "Edge Network", "Server Components"],
  },
  {
    id: "webgl-shaders",
    number: "02",
    category: "3D GPU GRAPHICS PIPELINE",
    title: "Three.js & Custom WebGL Shaders",
    description:
      "Crafting high frame-rate 3D spatial environments, custom GLSL shader physics, and fluid mathematical interactive canvases.",
    image: "/images/partners/tech-alliance.jpg",
    tags: ["Three.js", "GLSL Shaders", "60 FPS Motion"],
  },
  {
    id: "spatial-audio",
    number: "03",
    category: "SONIC BRANDING & SOUND",
    title: "Spatial Acoustic Telemetry",
    description:
      "Harmonizing tactile visual design with multi-channel ambient spatial audio and dynamic sound feedback for digital touchpoints.",
    image: "/images/partners/spatial-audio.jpg",
    tags: ["Spatial Sound", "Sonic Identity", "Acoustic Telemetry"],
  },
  {
    id: "cinematic-film",
    number: "04",
    category: "ART DIRECTION & FILM",
    title: "Cinematic Film & Photography",
    description:
      "Capturing raw, high-contrast monochrome studio photography and editorial film reels engineered for luxury brand campaigns.",
    image: "/images/partners/film-production.jpg",
    tags: ["Art Direction", "Film Production", "Editorial Photo"],
  },
];

/**
 * Cadillac F1 Team Partners Inspired Studio Alliances Section
 * Features:
 * - Monumental "OFFICIAL PARTNERS & ALLIANCES" title header
 * - Hero Split Showcase: Film Production Image + "BUILDING WHAT'S NEXT TOGETHER" text
 * - GSAP ScrollTrigger clip-path reveals & smooth card entrance animations
 * - Warm #F5F3EF studio substrate background
 */
export function PartnersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. GSAP Clip-Path & Parallax Reveal for Hero Image
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", scale: 1.08 },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: heroImageRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. GSAP ScrollTrigger Entrance for Partner Matrix Cards
      const cards = gsap.utils.toArray<HTMLElement>(".partner-matrix-card");
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: idx * 0.12,
            ease: "power3.out",
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
      className="w-full bg-[#F5F3EF] text-[#0E0E0E] py-16 lg:py-28 select-none border-t border-stone-300"
    >
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-14 space-y-20">
        
        {/* 1. MONUMENTAL EDITORIAL PARTNERS HEADING */}
        <div className="space-y-4 border-b border-stone-300 pb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E0E0E] text-white font-mono text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span>LOOMIE ALLIANCES // EST. 2026</span>
          </div>

          <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase font-sans text-[#0E0E0E] leading-[0.9] pt-2">
            OFFICIAL PARTNERS
          </h1>
          <p className="font-mono text-xs sm:text-sm font-bold text-stone-500 uppercase tracking-widest">
            GLOBAL TECHNOLOGY • SPATIAL GRAPHICS • CINEMATIC ART DIRECTION
          </p>
        </div>

        {/* 2. CADILLAC F1 INSPIRED HERO SPLIT SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-stone-300 pb-16">
          {/* Left: High-Contrast Widescreen Production Showcase */}
          <div
            ref={heroImageRef}
            className="lg:col-span-7 relative h-[340px] sm:h-[440px] md:h-[520px] w-full overflow-hidden rounded-md border border-stone-400/40 shadow-2xl bg-stone-900 group"
          >
            <Image
              src="/images/partners/film-production.jpg"
              alt="LOOMIE Strategic Production Alliances"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-white font-bold uppercase tracking-widest z-10">
              <span className="px-3.5 py-2 bg-black/85 backdrop-blur-md border border-white/20">
                01 // PRODUCTION ALLIANCES
              </span>
              <span className="px-3.5 py-2 bg-black/85 backdrop-blur-md border border-white/20 hidden sm:inline-block">
                MONOCHROME FILM & ART DIRECTION
              </span>
            </div>
          </div>

          {/* Right: Editorial Narrative Content */}
          <div className="lg:col-span-5 space-y-6 lg:pl-6">
            <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block">
              BUILDING WHAT'S NEXT TOGETHER
            </span>

            <h2 className="text-3xl sm:text-5xl font-light font-sans tracking-tight text-[#0E0E0E] leading-tight">
              A studio built on shared values of excellence & precision.
            </h2>

            <p className="font-sans text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
              Our strategic partners play a vital role at every stage — from high-performance Next.js server infrastructure and WebGL GLSL shaders to spatial acoustic soundscapes and editorial photography. Together, we shape digital experiences that redefine industry standards.
            </p>

            <div className="pt-4 border-t border-stone-200 flex items-center gap-6 font-mono text-xs font-bold text-[#0E0E0E]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>VERIFIED ALLIANCES</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-stone-700" />
                <span>60 FPS PERFORMANCE</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PARTNER ALLIANCES MATRIX GRID */}
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-300 pb-6">
            <div>
              <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">
                STRATEGIC CAPABILITIES MATRIX
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-sans tracking-tight text-[#0E0E0E]">
                Our Partner Ecosystem
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
              TECHNOLOGY • SOUND • GRAPHICS • FILM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PARTNER_ITEMS.map((item) => (
              <div
                key={item.id}
                className="partner-matrix-card group bg-white border border-stone-300 rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Frame */}
                <div className="relative w-full h-[280px] sm:h-[320px] bg-stone-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/85 text-white font-mono text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm border border-white/20">
                    {item.number} // {item.category}
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-8 space-y-4 bg-white flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-normal font-sans tracking-tight text-[#0E0E0E]">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-stone-600 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2 font-mono text-[10px] text-stone-600 font-bold uppercase">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-stone-100 border border-stone-200">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href="/contact"
                      className="p-2 border border-stone-300 rounded-full hover:bg-[#0E0E0E] hover:text-white transition-colors duration-300"
                      aria-label={`Partner details for ${item.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
