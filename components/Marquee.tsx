"use client";

import React from "react";
import { LoomieLogoMark } from "./LoomieLogoMark";

const MARQUEE_PHRASES = [
  "DESIGN THAT CONNECTS",
  "FROM IDEA TO IDENTITY",
  "CLEAR. CONNECTED. COMPLETE.",
  "KINETIC WEB ARCHITECTURE",
  "LOOMIE STUDIO © 2026",
];

export function Marquee() {
  return (
    <section className="relative w-full bg-[#0E0E0E] text-[#F5F3EF] py-20 sm:py-32 lg:py-40 overflow-hidden select-none border-t border-b border-stone-800">
      {/* Top Section Header Bar */}
      <div className="max-w-[1700px] mx-auto px-6 sm:px-12 md:px-16 mb-12 sm:mb-16 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-white font-bold">03 // LOOMIE KINETIC NEWS & TICKER</span>
        </div>
        <span className="hidden sm:inline-block text-stone-500">
          CLEAR. CONNECTED. COMPLETE.
        </span>
      </div>

      {/* Monumental Diagonal Rotated Infinite Ticker Banner */}
      <div className="relative w-full py-8 sm:py-12 bg-[#F5F3EF] text-[#0E0E0E] overflow-hidden rotate-[-3.5deg] scale-105 shadow-2xl border-y-2 border-[#0E0E0E] my-4">
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

      {/* Bottom Section Footer Bar */}
      <div className="max-w-[1700px] mx-auto px-6 sm:px-12 md:px-16 mt-12 sm:mt-16 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-stone-500 border-t border-stone-800 pt-4">
        <span>LOOMIE CREATIVE DIRECTIVE</span>
        <span>2026 EDITION</span>
      </div>
    </section>
  );
}
