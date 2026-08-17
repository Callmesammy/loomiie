"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Layers } from "lucide-react";

interface AkaruCinematicExpandingImageProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  alt?: string;
}

/**
 * Akaru Cinematic Expanding & Reframing Image Transition Component
 * Recreates the iconic agency scroll interaction:
 * - START: Contained rounded hero card (60vw width, 55vh height, 24px rounded corners)
 * - SCROLLING: Container smoothly expands to 100vw x 100vh full-bleed, border-radius morphs to 0px
 * - CAMERA PUSH-IN: Inner image counter-scales from 1.3 -> 1.0 creating a camera reframing push-in
 * - REVERSIBLE: 100% smooth scrub driven GSAP ScrollTrigger pinned timeline
 */
export function AkaruCinematicExpandingImage({
  badge = "LOOMIE STUDIO // ABOUT US",
  title = "RESULT DRIVEN KINETIC DESIGN",
  subtitle = "SCROLL TO EXPAND DISCOVERY",
  image = "/images/about/brand-architecture.jpg",
  alt = "LOOMIE Studio Brand & Systems Architecture",
}: AkaruCinematicExpandingImageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const innerImageRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLDivElement>(null);
  const badgeOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const cardWrapper = cardWrapperRef.current;
    const innerImage = innerImageRef.current;
    const titleText = titleTextRef.current;
    const badgeOverlay = badgeOverlayRef.current;

    if (!section || !cardWrapper || !innerImage) return;

    const ctx = gsap.context(() => {
      // Master Pinned Cinematic Expansion Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: "+=1200px",
          invalidateOnRefresh: true,
        },
      });

      // 1. Container Expansion: 60vw -> 100vw width, 55vh -> 100vh height, 24px -> 0px borderRadius
      tl.fromTo(
        cardWrapper,
        {
          width: "65vw",
          height: "58vh",
          borderRadius: "24px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        },
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)",
          ease: "power2.inOut",
        },
        0
      );

      // 2. Camera Reframing Push-In: Inner Image Counter-Scales (1.3 -> 1.0)
      tl.fromTo(
        innerImage,
        {
          scale: 1.3,
          yPercent: -6,
        },
        {
          scale: 1.0,
          yPercent: 0,
          ease: "power2.inOut",
        },
        0
      );

      // 3. Title Text Morphing & Fade Out
      if (titleText) {
        tl.fromTo(
          titleText,
          { opacity: 1, scale: 1.0, y: 0 },
          { opacity: 0, scale: 0.9, y: -50, ease: "power2.in" },
          0.15
        );
      }

      // 4. Badge Overlay Fade
      if (badgeOverlay) {
        tl.fromTo(
          badgeOverlay,
          { opacity: 1, y: 0 },
          { opacity: 0.5, y: 15, ease: "power2.out" },
          0.5
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F5F3EF] text-[#0E0E0E] flex items-center justify-center overflow-hidden select-none gpu-layer z-20"
    >
      {/* Main Cinematic Expanding Container */}
      <div
        ref={cardWrapperRef}
        className="relative overflow-hidden border border-stone-300 origin-center gpu-layer shadow-2xl z-10 flex items-center justify-center"
        style={{
          width: "65vw",
          height: "58vh",
          borderRadius: "24px",
        }}
      >
        {/* Inner High-Resolution Image Container */}
        <div ref={innerImageRef} className="absolute inset-0 w-full h-full gpu-layer">
          <Image
            src={image}
            alt={alt}
            fill
            priority
            quality={98}
            sizes="100vw"
            className="object-cover rounded-none gpu-layer"
          />
          {/* Dark Gradient Overlay for Typography Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/40" />
        </div>

        {/* START STATE: Centered Title Overlay */}
        <div
          ref={titleTextRef}
          className="absolute z-20 text-center px-6 space-y-4 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/80 backdrop-blur-md rounded-full border border-white/20 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-xl">
            <Layers className="w-4 h-4 text-white" />
            <span>{badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight font-sans text-white uppercase leading-none drop-shadow-2xl max-w-4xl mx-auto">
            {title}
          </h1>

          <div className="flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white/90 pt-2">
            <span>{subtitle}</span>
            <ArrowDown className="w-4 h-4 text-white animate-bounce" />
          </div>
        </div>

        {/* END STATE: Full-Bleed Telemetry Badge */}
        <div
          ref={badgeOverlayRef}
          className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-white/90 pointer-events-none border-t border-white/20 pt-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>LOOMIE STUDIO © 2026 // CONNECTED SYSTEMS</span>
          </div>
          <span>STUDIO TEAM & THREE.JS 3D CANVAS ↓</span>
        </div>
      </div>
    </section>
  );
}
