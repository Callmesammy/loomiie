"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { InteractiveEyeLogoMark } from "./InteractiveEyeLogoMark";

/**
 * Continuous Game-Physics Flying Kinetic Eye Logo Sprite
 * - Driven by a high-performance requestAnimationFrame scroll engine
 * - Guaranteed 100% continuous movement across the entire page (zero freezing on pinned sections)
 * - Dynamic 3D banking, pitching, and sine-wave flight trajectory from top to bottom footer
 */
export function FlyingGameLogoOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [isVisible, setIsVisible] = useState(false);

  const prevScrollYRef = useRef(0);
  const prevXRef = useRef(48);

  useEffect(() => {
    const sprite = spriteRef.current;
    if (!sprite) return;

    let rafId: number;

    const updatePosition = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Reveal flying sprite after leaving home base (scrollY > 50)
      if (scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Dynamic multi-harmonic sine wave trajectory (Active 100% of the page length)
      const waveX = Math.sin(progress * Math.PI * 7) * 34 + 48; // Oscillates between 14vw and 82vw
      const waveY = Math.cos(progress * Math.PI * 5) * 26 + 45; // Oscillates between 19vh and 71vh
      const waveScale = 0.52 + Math.sin(progress * Math.PI * 4) * 0.08;

      // Compute banking tilt angle based on horizontal & vertical velocity
      const scrollVelocity = scrollY - prevScrollYRef.current;
      const moveX = waveX - prevXRef.current;
      const tiltAngle = Math.max(
        -28,
        Math.min(28, moveX * 6 + scrollVelocity * 0.3)
      );

      prevScrollYRef.current = scrollY;
      prevXRef.current = waveX;

      // Dark Mode theme detection for pinned section
      if (scrollY > 2200 && scrollY < 5500) {
        setThemeMode("dark");
      } else {
        setThemeMode("light");
      }

      // Smooth GPU Accelerated Position & Rotation Update
      gsap.to(sprite, {
        x: `${waveX}vw`,
        y: `${waveY}vh`,
        scale: waveScale,
        rotate: tiltAngle,
        duration: 0.25,
        ease: "power1.out",
        overwrite: "auto",
      });

      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isDark = themeMode === "dark";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
    >
      <div
        ref={spriteRef}
        className={`fixed top-0 left-0 transition-opacity duration-300 transform-gpu ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          willChange: "transform, opacity",
          filter: isDark
            ? "drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))"
            : "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.25))",
        }}
      >
        <div className="relative p-2 rounded-full bg-[#0E0E0E]/10 backdrop-blur-md border border-[#0E0E0E]/20 shadow-xl flex items-center justify-center">
          <InteractiveEyeLogoMark
            enableScrollMorph={false}
            className="h-7 sm:h-9 w-auto"
            pillColor={isDark ? "fill-white" : "fill-[#0E0E0E]"}
            socketColor={isDark ? "fill-[#0D0D11]" : "fill-white"}
            pupilColor={isDark ? "fill-white" : "fill-[#0E0E0E]"}
          />
        </div>
      </div>
    </div>
  );
}
