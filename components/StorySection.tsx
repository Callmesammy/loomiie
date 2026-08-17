"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STORY_SEGMENTS = [
  {
    number: "01",
    title: "CURIOSITY & CRAFT",
    tagline: "SELF TAUGHT EXPLORATION",
    headline: "Loomie began with curiosity, a blank screen, basic tools, and the drive to create.",
    body: "What started as self-taught exploration grew into a studio dedicated to design that actually connects people to brands. Every lesson came from building, breaking, and rebuilding, creating a deep commitment to practical, detail-driven quality.",
    image: "/images/story/story-segment-1.jpg",
    alt: "Self-Taught Exploration & Creative Workspace",
    tags: ["Blank Screen", "Self Taught", "Brand Craft"],
    layoutReversed: false,
  },
  {
    number: "02",
    title: "STARTUPS & BUILDERS",
    tagline: "INTUITIVE DIGITAL SYSTEMS",
    headline: "Today, Loomie designs for ambitious startups and builders.",
    body: "From logos that work as avatars to identities that scale to tactile packaging and web applications that feel intuitive. We combine strategic visual storytelling with high-performance digital engineering.",
    image: "/images/story/story-segment-2.jpg",
    alt: "Startups & Intuitive Digital Systems",
    tags: ["Avatars & Logos", "Packaging Identity", "Intuitive Web"],
    layoutReversed: true,
  },
  {
    number: "03",
    title: "STRATEGY • EXECUTION • REFINEMENT",
    tagline: "ONE RIGOROUS PROCESS",
    headline: "Every project follows one process: strategic thinking, clean execution, and endless refinement.",
    body: "The result: brands people get, remember, and trust from first glance. We avoid unnecessary complexity in favor of thoughtful strategy, clean aesthetic rhythm, and durable digital architecture.",
    image: "/images/story/story-segment-3.jpg",
    alt: "LOOMIE Kinetic Design System & Spatial Refinement",
    tags: ["Strategic Thinking", "Clean Execution", "Endless Refinement"],
    layoutReversed: false,
  },
];

/**
 * Clean & Authentic Editorial Story Chronicle for LOOMIE
 * Features:
 * - NO top small mono label text above OUR STORY
 * - NO hyphens (-) or em-dashes (—) in any text or headlines
 * - Highly relevant Unsplash photography for brand packaging & digital systems
 * - Vertical Split Sections (Alternating left/right image & text)
 * - Warm #F5F3EF studio substrate background
 */
export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // GSAP ScrollTrigger Entrance for Segment Image Blocks
      const segmentBlocks = gsap.utils.toArray<HTMLElement>(".story-segment-block");
      segmentBlocks.forEach((block) => {
        const img = block.querySelector(".story-segment-image");
        const text = block.querySelector(".story-segment-text");

        if (img) {
          gsap.fromTo(
            img,
            { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 0 },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 82%",
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 82%",
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#F5F3EF] text-[#0E0E0E] py-16 lg:py-28 select-none"
    >
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-14 space-y-24 lg:space-y-32">
        
        {/* 1. MONUMENTAL EDITORIAL STORY HEADING (NO SMALL TEXT ABOVE) */}
        <div className="space-y-4 border-b border-stone-300 pb-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter uppercase font-sans text-[#0E0E0E] leading-[0.9]">
            OUR STORY
          </h1>
          <p className="font-mono text-xs sm:text-sm font-bold text-stone-600 uppercase tracking-widest">
            CLEAR. CONNECTED. COMPLETE.
          </p>
        </div>

        {/* 2. FIRST FEATURE: PURE EDITORIAL HEADLINE & INTRO (NO SMALL TOP TITLE TEXT) */}
        <div className="border-b border-stone-300 pb-20 space-y-6 max-w-5xl">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light font-sans tracking-tight text-[#0E0E0E] leading-tight">
            Born from a blank screen and the drive to create.
          </h2>

          <p className="font-sans text-stone-700 text-lg sm:text-2xl font-light leading-relaxed">
            Loomie began with curiosity, a blank screen, basic tools, and the drive to create. What started as self-taught exploration grew into a studio dedicated to design that actually connects people to brands.
          </p>
        </div>

        {/* 3. VERTICAL STORY SEGMENTS (1 RELEVANT UNSPLASH IMAGE PER SEGMENT, ZERO DASHES) */}
        <div className="space-y-24 lg:space-y-32">
          {STORY_SEGMENTS.map((segment) => (
            <div
              key={segment.number}
              className="story-segment-block border-b border-stone-300 pb-20 lg:pb-28"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Large Clean Unsplash Image */}
                <div
                  className={`story-segment-image relative h-[360px] sm:h-[460px] md:h-[540px] w-full overflow-hidden rounded-md border border-stone-300/60 shadow-xl bg-stone-200 group ${
                    segment.layoutReversed ? "lg:col-span-7 lg:order-2" : "lg:col-span-7 lg:order-1"
                  }`}
                >
                  <Image
                    src={segment.image}
                    alt={segment.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Editorial Text Content Block */}
                <div
                  className={`story-segment-text space-y-6 ${
                    segment.layoutReversed ? "lg:col-span-5 lg:order-1 lg:pr-6" : "lg:col-span-5 lg:order-2 lg:pl-6"
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block">
                    {segment.number} / {segment.tagline}
                  </span>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light font-sans tracking-tight text-[#0E0E0E] leading-tight">
                    {segment.headline}
                  </h3>

                  <p className="font-sans text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
                    {segment.body}
                  </p>

                  <div className="pt-6 border-t border-stone-200 flex flex-wrap gap-2 font-mono text-xs text-stone-600 font-bold uppercase">
                    {segment.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white border border-stone-300 shadow-2xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
