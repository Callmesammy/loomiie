"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

interface ServicePanel {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  deliverables: string[];
}

const SERVICE_PANELS: ServicePanel[] = [
  {
    id: "entrepreneurs",
    number: "01",
    title: "ENTREPRENEURS & FOUNDERS",
    description:
      "FOUNDERS BUILDING SOMETHING NEW WHO NEED A BRAND THAT EARNS TRUST FROM FIRST GLANCE. WE DESIGN STRATEGIC IDENTITIES AND DIGITAL SYSTEMS THAT TURN AMBITIOUS IDEAS INTO INSTANTLY RECOGNIZABLE BRANDS.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "DISCOVERY & BRAND POSITIONING",
      "MOODBOARD & VISUAL DIRECTION",
      "TYPOGRAPHY & SYMBOL ARCHITECTURE",
      "ICON & WORDMARK VARIANTS",
      "FOUNDER PITCH & DECK SYSTEM",
      "LAUNCH GUIDELINES & FILE EXPORT",
    ],
  },
  {
    id: "products",
    number: "02",
    title: "PRODUCT-BASED BUSINESSES",
    description:
      "YOUR PACKAGING IS OFTEN THE FIRST THING PEOPLE NOTICE, SO IT HAS TO MAKE A GREAT IMPRESSION. WE DESIGN PACKAGING THAT LOOKS GOOD, FEELS RIGHT, AND REFLECTS YOUR BRAND CLEARLY ACROSS SHELVES, UNBOXING, AND ONLINE STORES.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "STRUCTURAL PACKAGING CONSULTATIONS",
      "LABEL & SURFACE GRAPHIC DESIGN",
      "TYPOGRAPHY & MATERIAL RESEARCH",
      "3D MOCKUPS & PRINT-READY FILES",
      "UNBOXING EXPERIENCE RITUAL",
      "PRINTER COORDINATION & SPECIFICATIONS",
    ],
  },
  {
    id: "digital",
    number: "03",
    title: "DIGITAL-FIRST COMPANIES",
    description:
      "TEAMS REFINING UI/UX AND ONLINE PRESENCE WITH THOUGHTFUL, USER-FOCUSED DESIGN. WE CRAFT KINETIC WEB APPLICATIONS, FLUID 3D INTERFACES, AND COMPREHENSIVE DESIGN SYSTEMS BUILT FOR SCALING ENTERPRISES.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "KINETIC WEB APPLICATION DEV",
      "USER-FOCUSED UI/UX SYSTEMS",
      "WEBGL & MOTION SHADER REALMS",
      "COMPONENT LIBRARIES & DESIGN TOKENS",
      "HIGH FRAME-RATE SMOOTH ANIMATIONS",
      "SEO & PERFORMANCE OPTIMIZATION",
    ],
  },
];

export function WhoWeBuildForSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!panels.length || !pinWrapperRef.current) return;

      // Set initial state: panel 0 visible at yPercent 0, panels 1 & 2 positioned below at yPercent 100
      panels.forEach((panel, i) => {
        if (i > 0) {
          gsap.set(panel, { yPercent: 105 });
        }
      });

      // Pin the section & animate panels sliding up to cover previous panels smoothly
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top+=80",
          end: () => `+=${panels.length * 110}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const rawIdx = Math.floor(self.progress * (panels.length - 0.1));
            const clampedIdx = Math.min(Math.max(rawIdx, 0), panels.length - 1);
            setActiveIndex(clampedIdx);
          },
        },
      });

      for (let i = 1; i < panels.length; i++) {
        tl.to(
          panels[i],
          {
            yPercent: 0,
            ease: "power2.inOut",
            duration: 1,
          },
          `step-${i}`
        );
      }

      // Add hold buffer at the end so 3rd panel stays cleanly pinned for smooth reading before exit
      tl.to({}, { duration: 0.6 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="who-we-build-for"
      ref={containerRef}
      className="py-16 md:py-24 px-6 md:px-12 max-w-[1700px] mx-auto select-none relative"
    >
      {/* Section Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-border-custom gap-6">
        <div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-foreground">
            WHO WE <span className="text-foreground border-b-4 border-foreground pb-1">BUILD FOR</span>
          </h2>
        </div>

        <p className="text-foreground-secondary max-w-xl text-sm sm:text-base md:text-lg leading-relaxed font-sans uppercase font-medium">
          Startups, small & medium businesses, and growing brands that need a strong, consistent identity.
        </p>
      </div>

      {/* Main Pinned DZ!NR Section Wrapper */}
      <div
        ref={pinWrapperRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start min-h-[78vh] relative"
      >
        {/* Left Sticky Index Column */}
        <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 z-50">
          {/* Giant Number Indicator */}
          <div className="text-7xl xl:text-8xl font-black font-mono text-foreground leading-none tracking-tighter transition-all duration-300">
            {SERVICE_PANELS[activeIndex].number}
          </div>

          {/* Service Index List */}
          <div className="flex flex-col space-y-3 font-sans font-bold text-xs xl:text-sm tracking-wider uppercase border-l-2 border-border-custom pl-5">
            {SERVICE_PANELS.map((item, idx) => (
              <div
                key={item.id}
                className={`transition-all duration-300 ${
                  activeIndex === idx
                    ? "text-foreground opacity-100 translate-x-2 font-extrabold"
                    : "text-foreground-secondary opacity-40"
                }`}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>

        {/* Right Stacked Pinned Panels Area */}
        <div className="lg:col-span-9 relative h-[78vh] min-h-[580px] max-h-[720px] overflow-hidden rounded-none border border-border-custom bg-background shadow-2xl">
          {SERVICE_PANELS.map((panel, index) => (
            <div
              key={panel.id}
              id={`panel-${panel.id}`}
              ref={(el) => {
                panelsRef.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full p-6 sm:p-10 md:p-12 bg-background flex flex-col justify-between"
              style={{
                zIndex: (index + 1) * 10,
              }}
            >
              {/* Top Panel Title & Description */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs font-bold text-foreground-secondary uppercase tracking-widest border-b border-border-custom pb-3 mb-4">
                  <span>SECTION {panel.number}</span>
                  <span>LOOMIE SERVICES</span>
                </div>

                <h3 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-foreground tracking-tight leading-[0.95] mb-4">
                  {panel.title}
                </h3>
                <p className="text-foreground-secondary font-sans font-medium text-sm sm:text-base md:text-lg leading-relaxed tracking-wide uppercase max-w-3xl">
                  {panel.description}
                </p>
              </div>

              {/* Lower Section: Image Preview (Left) & Deliverables List (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-4 mt-auto">
                {/* Feature Showcase Image */}
                <div className="md:col-span-7">
                  <div className="w-full h-44 sm:h-60 md:h-68 relative overflow-hidden rounded-none bg-surface-card border border-border-custom shadow-xl">
                    <Image
                      src={panel.image}
                      alt={panel.title}
                      fill
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60" />

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold uppercase tracking-widest">
                        {panel.number} // LOOMIE ARCHITECTURE
                      </span>
                      <div className="w-8 h-8 bg-white text-black flex items-center justify-center shadow-lg">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Deliverables Stack List */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-2">
                  <div className="font-mono text-xs font-bold text-foreground tracking-widest uppercase pb-1.5 border-b border-border-custom">
                    DELIVERABLES & SCOPE
                  </div>
                  <div className="flex flex-col space-y-2 font-sans font-semibold text-xs sm:text-sm text-foreground-secondary uppercase tracking-wider">
                    {panel.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="py-1 border-b border-border-custom/60 flex items-center justify-between text-foreground"
                      >
                        <span className="truncate pr-2">{item}</span>
                        <span className="text-[10px] font-mono text-foreground-secondary opacity-60">
                          (0{dIdx + 1})
                        </span>
                      </div>
                    ))}
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
