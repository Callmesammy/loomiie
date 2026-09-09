"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CapsulesStickyColsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introHeadingRef = useRef<HTMLHeadingElement>(null);
  const whyUsTagRef = useRef<HTMLSpanElement>(null);
  const whyUsHeadingRef = useRef<HTMLHeadingElement>(null);
  const whyUsCardsRef = useRef<HTMLDivElement>(null);

  const triggerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);

  // Column 2 Images (Images 1 & 2)
  const colImg1Ref = useRef<HTMLImageElement>(null);
  const colImg2LayerRef = useRef<HTMLDivElement>(null);
  const colImg2Ref = useRef<HTMLImageElement>(null);

  // Column 4 Images (Images 3, 4, 5, 6)
  const colImg3Ref = useRef<HTMLImageElement>(null);
  const colImg4LayerRef = useRef<HTMLDivElement>(null);
  const colImg4Ref = useRef<HTMLImageElement>(null);
  const colImg5LayerRef = useRef<HTMLDivElement>(null);
  const colImg5Ref = useRef<HTMLImageElement>(null);
  const colImg6LayerRef = useRef<HTMLDivElement>(null);
  const colImg6Ref = useRef<HTMLImageElement>(null);

  // Text Wrappers (Cards 2 through 6 in Column 3)
  const textWrap1LinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const textWrap2LinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const textWrap3LinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const textWrap4LinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const textWrap5LinesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Text Data
  const card1Data = {
    title: "Brand Architecture & Visual Systems",
    body: "Crafting logomark geometry, bespoke typography tokens, and unified brand architectures built for high recall.",
  };

  const card2Data = {
    title: "3D WebGL & Motion Engineering",
    body: "Interactive WebGL canvas animations, GSAP physics, and real-time GPU-rendered motion tailored for modern web apps.",
  };

  const card3Data = {
    title: "Tactile Packaging & Surface Graphics",
    body: "Structural packaging finishes, 3D product visualizers, and spatial graphics that command attention on shelves and screens.",
  };

  const card4Data = {
    title: "High-Speed Edge Web Applications",
    body: "Next.js digital storefronts and reactive web apps built on edge pipelines for instantaneous loading and conversion.",
  };

  const card5Data = {
    title: "Strategic Digital Campaigns & Identity",
    body: "Harmonizing visual storytelling, performance analytics, and social identity systems that turn visitors into loyal advocates.",
  };

  const whyWorkWithUsBullets = [
    "Connected Brand Architecture — We bridge visual identity, 3D WebGL motion, and high-performance digital applications into one seamless system.",
    "Direct Specialist Collaboration — Zero bloated agency middle management. Direct execution with senior design engineers and visual strategists.",
    "Bespoke Quality Built to Scale — Custom tactile packaging, high-converting digital storefronts, and design systems tested live across all platforms.",
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const trigger = triggerRef.current;
    if (!container || !trigger) return;

    const ctx = gsap.context(() => {
      // 1. Intro Staggered Text Scroll Animation
      if (introHeadingRef.current) {
        const words = introHeadingRef.current.querySelectorAll(".stagger-word");
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: introHeadingRef.current,
                start: "top bottom-=15%",
                end: "bottom center",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // 2. Standalone Why Work With Us SplitText GSAP Animation (Duration: 0.75s)
      if (whyUsTagRef.current) {
        gsap.fromTo(
          whyUsTagRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whyUsTagRef.current,
              start: "top bottom-=15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (whyUsHeadingRef.current) {
        const words = whyUsHeadingRef.current.querySelectorAll(".why-us-word");
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { yPercent: 120, opacity: 0, rotateX: 35 },
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: whyUsHeadingRef.current,
                start: "top 85%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      }

      if (whyUsCardsRef.current) {
        const cards = whyUsCardsRef.current.querySelectorAll(".why-us-card");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 65, opacity: 0, scale: 0.94 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: whyUsCardsRef.current,
                start: "top 85%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      }

      // 3. Initial Sticky Column States
      if (col1Ref.current) gsap.set(col1Ref.current, { opacity: 1, scale: 1, xPercent: 0, yPercent: 0 });
      if (col2Ref.current) gsap.set(col2Ref.current, { xPercent: 100, opacity: 1, scale: 1, yPercent: 0 });
      if (col3Ref.current) gsap.set(col3Ref.current, { xPercent: 100, yPercent: 100, scale: 1 });
      if (col4Ref.current) gsap.set(col4Ref.current, { xPercent: 100, yPercent: 100, scale: 1 });

      if (colImg1Ref.current) gsap.set(colImg1Ref.current, { scale: 1 });
      if (colImg2LayerRef.current) {
        gsap.set(colImg2LayerRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
      }
      if (colImg2Ref.current) gsap.set(colImg2Ref.current, { scale: 1.25 });

      if (colImg3Ref.current) gsap.set(colImg3Ref.current, { scale: 1 });
      if (colImg4LayerRef.current) {
        gsap.set(colImg4LayerRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
      }
      if (colImg4Ref.current) gsap.set(colImg4Ref.current, { scale: 1.25 });

      if (colImg5LayerRef.current) {
        gsap.set(colImg5LayerRef.current, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
      }
      if (colImg5Ref.current) gsap.set(colImg5Ref.current, { scale: 1.25 });

      if (colImg6LayerRef.current) {
        gsap.set(colImg6LayerRef.current, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });
      }
      if (colImg6Ref.current) gsap.set(colImg6Ref.current, { scale: 1.25 });

      // Initial Text Lines Positions inside Column 3
      textWrap1LinesRef.current.forEach((line) => {
        if (line) gsap.set(line, { yPercent: 0 });
      });
      textWrap2LinesRef.current.forEach((line) => {
        if (line) gsap.set(line, { yPercent: 125 });
      });
      textWrap3LinesRef.current.forEach((line) => {
        if (line) gsap.set(line, { yPercent: 125 });
      });
      textWrap4LinesRef.current.forEach((line) => {
        if (line) gsap.set(line, { yPercent: 125 });
      });
      textWrap5LinesRef.current.forEach((item) => {
        if (item) gsap.set(item, { yPercent: 125, opacity: 0 });
      });

      // 4. Dynamic Sticky Scrubbed Timeline (Every Single Phase Moves Capsules)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          start: "top top",
          end: "+=550%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // --- PHASE 1: Step 1 -> Step 2 (Col 1 scales away, Col 2 slides in, Col 3 slides UP from bottom) ---
      tl.to(col1Ref.current, { opacity: 0, scale: 0.7, xPercent: -20, duration: 0.8, ease: "power2.inOut" }, "phase1")
        .to(col2Ref.current, { xPercent: 0, duration: 1.0, ease: "power2.inOut" }, "phase1")
        .to(col3Ref.current, { yPercent: 0, duration: 1.0, ease: "power2.inOut" }, "phase1")
        .to(colImg1Ref.current, { scale: 1.2, duration: 1.0, ease: "power2.inOut" }, "phase1")
        .to(
          colImg2LayerRef.current,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.0, ease: "power2.inOut" },
          "phase1"
        )
        .to(colImg2Ref.current, { scale: 1.0, duration: 1.0, ease: "power2.inOut" }, "phase1");

      tl.to({}, { duration: 0.2 });

      // --- PHASE 2: Step 2 -> Step 3 (Col 2 scales away, Col 3 slides LEFT, Col 4 slides UP from bottom) ---
      tl.to(col2Ref.current, { opacity: 0, scale: 0.7, xPercent: 20, duration: 0.8, ease: "power2.inOut" }, "phase2")
        .to(col3Ref.current, { xPercent: 0, duration: 1.0, ease: "power2.inOut" }, "phase2")
        .to(col4Ref.current, { yPercent: 0, duration: 1.0, ease: "power2.inOut" }, "phase2");

      const validText1 = textWrap1LinesRef.current.filter(Boolean);
      if (validText1.length > 0) {
        tl.to(validText1, { yPercent: -125, duration: 0.7, stagger: 0.04, ease: "power2.inOut" }, "phase2");
      }

      const validText2 = textWrap2LinesRef.current.filter(Boolean);
      if (validText2.length > 0) {
        tl.to(validText2, { yPercent: 0, duration: 0.7, stagger: 0.04, ease: "power2.inOut" }, "phase2+=0.2");
      }

      tl.to({}, { duration: 0.2 });

      // --- PHASE 3: Step 3 -> Step 4 ---
      tl.to(colImg3Ref.current, { scale: 1.25, duration: 1.0, ease: "power2.inOut" }, "phase3")
        .to(
          colImg4LayerRef.current,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.0, ease: "power2.inOut" },
          "phase3"
        )
        .to(colImg4Ref.current, { scale: 1.0, duration: 1.0, ease: "power2.inOut" }, "phase3");

      if (validText2.length > 0) {
        tl.to(validText2, { yPercent: -125, duration: 0.7, stagger: 0.04, ease: "power2.inOut" }, "phase3");
      }

      const validText3 = textWrap3LinesRef.current.filter(Boolean);
      if (validText3.length > 0) {
        tl.to(validText3, { yPercent: 0, duration: 0.7, stagger: 0.04, ease: "power2.inOut" }, "phase3+=0.2");
      }

      tl.to({}, { duration: 0.2 });

      // --- PHASE 4: Step 4 -> Step 5 ---
      tl.to(colImg4Ref.current, { scale: 1.25, duration: 1.0, ease: "power2.inOut" }, "phase4")
        .to(
          colImg5LayerRef.current,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.0, ease: "power2.inOut" },
          "phase4"
        )
        .to(colImg5Ref.current, { scale: 1.0, duration: 1.0, ease: "power2.inOut" }, "phase4");

      if (validText3.length > 0) {
        tl.to(validText3, { yPercent: -125, duration: 0.7, stagger: 0.04, ease: "power2.inOut" }, "phase4");
      }

      const validText4 = textWrap4LinesRef.current.filter(Boolean);
      if (validText4.length > 0) {
        tl.to(validText4, { yPercent: 0, duration: 0.7, stagger: 0.04, ease: "power2.inOut" }, "phase4+=0.2");
      }

      tl.to({}, { duration: 0.2 });

      // --- PHASE 5: Step 5 -> Step 6 ---
      tl.to(colImg5Ref.current, { scale: 1.25, duration: 1.0, ease: "power2.inOut" }, "phase5")
        .to(
          colImg6LayerRef.current,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.0, ease: "power2.inOut" },
          "phase5"
        )
        .to(colImg6Ref.current, { scale: 1.0, duration: 1.0, ease: "power2.inOut" }, "phase5");

      if (validText4.length > 0) {
        tl.to(validText4, { yPercent: -125, duration: 0.7, stagger: 0.04, ease: "power2.inOut" }, "phase5");
      }

      const validText5 = textWrap5LinesRef.current.filter(Boolean);
      if (validText5.length > 0) {
        tl.to(
          validText5,
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power2.inOut" },
          "phase5+=0.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  let lineIdx1 = 0;
  let lineIdx2 = 0;
  let lineIdx3 = 0;
  let lineIdx4 = 0;
  let lineIdx5 = 0;

  return (
    <div ref={containerRef} className="w-full bg-[#141414] text-[#f1f1f1] overflow-hidden select-none font-sans">
      {/* Dynamic Barlow & Instrument Font Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900&family=Instrument+Sans:wght@400;500;600;700&display=swap");
        .barlow-font {
          font-family: "Barlow Condensed", sans-serif;
        }
        .instrument-font {
          font-family: "Instrument Sans", sans-serif;
        }
      `}</style>

      {/* 1. INTRO SECTION (Staggered Word Reveal on Scroll) */}
      <section className="relative w-full h-screen bg-[#141414] text-[#f1f1f1] flex items-center justify-center p-6 sm:p-12 z-10 border-b border-white/10">
        <h1
          ref={introHeadingRef}
          className="barlow-font text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center uppercase tracking-tight max-w-5xl leading-[0.92] text-[#f1f1f1] flex flex-wrap justify-center gap-x-[0.25em] gap-y-1"
        >
          {"CRAFTING ICONIC BRAND & DIGITAL EXPERIENCES THAT MAKE PEOPLE LOOK TWICE.".split(" ").map((word, wIdx) => (
            <span key={wIdx} className="inline-block overflow-hidden pb-1">
              <span className="inline-block stagger-word transform-gpu">{word}</span>
            </span>
          ))}
        </h1>
      </section>

      {/* 2. STICKY ANIMATED 4-COLUMN CAPSULES SECTION (6 IMAGES TOTAL, DYNAMIC POSITION MOVEMENTS) */}
      <section
        ref={triggerRef}
        className="sticky-cols relative w-full h-screen p-2 sm:p-4 bg-[#141414] text-[#f1f1f1] overflow-hidden z-20"
      >
        <div className="relative w-full h-full overflow-hidden">
          
          {/* COLUMN 1: LEFT SIDE INTRO CAPSULE (Image 1 Pair: Cloud Architecture & Strategy) */}
          <div
            ref={col1Ref}
            className="absolute top-0 left-0 w-full md:w-[50%] h-full p-2 origin-center transform-gpu z-10"
          >
            <div className="w-full h-full bg-[#282828] border border-white/15 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden shadow-2xl">
              <div className="space-y-6 my-auto">
                <h1 className="barlow-font text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-[0.92] text-[#f1f1f1]">
                  {card1Data.title}
                </h1>
                <p className="instrument-font font-medium text-sm sm:text-base md:text-lg text-[#a1a1a1] max-w-lg leading-relaxed">
                  {card1Data.body}
                </p>
              </div>

              <div className="font-mono text-xs text-[#a1a1a1] uppercase tracking-widest pt-4 border-t border-white/10">
                LOOMIE BRAND ARCHITECTURE
              </div>
            </div>
          </div>

          {/* COLUMN 2: RIGHT SIDE SHOWCASE IMAGES (Image 1 & Image 2 Layer Clip Reveal) */}
          <div
            ref={col2Ref}
            className="absolute top-0 left-0 w-full md:w-[50%] h-full p-2 origin-center transform-gpu z-20"
          >
            <div className="relative w-full h-full bg-[#282828] border border-white/15 rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* Image 1 Layer */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  ref={colImg1Ref}
                  src="/cloud-architecture/card1-architecture.jpg"
                  alt="Brand Architecture & Visual Systems Showcase"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform-gpu"
                />
              </div>

              {/* Image 2 Layer (Polygon Clip-Path Reveal) */}
              <div
                ref={colImg2LayerRef}
                className="absolute inset-0 w-full h-full overflow-hidden z-10 transform-gpu"
              >
                <Image
                  ref={colImg2Ref}
                  src="/cloud-architecture/card2-migration.jpg"
                  alt="3D WebGL & Motion Engineering Showcase"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform-gpu"
                />
              </div>
            </div>
          </div>

          {/* COLUMN 3: TEXT SWAP CAPSULE (Text Cards 2 through 6) */}
          <div
            ref={col3Ref}
            className="absolute top-0 left-0 w-full md:w-[50%] h-full p-2 origin-center transform-gpu z-30"
          >
            <div className="relative w-full h-full bg-[#282828] border border-white/15 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl flex flex-col justify-between">
              
              {/* Text Wrapper 1 (Image 2 Pair: 3D WebGL & Motion Engineering) */}
              <div className="relative w-full my-auto space-y-4 z-10">
                <div className="overflow-hidden">
                  <span
                    ref={(el) => {
                      textWrap1LinesRef.current[lineIdx1++] = el;
                    }}
                    className="block barlow-font text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-[0.92] text-[#f1f1f1] transform-gpu"
                  >
                    {card2Data.title}
                  </span>
                </div>

                <div className="overflow-hidden pt-2">
                  <span
                    ref={(el) => {
                      textWrap1LinesRef.current[lineIdx1++] = el;
                    }}
                    className="block instrument-font font-medium text-xs sm:text-base text-[#a1a1a1] leading-relaxed transform-gpu"
                  >
                    {card2Data.body}
                  </span>
                </div>
              </div>

              {/* Text Wrapper 2 (Image 3 Pair: Serverless & AI-Powered Development) */}
              <div className="absolute inset-0 w-full h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between pointer-events-none z-20">
                <span className="opacity-0">HEADER PLACEHOLDER</span>

                <div className="space-y-4 my-auto">
                  <div className="overflow-hidden">
                    <span
                      ref={(el) => {
                        textWrap2LinesRef.current[lineIdx2++] = el;
                      }}
                      className="block barlow-font text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-[0.92] text-[#f1f1f1] transform-gpu"
                    >
                      {card3Data.title}
                    </span>
                  </div>

                  <div className="overflow-hidden pt-2">
                    <span
                      ref={(el) => {
                        textWrap2LinesRef.current[lineIdx2++] = el;
                      }}
                      className="block instrument-font font-medium text-xs sm:text-base text-[#a1a1a1] leading-relaxed transform-gpu"
                    >
                      {card3Data.body}
                    </span>
                  </div>
                </div>

                <span className="opacity-0">FOOTER PLACEHOLDER</span>
              </div>

              {/* Text Wrapper 3 (Image 4 Pair: Cloud Alliance & Partnership Advisory) */}
              <div className="absolute inset-0 w-full h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between pointer-events-none z-30">
                <span className="opacity-0">HEADER PLACEHOLDER</span>

                <div className="space-y-4 my-auto">
                  <div className="overflow-hidden">
                    <span
                      ref={(el) => {
                        textWrap3LinesRef.current[lineIdx3++] = el;
                      }}
                      className="block barlow-font text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-[0.92] text-[#f1f1f1] transform-gpu"
                    >
                      {card4Data.title}
                    </span>
                  </div>

                  <div className="overflow-hidden pt-2">
                    <span
                      ref={(el) => {
                        textWrap3LinesRef.current[lineIdx3++] = el;
                      }}
                      className="block instrument-font font-medium text-xs sm:text-base text-[#a1a1a1] leading-relaxed transform-gpu"
                    >
                      {card4Data.body}
                    </span>
                  </div>
                </div>

                <span className="opacity-0">FOOTER PLACEHOLDER</span>
              </div>

              {/* Text Wrapper 4 (Image 5 Pair: Managed Cloud Support) */}
              <div className="absolute inset-0 w-full h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between pointer-events-none z-40">
                <span className="opacity-0">HEADER PLACEHOLDER</span>

                <div className="space-y-4 my-auto">
                  <div className="overflow-hidden">
                    <span
                      ref={(el) => {
                        textWrap4LinesRef.current[lineIdx4++] = el;
                      }}
                      className="block barlow-font text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-[0.92] text-[#f1f1f1] transform-gpu"
                    >
                      {card5Data.title}
                    </span>
                  </div>

                  <div className="overflow-hidden pt-2">
                    <span
                      ref={(el) => {
                        textWrap4LinesRef.current[lineIdx4++] = el;
                      }}
                      className="block instrument-font font-medium text-xs sm:text-base text-[#a1a1a1] leading-relaxed transform-gpu"
                    >
                      {card5Data.body}
                    </span>
                  </div>
                </div>

                <span className="opacity-0">FOOTER PLACEHOLDER</span>
              </div>

              {/* Text Wrapper 5 (Image 6 Pair: Why Work With Us) */}
              <div className="absolute inset-0 w-full h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between pointer-events-none z-50">
                <span className="opacity-0">HEADER PLACEHOLDER</span>

                <div className="space-y-4 my-auto">
                  <div className="overflow-hidden">
                    <div
                      ref={(el) => {
                        textWrap5LinesRef.current[lineIdx5++] = el;
                      }}
                      className="transform-gpu"
                    >
                      <h2 className="barlow-font text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-[0.92] text-[#f1f1f1]">
                        Why Work With Us
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    {whyWorkWithUsBullets.map((bullet, bIdx) => (
                      <div
                        key={bIdx}
                        ref={(el) => {
                          textWrap5LinesRef.current[lineIdx5++] = el;
                        }}
                        className="flex items-start gap-3 transform-gpu"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#f75828] mt-1.5 shrink-0" />
                        <p className="instrument-font font-medium text-xs sm:text-sm md:text-base text-[#d1d1d1] leading-snug">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <span className="opacity-0">FOOTER PLACEHOLDER</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: RIGHT SIDE SHOWCASE IMAGES (Images 3, 4, 5, 6 Layers) */}
          <div
            ref={col4Ref}
            className="absolute top-0 left-0 w-full md:w-[50%] h-full p-2 origin-center transform-gpu z-40"
          >
            <div className="relative w-full h-full bg-[#282828] border border-white/15 rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* Image 3 Layer */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  ref={colImg3Ref}
                  src="/cloud-architecture/card3-serverless-ai.jpg"
                  alt="Tactile Packaging & Surface Graphics Showcase"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform-gpu"
                />
              </div>

              {/* Image 4 Layer (Polygon Clip-Path Reveal) */}
              <div
                ref={colImg4LayerRef}
                className="absolute inset-0 w-full h-full overflow-hidden z-10 transform-gpu"
              >
                <Image
                  ref={colImg4Ref}
                  src="/cloud-architecture/card4-partnership.jpg"
                  alt="High-Speed Edge Web Applications Showcase"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform-gpu"
                />
              </div>

              {/* Image 5 Layer (Polygon Clip-Path Reveal) */}
              <div
                ref={colImg5LayerRef}
                className="absolute inset-0 w-full h-full overflow-hidden z-20 transform-gpu"
              >
                <Image
                  ref={colImg5Ref}
                  src="/cloud-architecture/card5-managed-support.jpg"
                  alt="Strategic Digital Campaigns Showcase"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform-gpu"
                />
              </div>

              {/* Image 6 Layer (Polygon Clip-Path Reveal) */}
              <div
                ref={colImg6LayerRef}
                className="absolute inset-0 w-full h-full overflow-hidden z-30 transform-gpu"
              >
                <Image
                  ref={colImg6Ref}
                  src="/cloud-architecture/card6-why-us.jpg"
                  alt="Why Work With Us Showcase"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform-gpu"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. WHY WORK WITH US SECTION (Left-Aligned, Staggered GSAP Scroll Up & Down Animation) */}
      <section className="relative w-full min-h-screen bg-[#141414] text-[#f1f1f1] p-6 sm:p-12 lg:p-20 flex flex-col justify-center items-start z-10 border-t border-white/10">
        <div className="max-w-5xl w-full mx-auto space-y-10">
          <div className="space-y-4 text-left">
            <span
              ref={whyUsTagRef}
              className="inline-block font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#f75828] transform-gpu"
            >
              LOOMIE ADVANTAGE
            </span>
            <h2
              ref={whyUsHeadingRef}
              className="barlow-font text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase leading-[0.92] text-[#f1f1f1] flex flex-wrap justify-start gap-x-[0.25em] gap-y-1 perspective-1000"
            >
              {"WHY WORK WITH US".split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block overflow-hidden pb-1">
                  <span className="inline-block why-us-word transform-gpu">{word}</span>
                </span>
              ))}
            </h2>
          </div>

          <div ref={whyUsCardsRef} className="space-y-6 pt-4 w-full">
            {whyWorkWithUsBullets.map((bullet, bIdx) => (
              <div
                key={bIdx}
                className="why-us-card p-6 sm:p-8 md:p-10 bg-[#282828] border border-white/15 rounded-2xl sm:rounded-3xl flex items-start gap-5 shadow-xl hover:border-[#f75828]/50 transition-all duration-500 group transform-gpu"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#f75828] mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                <p className="instrument-font font-medium text-base sm:text-xl lg:text-2xl text-[#f1f1f1] leading-relaxed">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
