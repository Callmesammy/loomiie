"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface ValueCard {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  bgColor: string;
  textColor: string;
}

const VALUE_CARDS: ValueCard[] = [
  {
    number: "01",
    title: "CONNECTED DESIGN",
    description:
      "Constructing brand identity systems where logomark geometry flows seamlessly into typography and kinetic digital interfaces.",
    image: getCloudinaryUrl("/images/project-minimal.jpg"),
    alt: "Connected Design Systems",
    bgColor: "bg-[#0E0E0E]",
    textColor: "text-white",
  },
  {
    number: "02",
    title: "PROVEN IN USE",
    description:
      "Subjecting visual systems to production stress tests: rendering high frame-rate WebGL shaders and verifying OLED & tactile contrast.",
    image: "/luxury-hotel/Screenshot (965).png",
    alt: "Tested Live Across Platforms",
    bgColor: "bg-[#141417]",
    textColor: "text-white",
  },
  {
    number: "03",
    title: "ALWAYS ITERATING",
    description:
      "Guided by empirical feedback and motion physics, our systems continuously evolve alongside culture without requiring total redesigns.",
    image: "/Ping/Screenshot (962).png",
    alt: "Feedback Driven & Trend Proof",
    bgColor: "bg-[#0c0c0e]",
    textColor: "text-white",
  },
  {
    number: "04",
    title: "TOTAL CLARITY",
    description:
      "Stripping away ornamental noise to uncover pure brand signal with legibility from 16px favicons to 100ft outdoor billboards.",
    image: "/Apple Drink/Gemini_Generated_Image_yfv018yfv018yfv0.jpg",
    alt: "Instant Recognition At Every Scale",
    bgColor: "bg-[#18181c]",
    textColor: "text-white",
  },
  {
    number: "05",
    title: "STRATEGIC CRAFT",
    description:
      "Craft is intelligence made visible. Every typographic grid alignment and color pairing is rooted in commercial strategy.",
    image: getCloudinaryUrl("/images/project-editorial.jpg"),
    alt: "Strategic Brutalist Craft",
    bgColor: "bg-[#0E0E0E]",
    textColor: "text-white",
  },
];

/**
 * Clean Stacking Climbing Cards Section for LOOMIE Core Values
 */
export function ValuesSection() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>(".beetogreen-stacked-card");

    const ctx = gsap.context(() => {
      // Create GSAP Timeline pinned scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 0.8,
        },
      });

      // Animate card 2 to card 5 climbing up over the previous card
      cards.forEach((card, index) => {
        if (index > 0) {
          tl.fromTo(
            card,
            {
              yPercent: 100,
              boxShadow: "0 -20px 50px rgba(0,0,0,0.5)",
            },
            {
              yPercent: 0,
              ease: "power2.inOut",
            }
          );
        }
      });
    }, pinSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pinSectionRef} className="w-full h-screen relative bg-[#050505] text-white overflow-hidden select-none">
      {/* Official Brand Fonts */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900&family=Instrument+Sans:wght@400;500;600;700&display=swap");
        .barlow-font {
          font-family: "Barlow Condensed", sans-serif;
        }
        .instrument-font {
          font-family: "Instrument Sans", sans-serif;
        }
      `}</style>

      {/* Fixed Header Bar Inside Pin Section */}
      <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-white pl-36 sm:pl-44">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-black border border-white/20 rounded-full shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#f75828] animate-pulse" />
          <span>STUDIO VALUES</span>
        </div>
      </div>

      {/* Stacked Cards Container */}
      <div ref={cardsContainerRef} className="w-full h-full relative flex items-center justify-center pt-16 pb-6 px-4 sm:px-8 lg:px-12">
        {VALUE_CARDS.map((card, idx) => (
          <div
            key={card.number}
            className={`beetogreen-stacked-card absolute inset-4 sm:inset-8 lg:inset-12 top-16 sm:top-20 rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col lg:flex-row ${card.bgColor} ${card.textColor}`}
            style={{ zIndex: 10 + idx }}
          >
            {/* Left Content Area (Ultra-Clean & Streamlined) */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h2 className="barlow-font text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.92] text-white tracking-tight">
                  {card.title}
                </h2>

                <p className="instrument-font text-base sm:text-xl lg:text-2xl text-stone-200 font-normal leading-relaxed max-w-xl pt-2">
                  {card.description}
                </p>
              </div>
            </div>

            {/* Right Image Frame Area (Pure Photography) */}
            <div className="w-full lg:w-1/2 relative min-h-[260px] sm:min-h-[340px] lg:min-h-full overflow-hidden bg-black border-t lg:border-t-0 lg:border-l border-white/15 group">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                priority={idx === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
