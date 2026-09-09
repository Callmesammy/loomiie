"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { LoomieLogoMark } from "./LoomieLogoMark";
import { getCloudinaryUrl } from "@/lib/cloudinary";

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
    id: "proj-crunchy",
    number: "01",
    slug: "crunchy-brand",
    title: "Crunchy",
    category: "2026 • PACKAGING & BRANDING",
    subCategory: "TACTILE BRAND IDENTITY",
    brandStory: "High-contrast tactile snack packaging, brand design tokens, and interactive digital storefront.",
    brandStory2: "Crafted custom 3D packaging renders, tactile label finishes, and an interactive store that boosted customer engagement.",
    year: "2026",
    image: getCloudinaryUrl("crunchy-1.jpg"),
    bgColor: "#E6E3D8",
    textColor: "#0E0E0E",
  },
  {
    id: "proj-banana",
    number: "02",
    slug: "banana-health",
    title: "Banana Health",
    category: "2026 • LOGO & BRANDING",
    subCategory: "TELEHEALTH DESIGN TOKENS",
    brandStory: "Modern wellness identity, iconic symbolic mark, and design tokens for telehealth platform.",
    brandStory2: "Created a warm, cheerful color palette, custom type tokens, and a versatile symbolic logo mark.",
    year: "2026",
    image: "/cloud-architecture/card1-architecture.jpg",
    bgColor: "#F5F3EF",
    textColor: "#0E0E0E",
  },
  {
    id: "proj-apple-drink",
    number: "03",
    slug: "apple-drink",
    title: "Apple Drink",
    category: "2026 • MOTION & VISUAL IDENTITY",
    subCategory: "3D MOTION & PACKAGING",
    brandStory: "Refreshing visual identity and 3D kinetic video motion animation engineered for a global beverage launch.",
    brandStory2: "Vibrant tactile packaging renders and dynamic digital campaign assets engineered for over 14.2M video impressions.",
    year: "2026",
    image: "/Apple Drink/Gemini_Generated_Image_bzwot3bzwot3bzwo.jpg",
    bgColor: "#0E4C92",
    textColor: "#F5F3EF",
  },
  {
    id: "proj-ping",
    number: "04",
    slug: "ping",
    title: "Ping Social",
    category: "2026 • UI/UX ARCHITECTURE",
    subCategory: "SOCIAL APP DESIGN SYSTEM",
    brandStory: "Ultra-responsive social interaction platform designed with elegant dark mode aesthetic and real-time connectivity.",
    brandStory2: "Engineered high-fidelity dark theme design tokens and fluid user journey maps built for over 1M+ daily user interactions.",
    year: "2026",
    image: "/Ping/Screenshot (949).png",
    bgColor: "#111827",
    textColor: "#F5F3EF",
  },
  {
    id: "proj-luxury-hotel",
    number: "05",
    slug: "luxury-hotel",
    title: "Vine Luxury Hotel",
    category: "2026 • LUXURY HOSPITALITY",
    subCategory: "SPATIAL & BRAND ARCHITECTURE",
    brandStory: "Ultra-luxury boutique hotel visual identity and immersive spatial web experience for high-net-worth global travelers.",
    brandStory2: "Custom typography tokens, tactile reservation journeys, and elegant dark aesthetics built for maximum conversion.",
    year: "2026",
    image: "/cloud-architecture/card6-why-us.jpg",
    bgColor: "#18181B",
    textColor: "#F5F3EF",
  },
];

const SLIDE_COLORS = [
  { bg: "#E6E3D8", text: "#0E0E0E" },
  { bg: "#F5F3EF", text: "#0E0E0E" },
  { bg: "#0E4C92", text: "#F5F3EF" },
  { bg: "#111827", text: "#F5F3EF" },
  { bg: "#18181B", text: "#F5F3EF" },
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
      let lastIndex = -1;

      // Master Scroll Timeline for smooth horizontal slide scrubbing
      const scrollTween = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1.0,
          start: "top top",
          end: () => `+=${getScrollAmount() * 1.1}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const totalItems = AKARU_PROJECTS.length;
            const progress = self.progress;
            const idx = Math.min(totalItems - 1, Math.floor(progress * totalItems));

            if (idx !== lastIndex) {
              lastIndex = idx;
              setActiveIndex(idx);
              const targetColor = SLIDE_COLORS[idx] || SLIDE_COLORS[0];
              setCurrentTheme(targetColor);

              gsap.to(trigger, {
                backgroundColor: targetColor.bg,
                color: targetColor.text,
                duration: 0.8,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            }
          },
        },
      });

      // Sequential Slide Movement
      const totalProjects = AKARU_PROJECTS.length;
      for (let i = 1; i < totalProjects; i++) {
        const targetProgress = i / (totalProjects - 1);

        scrollTween.to(container, {
          x: () => -getScrollAmount() * targetProgress,
          ease: "power2.inOut",
          duration: 1.2,
        });

        scrollTween.to({}, { duration: 0.6, ease: "power2.inOut" });
      }

      const projectCards = gsap.utils.toArray<HTMLElement>(".akaru-project-card");
      projectCards.forEach((card) => {
        const imageWrap = card.querySelector(".akaru-image-wrap");
        const innerImg = card.querySelector("img, video");

        if (imageWrap && innerImg) {
          gsap.fromTo(
            innerImg,
            { scale: 1.2, rotate: -2 },
            {
              scale: 1,
              rotate: 0,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left right",
                end: "center center",
                scrub: true,
              },
            }
          );
        }

        const projectNum = card.querySelector(".akaru-project-num");
        const projectTitle = card.querySelector(".akaru-project-title");
        const projectDesc = card.querySelector(".akaru-project-desc");

        if (projectNum) {
          gsap.fromTo(
            projectNum,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left center+=30%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }

        if (projectTitle) {
          gsap.fromTo(
            projectTitle,
            { y: 50, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left center+=25%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }

        if (projectDesc) {
          gsap.fromTo(
            projectDesc,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left center+=20%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      className="relative w-full h-screen overflow-hidden transition-colors duration-500 font-sans select-none gpu-layer"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      {/* Horizontal Track Container */}
      <div className="w-full h-full flex items-center">
        <div
          ref={containerRef}
          className="flex h-full items-center will-change-transform"
        >
          {/* SLIDES: Studio Showcase Cards */}
          {AKARU_PROJECTS.map((project, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={project.id}
                className="akaru-project-card flex-none w-[100vw] lg:w-[78vw] xl:w-[74vw] h-full border-r border-current/15 pt-6 sm:pt-10 px-4 sm:px-10 lg:px-14 pb-8 flex flex-col justify-between relative z-10 gpu-layer"
              >
                {/* Project Header Meta Bar */}
                <div className="flex items-center justify-between font-mono border-b border-current/15 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="akaru-project-num text-xs sm:text-sm font-bold px-3 py-1 border border-current/30 rounded-full">
                      {project.number}
                    </span>
                    <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold tracking-widest opacity-60 uppercase hidden sm:inline">
                    LOOMIE CASE STUDY
                  </span>
                </div>

                {/* Main Card Content */}
                <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center py-4">
                  {/* Left Column: Case Study Info */}
                  <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <span className="font-mono text-xs font-bold text-current/60 uppercase tracking-widest">
                        {project.subCategory}
                      </span>
                      <h2 className="akaru-project-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] font-sans">
                        {project.title}
                      </h2>
                    </div>

                    <p className="akaru-project-desc font-sans text-sm sm:text-base lg:text-lg leading-relaxed opacity-85">
                      {project.brandStory}
                    </p>

                    {project.brandStory2 && (
                      <p className="font-sans text-xs sm:text-sm leading-relaxed opacity-70 hidden sm:block">
                        {project.brandStory2}
                      </p>
                    )}

                    <div className="pt-2">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-3 px-6 py-3 border border-current rounded-full font-mono text-xs font-bold uppercase tracking-wider hover:bg-current hover:text-white transition-all duration-300 group cursor-pointer shadow-md"
                        style={{
                          color: isActive ? project.textColor : "inherit",
                        }}
                      >
                        <span>EXPLORE CASE STUDY</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: High Impact Image Frame */}
                  <div className="lg:col-span-7">
                    <Link href={`/work/${project.slug}`} className="block group cursor-pointer">
                      <div className="akaru-image-wrap relative w-full h-[280px] sm:h-[380px] lg:h-[460px] rounded-2xl overflow-hidden border border-current/20 shadow-2xl bg-stone-900">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                        
                        <div className="absolute top-4 left-4 font-mono text-xs font-bold px-3 py-1 bg-black/80 text-white backdrop-blur-md rounded-xs">
                          {`${project.number} // ${project.year}`}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Bottom Footer Telemetry */}
                <div className="border-t border-current/15 pt-4 flex items-center justify-between font-mono text-xs opacity-70">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span>PROJECT {index + 1} OF {AKARU_PROJECTS.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LoomieLogoMark className="h-4 w-auto text-current" />
                    <span>LOOMIE 2026</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
