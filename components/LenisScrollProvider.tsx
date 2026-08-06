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

export function LenisScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  // Force Lenis and native window scroll to top on every route change
  useEffect(() => {
    const scrollToTopNow = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    scrollToTopNow();
    const timer = setTimeout(scrollToTopNow, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      <div className="min-h-screen flex flex-col">{children}</div>
    </LenisContext.Provider>
  );
}
