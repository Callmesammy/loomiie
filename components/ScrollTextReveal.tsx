"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface BrandItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
}

const BRAND_ITEMS: BrandItem[] = [
  {
    id: "b-01",
    title: "Crunchy",
    subtitle: "Snack Packaging & Brand",
    description: "Tactile snack packaging, custom 3D renders, brand design tokens, and interactive digital storefront.",
    image: getCloudinaryUrl("crunchy-1.jpg"),
    alt: "Crunchy Foods",
  },
  {
    id: "b-02",
    title: "Banana Health",
    subtitle: "Wellness & Telehealth",
    description: "Modern wellness identity, cheerful color palette, iconic symbolic mark, and design tokens.",
    image: "/cloud-architecture/card1-architecture.jpg",
    alt: "Banana Health Labs",
  },
  {
    id: "b-03",
    title: "Apple Drink",
    subtitle: "3D Motion & Packaging",
    description: "Refreshing 3D kinetic video animation, vibrant tactile packaging renders, and global launch campaign.",
    image: "/Apple Drink/Gemini_Generated_Image_bzwot3bzwot3bzwo.jpg",
    alt: "Apple Drink Co.",
  },
  {
    id: "b-04",
    title: "Ping Social",
    subtitle: "UI/UX & App Architecture",
    description: "Ultra-responsive social interaction platform, real-time activity streams, and sleek dark mode design system.",
    image: "/Ping/Screenshot (949).png",
    alt: "Ping Technologies",
  },
  {
    id: "b-05",
    title: "Vine Hotel",
    subtitle: "Luxury Hospitality & Web",
    description: "Ultra-luxury boutique hotel visual identity, spatial web experience, and high-conversion reservation journeys.",
    image: "/cloud-architecture/card6-why-us.jpg",
    alt: "Vine Luxury Hotel",
  },
];

export function ScrollTextReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const ITEM_HEIGHT = 80; // px height per title item

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const total = BRAND_ITEMS.length;

      // 1. Initial State Setup for Titles and Image Frames
      BRAND_ITEMS.forEach((_, i) => {
        if (i === 0) {
          if (imageRefs.current[i]) gsap.set(imageRefs.current[i], { opacity: 1, scale: 1.0 });
          if (titleRefs.current[i]) gsap.set(titleRefs.current[i], { color: "#E62B00", opacity: 1, scale: 1.0 });
        } else {
          if (imageRefs.current[i]) gsap.set(imageRefs.current[i], { opacity: 0, scale: 1.06 });
          if (titleRefs.current[i]) gsap.set(titleRefs.current[i], { color: "#0E0E0E", opacity: 0.35, scale: 0.92 });
        }
      });

      let lastIndex = -1;

      // 2. Master Pinned GSAP ScrollTrigger Timeline with Generous Scroll Delay Buffer
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          scrub: 1.0, // Smooth unhurried inertia scrub
          start: "top top",
          end: `+=${total * 220}%`, // Generous pinned scroll distance for unhurried stepping
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawIdx = Math.floor(self.progress * total);
            const idx = Math.max(0, Math.min(total - 1, rawIdx));
            if (idx !== lastIndex) {
              lastIndex = idx;
              setActiveIndex(idx);
            }
          },
        },
      });

      // 3. Step-by-step Pinned Slide Transition with Symmetrical Animated Ease
      BRAND_ITEMS.forEach((_, i) => {
        if (i === 0) return;
        const prevIdx = i - 1;
        const stepLabel = `step-${i}`;

        // Smooth track vertical translation to keep active title centered
        masterTl.to(
          track,
          {
            y: -i * ITEM_HEIGHT,
            duration: 1.0,
            ease: "power2.inOut",
          },
          stepLabel
        );

        // Previous item transition out (fade down text, scale up image out)
        if (titleRefs.current[prevIdx]) {
          masterTl.to(
            titleRefs.current[prevIdx],
            { color: "#0E0E0E", opacity: 0.35, scale: 0.92, duration: 0.8, ease: "power2.inOut" },
            stepLabel
          );
        }
        if (imageRefs.current[prevIdx]) {
          masterTl.to(
            imageRefs.current[prevIdx],
            { opacity: 0, scale: 1.06, duration: 0.8, ease: "power2.inOut" },
            stepLabel
          );
        }

        // Current item transition in (highlight active title in bold red, crossfade image in)
        if (titleRefs.current[i]) {
          masterTl.to(
            titleRefs.current[i],
            { color: "#E62B00", opacity: 1.0, scale: 1.0, duration: 0.9, ease: "power2.out" },
            `${stepLabel}+=0.1`
          );
        }
        if (imageRefs.current[i]) {
          masterTl.to(
            imageRefs.current[i],
            { opacity: 1.0, scale: 1.0, duration: 0.9, ease: "power2.out" },
            `${stepLabel}+=0.1`
          );
        }

        // Delay pause on each active brand item before proceeding
        masterTl.to({}, { duration: 0.5 });
      });

      // End trailing delay buffer before unpinning
      masterTl.to({}, { duration: 1.0 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover Handler for Direct Interactive Selection
  const handleHoverItem = (idx: number) => {
    setActiveIndex(idx);

    BRAND_ITEMS.forEach((_, i) => {
      const isTarget = i === idx;

      if (imageRefs.current[i]) {
        gsap.to(imageRefs.current[i], {
          opacity: isTarget ? 1 : 0,
          scale: isTarget ? 1 : 1.06,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (titleRefs.current[i]) {
        gsap.to(titleRefs.current[i], {
          color: isTarget ? "#E62B00" : "#0E0E0E",
          opacity: isTarget ? 1 : 0.35,
          scale: isTarget ? 1 : 0.92,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white text-[#0E0E0E] overflow-hidden select-none border-t border-b border-stone-300 flex items-center justify-center py-6"
    >
      <div className="w-full max-w-[1650px] px-6 sm:px-12 md:px-16 flex items-center justify-between gap-8 sm:gap-12 h-full max-h-[85vh] my-auto">
        {/* LEFT COLUMN: Section Label */}
        <div className="w-[180px] sm:w-[220px] shrink-0 flex items-center">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#E62B00] uppercase tracking-widest block">
              PARTNER SHOWCASE
            </span>
            <p className="text-xl sm:text-2xl font-bold font-sans text-stone-900 tracking-tight leading-snug">
              The brands that bet on us
            </p>
          </div>
        </div>

        {/* MIDDLE COLUMN: Vertical Titles Stream */}
        <div className="w-[360px] sm:w-[440px] lg:w-[500px] shrink-0 relative h-[380px] flex flex-col justify-center overflow-hidden border-l border-r border-stone-200 px-6 sm:px-8">
          <div
            ref={trackRef}
            className="w-full flex flex-col space-y-4 pt-[150px] pb-[150px] will-change-transform"
          >
            {BRAND_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                onMouseEnter={() => handleHoverItem(idx)}
                className="cursor-pointer group transition-all duration-300 w-full h-[64px] flex items-center shrink-0"
              >
                <h3
                  ref={(el) => {
                    titleRefs.current[idx] = el;
                  }}
                  className="text-4xl sm:text-5xl lg:text-[3.8rem] font-bold font-sans tracking-tight leading-none truncate origin-left gpu-layer"
                >
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT GROUP: Sharp Image Frame + Narrative Text */}
        <div className="flex-1 flex items-center gap-6 sm:gap-8 justify-end min-w-0">
          {/* Brutalist Sharp Rectangular Image Card (Zero Curved Edges) */}
          <div className="relative w-[340px] sm:w-[420px] md:w-[520px] aspect-[16/11] rounded-none overflow-hidden shadow-2xl border border-stone-300 bg-stone-100 shrink-0 gpu-layer">
            {BRAND_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => {
                  imageRefs.current[idx] = el;
                }}
                className={`absolute inset-0 w-full h-full pointer-events-none origin-center gpu-layer transition-all duration-500 ${
                  idx === activeIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-106"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  quality={95}
                  priority={idx === 0}
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover rounded-none"
                />
              </div>
            ))}
          </div>

          {/* Far-Right Narrative Paragraph */}
          <div className="w-[190px] sm:w-[240px] shrink-0 relative min-h-[160px] flex items-center overflow-hidden">
            {BRAND_ITEMS.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={item.id}
                  className={`absolute inset-0 flex flex-col justify-center space-y-3 gpu-layer transition-all duration-500 ease-out ${
                    isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto z-10 flex"
                      : "opacity-0 translate-y-3 pointer-events-none z-0 hidden"
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-[#E62B00] uppercase tracking-wider">
                    {item.subtitle}
                  </span>
                  <p className="text-sm sm:text-base font-normal font-sans text-stone-800 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
