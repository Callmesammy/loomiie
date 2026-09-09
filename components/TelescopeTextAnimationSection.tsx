"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LoomieLogoMark } from "./LoomieLogoMark";

interface TelescopeTitleItem {
  id: string;
  text: string;
  bgColor: string;
  textColor: string;
  subTagline?: string;
}

const TELESCOPE_TITLES: TelescopeTitleItem[] = [
  {
    id: "tel-1",
    text: "DESIGN THAT CONNECTS",
    bgColor: "#f75828", // Loomie Electric Orange
    textColor: "#141414",
    subTagline: "KINETIC INTENTION",
  },
  {
    id: "tel-2",
    text: "ARCHITECTURE THAT SCALES",
    bgColor: "#141414", // Obsidian Dark
    textColor: "#f1f1f1",
    subTagline: "CLOUD & SYSTEM MASTERY",
  },
  {
    id: "tel-3",
    text: "EXPERIENCES THAT INSPIRE",
    bgColor: "#282828", // Dark Surface Warm Charcoal
    textColor: "#f75828",
    subTagline: "ELEVATED DIGITAL SPACES",
  },
];

export function TelescopeTextAnimationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const charRefs = useRef<(HTMLSpanElement | null)[][]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      TELESCOPE_TITLES.forEach((item, index) => {
        const titleEl = titleRefs.current[index];
        const containerEl = containerRefs.current[index];
        const chars = charRefs.current[index]?.filter(Boolean) || [];

        if (!titleEl || !containerEl || chars.length === 0) return;

        const initialX = index % 2 === 1 ? -100 : 100;
        const charCount = chars.length;

        // Set initial positions
        gsap.set(containerEl, { x: `${initialX}%` });
        chars.forEach((charEl, i) => {
          const initialY = i % 2 === 0 ? -150 : 150;
          gsap.set(charEl, { y: initialY });
        });

        // ScrollTrigger Scrub Animation
        ScrollTrigger.create({
          trigger: titleEl,
          start: "top 90%",
          end: "bottom center",
          scrub: 0.6,
          onUpdate: (self) => {
            // Container Slide X
            const containerX = initialX - self.progress * initialX;
            gsap.set(containerEl, { x: `${containerX}%` });

            // Character Telescoping Y Assembly
            chars.forEach((charEl, i) => {
              const charStaggerIndex = index === 1 ? charCount - 1 - i : i;
              const charStartDelay = 0.1;
              const charTimelineSpan = 1 - charStartDelay;
              const staggerFactor = Math.min(0.75, charTimelineSpan * 0.75);

              const delay = charStartDelay + (charStaggerIndex / charCount) * staggerFactor;
              const duration = Math.max(0.01, charTimelineSpan - (staggerFactor * (charCount - 1)) / charCount);

              let charProgress = 0;
              if (self.progress >= delay) {
                charProgress = Math.min(1, (self.progress - delay) / duration);
              }

              const initialY = i % 2 === 0 ? -150 : 150;
              const charY = initialY - charProgress * initialY;

              gsap.set(charEl, { y: charY });
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#141414] text-[#f1f1f1] overflow-hidden select-none font-sans">
      {/* Font imports & styling */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900&family=Instrument+Sans:wght@400;500;600;700&display=swap");
        .barlow-font {
          font-family: "Barlow Condensed", sans-serif;
        }
        .instrument-font {
          font-family: "Instrument Sans", sans-serif;
        }
      `}</style>

      {/* INTRO HEADER MARK */}
      <div className="w-full py-16 px-6 sm:px-12 flex flex-col items-center justify-center text-center border-b border-white/10">
        <div className="flex items-center gap-3 pb-3">
          <LoomieLogoMark className="w-6 h-6 text-[#f75828]" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#f75828]">
            TELESCOPE KINETIC MOTION
          </span>
        </div>
        <h2 className="barlow-font text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#f1f1f1] max-w-3xl leading-none">
          CRAFTING DIGITAL LANDSCAPES WITH RIGOR & PASSION
        </h2>
      </div>

      {/* ANIMATED TELESCOPE TITLE SECTIONS */}
      <div className="relative w-full">
        {TELESCOPE_TITLES.map((item, index) => {
          if (!charRefs.current[index]) {
            charRefs.current[index] = [];
          }
          let charIndexCounter = 0;

          return (
            <div
              key={item.id}
              ref={(el) => {
                titleRefs.current[index] = el;
              }}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
              className="relative w-full h-[50vh] sm:h-[55vh] flex items-center justify-center overflow-hidden border-b border-black/10 transition-colors duration-500"
            >
              {/* Optional background sub-tagline */}
              {item.subTagline && (
                <div className="absolute top-6 left-6 sm:top-10 sm:left-12 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest opacity-70">
                  {item.subTagline}
                </div>
              )}

              {/* SLIDING CONTAINER */}
              <div
                ref={(el) => {
                  containerRefs.current[index] = el;
                }}
                className="relative w-full flex items-center justify-center px-4 will-change-transform transform-gpu"
              >
                <h1 className="barlow-font text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold uppercase leading-none tracking-tight text-center whitespace-nowrap">
                  {item.text.split("").map((char, cIdx) => (
                    <span
                      key={cIdx}
                      ref={(el) => {
                        charRefs.current[index][charIndexCounter++] = el;
                      }}
                      className="char relative inline-block will-change-transform transform-gpu"
                      style={{ display: char === " " ? "inline" : "inline-block" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Bottom Brand Mark Accent */}
              <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-12 flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-60">
                <span className="w-2 h-2 rounded-full bg-current" />
                LOOMIE
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
