"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowUpRight, Eye } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface WorkProject {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  alt: string;
  summary: string;
}

const ALL_WORK_PROJECTS: WorkProject[] = [
  {
    id: "crunchy-brand",
    title: "Crunchy",
    client: "Crunchy Foods Ltd.",
    category: "Food & Beverage Packaging",
    year: "2026",
    image: getCloudinaryUrl("crunchy-1.jpg"),
    alt: "Crunchy Snack Food Packaging & Brand Identity",
    summary:
      "High-contrast tactile snack packaging, brand design tokens, and digital storefront for Crunchy.",
  },
  {
    id: "banana-health",
    title: "Logo Design",
    client: "LOOMIE Studio",
    category: "Logo & Brand Identity",
    year: "2026",
    image: getCloudinaryUrl("service-color.jpg"),
    alt: "LOOMIE Logo Design and Brand Architecture Showcase",
    summary:
      "Bespoke logomark geometry, visual brand tokens, color palettes, and comprehensive identity systems.",
  },
  {
    id: "apple-drink",
    title: "Apple Drink",
    client: "Apple Drink Co.",
    category: "Motion & Visual Identity",
    year: "2026",
    image: "/Apple Drink/Gemini_Generated_Image_bzwot3bzwot3bzwo.jpg",
    alt: "Apple Drink Motion & Visual Identity",
    summary:
      "Refreshing Apple Drink visual identity, 3D kinetic motion animation, dynamic packaging, and digital campaign.",
  },
  {
    id: "ping",
    title: "Ping",
    client: "Ping Technologies",
    category: "UI/UX & App Architecture",
    year: "2026",
    image: "/Ping/Screenshot (949).png",
    alt: "Ping Social Messaging UI & App Architecture",
    summary:
      "Modern social messaging app interface, real-time activity streams, clean dark mode typography, and sleek design system.",
  },
  {
    id: "luxury-hotel",
    title: "Vine Luxury Hotel",
    client: "Vine Hospitality Group",
    category: "Hospitality & Architectural Design",
    year: "2026",
    image: "/cloud-architecture/card6-why-us.jpg",
    alt: "Vine Luxury Hotel Architectural Branding & Web Experience",
    summary:
      "Ultra-luxury boutique hotel visual identity, immersive spatial web experience, and architectural design system.",
  },
];

// Staggered 2D Spatial Offsets for Background Stack Cards
const CARD_SPATIAL_OFFSETS = [
  { x: 0, y: 0 },         // Card 0: Focal Center
  { x: -210, y: -80 },    // Card 1: Top-Left
  { x: 200, y: 70 },      // Card 2: Bottom-Right
  { x: -170, y: 100 },    // Card 3: Bottom-Left
  { x: 230, y: -90 },     // Card 4: Top-Right
  { x: 0, y: -120 },      // Card 5: Top-Center
  { x: -240, y: 30 },     // Card 6: Mid-Left
];

export default function WorkPage() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = pinnedSectionRef.current;
    if (!section) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Initial Card Depth & Staggered Spatial Offset Setup
      cards.forEach((card, i) => {
        const offset = CARD_SPATIAL_OFFSETS[i % CARD_SPATIAL_OFFSETS.length];
        if (i === 0) {
          gsap.set(card, {
            scale: 1.0,
            x: 0,
            y: 0,
            opacity: 1,
            zIndex: cards.length,
            filter: "blur(0px)",
          });
        } else if (i === 1) {
          gsap.set(card, {
            scale: 0.11,
            x: offset.x,
            y: offset.y,
            opacity: 0.45,
            zIndex: cards.length - i,
            filter: "blur(2px)",
          });
        } else {
          gsap.set(card, {
            scale: 0.07,
            x: offset.x,
            y: offset.y,
            opacity: 0,
            zIndex: cards.length - i,
            filter: "blur(4px)",
          });
        }
      });

      // 2. Master ScrollTrigger Timeline: Pinned Staggered Depth Zoom Scale Scrub
      const totalSteps = cards.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          scrub: 1.4, // Smooth unhurried inertia scrub
          start: "top top",
          end: `+=${totalSteps * 240}%`,
          invalidateOnRefresh: true,
          onUpdate: () => {
            let bestIdx = 0;
            let minDistance = Infinity;

            cards.forEach((card, idx) => {
              const scale = Number(gsap.getProperty(card, "scale")) || 1.0;
              const opacity = Number(gsap.getProperty(card, "opacity")) || 0;

              if (opacity > 0.4) {
                const dist = Math.abs(1.0 - scale);
                if (dist < minDistance) {
                  minDistance = dist;
                  bestIdx = idx;
                }
              }
            });

            cards.forEach((card, idx) => {
              if (idx === bestIdx) {
                gsap.set(card, { zIndex: 100, pointerEvents: "auto" });
              } else {
                gsap.set(card, { zIndex: 10 + idx, pointerEvents: "none" });
              }
            });

            setActiveCardIndex(bestIdx);
          },
        },
      });

      // 3. Step-by-step card staggered spatial offset zoom scale transition
      cards.forEach((card, i) => {
        if (i === 0) return;
        const prevCard = cards[i - 1];
        const prevOffset = CARD_SPATIAL_OFFSETS[(i - 1) % CARD_SPATIAL_OFFSETS.length];
        const currentOffset = CARD_SPATIAL_OFFSETS[i % CARD_SPATIAL_OFFSETS.length];
        const label = `step-${i}`;

        // Zoom previous card out to giant foreground zoom-past with offset shift
        if (prevCard) {
          tl.to(
            prevCard,
            {
              scale: 1.7,
              x: -prevOffset.x * 0.8,
              y: -prevOffset.y * 0.8 - 100,
              opacity: 0,
              filter: "blur(8px)",
              duration: 1.0,
              ease: "power2.inOut",
            },
            label
          );
        }

        // Zoom current card IN from its small spatial background offset (scale 0.11) to focal center (scale 1.0, x: 0, y: 0)
        tl.fromTo(
          card,
          {
            scale: 0.11,
            x: currentOffset.x,
            y: currentOffset.y,
            opacity: 0.45,
            filter: "blur(2px)",
          },
          {
            scale: 1.0,
            x: 0,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
          },
          `${label}+=0.1`
        );

        // Pre-fade next card into background position at tiny offset scale
        const nextCard = cards[i + 1];
        if (nextCard) {
          const nextOffset = CARD_SPATIAL_OFFSETS[(i + 1) % CARD_SPATIAL_OFFSETS.length];
          tl.fromTo(
            nextCard,
            { scale: 0.05, x: nextOffset.x, y: nextOffset.y, opacity: 0 },
            { scale: 0.11, opacity: 0.45, filter: "blur(2px)", duration: 0.6 },
            `${label}+=0.4`
          );
        }
      });

      // End trailing buffer delay
      tl.to({}, { duration: 1.0 });
    }, pinnedSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans select-none">
      <Navbar />

      {/* TOP HERO HEADER SECTION (Sharp Brutalist Style) */}
      <div className="pt-28 sm:pt-36 pb-12 px-6 sm:px-12 md:px-16 max-w-[1700px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-b border-white/15 pb-12 lg:pb-16">
          
          {/* LEFT COLUMN: Clean Heavy Brutalist Headline */}
          <div className="lg:col-span-7 flex flex-col justify-center relative">
            <div className="relative space-y-1 sm:space-y-2">
              <div className="text-[3.2rem] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[6.2rem] xl:text-[7.5rem] font-black font-sans tracking-tight text-white uppercase leading-[0.85] whitespace-nowrap">
                WE LET THE
              </div>
              <div className="text-[3.2rem] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[6.2rem] xl:text-[7.5rem] font-black font-sans tracking-tight text-[#f75828] uppercase leading-[0.85] whitespace-nowrap">
                WORK DO THE
              </div>
              <div className="text-[3.2rem] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[6.2rem] xl:text-[7.5rem] font-black font-sans tracking-tight text-white uppercase leading-[0.85] whitespace-nowrap">
                TALKING.
              </div>
              <div className="text-[3.2rem] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[6.2rem] xl:text-[7.5rem] font-black font-sans tracking-tight text-white uppercase leading-[0.85] whitespace-nowrap">
                LOUDLY
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Strategic Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-4 lg:pt-8 lg:pl-6 space-y-8">
            <div className="space-y-6 text-white">
              <p className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-white">
                Every campaign, experience, and story we create starts with strategy and ends with impact.
              </p>

              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
                Our work moves real people <span className="italic font-serif font-medium text-[#f75828]">and</span> numbers, because we design for both.
              </p>

              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
                Every project you&apos;ll see here was built on trust, collaboration, and a shared obsession with getting it right.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f75828] animate-pulse" />
                <p className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Scroll for the receipts below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PINNED GSAP DRAMATIC DEPTH ZOOM SHOWCASE SECTION */}
      <section
        ref={pinnedSectionRef}
        className="relative w-full h-screen bg-[#F7F6F2] overflow-hidden select-none flex items-center justify-center border-b border-stone-300"
      >
        {/* Floating Abstract Decorative Shapes */}
        <div className="absolute top-1/4 left-[8%] w-16 h-16 bg-[#E2F72B] rounded-full blur-[1px] opacity-80 animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/3 left-[15%] w-14 h-14 border-4 border-[#E2F72B] rounded-sm opacity-60 pointer-events-none" />
        <div className="absolute top-1/3 right-[10%] w-20 h-20 bg-[#E2F72B] rounded-full opacity-80 pointer-events-none" />
        <div className="absolute bottom-1/4 right-[16%] w-12 h-12 border-2 border-stone-400 rounded-full opacity-40 pointer-events-none" />

        {/* Central Stage Container */}
        <div className="relative w-full max-w-[1200px] h-[78vh] sm:h-[82vh] flex items-center justify-center px-4">
          {ALL_WORK_PROJECTS.map((proj, idx) => {
            const isActive = idx === activeCardIndex;
            return (
              <Link
                key={proj.id}
                href={`/work/${proj.id}`}
                ref={(el) => {
                  cardRefs.current[idx] = el as unknown as HTMLDivElement;
                }}
                className={`absolute w-[88vw] sm:w-[500px] md:w-[600px] lg:w-[660px] aspect-[16/11] rounded-none overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.18)] border border-stone-300 bg-white group cursor-pointer gpu-layer transform-gpu transition-[pointer-events,z-index] duration-300 ${
                  isActive ? "pointer-events-auto z-50" : "pointer-events-none z-10"
                }`}
              >
              {/* Media Card Container */}
              <div className="relative w-full h-[73%] overflow-hidden bg-stone-200">
                {proj.image.endsWith(".mp4") || proj.image.includes(".mp4") ? (
                  <video
                    src={proj.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={proj.image}
                    alt={proj.alt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                
                {/* Year Badge */}
                <div className="absolute top-5 left-5 font-mono text-xs font-bold px-3.5 py-1.5 bg-[#0E0E0E] text-white shadow-md">
                  {proj.year}
                </div>

                {/* Hover Quick Action Indicator */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Card Title & Category Label Badge */}
              <div className="relative w-full h-[27%] bg-white p-5 sm:p-6 flex items-center justify-between border-t border-stone-200">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-sans tracking-tight text-[#0E0E0E] group-hover:text-[#E62B00] transition-colors line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono font-bold text-[#E62B00] uppercase tracking-wider">
                    {proj.category}
                  </p>
                </div>

                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-stone-900 text-white flex items-center justify-center group-hover:bg-[#E62B00] group-hover:scale-105 transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
        </div>

        {/* FLOATING BOTTOM-RIGHT ALL WORK PILL BAR */}
        <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40 bg-[#0E0E0E] text-white p-2.5 px-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-stone-800 flex items-center gap-4 font-mono text-xs font-bold tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E62B00] animate-pulse" />
            <span>ALL WORK</span>
          </div>

          {/* Active Card Step Counter Badge */}
          <div className="flex items-center gap-2 pl-3 border-l border-white/20 text-stone-300 font-mono text-xs">
            <span>
              0{activeCardIndex + 1} / 0{ALL_WORK_PROJECTS.length}
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
