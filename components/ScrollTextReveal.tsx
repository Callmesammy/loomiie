"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

interface DisciplineItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tags: string[];
  image: string;
  alt: string;
}

const STUDIO_DISCIPLINE_LIST: DisciplineItem[] = [
  {
    id: "disc-1",
    number: "01",
    title: "Spatial & Brand Identity",
    subtitle: "Systemic Logomarks, Visual Languages, & Type Architecture",
    tags: ["Brand Strategy", "Design Tokens", "Packaging Rituals", "Typography"],
    image: "/images/manifesto/rose-bw.jpg",
    alt: "Black and White Rose Studio Mark",
  },
  {
    id: "disc-2",
    number: "02",
    title: "Creative WebGL & Motion",
    subtitle: "Fluid 3D Shaders, Kinetic Physics, & High-Speed Animations",
    tags: ["Three.js", "GSAP ScrollTrigger", "GLSL Shaders", "R3F Shader Art"],
    image: "/images/manifesto/fluid-3d.jpg",
    alt: "Fluid 3D Motion Shader Art",
  },
  {
    id: "disc-3",
    number: "03",
    title: "Full-Stack Digital Architecture",
    subtitle: "Next.js 15, Custom E-Commerce, & High-Scale Infrastructure",
    tags: ["Next.js 15", "Shopify Plus", "TypeScript", "Headless CMS"],
    image: "/images/manifesto/code-dark.jpg",
    alt: "Dark IDE Code Engine",
  },
  {
    id: "disc-4",
    number: "04",
    title: "Autonomous Telemetry & HUDs",
    subtitle: "Real-Time Data Dashboards & Tactical Interface Systems",
    tags: ["UI Architecture", "Canvas 2D/3D", "Telemetry Systems", "Dashboards"],
    image: "/images/manifesto/cybernetic.jpg",
    alt: "Cybernetic HUD Telemetry Interface",
  },
  {
    id: "disc-5",
    number: "05",
    title: "Art Direction & Spatial Acoustics",
    subtitle: "Editorial Photography, Acoustic Soundscapes, & Sensory Media",
    tags: ["Art Direction", "Spatial Audio", "Editorial Photography", "Exhibition"],
    image: "/images/manifesto/coastal.jpg",
    alt: "Coastal Villa Architectural Art",
  },
];

/**
 * Rebuilt Studio Discipline & Capabilities Text List Segment
 * Features:
 * - Clean Light Studio Substrate (#F5F3EF) with dark typography (#0E0E0E)
 * - Interactive Cursor-Following Photo Floating Preview on Hover
 * - Expandable Discipline Items with Deliverables Tags & Arrow Link Triggers
 * - Zero forced all-caps, zero AI boilerplate text
 */
export function ScrollTextReveal() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cursorPreviewRef = useRef<HTMLDivElement>(null);

  // Smooth Cursor Follower Effect for Hover Image Preview
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorPreviewRef.current || hoveredIndex === null) return;

      gsap.to(cursorPreviewRef.current, {
        x: e.clientX - 160,
        y: e.clientY - 100,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hoveredIndex]);

  return (
    <section className="relative w-full bg-[#F5F3EF] text-[#0E0E0E] py-24 sm:py-32 px-6 sm:px-12 md:px-16 overflow-hidden select-none border-t border-b border-stone-300">
      {/* Floating Hover Image Cursor Follower */}
      <div
        ref={cursorPreviewRef}
        className={`fixed top-0 left-0 z-50 pointer-events-none w-[280px] h-[170px] rounded-md border border-stone-400/40 shadow-2xl overflow-hidden bg-stone-900 transition-opacity duration-300 ${hoveredIndex !== null ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
      >
        {hoveredIndex !== null && (
          <Image
            src={STUDIO_DISCIPLINE_LIST[hoveredIndex].image}
            alt={STUDIO_DISCIPLINE_LIST[hoveredIndex].alt}
            fill
            priority
            quality={92}
            sizes="300px"
            className="object-cover"
          />
        )}
      </div>

      <div className="max-w-[1700px] mx-auto w-full space-y-12">
        {/* Section Editorial Title */}
        <div className="space-y-3 max-w-4xl border-b border-stone-300 pb-8">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light font-sans tracking-tight leading-[0.95] text-[#0E0E0E]">
            Capabilities & Core Disciplines
          </h2>
          <p className="text-stone-600 font-sans text-base sm:text-lg leading-relaxed">
            We bridge mathematical precision with artistic endurance — engineering bespoke web experiences, identity systems, and WebGL shaders.
          </p>
        </div>

        {/* Interactive Discipline Text List Stack */}
        <div className="divide-y divide-stone-300 border-t border-b border-stone-300">
          {STUDIO_DISCIPLINE_LIST.map((disc, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <Link
                key={disc.id}
                href="/work"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group py-8 sm:py-10 transition-all duration-300 cursor-pointer flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 block ${
                  isHovered ? "pl-4 lg:pl-6 bg-stone-200/40" : "pl-0"
                }`}
              >
                {/* Left Side: Title + Subtitle */}
                <div className="flex items-start sm:items-center gap-6 sm:gap-10">
                  <div className="space-y-1">
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-light font-sans tracking-tight text-[#0E0E0E] group-hover:font-normal transition-all">
                      {disc.title}
                    </h3>
                    <p className="text-stone-500 font-sans text-sm sm:text-base">
                      {disc.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Side: Deliverable Tags + Arrow */}
                <div className="flex flex-wrap items-center gap-3 self-end lg:self-center">
                  <div className="hidden sm:flex flex-wrap gap-2">
                    {disc.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-stone-200 border border-stone-300 text-[11px] font-mono text-stone-700 tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="w-10 h-10 rounded-full border border-stone-400 flex items-center justify-center text-[#0E0E0E] group-hover:bg-[#0E0E0E] group-hover:text-white group-hover:border-[#0E0E0E] transition-all">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
