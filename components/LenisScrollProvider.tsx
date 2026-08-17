"use client";

import React, { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * UNCOMPROMISED SCROLL MOTION & GPU OPTIMIZATION ENGINE
 * - Lenis duration: 0.95 for snappy, ultra-responsive fluid inertia
 * - Custom exponential deceleration easing curve
 * - wheelMultiplier: 1.15 for faster, punchier wheel scroll response
 * - Unified GSAP Ticker & lenis.raf(time * 1000) execution
 * - Complete lag smoothing override (gsap.ticker.lagSmoothing(0))
 */
export function LenisScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // 1. Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis Engine with Fluid, Weightless Smooth Scroll Parameters
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // 3. Synchronize Lenis scroll updates with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 4. Drive Lenis inside single unified GSAP Ticker RAF Loop
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    // 5. Disable GSAP lag smoothing completely to prevent micro-pauses or frame drops
    gsap.ticker.lagSmoothing(0);

    // 6. ScrollTrigger refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  // Reset scroll to top on route navigation
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    }
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
