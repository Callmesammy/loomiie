"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface DiaTextRevealProps {
  text: string;
  colors?: string[];
  className?: string;
  delay?: number;
}

export function DiaTextReveal({
  text,
  colors = ["#22d3ee", "#818cf8", "#f472b6", "#34d399", "#E62B00"],
  className,
  delay = 0,
}: DiaTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const validChars = charRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      // Character-by-character kinetic entrance & stagger reveal
      gsap.fromTo(
        validChars,
        { opacity: 0.1, y: 35, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.03,
          duration: 0.8,
          delay,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Continuous multi-color spectrum wave shimmer loop
      validChars.forEach((char, i) => {
        if (!char) return;
        const startColor = colors[i % colors.length];
        const nextColor = colors[(i + 2) % colors.length];

        gsap.fromTo(
          char,
          { color: startColor },
          {
            color: nextColor,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: (i % colors.length) * 0.18,
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [text, colors, delay]);

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-wrap items-center leading-tight select-none", className)}
    >
      {text.split("").map((char, idx) => (
        <span
          key={idx}
          ref={(el) => {
            charRefs.current[idx] = el;
          }}
          className="inline-block transition-transform duration-300 hover:scale-110 will-change-transform gpu-layer"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
