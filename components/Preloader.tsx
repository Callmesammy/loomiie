"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LoomieLogoMark } from "./LoomieLogoMark";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if preloader has already run in current session
    const hasLoaded = sessionStorage.getItem("loomie_preloaded");

    if (hasLoaded) {
      setLoading(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("loomie_preloaded", "true");
        setLoading(false);
        document.body.style.overflow = "auto";
      },
    });

    const obj = { value: 0 };

    tl.to(obj, {
      value: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.floor(obj.value)}%`;
        }
      },
    })
      .to(".preloader-logo-mark", {
        scale: 1.15,
        duration: 0.4,
        ease: "back.out(2)",
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-background text-foreground flex flex-col justify-between p-8 sm:p-14 select-none font-mono border-b border-foreground"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-foreground border-b border-border-custom pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-foreground rounded-none animate-pulse" />
          <span>LOOMIE STUDIO ENGINE // 2026</span>
        </div>
        <span>CLEAR. CONNECTED. COMPLETE.</span>
      </div>

      {/* Center Hero Logo & Counter */}
      <div className="my-auto flex flex-col items-center justify-center space-y-8 text-center">
        <div className="preloader-logo-mark">
          <LoomieLogoMark className="w-28 sm:w-36 h-14 sm:h-18" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-sans uppercase tracking-tighter text-foreground">
          LOOMIE
        </h1>

        <div className="space-y-2">
          <span
            ref={counterRef}
            className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground block font-mono"
          >
            0%
          </span>
          <span className="text-xs text-foreground-secondary font-bold uppercase tracking-widest block">
            [ INITIALIZING KINETIC SYSTEMS ]
          </span>
        </div>
      </div>

      {/* Bottom Footer Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest text-foreground-secondary border-t border-border-custom pt-6">
        <span>BRAND IDENTITY & WEBGL ARCHITECTURE</span>
        <span>STATUS: LOADING ASSETS</span>
      </div>
    </div>
  );
}
