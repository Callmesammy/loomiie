"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ValueCard {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  bgColor: string;
  textColor: string;
  medium: string;
  tags: string[];
}

const VALUE_CARDS: ValueCard[] = [
  {
    number: "01",
    title: "CONNECTED DESIGN",
    subtitle: "LOGO TO UI AS ONE UNIFIED SYSTEM",
    description:
      "We construct brand identity systems where the original geometry of a logomark reverberates seamlessly into typography, spatial signage, and kinetic digital interfaces.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1600&q=80",
    alt: "Connected Design Systems",
    bgColor: "bg-[#0E0E0E]",
    textColor: "text-white",
    medium: "SYSTEM ARCHITECTURE",
    tags: ["Unified Tokens", "Cross Medium Cohesion", "Kinetic Logic"],
  },
  {
    number: "02",
    title: "PROVEN IN USE",
    subtitle: "TESTED LIVE ACROSS PLATFORMS",
    description:
      "We subject every visual system to rigorous production stress tests: rendering high frame-rate WebGL shaders, verifying OLED contrast, and ensuring tactile print fidelity.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    alt: "Tested Live Across Platforms",
    bgColor: "bg-[#1A1A1E]",
    textColor: "text-white",
    medium: "PRODUCTION TESTING",
    tags: ["60 FPS WebGL", "Multi Screen Scale", "Print Fidelity"],
  },
  {
    number: "03",
    title: "ALWAYS ITERATING",
    subtitle: "FEEDBACK DRIVEN, TREND PROOF",
    description:
      "Guided by empirical feedback and spatial physics, we iteratively polish our systems so they evolve alongside culture without needing total redesigns.",
    image: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=1600&q=80",
    alt: "Feedback Driven & Trend Proof",
    bgColor: "bg-[#F5F3EF]",
    textColor: "text-[#0E0E0E]",
    medium: "EVOLUTIONARY LOGIC",
    tags: ["Continuous Refinement", "Trend Proof", "Empirical Telemetry"],
  },
  {
    number: "04",
    title: "TOTAL CLARITY",
    subtitle: "INSTANT RECOGNITION AT EVERY SCALE",
    description:
      "By stripping away ornamental noise, we uncover the pure signal of your brand. Our typography and mark maintain crystalline legibility from 16px favicons to 100ft outdoor billboards.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    alt: "Instant Recognition At Every Scale",
    bgColor: "bg-[#222226]",
    textColor: "text-white",
    medium: "TYPOGRAPHIC PRECISION",
    tags: ["16px Favicon Precision", "100ft Billboard Clarity", "Zero Clutter"],
  },
  {
    number: "05",
    title: "STRATEGIC CRAFT",
    subtitle: "THINKING FIRST, POLISH ALWAYS",
    description:
      "Craft is intelligence made visible. Every typographic grid alignment, color palette pair, and micro-interaction is rooted in deep commercial strategy.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1600&q=80",
    alt: "Strategic Brutalist Commercial Craft",
    bgColor: "bg-[#0E0E0E]",
    textColor: "text-white",
    medium: "COMMERCIAL CRAFT",
    tags: ["Strategy Led", "Micro Interactions", "Commercial Impact"],
  },
];

/**
 * Beetogreen Inspired Stacking / Climbing Cards Section for LOOMIE
 * Features:
 * - GSAP ScrollTrigger Pinned Container (`pin: true`)
 * - 5 Stacked Cards that climb up over each other sequentially as you scroll
 * - Concise, streamlined, high-contrast text layout
 * - Clean high-res Unsplash photography
 */
export function ValuesSection() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>(".beetogreen-stacked-card");

    const ctx = gsap.context(() => {
      // Create GSAP Timeline pinned scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 0.8,
        },
      });

      // Animate card 2 to card 5 climbing up over the previous card
      cards.forEach((card, index) => {
        if (index > 0) {
          tl.fromTo(
            card,
            {
              yPercent: 100,
              boxShadow: "0 -20px 50px rgba(0,0,0,0.3)",
            },
            {
              yPercent: 0,
              ease: "power2.inOut",
            }
          );
        }
      });
    }, pinSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pinSectionRef} className="w-full h-screen relative bg-[#F5F3EF] overflow-hidden select-none">
      
      {/* Fixed Header Bar Inside Pin Section (Pushed Right So Zero Text Sits Behind Top-Left Logo) */}
      <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-[#0E0E0E] pl-36 sm:pl-44">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-stone-300 rounded-full shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>STUDIO VALUES</span>
        </div>
        <span className="hidden sm:inline-block text-stone-500">
          CLEAR. CONNECTED. COMPLETE.
        </span>
      </div>

      {/* Stacked Cards Container */}
      <div ref={cardsContainerRef} className="w-full h-full relative flex items-center justify-center pt-16 pb-6 px-4 sm:px-8 lg:px-12">
        {VALUE_CARDS.map((card, idx) => (
          <div
            key={card.number}
            className={`beetogreen-stacked-card absolute inset-4 sm:inset-8 lg:inset-12 top-16 sm:top-20 rounded-2xl overflow-hidden border border-stone-400/40 shadow-2xl flex flex-col lg:flex-row ${card.bgColor} ${card.textColor}`}
            style={{ zIndex: 10 + idx }}
          >
            {/* Left Content Area (Concise, Clean & Spacious) */}
            <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-14 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs font-bold tracking-widest opacity-70">
                  <span>VALUE {card.number} / 05</span>
                  <span>{card.medium}</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans tracking-tighter uppercase leading-[0.95]">
                  {card.title}
                </h2>

                <p className="font-mono text-xs sm:text-sm font-bold opacity-80 uppercase tracking-widest border-b border-current/20 pb-4">
                  {card.subtitle}
                </p>

                <p className="font-sans text-base sm:text-xl opacity-90 leading-relaxed font-light pt-2">
                  {card.description}
                </p>
              </div>

              <div className="pt-6 border-t border-current/15">
                <div className="flex flex-wrap gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  {card.tags.map((tag, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-current/10 border border-current/20 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image Frame Area (Pure Photography) */}
            <div className="w-full lg:w-1/2 relative min-h-[260px] sm:min-h-[340px] lg:min-h-full overflow-hidden bg-stone-900 border-t lg:border-t-0 lg:border-l border-current/15 group">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                priority={idx === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
