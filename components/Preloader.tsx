"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LoomieLogoMark } from "./LoomieLogoMark";

const PHRASES = [
  "CLEAR. CONNECTED. COMPLETE.",
  "DECODING SPATIAL CONCEPTS",
  "SYNCHRONIZING BRAND IDENTITY",
  "LOOMIE STUDIO © 2026",
];

interface PreloaderProps {
  onComplete?: () => void;
  variant?: "full" | "brief";
  pageTitle?: string;
}

export function Preloader({
  onComplete,
  variant = "full",
  pageTitle = "WHO WE BUILD FOR",
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(PHRASES[0]);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  const isBrief = variant === "brief";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Text Scramble / Phrase cycling for full mode
    let phraseIndex = 0;
    const interval = !isBrief
      ? setInterval(() => {
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        setCurrentPhrase(PHRASES[phraseIndex]);
      }, 450)
      : null;

    const ctx = gsap.context(() => {
      const animDuration = isBrief ? 0.6 : 2.1;

      const tl = gsap.timeline({
        onComplete: () => {
          if (interval) clearInterval(interval);
          triggerExitSequence();
        },
      });

      // 1. Kinetic Staggered Letter Entrance
      if (lettersRef.current) {
        gsap.fromTo(
          lettersRef.current.children,
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: isBrief ? 0.4 : 1.1,
            stagger: isBrief ? 0.03 : 0.08,
            ease: "power4.out",
          }
        );
      }

      // 2. Smooth Counter Animation from 0 to 100
      const counterVal = { current: 0 };
      tl.to(counterVal, {
        current: 100,
        duration: animDuration,
        ease: isBrief ? "power2.out" : "power3.inOut",
        onUpdate: () => {
          const val = Math.floor(counterVal.current);
          setProgress(val);
        },
      });
    }, containerRef);

    const triggerExitSequence = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          document.body.style.overflow = "auto";
          if (onComplete) onComplete();
        },
      });

      if (isBrief) {
        // Swift 0.4s exit for subpages
        exitTl.to(containerRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: "power4.inOut",
        });
      } else {
        // Full editorial exit for Homepage
        exitTl
          .to([lettersRef.current, counterRef.current, lineRef.current], {
            y: -40,
            opacity: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: "power3.in",
          })
          .to(
            svgPathRef.current,
            {
              attr: { d: "M 0 0 Q 50 120 100 0 L 100 100 L 0 100 Z" },
              duration: 0.4,
              ease: "power2.in",
            },
            "-=0.2"
          )
          .to(
            containerRef.current,
            {
              yPercent: -100,
              duration: 0.85,
              ease: "power4.inOut",
            },
            "-=0.2"
          );
      }
    };

    return () => {
      if (interval) clearInterval(interval);
      document.body.style.overflow = "auto";
      ctx.revert();
    };
  }, [onComplete, isBrief]);

  if (!isLoading) return null;

  // Render distinct brief LOOMIE Logo Fill Loader for subpages
  if (isBrief) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 z-[999999] bg-background text-foreground flex flex-col justify-between p-8 sm:p-14 select-none overflow-hidden"
      >
        {/* Top Header Tag */}
        <div className="flex items-center justify-between w-full max-w-[1700px] mx-auto text-xs font-mono tracking-widest text-foreground-secondary border-b border-border-custom/60 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-none bg-foreground animate-pulse" />
            <span className="font-bold text-foreground uppercase">LOOMIE // {pageTitle}</span>
          </div>
          <span className="text-foreground font-mono font-bold text-xs uppercase">[ {progress}% ]</span>
        </div>

        {/* Center LOOMIE Logo Fill Area */}
        <div className="flex flex-col items-center justify-center max-w-[1700px] w-full mx-auto my-auto py-12 relative">
          <div className="relative inline-block">
            {/* Base Layer: Dimmed Outlined LOOMIE Logo */}
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase font-sans text-foreground/20 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 leading-none">
              <span className="inline-block">L</span>
              <span className="inline-flex items-center justify-center px-1 sm:px-2">
                <LoomieLogoMark className="h-[0.7em] w-auto inline-block text-foreground/20" />
              </span>
              <span className="inline-block">M</span>
              <span className="inline-block">I</span>
              <span className="inline-block">E</span>
            </h2>

            {/* Top Filling Layer: Solid LOOMIE Logo clipped from bottom to top based on progress */}
            <h2
              className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase font-sans text-foreground flex items-center justify-center gap-2 sm:gap-4 md:gap-6 leading-none absolute inset-0 transition-all duration-75 ease-out"
              style={{
                clipPath: `inset(${100 - progress}% 0 0 0)`,
              }}
            >
              <span className="inline-block">L</span>
              <span className="inline-flex items-center justify-center px-1 sm:px-2">
                <LoomieLogoMark className="h-[0.7em] w-auto inline-block text-foreground drop-shadow-xl" />
              </span>
              <span className="inline-block">M</span>
              <span className="inline-block">I</span>
              <span className="inline-block">E</span>
            </h2>
          </div>

          <span className="font-mono text-xs text-foreground-secondary tracking-[0.3em] uppercase mt-6 block">
            CLEAR. CONNECTED. COMPLETE.
          </span>
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="flex items-center justify-between mb-2 font-mono text-xs text-foreground-secondary tracking-widest">
            <span>SYNCHRONIZING</span>
            <span className="text-foreground font-bold">{progress === 100 ? "COMPLETE" : "LOADING"}</span>
          </div>
          <div className="w-full h-1 bg-surface-card overflow-hidden relative border border-border-custom">
            <div
              className="h-full bg-foreground transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Full Homepage Preloader
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-background text-foreground flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none overflow-hidden"
    >
      {/* Top Editorial Telemetry Header */}
      <div className="flex items-center justify-between w-full max-w-[1700px] mx-auto text-xs font-mono tracking-widest text-foreground-secondary border-b border-border-custom/60 pb-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-foreground animate-pulse" />
          <span className="font-bold text-foreground uppercase">LOOMIE // KINETIC INTRO</span>
        </div>
        <div className="hidden sm:flex items-center gap-8 text-foreground-secondary">
          <span>LAT: 35.6762° N / LON: 139.6503° E</span>
          <span>FPS: 60</span>
        </div>
      </div>

      {/* Center Monumental Animated LOOMIE Typography */}
      <div className="flex flex-col items-center justify-center max-w-[1700px] w-full mx-auto my-auto py-12">
        <h1
          ref={lettersRef}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-black tracking-tighter uppercase font-sans text-foreground flex items-center justify-center gap-2 sm:gap-4 md:gap-6 leading-none"
          style={{ perspective: "1000px" }}
        >
          <span className="inline-block">L</span>
          <span className="inline-flex items-center justify-center px-1 sm:px-2">
            <LoomieLogoMark className="h-[0.7em] w-auto inline-block text-foreground drop-shadow-2xl" />
          </span>
          <span className="inline-block">M</span>
          <span className="inline-block">I</span>
          <span className="inline-block">E</span>
        </h1>

        {/* Dynamic Micro Status Ticker */}
        <div className="mt-8 overflow-hidden h-7">
          <p className="font-mono text-xs sm:text-sm text-foreground-secondary tracking-[0.25em] uppercase text-center transition-all duration-300">
            {currentPhrase}
          </p>
        </div>
      </div>

      {/* Bottom Progress Counter & Brutalist Line */}
      <div ref={lineRef} className="w-full max-w-[1700px] mx-auto">
        <div className="flex items-end justify-between mb-4 font-mono">
          <div className="flex items-center gap-3 text-xs text-foreground-secondary tracking-widest uppercase">
            <span>PROGRESS</span>
            <span className="text-foreground font-bold">[ {progress === 100 ? "COMPLETE" : "LOADING"} ]</span>
          </div>
          <div
            ref={counterRef}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter font-mono text-foreground leading-none"
          >
            {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}
          </div>
        </div>

        {/* High Precision Progress Track */}
        <div className="w-full h-1.5 bg-surface-card overflow-hidden relative border border-border-custom">
          <div
            className="h-full bg-foreground transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* SVG Liquid Curve Bottom Attachment for Fluid Exit */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none fill-background transform translate-y-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={svgPathRef}
          d="M 0 0 Q 50 0 100 0 L 100 100 L 0 100 Z"
        />
      </svg>
    </div>
  );
}
