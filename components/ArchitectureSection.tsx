"use client";

import React from "react";
import { Cpu, Eye, Layers, Zap } from "lucide-react";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-20 md:py-28 px-6 md:px-12 max-w-[1700px] mx-auto border-t border-border-custom select-none">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-foreground/10 border border-foreground/20 text-foreground text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 bg-foreground rounded-none animate-pulse" />
            <span>04 // SYSTEM DESIGN & PERFORMANCE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground uppercase">
            TECHNICAL ARCHITECTURE.
          </h2>
        </div>
        <p className="text-foreground-secondary font-sans text-sm sm:text-base leading-relaxed uppercase font-medium max-w-md">
          Engineered for high frame-rate performance, zero layout thrashing, and zero-lag state transitions across all viewports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Layer 1 */}
        <div className="p-8 rounded-none bg-surface-card border border-border-custom flex flex-col justify-between hover:border-foreground transition-all duration-300 group shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-none bg-foreground text-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-foreground-secondary uppercase tracking-wider block mb-1">
              LAYER 01 // SCROLL ENGINE
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-foreground mb-3">
              Lenis Smooth Scroll & GSAP RAF Sync
            </h3>
            <p className="text-foreground-secondary font-sans text-xs sm:text-sm leading-relaxed uppercase font-medium">
              Virtual smooth scroll context syncing 60 FPS requestAnimationFrame (RAF) cycles directly with GSAP ScrollTrigger updates for seamless parallax without scroll jitter.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-border-custom flex items-center justify-between text-xs font-mono font-bold text-foreground uppercase">
            <span>Scroll Physics</span>
            <span>GSAP + Lenis</span>
          </div>
        </div>

        {/* Layer 2 */}
        <div className="p-8 rounded-none bg-surface-card border border-border-custom flex flex-col justify-between hover:border-foreground transition-all duration-300 group shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-none bg-foreground text-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-foreground-secondary uppercase tracking-wider block mb-1">
              LAYER 02 // ROUTE ENGINE
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-foreground mb-3">
              Scroll-To-Top Instant Route Controller
            </h3>
            <p className="text-foreground-secondary font-sans text-xs sm:text-sm leading-relaxed uppercase font-medium">
              Global route listener syncing Lenis smooth scroll and native window scroll position to position 0 instantly whenever navigating between case studies or pages.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-border-custom flex items-center justify-between text-xs font-mono font-bold text-foreground uppercase">
            <span>Instant Reset</span>
            <span>ScrollToTop</span>
          </div>
        </div>

        {/* Layer 3 */}
        <div className="p-8 rounded-none bg-surface-card border border-border-custom flex flex-col justify-between hover:border-foreground transition-all duration-300 group shadow-xl">
          <div>
            <div className="w-12 h-12 rounded-none bg-foreground text-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-foreground-secondary uppercase tracking-wider block mb-1">
              LAYER 03 // GPU COMPOSITOR
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-foreground mb-3">
              Strict GPU-Accelerated Layout Rules
            </h3>
            <p className="text-foreground-secondary font-sans text-xs sm:text-sm leading-relaxed uppercase font-medium">
              Animations strictly restricted to GPU composite properties (<code className="text-foreground font-mono text-xs">transform</code>, <code className="text-foreground font-mono text-xs">opacity</code>) to prevent layout shifts and heavy reflows.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-border-custom flex items-center justify-between text-xs font-mono font-bold text-foreground uppercase">
            <span>Performance</span>
            <span>GPU Transform Only</span>
          </div>
        </div>
      </div>
    </section>
  );
}
