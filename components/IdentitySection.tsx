"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Eye, Copy, Check, Sliders, Layers } from "lucide-react";

export function IdentitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyeSvgRef = useRef<SVGSVGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const leftGlintRef = useRef<SVGCircleElement>(null);
  const rightGlintRef = useRef<SVGCircleElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [sampleText, setSampleText] = useState("CLEAR. CONNECTED. COMPLETE.");
  const [fontSize, setFontSize] = useState(42);

  const targetEyePos = useRef({ px1: 0, py1: 0, px2: 0, py2: 0 });
  const currentEyePos = useRef({ px1: 0, py1: 0, px2: 0, py2: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      if (!eyeSvgRef.current) return;

      const rect = eyeSvgRef.current.getBoundingClientRect();
      const eyeCenterX1 = rect.left + rect.width * 0.33;
      const eyeCenterX2 = rect.left + rect.width * 0.67;
      const eyeCenterY = rect.top + rect.height * 0.5;

      // Calculate angle & offset for Left Pupil
      const dx1 = e.clientX - eyeCenterX1;
      const dy1 = e.clientY - eyeCenterY;
      const angle1 = Math.atan2(dy1, dx1);
      const dist1 = Math.min(22, Math.hypot(dx1, dy1) * 0.045);

      // Calculate angle & offset for Right Pupil
      const dx2 = e.clientX - eyeCenterX2;
      const dy2 = e.clientY - eyeCenterY;
      const angle2 = Math.atan2(dy2, dx2);
      const dist2 = Math.min(22, Math.hypot(dx2, dy2) * 0.045);

      targetEyePos.current = {
        px1: Math.cos(angle1) * dist1,
        py1: Math.sin(angle1) * dist1,
        px2: Math.cos(angle2) * dist2,
        py2: Math.sin(angle2) * dist2,
      };
    };

    // Smooth Lerp Loop for Liquid Pupil Tracking Motion
    let animationFrameId: number;
    const updatePupils = () => {
      const target = targetEyePos.current;
      const curr = currentEyePos.current;

      curr.px1 += (target.px1 - curr.px1) * 0.12;
      curr.py1 += (target.py1 - curr.py1) * 0.12;
      curr.px2 += (target.px2 - curr.px2) * 0.12;
      curr.py2 += (target.py2 - curr.py2) * 0.12;

      if (leftPupilRef.current && rightPupilRef.current) {
        gsap.set(leftPupilRef.current, { x: curr.px1, y: curr.py1 });
        gsap.set(rightPupilRef.current, { x: curr.px2, y: curr.py2 });
      }

      if (leftGlintRef.current && rightGlintRef.current) {
        gsap.set(leftGlintRef.current, { x: curr.px1 * 0.6, y: curr.py1 * 0.6 });
        gsap.set(rightGlintRef.current, { x: curr.px2 * 0.6, y: curr.py2 * 0.6 });
      }

      animationFrameId = requestAnimationFrame(updatePupils);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(updatePupils);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section
      id="identity"
      ref={containerRef}
      className="py-12 md:py-20 px-6 md:px-12 max-w-[1700px] mx-auto select-none"
    >
      {/* Header Block */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-10 border-b border-border-custom gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-foreground/10 border border-foreground/20 text-foreground text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Eye className="w-3.5 h-3.5" />
            <span>LOOMIE BRAND SPECIFICATION V2.0</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-foreground leading-[0.92]">
            VISUAL <span className="text-foreground border-b-4 border-foreground pb-1">IDENTITY</span>
          </h1>
        </div>

        <div className="max-w-xl text-foreground-secondary font-sans space-y-2">
          <p className="text-base sm:text-lg font-bold text-foreground uppercase tracking-wider">
            Clear. Connected. Complete.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed uppercase font-medium">
            Built on a strict grid architecture, equal-radius pupils, and uncompromising high-contrast typography designed to command presence across screens, packaging, and spatial realms.
          </p>
        </div>
      </div>

      {/* 1. COMPACT HERO: THE INFINITY-EYES MARK WITH BLUEPRINT GRID */}
      <div className="w-full bg-surface-card border border-border-custom shadow-2xl overflow-hidden mb-14 relative group">
        {/* Top CAD Blueprint Header Bar */}
        <div className="p-4 sm:p-6 bg-background border-b border-border-custom flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs font-bold text-foreground">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-none bg-foreground animate-pulse" />
            <span className="uppercase tracking-widest">SPECIFICATION 01 // THE INFINITY-EYES MARK</span>
          </div>
          <div className="flex items-center gap-6 text-foreground-secondary">
            <span>GRID: 1:2.5 EQUAL-RADIUS</span>
            <span className="text-foreground font-bold">[ {mousePos.x}PX , {mousePos.y}PX ]</span>
          </div>
        </div>

        {/* Blueprint CAD Grid Overlay (Compact height) */}
        <div className="p-6 sm:p-10 md:p-12 relative flex items-center justify-center bg-[#050505] overflow-hidden min-h-[240px] md:min-h-[280px]">
          {/* Subtle CAD Blueprint Grid Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Center Blueprint Circular Guidelines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[340px] h-[180px] border border-dashed border-white rounded-full" />
          </div>

          {/* Compact Interactive Eye-Tracking SVG */}
          <svg
            ref={eyeSvgRef}
            viewBox="0 0 360 180"
            className="w-full max-w-[310px] sm:max-w-[340px] h-auto drop-shadow-[0_15px_35px_rgba(255,255,255,0.12)] overflow-visible relative z-10 cursor-crosshair"
          >
            {/* Exact LOOMIE Brand Logo Mark Outer Stadium Pill */}
            <rect
              x="10"
              y="10"
              width="340"
              height="160"
              rx="80"
              fill="currentColor"
              className="text-foreground shadow-2xl"
            />

            {/* Inner Stadium CAD Blueprint Guideline */}
            <rect
              x="20"
              y="20"
              width="320"
              height="140"
              rx="70"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="opacity-30"
            />

            {/* Left Pupil (Exact LOOMIE Logo cutout circle - tracks mouse) */}
            <circle
              ref={leftPupilRef}
              cx="110"
              cy="90"
              r="40"
              fill="currentColor"
              className="text-background"
            />

            {/* Right Pupil (Exact LOOMIE Logo cutout circle - tracks mouse) */}
            <circle
              ref={rightPupilRef}
              cx="250"
              cy="90"
              r="40"
              fill="currentColor"
              className="text-background"
            />

            {/* Pupil Center Eyeball Highlights */}
            <circle
              ref={leftGlintRef}
              cx="110"
              cy="90"
              r="14"
              fill="currentColor"
              className="text-foreground opacity-20 pointer-events-none"
            />
            <circle
              ref={rightGlintRef}
              cx="250"
              cy="90"
              r="14"
              fill="currentColor"
              className="text-foreground opacity-20 pointer-events-none"
            />
          </svg>
        </div>

        {/* Bottom Guideline Narrative Block */}
        <div className="p-8 md:p-12 bg-background border-t border-border-custom grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-foreground uppercase block">
              SYSTEM ARCHITECTURE & RULES
            </span>
            <p className="text-foreground-secondary font-sans text-base sm:text-lg md:text-xl font-medium leading-relaxed uppercase">
              The infinity-eyes mark is built on a strict grid: equal-radius pupils, centered within two overlapping ovals. It works as a standalone icon, an avatar, or paired with the wordmark — always legible at any scale, from a favicon to a billboard.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end space-y-3 border-l-0 lg:border-l border-border-custom lg:pl-8 font-mono text-xs font-bold text-foreground">
            <div className="flex items-center justify-between py-1 border-b border-border-custom/60">
              <span>PRIMARY USAGE:</span>
              <span>STANDALONE / WORDMARK</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-border-custom/60">
              <span>MINIMUM CLEAR SPACE:</span>
              <span>1.5X PUPIL RADIUS</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span>VECTOR SCALABILITY:</span>
              <span>100% FAITHFUL AT ALL SCALES</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COLOR PALETTE SPECIFICATIONS (BLACK #000000 & WHITE #FFFFFF) */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-custom font-mono text-xs font-bold uppercase tracking-widest text-foreground">
          <span>SPECIFICATION 02 // BRAND COLOR SYSTEM</span>
          <span>HIGH-CONTRAST MONOCHROME</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* BLACK SWATCH CARD */}
          <div className="group rounded-none bg-black border border-white/20 p-8 sm:p-12 flex flex-col justify-between h-[360px] shadow-2xl relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 bg-white/10 text-white font-mono text-xs font-bold tracking-widest uppercase border border-white/20">
                  PRIMARY CANVASES
                </span>
                <h3 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mt-4">
                  BLACK
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard("#000000")}
                className="px-4 py-2 bg-white/10 hover:bg-white hover:text-black text-white border border-white/20 font-mono text-xs font-bold transition-all flex items-center gap-2"
              >
                {copiedHex === "#000000" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHex === "#000000" ? "COPIED!" : "COPY HEX"}</span>
              </button>
            </div>

            <div className="space-y-4 border-t border-white/20 pt-6 font-mono text-xs text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>HEX VALUE:</span>
                <span className="text-white font-bold">#000000</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>RGB VALUE:</span>
                <span className="text-white font-bold">0, 0, 0</span>
              </div>
              <div className="flex justify-between">
                <span>CMYK PROCESS:</span>
                <span className="text-white font-bold">C:0 M:0 Y:0 K:100</span>
              </div>
            </div>
          </div>

          {/* WHITE SWATCH CARD */}
          <div className="group rounded-none bg-white text-black border border-black/20 p-8 sm:p-12 flex flex-col justify-between h-[360px] shadow-2xl relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 bg-black/10 text-black font-mono text-xs font-bold tracking-widest uppercase border border-black/20">
                  FOREGROUND & TYPOGRAPHY
                </span>
                <h3 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tight mt-4">
                  WHITE
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard("#FFFFFF")}
                className="px-4 py-2 bg-black/10 hover:bg-black hover:text-white text-black border border-black/20 font-mono text-xs font-bold transition-all flex items-center gap-2"
              >
                {copiedHex === "#FFFFFF" ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHex === "#FFFFFF" ? "COPIED!" : "COPY HEX"}</span>
              </button>
            </div>

            <div className="space-y-4 border-t border-black/20 pt-6 font-mono text-xs text-black/80">
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span>HEX VALUE:</span>
                <span className="text-black font-bold">#FFFFFF</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span>RGB VALUE:</span>
                <span className="text-black font-bold">255, 255, 255</span>
              </div>
              <div className="flex justify-between">
                <span>CMYK PROCESS:</span>
                <span className="text-black font-bold">C:0 M:0 Y:0 K:0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE BRAND TYPEFACE SPECIMEN (MONTSERRAT) */}
      <div className="mb-20 bg-surface-card border border-border-custom p-8 md:p-14 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-border-custom gap-4 font-mono text-xs font-bold text-foreground">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            <span>SPECIFICATION 03 // BRAND TYPEFACE — MONTSERRAT</span>
          </div>

          <div className="flex items-center gap-4">
            <span>SIZE: {fontSize}PX</span>
            <input
              type="range"
              min="24"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-32 accent-foreground cursor-pointer"
            />
          </div>
        </div>

        {/* Live Interactive Specimen Tester Input */}
        <div className="mb-10">
          <label className="font-mono text-xs text-foreground-secondary uppercase tracking-widest block mb-2 font-bold">
            TYPE SPECIMEN TESTER (EDITABLE TEXT)
          </label>
          <input
            type="text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="w-full bg-background border border-border-custom p-4 font-sans font-bold text-foreground uppercase tracking-tight focus:outline-none focus:border-foreground transition-colors text-lg sm:text-2xl"
          />
        </div>

        {/* 4 Montserrat Weight Display Scale */}
        <div className="space-y-8 font-sans">
          {/* Light (300) */}
          <div className="p-6 bg-background border border-border-custom space-y-3">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-foreground-secondary border-b border-border-custom/60 pb-2">
              <span>MONTSERRAT LIGHT</span>
              <span>WEIGHT 300 // CAPTIONS & TELEMETRY</span>
            </div>
            <p
              className="font-light tracking-normal text-foreground uppercase leading-none truncate"
              style={{ fontSize: `${fontSize}px` }}
            >
              {sampleText}
            </p>
          </div>

          {/* Medium (500) */}
          <div className="p-6 bg-background border border-border-custom space-y-3">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-foreground-secondary border-b border-border-custom/60 pb-2">
              <span>MONTSERRAT MEDIUM</span>
              <span>WEIGHT 500 // SUBTITLES & NAV</span>
            </div>
            <p
              className="font-medium tracking-normal text-foreground uppercase leading-none truncate"
              style={{ fontSize: `${fontSize}px` }}
            >
              {sampleText}
            </p>
          </div>

          {/* Bold (700) */}
          <div className="p-6 bg-background border border-border-custom space-y-3">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-foreground-secondary border-b border-border-custom/60 pb-2">
              <span>MONTSERRAT BOLD</span>
              <span>WEIGHT 700 // HEADINGS & BUTTONS</span>
            </div>
            <p
              className="font-bold tracking-tight text-foreground uppercase leading-none truncate"
              style={{ fontSize: `${fontSize}px` }}
            >
              {sampleText}
            </p>
          </div>

          {/* Black (900) */}
          <div className="p-6 bg-background border border-border-custom space-y-3">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-foreground-secondary border-b border-border-custom/60 pb-2">
              <span>MONTSERRAT BLACK</span>
              <span>WEIGHT 900 // MONUMENTAL TITLES</span>
            </div>
            <p
              className="font-black tracking-tighter text-foreground uppercase leading-none truncate"
              style={{ fontSize: `${fontSize}px` }}
            >
              {sampleText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
