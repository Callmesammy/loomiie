"use client";

import React, { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { LoomieLogoMark } from "./LoomieLogoMark";

export function IdentitySection() {
  const eyeCanvasRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const currentLeftPos = useRef({ x: 0, y: 0 });
  const currentRightPos = useRef({ x: 0, y: 0 });

  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(36);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeCanvasRef.current) return;
      const rect = eyeCanvasRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mousePos.current = {
        x: e.clientX - centerX,
        y: e.clientY - centerY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const animateEyes = () => {
      const maxOffset = 18;
      const dist = Math.hypot(mousePos.current.x, mousePos.current.y);
      const angle = Math.atan2(mousePos.current.y, mousePos.current.x);
      const targetDist = Math.min(dist * 0.08, maxOffset);

      const targetX = Math.cos(angle) * targetDist;
      const targetY = Math.sin(angle) * targetDist;

      currentLeftPos.current.x += (targetX - currentLeftPos.current.x) * 0.12;
      currentLeftPos.current.y += (targetY - currentLeftPos.current.y) * 0.12;

      currentRightPos.current.x += (targetX - currentRightPos.current.x) * 0.12;
      currentRightPos.current.y += (targetY - currentRightPos.current.y) * 0.12;

      if (leftEyeRef.current) {
        leftEyeRef.current.setAttribute(
          "transform",
          `translate(${currentLeftPos.current.x}, ${currentLeftPos.current.y})`
        );
      }

      if (rightEyeRef.current) {
        rightEyeRef.current.setAttribute(
          "transform",
          `translate(${currentRightPos.current.x}, ${currentRightPos.current.y})`
        );
      }

      animationFrameId = requestAnimationFrame(animateEyes);
    };

    animateEyes();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCopyColor = (colorHex: string, colorName: string) => {
    navigator.clipboard.writeText(colorHex);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <section id="identity" className="py-16 md:py-28 px-6 md:px-12 max-w-[1700px] mx-auto select-none space-y-24">
      {/* Identity Header */}
      <div className="pb-12 border-b border-border-custom flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-foreground/10 border border-foreground/20 text-foreground text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-foreground rounded-none animate-pulse" />
            <span>EXHIBITION 03 // BRAND IDENTITY SPECIFICATION</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter uppercase text-foreground leading-[0.92]">
            VISUAL <span className="text-foreground border-b-4 border-foreground pb-1">IDENTITY.</span>
          </h1>
        </div>

        <div className="max-w-xl space-y-3 font-sans">
          <p className="text-lg sm:text-xl font-bold text-foreground uppercase tracking-wider">
            Clear. Connected. Complete.
          </p>
          <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed uppercase font-medium">
            Strict geometric blueprints, monochromatic color tokens, and custom Montserrat typography forming the immutable DNA of LOOMIE.
          </p>
        </div>
      </div>

      {/* 2-Column Grid: CAD Blueprint & Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Compact Eye-Tracking Logo Blueprint */}
        <div className="lg:col-span-6 bg-surface-card border border-border-custom p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between font-mono text-xs font-bold text-foreground uppercase border-b border-border-custom pb-4">
            <span>SPECIFICATION 01 // LOOMIE LOGO MARK</span>
            <span>CAD GRID VECTOR</span>
          </div>

          <div
            ref={eyeCanvasRef}
            className="w-full max-w-[340px] mx-auto min-h-[280px] bg-background border border-border-custom p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-inner group"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <svg
              viewBox="0 0 360 180"
              className="w-full h-auto drop-shadow-[0_15px_35px_rgba(255,255,255,0.15)] relative z-10"
            >
              <rect x="10" y="10" width="340" height="160" rx="80" fill="currentColor" className="text-foreground" />
              <circle ref={leftEyeRef} cx="110" cy="90" r="40" fill="currentColor" className="text-background transition-transform" />
              <circle ref={rightEyeRef} cx="250" cy="90" r="40" fill="currentColor" className="text-background transition-transform" />
            </svg>

            <span className="font-mono text-[10px] text-foreground-secondary uppercase tracking-widest mt-6 z-10 font-bold">
              [ REAL-TIME CURSOR EYE-TRACKING ENGAGED ]
            </span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-foreground-secondary leading-relaxed uppercase font-medium">
            The infinity-eyes mark is built on a strict grid: equal-radius pupils, centered within two overlapping ovals. It works as a standalone icon, an avatar, or paired with the wordmark — always legible at any scale, from a favicon to a billboard.
          </p>
        </div>

        {/* Right Column: Color Swatches & Typography Specimen */}
        <div className="lg:col-span-6 space-y-10">
          {/* Color Tokens */}
          <div className="bg-surface-card border border-border-custom p-8 shadow-2xl space-y-6">
            <span className="font-mono text-xs font-bold text-foreground uppercase tracking-widest block border-b border-border-custom pb-3">
              SPECIFICATION 02 // MONOCHROMATIC PALETTE
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Black Swatch */}
              <div className="bg-black text-white p-6 border border-white/20 space-y-4 shadow-xl">
                <div className="flex items-center justify-between font-mono text-xs font-bold">
                  <span>BLACK</span>
                  <span>#000000</span>
                </div>
                <div className="h-16 bg-black border border-white/10" />
                <button
                  onClick={() => handleCopyColor("#000000", "BLACK")}
                  className="w-full py-2 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  {copiedColor === "BLACK" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedColor === "BLACK" ? "COPIED #000000" : "COPY HEX"}</span>
                </button>
              </div>

              {/* White Swatch */}
              <div className="bg-white text-black p-6 border border-black/20 space-y-4 shadow-xl">
                <div className="flex items-center justify-between font-mono text-xs font-bold">
                  <span>WHITE</span>
                  <span>#FFFFFF</span>
                </div>
                <div className="h-16 bg-white border border-black/10" />
                <button
                  onClick={() => handleCopyColor("#FFFFFF", "WHITE")}
                  className="w-full py-2 bg-black text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  {copiedColor === "WHITE" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedColor === "WHITE" ? "COPIED #FFFFFF" : "COPY HEX"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Typography Specimen Tester */}
          <div className="bg-surface-card border border-border-custom p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-foreground uppercase border-b border-border-custom pb-3">
              <span>SPECIFICATION 03 // MONTSERRAT TYPE SPECIMEN</span>
              <span>SIZE: {fontSize}PX</span>
            </div>

            <div className="space-y-4">
              <input
                type="range"
                min="20"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-foreground cursor-pointer"
              />

              <div
                style={{ fontSize: `${fontSize}px` }}
                className="font-bold text-foreground tracking-tighter uppercase leading-none transition-all break-words"
              >
                CLEAR. CONNECTED. COMPLETE.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-border-custom font-mono text-xs text-foreground-secondary font-bold uppercase">
                <span>300 LIGHT</span>
                <span>500 MEDIUM</span>
                <span>700 BOLD</span>
                <span>900 BLACK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
