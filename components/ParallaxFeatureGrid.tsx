"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Compass, ShieldCheck, Zap } from "lucide-react";

interface FeatureCard {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
  speed: number;
  icon: React.ReactNode;
}

const FEATURE_ITEMS: FeatureCard[] = [
  {
    id: "f1",
    number: "01",
    title: "Kinetic Motion Engine",
    category: "WebGL Shaders & Physics",
    description:
      "High-frame-rate kinetic animation systems engineered with GSAP, ScrollTrigger, and GPU-accelerated smooth inertia physics.",
    image: "/images/hero-3d-fluid.jpg",
    slug: "lumino-3d-kinetic",
    speed: -45,
    icon: <Zap className="w-5 h-5 text-white" />,
  },
  {
    id: "f2",
    number: "02",
    title: "Tactile Hardware UI",
    category: "Brutalist Industrial Systems",
    description:
      "Monolithic titanium dashboard modules and physical acoustics designed for high-stakes aerospace & spatial telemetry control.",
    image: "/images/project-minimal.jpg",
    slug: "vortex-matte-titanium",
    speed: 35,
    icon: <ShieldCheck className="w-5 h-5 text-white" />,
  },
  {
    id: "f3",
    number: "03",
    title: "Brutalist Architecture",
    category: "Spatial Grid Architecture",
    description:
      "Zero-waste architectural identity frameworks built to maintain crystalline visual clarity from 16px favicons to 100ft outdoor billboards.",
    image: "/images/project-spatial.jpg",
    slug: "brutalist-spatial-pavilion",
    speed: -35,
    icon: <Compass className="w-5 h-5 text-white" />,
  },
];

export function ParallaxFeatureGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const speed = FEATURE_ITEMS[idx]?.speed || 0;

        gsap.fromTo(
          card,
          { y: speed },
          {
            y: -speed,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
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
      className="py-28 md:py-36 px-6 md:px-12 max-w-[1700px] mx-auto select-none space-y-16 overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-8 gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-white/10 border border-slate-700/60 text-white font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest">
            <span className="w-2 h-2 bg-white rounded-none animate-pulse" />
            <span>03 — SYSTEM ARCHITECTURE & CORE CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-foreground">
            PARALLAX <span className="text-slate-400">CORE.</span>
          </h2>
        </div>

        <p className="text-foreground-secondary text-base sm:text-lg max-w-md font-sans">
          Built for high-performing digital environments. Explore our three foundational engineering capabilities.
        </p>
      </div>

      {/* 3-Column Parallax Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-4 items-start">
        {FEATURE_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            className="group relative rounded-none overflow-hidden bg-surface-card/90 backdrop-blur-xl border border-slate-800 p-8 shadow-2xl transition-all duration-500 hover:border-slate-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] cursor-pointer flex flex-col justify-between h-full space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="font-mono text-xs font-bold text-white px-3 py-1 bg-white/10 border border-slate-700">
                  SYS {item.number}
                </span>
                <div className="p-2 rounded-none bg-background border border-slate-800">
                  {item.icon}
                </div>
              </div>

              <div className="relative w-full aspect-[4/3] overflow-hidden border border-slate-800">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={95}
                  priority={idx === 0}
                  className="object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              </div>

              <div className="space-y-2">
                <h3 style={{ fontVariant: "small-caps" }} className="text-xl sm:text-2xl font-bold tracking-wide text-foreground font-sans">
                  {item.title}
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed font-sans line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white">
              <span>{item.category}</span>
              <Link
                href={`/work/${item.slug}`}
                className="w-10 h-10 rounded-full bg-white/10 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <ArrowUpRight className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
