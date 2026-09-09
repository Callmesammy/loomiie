"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface SectionData {
  id: string;
  className: string;
  bgColor: string;
  textColor: string;
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  layout: "entry" | "gesture" | "variation" | "stance" | "stillness" | "release";
}

const SECTIONS_DATA: SectionData[] = [
  {
    id: "sec-one",
    className: "one",
    bgColor: "#ffffff", // Crisp Studio White
    textColor: "#0e0e0e",
    title: "Entry Point",
    paragraphs: [
      "Forms exist in balance, shaped by intention rather than urgency.",
    ],
    layout: "entry",
  },
  {
    id: "sec-two",
    className: "two",
    bgColor: "#f7f5f0", // Warm Off-White Substrate
    textColor: "#0e0e0e",
    title: "Gesture",
    paragraphs: [
      "Form and expression intersect between motion and stillness.",
    ],
    image: getCloudinaryUrl("/images/project-minimal.jpg"),
    imageAlt: "Gesture Form & Motion",
    layout: "gesture",
  },
  {
    id: "sec-three",
    className: "three",
    bgColor: "#ffffff",
    textColor: "#0e0e0e",
    title: "Variation",
    paragraphs: [
      "Form, spacing, and proportion working together to maintain cohesion.",
    ],
    image: "/luxury-hotel/Screenshot (965).png",
    imageAlt: "Variation Architecture",
    layout: "variation",
  },
  {
    id: "sec-four",
    className: "four",
    bgColor: "#f7f5f0",
    textColor: "#0e0e0e",
    title: "The Stance",
    paragraphs: [
      "Elements feel grounded, deliberate, and visually assured.",
    ],
    image: "/Apple Drink/Gemini_Generated_Image_bzwot3bzwot3bzwo.jpg",
    imageAlt: "The Stance Form",
    layout: "stance",
  },
  {
    id: "sec-five",
    className: "five",
    bgColor: "#ffffff",
    textColor: "#0e0e0e",
    title: "Stillness",
    paragraphs: [
      "Simplicity and restraint shaping experience without demanding attention.",
    ],
    image: "/Ping/Screenshot (962).png",
    imageAlt: "Stillness Form",
    layout: "stillness",
  },
  {
    id: "sec-six",
    className: "six",
    bgColor: "#f7f5f0",
    textColor: "#0e0e0e",
    title: "Release",
    paragraphs: [
      "Structure softens, opening space to dominate with quiet certainty.",
    ],
    image: getCloudinaryUrl("/images/project-editorial.jpg"),
    imageAlt: "Release Form",
    layout: "release",
  },
];

/**
 * 30-Degree Rotating / Un-Tilting Section Pinning Scroll Component
 */
export function TiltingSectionsScrollSection() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const main = mainRef.current;
    if (!main) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".tilt-section");

      sections.forEach((section, index) => {
        const container = section.querySelector<HTMLElement>(".tilt-container");
        if (!container) return;

        // 1. Un-tilt 30deg -> 0deg on scroll scrub
        gsap.fromTo(
          container,
          { rotation: 30, transformOrigin: "bottom left" },
          {
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 15%",
              scrub: true,
            },
          }
        );

        // 2. Card Stacking Pinning
        if (index < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          });
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative w-full overflow-hidden bg-[#050505] text-white select-none py-8">
      {/* Official Barlow Condensed & Instrument Sans Brand Font Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900&family=Instrument+Sans:wght@400;500;600;700&display=swap");
        .barlow-font {
          font-family: "Barlow Condensed", sans-serif;
        }
        .instrument-font {
          font-family: "Instrument Sans", sans-serif;
        }
      `}</style>

      {SECTIONS_DATA.map((sec) => {
        const isStance = sec.layout === "stance";

        return (
          <section
            key={sec.id}
            id={sec.id}
            className={`tilt-section relative w-full ${
              isStance ? "h-[115vh] min-h-[115vh]" : "h-screen min-h-screen"
            } overflow-hidden px-3 sm:px-6 lg:px-10 py-4`}
          >
            <div
              className="tilt-container relative w-full h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-center border-2 sm:border-3 border-[#0e0e0e] rounded-none shadow-[0_35px_80px_-15px_rgba(0,0,0,0.9)] will-change-transform overflow-hidden"
              style={{
                backgroundColor: sec.bgColor,
                color: sec.textColor,
                transform: "rotate(30deg)",
                transformOrigin: "bottom left",
              }}
            >
              <div className="w-full max-w-[1500px] h-full mx-auto my-auto flex flex-col justify-center px-2 sm:px-8 py-6">
                {/* 1. ENTRY POINT LAYOUT */}
                {sec.layout === "entry" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                    <div>
                      <h1 className="barlow-font text-5xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase tracking-tight leading-none text-[#0e0e0e] break-words">
                        {sec.title}
                      </h1>
                    </div>
                    <div className="flex justify-start lg:justify-end">
                      <p className="instrument-font text-lg sm:text-xl lg:text-2xl text-stone-800 font-medium leading-relaxed max-w-xl">
                        {sec.paragraphs[0]}
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. GESTURE LAYOUT */}
                {sec.layout === "gesture" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                    <div className="flex justify-center lg:justify-start">
                      <div className="relative w-full max-w-full sm:max-w-md lg:max-w-lg aspect-[16/10] rounded-none overflow-hidden border-2 border-[#0e0e0e] shadow-2xl bg-black">
                        {sec.image && (
                          <Image
                            src={sec.image}
                            alt={sec.imageAlt || sec.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 550px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <h1 className="barlow-font text-5xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase tracking-tight leading-none text-[#0e0e0e] break-words">
                        {sec.title}
                      </h1>
                      <p className="instrument-font text-lg sm:text-xl lg:text-2xl text-stone-800 font-medium leading-relaxed max-w-xl">
                        {sec.paragraphs[0]}
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. VARIATION LAYOUT */}
                {sec.layout === "variation" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                    <div className="space-y-4 sm:space-y-6">
                      <h1 className="barlow-font text-5xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase tracking-tight leading-none text-[#0e0e0e] break-words">
                        {sec.title}
                      </h1>
                      <p className="instrument-font text-lg sm:text-xl lg:text-2xl text-stone-800 font-medium leading-relaxed max-w-xl">
                        {sec.paragraphs[0]}
                      </p>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                      <div className="relative w-full max-w-full sm:max-w-md lg:max-w-lg aspect-[16/10] rounded-none overflow-hidden border-2 border-[#0e0e0e] shadow-2xl bg-black">
                        {sec.image && (
                          <Image
                            src={sec.image}
                            alt={sec.imageAlt || sec.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 550px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. THE STANCE LAYOUT */}
                {sec.layout === "stance" && (
                  <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto py-2">
                    {sec.image && (
                      <div className="relative w-full max-w-full sm:max-w-sm lg:max-w-md aspect-[16/10] rounded-none overflow-hidden border-2 border-[#0e0e0e] shadow-2xl bg-black mb-2">
                        <Image
                          src={sec.image}
                          alt={sec.imageAlt || sec.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 500px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h1 className="barlow-font text-5xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase tracking-tight leading-none text-[#0e0e0e] break-words">
                      {sec.title}
                    </h1>
                    <p className="instrument-font text-base sm:text-lg lg:text-xl text-stone-800 font-medium leading-relaxed max-w-2xl">
                      {sec.paragraphs[0]}
                    </p>
                  </div>
                )}

                {/* 5. STILLNESS LAYOUT */}
                {sec.layout === "stillness" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                    <div className="space-y-4 sm:space-y-6">
                      <h1 className="barlow-font text-5xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase tracking-tight leading-none text-[#0e0e0e] break-words">
                        {sec.title}
                      </h1>
                      <p className="instrument-font text-lg sm:text-xl lg:text-2xl text-stone-800 font-medium leading-relaxed max-w-xl">
                        {sec.paragraphs[0]}
                      </p>
                    </div>

                    {sec.image && (
                      <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-full sm:max-w-md lg:max-w-lg aspect-[16/10] rounded-none overflow-hidden border-2 border-[#0e0e0e] shadow-2xl bg-black">
                          <Image
                            src={sec.image}
                            alt={sec.imageAlt || sec.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 550px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 6. RELEASE LAYOUT */}
                {sec.layout === "release" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                    <div className="space-y-4 sm:space-y-6">
                      <h1 className="barlow-font text-5xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase tracking-tight leading-none text-[#0e0e0e] break-words">
                        {sec.title}
                      </h1>
                      <p className="instrument-font text-lg sm:text-xl lg:text-2xl text-stone-800 font-medium leading-relaxed max-w-xl">
                        {sec.paragraphs[0]}
                      </p>
                    </div>

                    {sec.image && (
                      <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-full sm:max-w-md lg:max-w-lg aspect-[16/10] rounded-none overflow-hidden border-2 border-[#0e0e0e] shadow-2xl bg-black">
                          <Image
                            src={sec.image}
                            alt={sec.imageAlt || sec.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 550px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
