"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, ShieldCheck, RefreshCw, Eye, Feather } from "lucide-react";

interface ExhibitionPiece {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  curatorNote: string;
  details: string;
  image: string;
  icon: React.ReactNode;
  medium: string;
  specifications: string[];
}

const EXHIBITION_PIECES: ExhibitionPiece[] = [
  {
    id: "connected-design",
    number: "01",
    title: "CONNECTED DESIGN",
    subtitle: "LOGO TO UI AS ONE SYSTEM.",
    curatorNote:
      "Design is not an isolated artifact — it is an interconnected living medium. We construct brand identity systems where the original geometry of a logomark reverberates seamlessly into typography, spatial signage, and kinetic digital interfaces.",
    details:
      "Every color token, typographic scale, and motion curve exists in mathematical harmony. No disconnected parts; one singular, unmistakable brand voice.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1600&q=80",
    icon: <Compass className="w-5 h-5 text-foreground" />,
    medium: "KINETIC SYSTEM ARCHITECTURE",
    specifications: ["Unified Design Tokens", "Cross-Medium Cohesion", "Kinetic Design Logic"],
  },
  {
    id: "proven-in-use",
    number: "02",
    title: "PROVEN IN USE",
    subtitle: "TESTED LIVE ACROSS PLATFORMS.",
    curatorNote:
      "Beauty without endurance is a temporary illusion. We subject every visual system to rigorous production stress tests — rendering high frame-rate WebGL shaders, verifying OLED contrast, and ensuring tactile print fidelity.",
    details:
      "Built to withstand high-volume user traffic, multi-screen scaling, and real-world commercial stress with zero compromise on visual integrity.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    icon: <ShieldCheck className="w-5 h-5 text-foreground" />,
    medium: "PRODUCTION STRESS TESTING",
    specifications: ["60 FPS WebGL Verified", "Multi-Screen Adaptation", "Tactile Print Fidelity"],
  },
  {
    id: "always-iterating",
    number: "03",
    title: "ALWAYS ITERATING",
    subtitle: "FEEDBACK-DRIVEN, TREND-PROOF.",
    curatorNote:
      "Perfection is not a static destination — it is an active discipline of continuous refinement. Guided by empirical feedback and spatial physics, we iteratively polish our systems so they evolve alongside culture.",
    details:
      "Resilient to short-lived fads, our design frameworks are engineered to remain timeless, adaptable, and forward-looking.",
    image: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=1600&q=80",
    icon: <RefreshCw className="w-5 h-5 text-foreground" />,
    medium: "EVOLUTIONARY DESIGN LOGIC",
    specifications: ["Continuous Refinement", "Trend-Proof Foundation", "Empirical Telemetry"],
  },
  {
    id: "total-clarity",
    number: "04",
    title: "TOTAL CLARITY",
    subtitle: "COMMUNICATES INSTANTLY, EVERY SCALE.",
    curatorNote:
      "Clarity is the ultimate form of sophistication. By stripping away ornamental noise, we uncover the pure signal of your brand. Our typography and mark maintain crystalline legibility across every scale.",
    details:
      "From a tiny 16px favicon in a browser tab to a monumental 100ft outdoor architectural billboard — crisp, powerful, and instantaneous.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    icon: <Eye className="w-5 h-5 text-foreground" />,
    medium: "TYPOGRAPHIC SCALE & PRECISION",
    specifications: ["16px Favicon Precision", "100ft Billboard Clarity", "Zero Ornamental Clutter"],
  },
  {
    id: "strategic-craft",
    number: "05",
    title: "STRATEGIC CRAFT",
    subtitle: "THINKING FIRST, POLISH ALWAYS.",
    curatorNote:
      "Craft is intelligence made visible. Every typographic grid alignment, color palette pair, and micro-interaction is rooted in deep commercial strategy. We approach brand construction with brutalist discipline and poetic finesse.",
    details:
      "Thinking first, execution second, perfection always. Crafting enduring digital legacies for visionary enterprises.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1600&q=80",
    icon: <Feather className="w-5 h-5 text-foreground" />,
    medium: "BRUTALIST COMMERCIAL CRAFT",
    specifications: ["Strategy-Led Architecture", "Poetic Micro-Interactions", "Commercial Impact"],
  },
];

export function ValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeExhibition, setActiveExhibition] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      EXHIBITION_PIECES.forEach((piece) => {
        const el = document.getElementById(`exhibition-${piece.id}`);
        if (el) {
          gsap.fromTo(
            el,
            { y: 60, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToPiece = (id: string, index: number) => {
    setActiveExhibition(index);
    const el = document.getElementById(`exhibition-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="values"
      ref={containerRef}
      className="py-12 md:py-20 px-6 md:px-12 max-w-[1700px] mx-auto select-none"
    >
      {/* Exhibition Title & Hero Block */}
      <div className="pb-8 mb-12 border-b border-border-custom flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-foreground/10 border border-foreground/20 text-foreground text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 bg-foreground rounded-none animate-pulse" />
            <span>EXHIBITION 02 // 5 CORE PILLARS OF ART & CRAFT</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-foreground leading-[0.95]">
            FROM IDEA <span className="text-foreground border-b-4 border-foreground pb-1">TO IDENTITY.</span>
          </h1>
        </div>

        <div className="max-w-xl space-y-2 font-sans">
          <p className="text-base sm:text-lg font-bold text-foreground uppercase tracking-wider">
            Clear. Connected. Complete.
          </p>
          <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed uppercase font-medium">
            An editorial walkthrough of the five underlying philosophies that dictate how LOOMIE conceives, architects, and deploys digital identities.
          </p>
        </div>
      </div>

      {/* Floating Curatorial Exhibition Index Bar */}
      <div className="sticky top-24 z-30 mb-12 bg-background/90 backdrop-blur-md border border-border-custom p-3.5 flex items-center justify-between shadow-2xl">
        <span className="font-mono text-xs font-bold text-foreground uppercase tracking-widest hidden sm:inline-block">
          EXHIBITION INDEX:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {EXHIBITION_PIECES.map((piece, idx) => (
            <button
              key={piece.id}
              onClick={() => scrollToPiece(piece.id, idx)}
              className={`px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                activeExhibition === idx
                  ? "bg-foreground text-background border-foreground shadow-md"
                  : "bg-surface-card text-foreground-secondary border-border-custom hover:border-foreground"
              }`}
            >
              {piece.number} {piece.title}
            </button>
          ))}
        </div>
      </div>

      {/* 5 COMPACT WELL-ORGANIZED 2-COLUMN EXHIBITION PANELS */}
      <div className="space-y-10 md:space-y-14">
        {EXHIBITION_PIECES.map((piece, index) => (
          <article
            key={piece.id}
            id={`exhibition-${piece.id}`}
            className="group border border-border-custom bg-surface-card p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-500 hover:border-foreground"
          >
            {/* Panel Top Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-custom pb-4 mb-6 gap-3 font-mono text-xs font-bold text-foreground uppercase tracking-widest">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-foreground animate-pulse" />
                <span>EXHIBITION PIECE [{piece.number} / 05]</span>
                <span className="text-foreground-secondary">// {piece.medium}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground-secondary">
                {piece.icon}
                <span>LOOMIE ARCHIVAL NO. {piece.number}</span>
              </div>
            </div>

            {/* 2-Column Split Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Compact Image Preview Frame */}
              <div className="lg:col-span-5 w-full h-[260px] sm:h-[300px] relative overflow-hidden rounded-none border border-border-custom shadow-xl group">
                <Image
                  src={piece.image}
                  alt={piece.title}
                  fill
                  quality={90}
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white font-bold uppercase tracking-widest">
                  <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20">
                    PLATE 0{index + 1}
                  </span>
                  <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20">
                    VERIFIED
                  </span>
                </div>
              </div>

              {/* Right Column: Title, Subtitle Quote, Narrative & Specifications */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-foreground uppercase block mb-1">
                    PILLAR CONCEPT 0{index + 1}
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-foreground tracking-tight leading-none mb-2">
                    {piece.title}
                  </h2>
                  <p className="text-base sm:text-lg font-extrabold text-foreground uppercase tracking-wider">
                    &ldquo;{piece.subtitle}&rdquo;
                  </p>
                </div>

                <p className="text-foreground-secondary font-sans text-xs sm:text-sm md:text-base leading-relaxed uppercase font-medium">
                  {piece.curatorNote}
                </p>

                {/* Curatorial Specifications Tags */}
                <div className="pt-3 border-t border-border-custom/80 flex flex-wrap gap-2">
                  {piece.specifications.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 bg-background border border-border-custom text-[11px] font-mono text-foreground-secondary"
                    >
                      • {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
