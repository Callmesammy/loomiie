"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { LoomieLogoMark } from "./LoomieLogoMark";
import { InteractiveEyeLogoMark } from "./InteractiveEyeLogoMark";

interface AkaruProject {
  id: string;
  number: string;
  slug: string;
  title: string;
  category: string;
  subCategory: string;
  brandStory: string;
  brandStory2?: string;
  year: string;
  image: string;
  bgColor: string;
  textColor: string;
}

const AKARU_PROJECTS: AkaruProject[] = [
  {
    id: "proj-1",
    number: "01",
    slug: "kinetic-play-system",
    title: "Kinetic Play",
    category: "2026 • SPATIAL PLAY",
    subCategory: "KINETIC MODULARITY",
    brandStory: "Modularity is at the heart of our craft. Like building blocks, we engineer fluid design systems that adapt, scale, and captivate across every touchpoint.",
    brandStory2: "By bridging spatial architecture with dynamic digital motion, we transform complex identity requirements into playful, intuitive visual narratives that invite deep user engagement.",
    year: "2026",
    image: "/images/projects/hero-project-2.jpg",
    bgColor: "#0E4C92",
    textColor: "#F5F3EF",
  },
  {
    id: "proj-2",
    number: "02",
    slug: "turn-ideas-into-reality",
    title: "Ideas Into Reality",
    category: "2026 • BRAND SYSTEMS",
    subCategory: "CREATIVE REALIZATION",
    brandStory: "Loomie turns abstract vision into clear, working digital realities. We design every brand element to link together seamlessly making brands instantly understandable.",
    brandStory2: "From strategic positioning to interactive web interfaces, our holistic execution ensures that every client message resonates with maximum clarity and measurable impact.",
    year: "2026",
    image: "/images/projects/hero-project-1.jpg",
    bgColor: "#E6E3D8",
    textColor: "#0E0E0E",
  },
  {
    id: "proj-3",
    number: "03",
    slug: "creative-stormtrooper",
    title: "Stormtrooper Craft",
    category: "2026 • VISUAL CRAFT",
    subCategory: "ART DIRECTION & DESIGN",
    brandStory: "Uncompromising precision and artistic discipline. We approach every canvas with meticulous craft to create lasting, iconic visual legacies.",
    brandStory2: "Rooted in bold design principles and refined technical execution, we construct memorable digital platforms engineered to command attention and endure across evolving trends.",
    year: "2026",
    image: "/images/projects/hero-project-3.jpg",
    bgColor: "#F0ECE1",
    textColor: "#0E0E0E",
  },
  {
    id: "proj-4",
    number: "04",
    slug: "joyful-brand-experience",
    title: "Joyful Experience",
    category: "2026 • DIGITAL EXPERIENCE",
    subCategory: "SENSORY EXPRESSION",
    brandStory: "Design that connects emotionally. We craft sensory brand experiences that spark instant delight, clarity, and enduring client loyalty.",
    brandStory2: "Through thoughtful interaction design, vibrant typography, and micro-animations, we turn routine user journeys into unforgettable brand encounters.",
    year: "2026",
    image: "/images/projects/hero-project-4.jpg",
    bgColor: "#1A1C23",
    textColor: "#F5F3EF",
  },
];

const SLIDE_COLORS = [
  { bg: "#F5F3EF", text: "#0E0E0E" },
  { bg: "#0E4C92", text: "#F5F3EF" },
  { bg: "#E6E3D8", text: "#0E0E0E" },
  { bg: "#F0ECE1", text: "#0E0E0E" },
  { bg: "#1A1C23", text: "#F5F3EF" },
];

export function HorizontalProjectSlider() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentTheme, setCurrentTheme] = useState(SLIDE_COLORS[0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!trigger || !container) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => container.scrollWidth - window.innerWidth;
      const scrollTween = gsap.to(container, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 0.5,
          start: "top top",
          end: () => `+=${getScrollAmount() * 0.75}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const totalItems = AKARU_PROJECTS.length + 1;
            const progress = self.progress;
            const idx = Math.min(totalItems - 1, Math.floor(progress * totalItems));
            setActiveIndex(idx);
            const targetColor = SLIDE_COLORS[idx] || SLIDE_COLORS[0];
            setCurrentTheme(targetColor);

            gsap.to(trigger, {
              backgroundColor: targetColor.bg,
              color: targetColor.text,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        },
      });

      const projectCards = gsap.utils.toArray<HTMLElement>(".akaru-project-card");
      projectCards.forEach((card) => {
        const imageWrap = card.querySelector(".akaru-image-wrap");
        const titleBlock = card.querySelector(".akaru-title-block");

        if (imageWrap) {
          gsap.fromTo(
            imageWrap,
            { scale: 0.94, opacity: 0.8 },
            {
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left right-=20%",
                end: "center center",
                scrub: true,
              },
            }
          );
        }

        if (titleBlock) {
          gsap.fromTo(
            titleBlock,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left center+=20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const isDarkText = currentTheme.text === "#0E0E0E";

  return (
    <section
      ref={triggerRef}
      className="relative w-full h-screen overflow-hidden transition-colors duration-500 font-sans select-none gpu-layer"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      {/* Top Main Navigation Header */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 sm:px-8 py-5 flex items-center justify-between pointer-events-auto">
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform duration-300 active:scale-95"
        >
          <InteractiveEyeLogoMark
            pillColor={isDarkText ? "fill-[#0E0E0E]" : "fill-white"}
            socketColor={isDarkText ? "fill-white" : "fill-[#0C0C0F]"}
            pupilColor={isDarkText ? "fill-[#0E0E0E]" : "fill-white"}
            className="h-7 sm:h-9 w-auto transition-all duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Dynamic Section Indicator Pill */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full border border-current/20 bg-current/5 backdrop-blur-md font-mono text-xs font-bold tracking-widest uppercase transition-all duration-500">
          <span className="w-2 h-2 rounded-full bg-current animate-ping" />
          <span>{activeIndex === 0 ? "STUDIO SHOWCASE" : AKARU_PROJECTS[activeIndex - 1]?.title}</span>
        </div>
      </div>

      {/* Horizontal Track Container */}
      <div className="w-full h-full flex items-center">
        <div
          ref={containerRef}
          className="flex h-full items-center will-change-transform"
        >
          {/* SLIDE 0: Hero Title & Studio Video Showcase */}
          <div className="akaru-project-card flex-none w-[100vw] h-full bg-transparent border-r border-current/15 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-between py-16 sm:py-20 relative select-none">
            {/* Top Spacer for Fixed Header */}
            <div className="h-6 sm:h-10 shrink-0" />

            {/* Headline, Monumental Video Showcase & Intro Text */}
            <div className="my-auto space-y-2.5 sm:space-y-4">
              <h1 className="text-6xl sm:text-[8.5rem] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] font-sans flex items-center gap-1 sm:gap-2">
                <span>L</span>
                <span className="inline-flex items-center justify-center px-0.5 sm:px-1">
                  <InteractiveEyeLogoMark
                    pillColor={isDarkText ? "fill-[#0E0E0E]" : "fill-white"}
                    socketColor={isDarkText ? "fill-white" : "fill-[#0C0C0F]"}
                    pupilColor={isDarkText ? "fill-[#0E0E0E]" : "fill-white"}
                    className="h-[0.68em] w-auto inline-block"
                  />
                </span>
                <span>MIE</span>
              </h1>

              {/* Video Showcase Player */}
              <div className="relative w-full h-[46vh] sm:h-[50vh] lg:h-[40vh] overflow-hidden border border-current/20 shadow-2xl my-1 sm:my-2 group">
                <video
                  src="/make_a_video_with_those_please.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.08] transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-xl opacity-90">
                We are a kinetic web & design agency. Clear. Connected. Complete. Engineering bold spatial concepts and high-converting visual systems.
              </p>

              {/* Social Links Row */}
              <div className="pt-2 sm:pt-3 border-t border-current/15 flex flex-wrap items-center justify-between gap-3 sm:gap-4 font-mono text-xs font-bold tracking-widest shrink-0">
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/byloomie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2 border border-current/20 rounded-full hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 shadow-xs flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/loomieofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 border border-current/20 rounded-full hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 shadow-xs flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/Loomieofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="p-2 border border-current/20 rounded-full hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 shadow-xs flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 text-[10px] opacity-60">
                    <span>SCROLL HORIZONTALLY</span>
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2 pl-4 border-l border-current/20">
                    <LoomieLogoMark className="h-6 w-auto text-current" />
                    <span className="font-sans font-bold text-sm tracking-tight">LOOMIE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDES 1 TO 4: Studio Showcase Cards with Continuation Paragraphs */}
          {AKARU_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="akaru-project-card flex-none w-[100vw] lg:w-[78vw] xl:w-[76vw] h-full bg-transparent border-r border-current/15 flex flex-col justify-start relative overflow-hidden group select-none transition-colors duration-500 gpu-layer"
            >
              {/* Media Showcase Frame — Increased height on mobile view only (h-[54vh]) */}
              <div className="akaru-image-wrap relative w-full h-[54vh] sm:h-[56vh] lg:h-[66vh] mt-0 overflow-hidden border-b border-current/15 origin-top shadow-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  quality={100}
                  priority
                  unoptimized
                  sizes="100vw"
                  className="akaru-image object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Bottom Info Container — Larger Font Sizes to Fill the Mobile Page Cleanly */}
              <div className="akaru-title-block p-4 sm:p-6 lg:p-8 flex flex-col justify-between flex-1 relative gpu-layer pb-8">
                <div className="akaru-category-badge flex flex-wrap items-center justify-between gap-2 font-mono text-sm font-extrabold uppercase tracking-wider">
                  <span className="opacity-95">{project.category}</span>
                  <span className="text-xs opacity-75 hidden sm:inline-block">
                    {project.subCategory}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 items-start pt-1">
                  <div className="lg:col-span-11 space-y-2.5 sm:space-y-3">
                    <h2 className="akaru-project-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-sans leading-tight text-current uppercase">
                      {project.title}
                    </h2>

                    {/* Loomie Brand Story Paragraph 1 — Scaled to text-sm sm:text-base */}
                    <p className="akaru-brand-story font-sans text-sm sm:text-base md:text-lg leading-relaxed opacity-95 font-medium">
                      {project.brandStory}
                    </p>

                    {/* Loomie Brand Story Continuation Paragraph 2 — Scaled to text-sm sm:text-base */}
                    {project.brandStory2 && (
                      <p className="akaru-brand-story-2 font-sans text-sm sm:text-base md:text-lg leading-relaxed opacity-90 font-medium pt-0.5">
                        {project.brandStory2}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
