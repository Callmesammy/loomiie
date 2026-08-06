"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Feather, Compass, Layers, CheckCircle2, Sparkles } from "lucide-react";

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax Zoom for Story Hero Image
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current.querySelector("img"), {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // GSAP ScrollTrigger Animations for both UP and DOWN scrolling on story blocks
      const blocks = document.querySelectorAll(".story-phase-block");
      blocks.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={containerRef}
      className="py-12 md:py-24 px-6 md:px-12 max-w-[1500px] mx-auto select-none"
    >
      {/* 1. EDITORIAL STORY HERO HEADER */}
      <div className="pb-12 mb-16 border-b border-border-custom space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-foreground/10 border border-foreground/20 text-foreground text-xs font-mono font-bold uppercase tracking-widest">
          <span className="w-2 h-2 bg-foreground rounded-none animate-pulse" />
          <span>LOOMIE STUDIO CHRONICLE // EST. 2026</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.2rem] font-black tracking-tighter uppercase text-foreground leading-[1.02] max-w-5xl">
          BORN FROM A <span className="text-foreground border-b-2 border-foreground">BLANK SCREEN</span> AND THE DRIVE TO CREATE.
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border-custom/60 font-mono text-xs font-bold text-foreground uppercase tracking-widest">
          <span>MOTTO: CLEAR. CONNECTED. COMPLETE.</span>
          <span className="text-foreground-secondary">[ CURIOSITY → STRATEGY → TRUST ]</span>
        </div>
      </div>

      {/* 2. CINEMATIC BLANK SCREEN HERO IMAGE */}
      <div
        ref={heroImageRef}
        className="w-full h-[360px] sm:h-[480px] md:h-[580px] relative overflow-hidden rounded-none border border-border-custom shadow-2xl mb-20 group"
      >
        <Image
          src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1800&q=80"
          alt="Loomie Studio Genesis — Blank Screen & Drive to Create"
          fill
          priority
          quality={90}
          sizes="(max-width: 1500px) 100vw, 1500px"
          className="object-cover transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-white font-bold uppercase tracking-widest">
          <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/20">
            GENESIS PLATE NO. 01 // THE BLANK CANVAS
          </span>
          <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/20 hidden sm:inline-block">
            AUTHENTICATED CHRONICLE
          </span>
        </div>
      </div>

      {/* 3. EDITORIAL NARRATIVE CHRONICLE (3 PHASES) */}
      <div className="space-y-20 md:space-y-28">
        {/* PHASE 01: THE SPARK */}
        <div id="story-chap-genesis" className="story-phase-block grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-16 border-b border-border-custom">
          <div className="lg:col-span-4 space-y-3 font-mono">
            <span className="px-3 py-1 bg-foreground text-background font-bold text-xs uppercase tracking-widest inline-block">
              PHASE 01 // THE SPARK
            </span>
            <div className="text-xs text-foreground-secondary font-bold uppercase tracking-wider">
              SELF-TAUGHT EXPLORATION
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-foreground tracking-tight leading-tight">
              &ldquo;Loomie began with curiosity — a blank screen, basic tools, and the drive to create.&rdquo;
            </h2>

            <p className="text-foreground-secondary font-sans text-base sm:text-xl md:text-2xl leading-relaxed uppercase font-medium pl-6 border-l-4 border-foreground">
              What started as self-taught exploration grew into a studio dedicated to design that actually connects people to brands.
            </p>
          </div>
        </div>

        {/* PHASE 02: THE MISSION */}
        <div id="story-chap-mission" className="story-phase-block grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-16 border-b border-border-custom">
          <div className="lg:col-span-4 space-y-3 font-mono">
            <span className="px-3 py-1 bg-foreground text-background font-bold text-xs uppercase tracking-widest inline-block">
              PHASE 02 // THE MISSION
            </span>
            <div className="text-xs text-foreground-secondary font-bold uppercase tracking-wider">
              AMBITIOUS STARTUPS & BUILDERS
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-foreground tracking-tight leading-tight">
              &ldquo;Today, Loomie designs for ambitious startups and builders.&rdquo;
            </h2>

            <p className="text-foreground-secondary font-sans text-base sm:text-xl md:text-2xl leading-relaxed uppercase font-medium pl-6 border-l-4 border-foreground">
              Logos that work as avatars, identities that scale to packaging, websites that feel intuitive.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs font-bold text-foreground">
              <div className="p-4 bg-surface-card border border-border-custom">
                <span className="text-foreground-secondary block mb-1">01 / AVATARS</span>
                <span>LOGOS THAT SCALABLE</span>
              </div>
              <div className="p-4 bg-surface-card border border-border-custom">
                <span className="text-foreground-secondary block mb-1">02 / PACKAGING</span>
                <span>SYSTEMS THAT SCALE</span>
              </div>
              <div className="p-4 bg-surface-card border border-border-custom">
                <span className="text-foreground-secondary block mb-1">03 / WEBSITES</span>
                <span>INTUITIVE KINETIC UI</span>
              </div>
            </div>
          </div>
        </div>

        {/* PHASE 03: THE PROCESS */}
        <div id="story-chap-process" className="story-phase-block grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-8">
          <div className="lg:col-span-4 space-y-3 font-mono">
            <span className="px-3 py-1 bg-foreground text-background font-bold text-xs uppercase tracking-widest inline-block">
              PHASE 03 // THE PROMISE
            </span>
            <div className="text-xs text-foreground-secondary font-bold uppercase tracking-wider">
              STRATEGIC REFINEMENT
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-foreground tracking-tight leading-tight">
              &ldquo;Strategic thinking, clean execution, endless refinement.&rdquo;
            </h2>

            <p className="text-foreground-secondary font-sans text-base sm:text-xl md:text-2xl leading-relaxed uppercase font-medium pl-6 border-l-4 border-foreground">
              Every project follows one process — strategic thinking, clean execution, endless refinement. The result: brands people get, remember, and trust from first glance.
            </p>

            {/* Bottom Summary Callout */}
            <div className="p-8 bg-surface-card border border-border-custom shadow-2xl space-y-4 mt-8">
              <span className="font-mono text-xs font-bold text-foreground tracking-widest uppercase block">
                THE LOOMIE GUARANTEE
              </span>
              <p className="text-foreground font-sans text-xl sm:text-2xl font-extrabold uppercase leading-snug">
                Brands people get, remember, and trust from first glance.
              </p>
              <div className="pt-2 flex items-center justify-between font-mono text-xs font-bold text-foreground">
                <span>CLEAR. CONNECTED. COMPLETE.</span>
                <ArrowUpRight className="w-5 h-5 text-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
