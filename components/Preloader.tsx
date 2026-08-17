"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
  variant?: "full" | "brief";
  pageTitle?: string;
}

const PRELOADER_KEYWORDS = [
  "CREATIVE DIRECTION",
  "LOGOS & VISUAL MARKS",
  "BRAND IDENTITIES",
  "UI/UX ARCHITECTURE",
  "WEBSITES & WEB DEVELOPMENT",
  "DESIGN THAT CONNECTS",
  "LOOMIE KINETIC STUDIO",
];

/**
 * Animated Winking Double-Eye Logo Mark for Preloader
 */
function WinkingPreloaderEyeLogo({ progress }: { progress: number }) {
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const rightEyeGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Pupil Scan Motion based on Progress
    if (leftPupilRef.current && rightPupilRef.current) {
      if (progress < 25) {
        const offsetX = (progress / 25) * 3 - 3;
        gsap.to([leftPupilRef.current, rightPupilRef.current], {
          x: offsetX,
          y: -0.5,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (progress >= 25 && progress < 55) {
        const offsetX = ((progress - 25) / 30) * 6 - 3;
        gsap.to([leftPupilRef.current, rightPupilRef.current], {
          x: offsetX,
          y: 0.5,
          duration: 0.15,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      } else if (progress >= 55 && progress < 85) {
        gsap.to([leftPupilRef.current, rightPupilRef.current], {
          x: 0,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to([leftPupilRef.current, rightPupilRef.current], {
          x: 0,
          y: 0,
          scale: 1.25,
          transformOrigin: "center",
          duration: 0.25,
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
      }
    }

    // Wink Animation (50% - 70%)
    if (rightEyeGroupRef.current) {
      if (progress >= 50 && progress <= 70) {
        gsap.to(rightEyeGroupRef.current, {
          scaleY: 0.08,
          transformOrigin: "48px 18px",
          duration: 0.18,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      } else {
        gsap.to(rightEyeGroupRef.current, {
          scaleY: 1.0,
          transformOrigin: "48px 18px",
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    }
  }, [progress]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        viewBox="0 0 70 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[0.75em] w-auto inline-block text-[#0E0E0E] overflow-visible drop-shadow-md"
      >
        <rect
          x="1"
          y="1"
          width="68"
          height="34"
          rx="17"
          className="fill-[#F5F3EF] stroke-[#0E0E0E]"
          strokeWidth="3"
        />
        <circle cx="22" cy="18" r="9" className="fill-[#0E0E0E]" />
        <circle
          ref={leftPupilRef}
          cx="22"
          cy="18"
          r="4.5"
          className="fill-[#F5F3EF]"
        />
        <g ref={rightEyeGroupRef}>
          <circle cx="48" cy="18" r="9" className="fill-[#0E0E0E]" />
          <circle
            ref={rightPupilRef}
            cx="48"
            cy="18"
            r="4.5"
            className="fill-[#F5F3EF]"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * Animated Light Studio Preloader featuring LOOMIE 3D Kinetic Logo & Color Aura Animations
 * - Light studio substrate background (#F5F3EF) with morphing ambient color auras (Amber -> Coral -> Violet -> Emerald)
 * - 3.2s extended duration with 7 cycling studio keywords
 * - 3D kinetic letter flips for L [WINKING_EYE] M I E
 * - Slide-Left Exit Animation (xPercent: -100)
 */
export function Preloader({
  onComplete,
  variant = "full",
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const letterLRef = useRef<HTMLSpanElement>(null);
  const eyeLogoRef = useRef<HTMLSpanElement>(null);
  const letterMRef = useRef<HTMLSpanElement>(null);
  const letterIRef = useRef<HTMLSpanElement>(null);
  const letterERef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  const isBrief = variant === "brief";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Extended duration (3.2s) so user can enjoy the animations!
    const animDuration = isBrief ? 0.6 : 3.2;
    const counterVal = { current: 0 };

    const ctx = gsap.context(() => {
      // 3D Kinetic Letter Entrance
      if (!isBrief) {
        if (letterLRef.current) {
          gsap.fromTo(
            letterLRef.current,
            { rotateY: -80, x: -60, opacity: 0 },
            { rotateY: 0, x: 0, opacity: 1, duration: 0.7, ease: "power4.out" }
          );
        }
        if (eyeLogoRef.current) {
          gsap.fromTo(
            eyeLogoRef.current,
            { scale: 0.3, opacity: 0, y: -40 },
            { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.1 }
          );
        }
        const rightLetters = [letterMRef.current, letterIRef.current, letterERef.current].filter(Boolean);
        if (rightLetters.length > 0) {
          gsap.fromTo(
            rightLetters,
            { rotateY: 80, x: 60, opacity: 0 },
            { rotateY: 0, x: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power4.out", delay: 0.2 }
          );
        }
      }

      // Master Timeline
      const mainTl = gsap.timeline({
        onComplete: () => {
          triggerExit();
        },
      });

      mainTl.to(counterVal, {
        current: 100,
        duration: animDuration,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.floor(counterVal.current);
          setProgress(val);

          const kwIdx = Math.min(
            PRELOADER_KEYWORDS.length - 1,
            Math.floor((val / 100) * PRELOADER_KEYWORDS.length)
          );
          setKeywordIndex(kwIdx);
        },
      });

      const triggerExit = () => {
        const exitTl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
            if (onComplete) onComplete();
          },
        });

        // Slide Left Exit Animation
        exitTl.to(containerRef.current, {
          xPercent: -100,
          duration: 0.75,
          ease: "power4.inOut",
        });
      };
    }, containerRef);

    return () => ctx.revert();
  }, [isBrief, onComplete]);

  // Keyword transition animation
  useEffect(() => {
    if (!wordRef.current) return;
    gsap.fromTo(
      wordRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
    );
  }, [keywordIndex]);

  // Dynamic Background Morphing Color Gradient (Amber -> Coral -> Violet -> Emerald)
  const getGlowStyle = () => {
    if (progress < 25) {
      return "radial-gradient(circle at 50% 50%, rgba(245, 195, 140, 0.5) 0%, rgba(245, 243, 239, 1) 75%)";
    }
    if (progress < 50) {
      return "radial-gradient(circle at 50% 50%, rgba(255, 180, 190, 0.5) 0%, rgba(245, 243, 239, 1) 75%)";
    }
    if (progress < 75) {
      return "radial-gradient(circle at 50% 50%, rgba(215, 195, 255, 0.5) 0%, rgba(245, 243, 239, 1) 75%)";
    }
    return "radial-gradient(circle at 50% 50%, rgba(185, 245, 215, 0.5) 0%, rgba(245, 243, 239, 1) 75%)";
  };

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-[#F5F3EF] text-[#0E0E0E] flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none overflow-hidden transform-gpu"
      style={{ perspective: "1200px" }}
    >
      {/* Animated Dynamic Color Aura Gradient Background */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{ background: getGlowStyle() }}
      />

      {/* Top Bar: Subpage / Studio Tag */}
      <div className="flex items-center justify-between w-full max-w-[1800px] mx-auto font-mono text-xs text-[#0E0E0E]/70 border-b border-[#0E0E0E]/15 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0E0E0E] animate-pulse" />
          <span className="font-bold text-[#0E0E0E] tracking-widest uppercase">
            LOOMIE CREATIVE DIRECTIVE
          </span>
        </div>

        <div className="flex items-center gap-4 font-bold uppercase tracking-widest text-[#0E0E0E]">
          <span>CONNECTED BRAND SYSTEMS</span>
          <span>•</span>
          <span>EST. 2026</span>
        </div>
      </div>

      {/* Center Stage: Giant LOOMIE 3D Kinetic Logo + Flashing Studio Keywords */}
      <div className="flex flex-col items-center justify-center max-w-[1800px] w-full mx-auto my-auto py-8 relative z-10 text-center space-y-6">
        <h1 className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[13vw] font-black tracking-tighter uppercase font-sans text-[#0E0E0E] flex items-center justify-center gap-2 sm:gap-4 md:gap-6 leading-none select-none">
          <span ref={letterLRef} className="inline-block transform-gpu origin-left">
            L
          </span>

          <span ref={eyeLogoRef} className="inline-flex items-center justify-center px-1 sm:px-2 transform-gpu">
            <WinkingPreloaderEyeLogo progress={progress} />
          </span>

          <span ref={letterMRef} className="inline-block transform-gpu origin-right">
            M
          </span>
          <span ref={letterIRef} className="inline-block transform-gpu origin-right">
            I
          </span>
          <span ref={letterERef} className="inline-block transform-gpu origin-right">
            E
          </span>
        </h1>

        {/* Flashing Studio Keywords */}
        <div
          ref={wordRef}
          className="text-xl sm:text-3xl md:text-4xl font-light font-sans tracking-tight text-[#0E0E0E] uppercase min-h-[48px] flex items-center justify-center font-mono"
        >
          {PRELOADER_KEYWORDS[keywordIndex]}
        </div>
      </div>

      {/* Bottom Stage: Live Counter & Precision Progress Line */}
      <div className="w-full max-w-[1800px] mx-auto relative z-10 space-y-3">
        <div className="flex items-end justify-between font-mono border-b border-[#0E0E0E]/15 pb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0E0E0E]/70">
            LOADING EXPERIENCE
          </span>
          <span className="text-4xl sm:text-7xl font-black font-mono text-[#0E0E0E] leading-none">
            {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}%
          </span>
        </div>

        <div className="w-full h-1.5 bg-[#0E0E0E]/10 overflow-hidden relative border border-[#0E0E0E]/20">
          <div
            className="h-full bg-[#0E0E0E] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
