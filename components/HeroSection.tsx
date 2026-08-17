"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

interface HeroSlide {
  id: string;
  num: string;
  title: string;
  image: string;
  href: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    num: "01",
    title: "Kinetic Design Systems",
    image: "/images/hero-3d-fluid.jpg",
    href: "/work/lumino-3d-kinetic",
  },
  {
    id: "slide-2",
    num: "02",
    title: "Titanium Spatial Hardware",
    image: "/images/project-minimal.jpg",
    href: "/work/vortex-matte-titanium",
  },
  {
    id: "slide-3",
    num: "03",
    title: "Brutalist Spatial Pavilion",
    image: "/images/project-spatial.jpg",
    href: "/work/brutalist-spatial-pavilion",
  },
  {
    id: "slide-4",
    num: "04",
    title: "Cybernetic System HUD",
    image: "/images/project-digital.jpg",
    href: "/work/sat-cybernetic-hud",
  },
  {
    id: "slide-5",
    num: "05",
    title: "Editorial Brand Identity",
    image: "/images/project-editorial.jpg",
    href: "/work/lumino-3d-kinetic",
  },
];

/**
 * Ultra-Clean, Bright Luxury GSAP ScrollTrigger Pinned Section
 * - Bright warm studio substrate (#F5F3EF) with high contrast #0E0E0E typography
 * - Pure minimalism: Removed cluttered paragraph text, metadata pills, and dark overlays
 * - Dual outer & inner yPercent clip transitions (100% -> 0 / -100% -> 0)
 * - Parallax image scrub (-15% yPercent)
 * - Randomized character stagger reveal
 */
export function HeroSection() {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pinContainer = pinContainerRef.current;
    if (!pinContainer) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".hero-scroll-section");
      const images = gsap.utils.toArray<HTMLElement>(".hero-bg-img");
      const outerWrappers = gsap.utils.toArray<HTMLElement>(".hero-outer");
      const innerWrappers = gsap.utils.toArray<HTMLElement>(".hero-inner");
      const headings = gsap.utils.toArray<HTMLElement>(".section-heading");

      // Character elements array
      const splitCharsList = headings.map((heading) => {
        return Array.from(heading.querySelectorAll(".char-item"));
      });

      // Initial positions
      sections.forEach((sec, i) => {
        if (i === 0) {
          gsap.set(sec, { autoAlpha: 1, zIndex: 1 });
          gsap.set(outerWrappers[i], { yPercent: 0 });
          gsap.set(innerWrappers[i], { yPercent: 0 });
          gsap.set(images[i], { yPercent: 0 });
          gsap.set(splitCharsList[i], { autoAlpha: 1, yPercent: 0 });
        } else {
          gsap.set(sec, { autoAlpha: 0, zIndex: 0 });
          gsap.set(outerWrappers[i], { yPercent: 100 });
          gsap.set(innerWrappers[i], { yPercent: -100 });
          gsap.set(images[i], { yPercent: 15 });
          gsap.set(splitCharsList[i], { autoAlpha: 0, yPercent: 150 });
        }
      });

      // Master Pinned ScrollTrigger Timeline
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer,
          start: "top top",
          end: `+=${sections.length * 100}%`,
          pin: true,
          scrub: 0.8,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (sections.length - 1));
            setActiveSlide(idx);
          },
        },
      });

      // Build layered slide transitions
      sections.forEach((sec, i) => {
        if (i === 0) return;

        const prevIdx = i - 1;

        masterTL
          // Previous slide parallax exit
          .to(images[prevIdx], { yPercent: -15, duration: 1, ease: "power1.inOut" }, `slide-${i}`)
          .set(sections[prevIdx], { autoAlpha: 0 }, `slide-${i}+=0.9`)

          // Current slide entrance
          .set(sections[i], { autoAlpha: 1, zIndex: i + 1 }, `slide-${i}`)
          .to(
            [outerWrappers[i], innerWrappers[i]],
            {
              yPercent: 0,
              duration: 1,
              ease: "power1.inOut",
            },
            `slide-${i}`
          )
          .to(images[i], { yPercent: 0, duration: 1, ease: "power1.inOut" }, `slide-${i}`)

          // Randomized character stagger reveal
          .to(
            splitCharsList[i],
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: {
                each: 0.02,
                from: "random",
              },
            },
            `slide-${i}+=0.2`
          );
      });
    }, pinContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pinContainerRef}
      className="relative w-full h-screen overflow-hidden bg-[#F5F3EF] text-[#0E0E0E] select-none"
    >
      {/* 1. SLIDE SECTIONS STACK */}
      {HERO_SLIDES.map((slide, slideIdx) => (
        <section
          key={slide.id}
          className="hero-scroll-section absolute inset-0 w-full h-full overflow-hidden z-0"
        >
          <div className="hero-outer outer w-full h-full overflow-hidden">
            <div className="hero-inner inner w-full h-full overflow-hidden">
              {/* Bright Showcase Media Frame Container */}
              <div className="hero-bg-img bg absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slideIdx === 0}
                  className="object-cover object-center filter brightness-[0.88] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F5F3EF] via-[#F5F3EF]/30 to-transparent" />
              </div>

              {/* Ultra-Clean Bright Slide Content Overlay */}
              <div className="relative z-10 w-full h-full max-w-[1700px] mx-auto px-6 sm:px-12 md:px-16 py-24 sm:py-32 flex flex-col justify-end">
                {/* Monumental Clean Character Headline */}
                <div className="space-y-6 max-w-5xl mb-12">
                  <h1 style={{ fontVariant: "small-caps" }} className="section-heading text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-wide font-sans text-[#0E0E0E] leading-[0.9] overflow-hidden drop-shadow-sm">
                    {slide.title.split(" ").map((word, wIdx) => (
                      <span key={wIdx} className="inline-block mr-[0.3em] overflow-hidden py-1">
                        {word.split("").map((char, cIdx) => (
                          <span
                            key={cIdx}
                            className="char-item inline-block transform-gpu"
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    ))}
                  </h1>

                  {/* Clean Action CTA Button */}
                  <div className="pt-2">
                    <Link
                      href={slide.href}
                      className="group relative inline-flex items-center gap-4 px-9 py-4.5 bg-[#0E0E0E] text-white font-mono text-xs font-semibold tracking-widest shadow-2xl transition-all duration-300 hover:bg-[#E49366]"
                    >
                      <span style={{ fontVariant: "small-caps" }}>Explore Work</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* 2. MINIMALIST NAVIGATION INDICATOR */}
      <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`w-3 h-3 rounded-full transition-all duration-300 border ${
              activeSlide === idx
                ? "bg-[#0E0E0E] border-[#0E0E0E] scale-125 shadow-md"
                : "bg-black/20 border-black/30"
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
