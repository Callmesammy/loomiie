"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Compass } from "lucide-react";

interface AkaruExpertise {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  bgColor: string;
  textColor: string;
  tagline: string;
  deliverables: string[];
  image: string;
  href: string;
}

const AKARU_EXPERTISES: AkaruExpertise[] = [
  {
    id: "exp-1",
    number: "01",
    shortTitle: "Logos",
    title: "Logos & Visual Marks",
    bgColor: "#E6E3D8", // Warm Studio Linen
    textColor: "#0E0E0E",
    tagline: "Crafting iconic, memorable symbols and brandmarks that anchor instant brand recognition.",
    deliverables: ["VECTOR MARKS", "ICON SYSTEMS", "TYPE ARCHITECTURES", "SYMBOLIC STRATEGY"],
    image: "/images/services/service-sketch.jpg",
    href: "/contact",
  },
  {
    id: "exp-2",
    number: "02",
    shortTitle: "Identities",
    title: "Brand Identities",
    bgColor: "#D4DFE6", // Slate Mineral Azure
    textColor: "#0E0E0E",
    tagline: "Building cohesive spatial & digital design systems that link every brand touchpoint seamlessly.",
    deliverables: ["VISUAL IDENTITY", "COLOR PALETTE", "GRAPHIC CHARTER", "BRAND GUIDELINES"],
    image: "/images/services/service-color.jpg",
    href: "/contact",
  },
  {
    id: "exp-3",
    number: "03",
    shortTitle: "UI/UX",
    title: "UI/UX Architecture",
    bgColor: "#E8DEC8", // Warm Champagne Terracotta
    textColor: "#0E0E0E",
    tagline: "Structuring intuitive user experiences and high-performance digital products for high conversion.",
    deliverables: ["USER JOURNEYS", "WIRE FRAMES", "INTERACTIVE PROTOTYPES", "DESIGN SYSTEMS"],
    image: "/images/services/service-uiux.jpg",
    href: "/contact",
  },
  {
    id: "exp-4",
    number: "04",
    shortTitle: "Websites",
    title: "Websites & Web Dev",
    bgColor: "#CFCFCF", // Pure Titanium Studio Grey
    textColor: "#0E0E0E",
    tagline: "Engineering kinetic 3D WebGL motion websites built for speed, responsiveness, and conversion.",
    deliverables: ["NEXT.JS 15", "SHOPIFY CUSTOM", "THREE.JS SHADERS", "CUSTOM FRONT-END"],
    image: "/images/services/service-desktop.jpg",
    href: "/contact",
  },
];

/**
 * Akaru.fr/expertises Style Pinned Studio Showcase Component
 * Features:
 * - Section GSAP Pinning Enabled on Mobile & Desktop (pin: section, pinSpacing: true)
 * - Section Title updated to "Services We Provide"
 * - Signature LOOMIE studio colors (#E6E3D8 -> #D4DFE6 -> #E8DEC8 -> #CFCFCF)
 * - Smooth Image Zoom Scale on Scroll Scrub (scale 1.3 -> 1.0)
 * - Display state toggling guaranteeing zero mixing or overlapping text
 * - High-contrast directory buttons with solid #0E0E0E pill containers and white text
 */
export function AkaruProjetsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".akaru-exp-card");
      const images = gsap.utils.toArray<HTMLElement>(".akaru-exp-image");

      // Initial card states
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { autoAlpha: 1, yPercent: 0, display: "grid" });
          if (images[i]) gsap.set(images[i], { scale: 1.0 });
        } else {
          gsap.set(card, { autoAlpha: 0, yPercent: 20, display: "none" });
          if (images[i]) gsap.set(images[i], { scale: 1.28 });
        }
      });

      // Master Outer Section Pinned Timeline (Mobile & Desktop)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${AKARU_EXPERTISES.length * 130}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              AKARU_EXPERTISES.length - 1,
              Math.floor(self.progress * AKARU_EXPERTISES.length)
            );
            setActiveIndex(idx);

            // Morph background color seamlessly based on active expertise card
            const currentTheme = AKARU_EXPERTISES[idx] || AKARU_EXPERTISES[0];
            gsap.to(section, {
              backgroundColor: currentTheme.bgColor,
              color: currentTheme.textColor,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger || null;

      AKARU_EXPERTISES.forEach((_, i) => {
        if (i === 0) return;
        const prevIdx = i - 1;
        const label = `step-${i}`;

        const prevCard = cards[prevIdx];
        const currentCard = cards[i];
        const prevImg = images[prevIdx];
        const currentImg = images[i];

        // 1. Transition Out Previous Card
        tl.to(prevCard, { autoAlpha: 0, yPercent: -15, duration: 0.6, ease: "power2.inOut" }, label);
        if (prevImg) {
          tl.to(prevImg, { scale: 1.25, duration: 0.6, ease: "power2.inOut" }, label);
        }
        tl.set(prevCard, { display: "none" }, `${label}+=0.6`);

        // 2. Transition In Current Card with Smooth Image Zoom Scale
        tl.set(currentCard, { display: "grid", autoAlpha: 0, yPercent: 15 }, label)
          .to(currentCard, { autoAlpha: 1, yPercent: 0, duration: 0.8, ease: "power3.out" }, `${label}+=0.1`);

        if (currentImg) {
          tl.fromTo(
            currentImg,
            { scale: 1.3 },
            { scale: 1.0, duration: 1.0, ease: "power3.out" },
            `${label}+=0.1`
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (idx: number) => {
    setActiveIndex(idx);
    if (scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const targetProgress = idx / (AKARU_EXPERTISES.length - 1);
      const scrollPos = st.start + targetProgress * (st.end - st.start);
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(scrollPos, { duration: 1.2 });
      } else if (typeof window !== "undefined") {
        window.scrollTo({ top: scrollPos, behavior: "smooth" });
      }
    }
  };

  const activeTheme = AKARU_EXPERTISES[activeIndex] || AKARU_EXPERTISES[0];

  return (
    <section
      ref={sectionRef}
      id="services-segment"
      className="relative w-full h-screen overflow-hidden select-none transition-colors duration-700 py-4 lg:py-6"
      style={{ backgroundColor: activeTheme.bgColor, color: activeTheme.textColor }}
    >
      <div className="w-full h-full max-w-[1850px] mx-auto px-4 sm:px-8 lg:px-14 flex flex-col justify-between relative z-10">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-current/20 pb-2 sm:pb-3 font-mono text-xs font-bold tracking-widest uppercase">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse shrink-0" />
            <span className="flex items-center gap-2 truncate">
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate text-[11px] sm:text-xs">SERVICES WE PROVIDE</span>
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-current/70 hidden md:inline">
              SCROLL TO EXPLORE
            </span>
            <span className="font-mono font-bold">
              0{activeIndex + 1} / 0{AKARU_EXPERTISES.length}
            </span>
          </div>
        </div>

        {/* Section Title: "Services We Provide" */}
        <div className="text-left lg:text-center pt-1 pb-1">
          <h2 className="text-4xl sm:text-7xl lg:text-[7.5rem] font-light font-sans tracking-tight leading-none text-current uppercase">
            Services We Provide
          </h2>
        </div>

        {/* Main Pinned Showcase Grid (Active on Mobile & Desktop) */}
        <div className="relative flex-1 w-full my-auto flex items-center justify-center h-[calc(100vh-180px)] sm:h-[calc(100vh-210px)]">
          {AKARU_EXPERTISES.map((exp, idx) => (
            <div
              key={exp.id}
              className="akaru-exp-card absolute inset-0 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center"
            >
              {/* LEFT COLUMN: Number + Title */}
              <div className="lg:col-span-4 flex flex-col justify-center space-y-2 sm:space-y-4 pr-0 lg:pr-6">
                <div className="flex items-center gap-3 font-mono text-xs font-bold opacity-60">
                  <span>{exp.number}</span>
                  <span>/</span>
                  <span>SERVICE CAPABILITY</span>
                </div>

                <h3 className="text-2xl sm:text-5xl lg:text-6xl font-light font-sans tracking-tight leading-[1.02] text-current">
                  {exp.title}
                </h3>

                <p className="font-sans text-xs sm:text-base leading-relaxed opacity-80 max-w-md font-normal pt-1 sm:pt-2">
                  {exp.tagline}
                </p>
              </div>

              {/* CENTER COLUMN: Hero Image Frame with GSAP Smooth Scale Zoom */}
              <div className="lg:col-span-5 h-[32vh] sm:h-[50vh] lg:h-[56vh] relative overflow-hidden rounded-none shadow-2xl border border-current/20 bg-black/10 group">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  priority={idx === 0}
                  quality={95}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="akaru-exp-image object-cover transform-gpu origin-center"
                />
                <div className="absolute top-3 left-3 font-mono text-[10px] font-bold px-2.5 py-1 bg-black/70 text-white backdrop-blur-md">
                  0{exp.number} // LOOMIE STUDIO
                </div>
              </div>

              {/* RIGHT COLUMN: Deliverables + Action Button */}
              <div className="lg:col-span-3 flex flex-col justify-center space-y-4 lg:space-y-8 pl-0 lg:pl-6">
                <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-wider opacity-85">
                  {exp.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2">
                      <span className="opacity-50">/</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-1 sm:pt-2">
                  <Link
                    href="/expertise"
                    className="group inline-flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3.5 border border-[#0E0E0E] text-[#0E0E0E] bg-transparent rounded-full font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <span>SEE THE EXPERTISE</span>
                    <span className="w-2 h-2 rounded-full bg-[#0E0E0E] group-hover:bg-white transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Interactive Navigation Directory Bar */}
        <div className="pt-3 border-t border-current/20 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs font-bold">
          <div className="w-full overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-2 sm:gap-3 min-w-max">
              {AKARU_EXPERTISES.map((p, pIdx) => {
                const isActive = activeIndex === pIdx;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleNavClick(pIdx)}
                    className={`px-3 sm:px-4 py-1 sm:py-1.5 border font-mono text-xs transition-all duration-300 cursor-pointer rounded-full whitespace-nowrap ${
                      isActive
                        ? "bg-[#0E0E0E] text-white border-[#0E0E0E] font-bold shadow-md"
                        : "border-current/30 text-[#0E0E0E]/70 hover:border-current hover:text-[#0E0E0E]"
                    }`}
                  >
                    0{p.number} {p.shortTitle}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[10px] opacity-80 shrink-0">
            <span>LOOMIE CRAFTS CONNECTED BRAND SYSTEMS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
}
