"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, RotateCcw, Clock, Feather } from "lucide-react";

interface LoomieAnimatedDrawingSectionProps {
  delaySeconds?: number; // Default 40 seconds delay requirement
  title?: string;
  subtitle?: string;
  className?: string;
  isDarkTheme?: boolean;
}

export function LoomieAnimatedDrawingSection({
  delaySeconds = 40,
  title = "LOOMIE HANDWRITING INK",
  subtitle = "LIQUID FOUNTAIN PEN INK WRITING — KINETIC STROKE ANIMATION",
  className = "",
  isDarkTheme = false,
}: LoomieAnimatedDrawingSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | SVGCircleElement | null)[]>([]);
  const penTipRef = useRef<SVGGElement>(null);

  const [timeLeft, setTimeLeft] = useState<number>(delaySeconds);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hasDrawnOnce, setHasDrawnOnce] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationTlRef = useRef<gsap.core.Timeline | null>(null);

  // Handwritten Ink Script SVG Stroke Paths for "Loomie" + Eye Mark
  // ViewBox: 0 0 850 260
  const inkPathDefs = [
    // 0: Cursive 'L'
    {
      d: "M 90 70 C 75 40 45 75 60 120 C 75 165 70 195 50 205 C 40 210 95 205 135 198",
      label: "Cursive L",
      duration: 1.4,
      width: 7.5,
    },
    // 1: Cursive 'o' 1
    {
      d: "M 185 145 C 150 130 140 175 170 195 C 205 200 215 145 185 145 C 200 140 225 135 235 140",
      label: "Cursive o 1",
      duration: 1.1,
      width: 6.5,
    },
    // 2: Left Pupil Dot
    {
      d: "M 175 165 A 6 6 0 1 1 174.9 165",
      label: "Pupil Dot 1",
      duration: 0.4,
      width: 10,
    },
    // 3: Cursive 'o' 2
    {
      d: "M 285 145 C 250 130 240 175 270 195 C 305 200 315 145 285 145 C 300 140 325 135 335 140",
      label: "Cursive o 2",
      duration: 1.1,
      width: 6.5,
    },
    // 4: Right Pupil Dot
    {
      d: "M 275 165 A 6 6 0 1 1 274.9 165",
      label: "Pupil Dot 2",
      duration: 0.4,
      width: 10,
    },
    // 5: Double Eye Outer Ink Pill Ring
    {
      d: "M 145 115 H 315 A 45 45 0 0 1 315 205 H 145 A 45 45 0 0 1 145 115 Z",
      label: "Eye Pill Frame",
      duration: 1.5,
      width: 4.5,
    },
    // 6: Cursive 'm'
    {
      d: "M 370 195 C 370 145 390 125 405 150 C 415 125 435 125 445 150 C 455 125 475 125 485 195 C 485 195 500 140 510 145",
      label: "Cursive m",
      duration: 1.6,
      width: 6.5,
    },
    // 7: Cursive 'i'
    {
      d: "M 525 140 C 525 170 515 190 535 195 C 545 195 565 140 575 145",
      label: "Cursive i body",
      duration: 0.9,
      width: 6.5,
    },
    // 8: Ink Dot over 'i'
    {
      d: "M 525 115 A 5 5 0 1 1 524.9 115",
      label: "Dot i",
      duration: 0.4,
      width: 9,
    },
    // 9: Cursive 'e'
    {
      d: "M 590 165 C 575 165 575 140 595 140 C 615 140 615 175 585 195 C 605 195 635 190 660 180",
      label: "Cursive e",
      duration: 1.2,
      width: 6.5,
    },
    // 10: Signature Flourish
    {
      d: "M 40 225 C 220 235 480 230 720 210 C 740 208 770 200 790 190",
      label: "Underline Flourish",
      duration: 1.3,
      width: 4,
    },
  ];

  const playDrawingAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (animationTlRef.current) {
      animationTlRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setHasDrawnOnce(true);
        setTimeLeft(delaySeconds);
      },
    });
    animationTlRef.current = tl;

    pathRefs.current.forEach((el) => {
      if (!el) return;
      if ('getTotalLength' in el) {
        const len = (el as SVGPathElement).getTotalLength();
        gsap.set(el, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 1,
        });
      }
    });

    if (penTipRef.current) {
      gsap.set(penTipRef.current, { opacity: 1, scale: 1 });
    }

    inkPathDefs.forEach((def, idx) => {
      const el = pathRefs.current[idx];
      if (!el || !('getTotalLength' in el)) return;

      const pathEl = el as SVGPathElement;
      const len = pathEl.getTotalLength();
      const duration = def.duration || 1.0;

      const obj = { val: len };

      tl.to(
        obj,
        {
          val: 0,
          duration,
          ease: "power2.inOut",
          onUpdate: () => {
            gsap.set(pathEl, { strokeDashoffset: obj.val });
            if (penTipRef.current) {
              const currentLen = len - obj.val;
              const pt = pathEl.getPointAtLength(Math.max(0, Math.min(len, currentLen)));
              gsap.set(penTipRef.current, {
                x: pt.x,
                y: pt.y,
              });
            }
          },
        },
        idx === 0 ? 0 : ">-0.12"
      );
    });

    if (penTipRef.current) {
      tl.to(penTipRef.current, { opacity: 0, scale: 0.2, duration: 0.4 }, ">");
    }

    if (svgRef.current) {
      tl.to(svgRef.current, {
        scale: 1.025,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          playDrawingAnimation();
          return delaySeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [delaySeconds]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          if (!hasDrawnOnce && !isAnimating) {
            playDrawingAnimation();
          }
        },
      });

      return () => st.kill();
    }
  }, [hasDrawnOnce, isAnimating]);

  const progressPercent = Math.max(0, Math.min(100, ((delaySeconds - timeLeft) / delaySeconds) * 100));

  return (
    <div
      ref={sectionRef}
      className={`w-full py-10 px-6 flex flex-col items-center justify-center relative overflow-hidden select-none ${
        isDarkTheme ? "bg-[#0A0A0C] text-white" : "bg-[#F7F6F2] text-[#0E0E0E]"
      } ${className}`}
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center space-y-5 relative z-10">
        
        {/* Top Header Badge & 40s Delay Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-current text-xs font-mono font-bold uppercase tracking-widest opacity-80">
            <Feather className="w-3.5 h-3.5 text-[#E62B00]" />
            <span>{title}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E62B00]/10 border border-[#E62B00]/30 text-[#E62B00] text-xs font-mono font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>40s DELAY TIMER: {timeLeft}s REMAINING</span>
          </div>
        </div>

        {/* 40-Second Delay Countdown Progress Line */}
        <div className="w-full max-w-md bg-stone-300/50 dark:bg-stone-800/60 h-1.5 rounded-full overflow-hidden border border-stone-400/20">
          <div
            className="h-full bg-[#E62B00] transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Canvas Stage: Liquid Ink Handwriting Drawing of LOOMIE (Borderless) */}
        <div className="w-full max-w-4xl py-2 flex items-center justify-center relative">
          <svg
            ref={svgRef}
            viewBox="0 0 850 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-h-[280px] sm:max-h-[360px] filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)] overflow-visible origin-center transition-transform duration-300"
          >
            <defs>
              <filter id="inkFluidFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
              </filter>

              <linearGradient id="inkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isDarkTheme ? "#F0EFEA" : "#0A0A0C"} />
                <stop offset="45%" stopColor="#E62B00" />
                <stop offset="100%" stopColor={isDarkTheme ? "#FFFFFF" : "#0E0E0E"} />
              </linearGradient>
            </defs>

            {inkPathDefs.map((def, idx) => (
              <path
                key={idx}
                ref={(el) => {
                  pathRefs.current[idx] = el;
                }}
                d={def.d}
                stroke="url(#inkGradient)"
                strokeWidth={def.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#inkFluidFilter)"
                className="transition-colors duration-500"
              />
            ))}

            <g
              ref={penTipRef}
              className="opacity-0 pointer-events-none transform-gpu"
            >
              <circle r="9" fill="#E62B00" opacity="0.35" className="animate-ping" />
              <circle r="4.5" fill="#E62B00" className="filter drop-shadow-[0_0_6px_#E62B00]" />
              <path
                d="M -1 -2 L -9 -22 L 7 -18 Z"
                fill={isDarkTheme ? "#FFFFFF" : "#0E0E0E"}
                className="opacity-80"
              />
            </g>
          </svg>
        </div>

        {/* Subtitle & Interactive Controls */}
        <div className="space-y-4 max-w-xl mx-auto">
          <p className="text-sm sm:text-base font-mono font-medium tracking-tight opacity-80 uppercase leading-relaxed">
            {subtitle}
          </p>

          <div className="flex items-center justify-center gap-4 pt-1">
            <button
              onClick={playDrawingAnimation}
              disabled={isAnimating}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0E0E0E] dark:bg-white text-white dark:text-[#0E0E0E] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#E62B00] dark:hover:bg-[#E62B00] dark:hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-lg"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isAnimating ? "WRITING INK..." : "WRITE NOW"}</span>
            </button>

            <button
              onClick={() => {
                setTimeLeft(delaySeconds);
                if (!isAnimating) playDrawingAnimation();
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-stone-400 dark:border-stone-700 font-mono text-xs font-bold uppercase tracking-widest hover:border-[#E62B00] hover:text-[#E62B00] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESET 40S TIMER</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
