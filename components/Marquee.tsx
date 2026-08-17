"use client";

import React from "react";
import { LoomieLogoMark } from "./LoomieLogoMark";

const MARQUEE_PHRASES = [
  "DESIGN THAT CONNECTS",
  "FROM IDEA TO IDENTITY",
  "CLEAR. CONNECTED. COMPLETE.",
  "KINETIC WEB ARCHITECTURE",
];

export function Marquee() {
  return (
    <section className="relative w-full bg-[#0E0E0E] text-[#F5F3EF] py-16 sm:py-24 lg:py-32 overflow-hidden select-none border-t border-b border-stone-800">
      {/* Monumental Diagonal Rotated Infinite Ticker Banner */}
      <div className="relative w-full py-8 sm:py-12 bg-[#F5F3EF] text-[#0E0E0E] overflow-hidden rotate-[-3.5deg] scale-105 shadow-2xl border-y-2 border-[#0E0E0E]">
        <div className="animate-marquee-smooth whitespace-nowrap flex items-center gap-12 sm:gap-16 font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider font-sans uppercase">
          {[...MARQUEE_PHRASES, ...MARQUEE_PHRASES, ...MARQUEE_PHRASES, ...MARQUEE_PHRASES].map(
            (phrase, index) => (
              <div key={index} className="flex items-center gap-12 sm:gap-16 shrink-0">
                <span>{phrase}</span>
                <span className="inline-flex items-center justify-center">
                  <LoomieLogoMark className="h-[0.7em] w-auto inline-block text-[#0E0E0E] transform hover:rotate-180 transition-transform duration-700" />
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
