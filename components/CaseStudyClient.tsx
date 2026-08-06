"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

interface ProjectDetail {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  client: string;
  year: string;
  services: string[];
  liveUrl: string;
  heroImage: string;
  challenge: string;
  solution: string;
  impact: string;
  gallery: string[];
  nextSlug: string;
  nextTitle: string;
}

export function CaseStudyClient({ project }: { project: ProjectDetail }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force Lenis + window scroll position to top (0,0) on case study mount
    const forceScrollTop = () => {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    forceScrollTop();
    const timer = setTimeout(forceScrollTop, 50);

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax Zoom for Case Study Hero Image
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current.querySelector("img"), {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // GSAP ScrollTrigger Animations for both UP and DOWN scrolling
      const animElements = document.querySelectorAll(".cs-anim-block");
      animElements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
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
  }, [project]);

  return (
    <div ref={containerRef} className="pt-28 pb-20 px-6 md:px-12 max-w-[1700px] mx-auto select-none">
      {/* Back Link */}
      <Link
        href="/#grid"
        className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground-secondary hover:text-foreground mb-10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO CREATIVE ARCHIVE</span>
      </Link>

      {/* Hero Title Block */}
      <div className="cs-anim-block pb-10 mb-14 border-b border-border-custom space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-foreground/10 border border-foreground/20 text-foreground text-xs font-mono font-bold uppercase tracking-widest">
          <span className="w-2 h-2 bg-foreground rounded-none animate-pulse" />
          <span>CASE STUDY // {project.category}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-foreground leading-[0.92]">
          {project.title}
        </h1>

        <p className="text-xl sm:text-2xl font-extrabold text-foreground uppercase tracking-wide max-w-4xl">
          &ldquo;{project.subtitle}&rdquo;
        </p>

        {/* Project Client Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border-custom/60 font-mono text-xs font-bold text-foreground uppercase">
          <div>
            <span className="text-foreground-secondary block mb-1">CLIENT</span>
            <span>{project.client}</span>
          </div>
          <div>
            <span className="text-foreground-secondary block mb-1">YEAR</span>
            <span>{project.year}</span>
          </div>
          <div>
            <span className="text-foreground-secondary block mb-1">SERVICES</span>
            <span>{project.services.join(" • ")}</span>
          </div>
          <div>
            <span className="text-foreground-secondary block mb-1">LIVE URL</span>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:underline"
            >
              <span>LAUNCH SITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Full-Bleed 4K Hero Showcase Frame */}
      <div
        ref={heroImageRef}
        className="cs-anim-block w-full h-[420px] sm:h-[580px] md:h-[680px] relative overflow-hidden rounded-none border border-border-custom shadow-2xl mb-20 group"
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          priority
          quality={95}
          sizes="(max-width: 1700px) 100vw, 1700px"
          className="object-cover transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-white font-bold uppercase tracking-widest">
          <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/20">
            OFFICIAL CASE STUDY // {project.slug.toUpperCase()}
          </span>
          <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/20 hidden sm:inline-block">
            LOOMIE STUDIO SPECIFICATION
          </span>
        </div>
      </div>

      {/* Strategic Narrative Grid (Challenge, Solution, Impact) */}
      <div className="cs-anim-block grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 pb-16 border-b border-border-custom">
        {/* Challenge */}
        <div className="lg:col-span-4 bg-surface-card border border-border-custom p-8 sm:p-10 space-y-4 shadow-xl">
          <span className="px-3 py-1 bg-foreground text-background font-mono text-xs font-bold tracking-widest uppercase inline-block">
            01 // THE CHALLENGE
          </span>
          <h3 className="text-2xl font-black uppercase text-foreground">THE PROBLEM</h3>
          <p className="text-foreground-secondary font-sans text-sm sm:text-base leading-relaxed uppercase font-medium">
            {project.challenge}
          </p>
        </div>

        {/* Solution */}
        <div className="lg:col-span-4 bg-surface-card border border-border-custom p-8 sm:p-10 space-y-4 shadow-xl">
          <span className="px-3 py-1 bg-foreground text-background font-mono text-xs font-bold tracking-widest uppercase inline-block">
            02 // THE STRATEGY
          </span>
          <h3 className="text-2xl font-black uppercase text-foreground">THE SOLUTION</h3>
          <p className="text-foreground-secondary font-sans text-sm sm:text-base leading-relaxed uppercase font-medium">
            {project.solution}
          </p>
        </div>

        {/* Impact */}
        <div className="lg:col-span-4 bg-surface-card border border-border-custom p-8 sm:p-10 space-y-4 shadow-xl">
          <span className="px-3 py-1 bg-foreground text-background font-mono text-xs font-bold tracking-widest uppercase inline-block">
            03 // THE RESULTS
          </span>
          <h3 className="text-2xl font-black uppercase text-foreground">THE IMPACT</h3>
          <p className="text-foreground-secondary font-sans text-sm sm:text-base leading-relaxed uppercase font-medium">
            {project.impact}
          </p>
        </div>
      </div>

      {/* Visual Gallery Showcase Grid */}
      <div className="cs-anim-block mb-24 space-y-8">
        <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-foreground pb-4 border-b border-border-custom">
          <span>SPECIFICATION 02 // VISUAL ASSET SHOWCASE</span>
          <span>4K RESOLUTION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.gallery.map((imgUrl, gIdx) => (
            <div
              key={gIdx}
              className="w-full h-[320px] sm:h-[420px] relative overflow-hidden rounded-none border border-border-custom shadow-xl group cursor-pointer"
            >
              <Image
                src={imgUrl}
                alt={`${project.title} Visual Asset ${gIdx + 1}`}
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/20 font-mono text-xs text-white uppercase font-bold">
                PLATE 0{gIdx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Case Study Navigation Footer Link */}
      <div className="cs-anim-block pt-12 border-t border-border-custom flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs font-bold text-foreground-secondary uppercase tracking-widest block mb-2">
            NEXT CASE STUDY →
          </span>
          <Link
            href={`/work/${project.nextSlug}`}
            className="text-3xl sm:text-5xl font-black uppercase text-foreground hover:underline tracking-tight"
          >
            {project.nextTitle}
          </Link>
        </div>

        <Link
          href={`/work/${project.nextSlug}`}
          className="inline-flex items-center gap-3 px-8 py-5 rounded-none bg-foreground text-background font-bold font-mono text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all border border-foreground"
        >
          <span>NEXT PROJECT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
