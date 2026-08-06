"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

interface BentoCard {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  aspect: string;
  span: string;
  logoOverlay?: string;
  tag?: string;
}

const HERO_BENTO_ITEMS: BentoCard[] = [
  {
    id: "hb1",
    slug: "lumino-3d-kinetic",
    title: "Fluid 3D Spatial Dynamics",
    category: "Motion & WebGL Shaders",
    image: "/images/hero-3d-fluid.jpg",
    aspect: "aspect-[16/10]",
    span: "col-span-12 lg:col-span-7",
    logoOverlay: "FLUID 3D",
    tag: "FEATURED SHOWCASE",
  },
  {
    id: "hb2",
    slug: "vortex-matte-titanium",
    title: "VORTEX Titanium Module",
    category: "Spatial Hardware & Industrial",
    image: "/images/project-minimal.jpg",
    aspect: "aspect-[16/10]",
    span: "col-span-12 lg:col-span-5",
    logoOverlay: "VORTEX",
    tag: "HARDWARE UI",
  },
  {
    id: "hb3",
    slug: "brutalist-spatial-pavilion",
    title: "Brutalist Spatial Pavilion",
    category: "Architecture & Acoustics",
    image: "/images/project-spatial.jpg",
    aspect: "aspect-[4/3]",
    span: "col-span-12 lg:col-span-5",
    logoOverlay: "AURA",
    tag: "ARCHITECTURAL",
  },
  {
    id: "hb4",
    slug: "sat-cybernetic-hud",
    title: "SAT Cybernetic System HUD",
    category: "Autonomous WebGL Interface",
    image: "/images/project-digital.jpg",
    aspect: "aspect-[4/3]",
    span: "col-span-12 lg:col-span-7",
    logoOverlay: "SAT",
    tag: "WEBGL HUD",
  },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Master Catchy Post-Loading Hero Entrance Timeline (Timed at 2.0s to sync with Preloader lift)
      const masterTL = gsap.timeline({ delay: 2.0 });

      // 1. Studio Badge Entrance
      if (badgeRef.current) {
        masterTL.fromTo(
          badgeRef.current,
          { y: -25, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      }

      // 2. Kinetic Headline 3D Character Explosion
      if (headlineRef.current) {
        const textSplit = new SplitType(headlineRef.current, {
          types: "chars,words",
          tagName: "span",
        });

        if (textSplit.chars) {
          masterTL.fromTo(
            textSplit.chars,
            {
              y: 130,
              rotateX: -105,
              opacity: 0,
              scale: 0.75,
            },
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              stagger: 0.03,
              ease: "power4.out",
            },
            "-=0.4"
          );
        }
      }

      // 3. Subtitle Fade & Slide Up
      if (subtitleRef.current) {
        masterTL.fromTo(
          subtitleRef.current,
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        );
      }

      // 4. Bento Grid Cards Entrance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 90, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 5. Parallax Scrub on Headline after initial entry
      if (headlineRef.current && containerRef.current) {
        gsap.to(headlineRef.current, {
          yPercent: -20,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: 0.5,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="pt-36 pb-24 md:pt-44 md:pb-32 px-6 md:px-12 max-w-[1700px] mx-auto overflow-hidden select-none"
    >
      {/* Studio Badge */}
      <div
        ref={badgeRef}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-foreground/10 border border-foreground/20 text-foreground text-xs font-mono font-bold uppercase tracking-wider mb-8"
      >
        <span className="w-2 h-2 bg-foreground rounded-none animate-pulse" />
        <span>CLEAR. CONNECTED. COMPLETE. // LOOMIE STUDIO 2026</span>
      </div>

      {/* Headline & Subtitle Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 md:mb-20">
        <div className="lg:col-span-7">
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.8rem] font-extrabold tracking-tight leading-[0.92] text-foreground font-sans uppercase max-w-3xl"
            style={{ perspective: "1000px", willChange: "transform, opacity" }}
          >
            <span>Design</span>{" "}
            <span>that</span>{" "}
            <span className="text-foreground border-b-4 border-foreground pb-1">connects</span>
          </h1>
        </div>

        <div
          ref={subtitleRef}
          className="lg:col-span-5 flex flex-col justify-end space-y-6 lg:pl-10 text-foreground-secondary text-base sm:text-lg font-sans"
        >
          <p className="leading-snug font-normal max-w-md">
            <span className="text-foreground font-bold uppercase tracking-wider block mb-1">
              Clear. Connected. Complete.
            </span>
            Where ideas turn into identities, we craft experiences that resonate across brutalist spatial concepts and kinetic web systems.
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border-custom font-mono text-xs sm:text-sm text-foreground font-bold tracking-wider">
            <span>Lat : 19.075983 Long : 72.877655</span>
            <ArrowDown className="w-5 h-5 text-foreground animate-bounce" />
          </div>
        </div>
      </div>

      {/* Stylish Hero Bento Grid Showcase */}
      <div ref={gridRef} className="grid grid-cols-12 gap-8 md:gap-10">
        {HERO_BENTO_ITEMS.map((card) => (
          <Link
            key={card.id}
            href={`/work/${card.slug}`}
            className={`${card.span} group relative rounded-none overflow-hidden bg-surface-card border border-border-custom shadow-2xl transition-all duration-500 hover:border-foreground cursor-pointer block`}
          >
            <div className={`w-full ${card.aspect} relative overflow-hidden rounded-none`}>
              <Image
                src={card.image}
                alt={card.title}
                fill
                priority
                quality={80}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover rounded-none transition-all duration-700 ease-out group-hover:scale-105 group-hover:contrast-[1.08] group-hover:brightness-[1.05]"
                style={{ transform: "translateZ(0)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300" />

              {card.tag && (
                <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-black/60 backdrop-blur-md border border-white/15 text-white font-mono text-xs font-bold tracking-widest uppercase">
                  <span>{card.tag}</span>
                </div>
              )}

              {card.logoOverlay && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-black text-6xl md:text-8xl tracking-tighter text-white/20 uppercase font-sans group-hover:text-white/45 group-hover:scale-105 transition-all duration-500">
                    {card.logoOverlay}
                  </span>
                </div>
              )}
            </div>

            <div className="p-8 md:p-10 flex items-center justify-between bg-surface-card border-t border-border-custom">
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase text-foreground leading-tight">
                  {card.title}
                </h3>
                <span className="text-xs sm:text-sm font-mono text-foreground-secondary uppercase tracking-widest mt-2 block font-semibold">
                  {card.category}
                </span>
              </div>

              <div className="w-12 h-12 rounded-none bg-background border border-border-custom flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-300 shadow-md">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
