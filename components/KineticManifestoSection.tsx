"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SWITCHING_WORDS = [
  "FILM",
  "DESIGN",
  "CODE",
  "SPATIAL",
  "FUTURE",
  "CULTURE",
  "BRAND",
  "SYSTEMS",
  "LOOMIE",
];

const DIA_PALETTE = ["#22d3ee", "#818cf8", "#f472b6", "#34d399", "#E62B00"];

interface DiaTextLineProps {
  text: string;
  className?: string;
  colorOffset?: number;
}

function DiaTextLine({ text, className = "", colorOffset = 0 }: DiaTextLineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const chars = charRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      // 1. Initial character entrance & stagger reveal
      gsap.fromTo(
        chars,
        { opacity: 0.15, y: 30, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.03,
          duration: 0.7,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Dia Kinetic Multi-Color Shimmer Wave Animation
      chars.forEach((char, i) => {
        if (!char) return;
        const colorIdx = (i + colorOffset) % DIA_PALETTE.length;
        const nextColorIdx = (colorIdx + 2) % DIA_PALETTE.length;

        gsap.to(char, {
          color: DIA_PALETTE[nextColorIdx],
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: (i % 5) * 0.18,
        });
      });
    }, container);

    return () => ctx.revert();
  }, [text, colorOffset]);

  return (
    <h2 ref={containerRef} className={`flex flex-wrap items-center ${className}`}>
      {text.split("").map((char, idx) => (
        <span
          key={idx}
          ref={(el) => {
            charRefs.current[idx] = el;
          }}
          style={{ color: DIA_PALETTE[(idx + colorOffset) % DIA_PALETTE.length] }}
          className="inline-block transition-transform duration-300 hover:scale-110 will-change-transform gpu-layer"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  );
}

export function KineticManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordContainerRef = useRef<HTMLDivElement>(null);
  const wordCharRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [wordIndex, setWordIndex] = useState<number>(0);

  // Switching word loop with Dia 3D Kinetic Flip
  useEffect(() => {
    const interval = setInterval(() => {
      const chars = wordCharRefs.current.filter(Boolean);
      if (!chars.length) return;

      gsap.to(chars, {
        rotateX: -90,
        opacity: 0,
        stagger: 0.03,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setWordIndex((prev) => (prev + 1) % SWITCHING_WORDS.length);
        },
      });
    }, 1900);

    return () => clearInterval(interval);
  }, []);

  // Flip in new word when index updates
  useEffect(() => {
    const chars = wordCharRefs.current.filter(Boolean);
    if (!chars.length) return;

    gsap.fromTo(
      chars,
      { rotateX: 90, opacity: 0 },
      {
        rotateX: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.4,
        ease: "back.out(1.4)",
      }
    );
  }, [wordIndex]);

  const currentWord = SWITCHING_WORDS[wordIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white text-stone-950 py-10 px-6 sm:px-12 md:px-16 overflow-hidden select-none border-t border-b border-stone-200 flex flex-col justify-center items-center"
    >
      <div className="max-w-[1550px] mx-auto w-full flex flex-col space-y-1 sm:space-y-2 justify-center items-start py-6">
        {/* Line 1: WE ARE */}
        <div className="w-full py-0.5">
          <DiaTextLine
            text="WE ARE"
            colorOffset={0}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.2rem] font-black font-sans tracking-tight leading-[0.88] uppercase"
          />
        </div>

        {/* Line 2: MULTIDISCIPLINARY */}
        <div className="w-full py-0.5">
          <DiaTextLine
            text="MULTIDISCIPLINARY"
            colorOffset={2}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.4rem] xl:text-[6.4rem] font-black font-sans tracking-tight leading-[0.88] uppercase"
          />
        </div>

        {/* Line 3: WE SPEAK */}
        <div className="w-full py-0.5">
          <DiaTextLine
            text="WE SPEAK"
            colorOffset={4}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.2rem] font-black font-sans tracking-tight leading-[0.88] uppercase"
          />
        </div>

        {/* Line 4: Dia Kinetic Switching Word (FILM / DESIGN / CODE / SPATIAL / FUTURE / CULTURE / LOOMIE) */}
        <div className="w-full py-0.5">
          <div
            ref={wordContainerRef}
            className="perspective-1000 flex flex-wrap items-center text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.2rem] font-black font-sans tracking-tight leading-[0.88] uppercase"
          >
            {currentWord.split("").map((char, idx) => (
              <span
                key={`${currentWord}-${idx}`}
                ref={(el) => {
                  wordCharRefs.current[idx] = el;
                }}
                style={{ color: DIA_PALETTE[(idx + 1) % DIA_PALETTE.length] }}
                className="inline-block origin-center will-change-transform gpu-layer"
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
