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
      "Architecture begins where intention meets form. Every visual decision, logomark stroke, and layout grid is engineered with deliberate purpose rather than superficial trend.",
      "We establish foundational design systems that maintain structural integrity across all media — from dynamic digital interfaces to high-touch physical touchpoints.",
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
      "Form and expression intersect at the exact boundary between motion and stillness. Motion is not mere decoration; it is the physical language of your digital presence.",
      "Through 60 FPS GPU acceleration, custom GLSL shaders, and reactive micro-interactions, we give every touchpoint a weightless, organic cadence that commands attention.",
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
      "Form, spacing, and proportion work in mathematical harmony to maintain unbreakable visual cohesion across complex platforms.",
      "Whether deploying responsive edge web applications, high-converting digital storefronts, or modular typography tokens, we ensure your brand identity remains distinct at any scale.",
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
      "Elements feel grounded, deliberate, and visually assured. A confident brand stance does not compete for attention through noise — it commands it through clarity.",
      "We craft high-contrast brutalist layouts, tactile material finishes, and spatial packaging that position your brand as an unshakeable market leader.",
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
      "Simplicity and restraint shape memorable experiences without demanding performative attention. In a cluttered digital ecosystem, strategic subtraction is supreme strength.",
      "By stripping away bloated code and unnecessary visual clutter, we deliver sub-100ms load speeds and pure, high-recall brand resonance.",
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
      "Structure softens, opening spatial freedom to dominate with quiet certainty and effortless performance.",
      "The result is a unified brand ecosystem where visual identity, WebGL motion engineering, and edge infrastructure function as one unstoppable engine.",
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
              isStance ? "h-[115vh] min-h-[115vh]" : "h-[100vh] min-h-[100vh]"
            } overflow-hidden px-3 sm:px-6 lg:px-10 py-4`}
          >
            <div
              className="tilt-container relative w-full h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-center rounded-none shadow-[0_35px_80px_-15px_rgba(0,0,0,0.9)] will-change-transform overflow-hidden"
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
                  <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="instrument-font text-lg sm:text-2xl lg:text-3xl text-stone-900 font-medium leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {/* 2. GESTURE LAYOUT */}
                {sec.layout === "gesture" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                    <div className="flex justify-center lg:justify-start">
                      <div className="relative w-full max-w-full sm:max-w-md lg:max-w-lg aspect-[16/10] rounded-none overflow-hidden shadow-2xl bg-black">
                        {sec.image && (
                          <Image
                            src={sec.image}
                            alt={sec.imageAlt || "Gesture Form"}
                            fill
                            sizes="(max-width: 1024px) 100vw, 550px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="instrument-font text-base sm:text-lg lg:text-xl text-stone-800 font-medium leading-relaxed max-w-xl">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. VARIATION LAYOUT */}
                {sec.layout === "variation" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                    <div className="space-y-4">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="instrument-font text-base sm:text-lg lg:text-xl text-stone-800 font-medium leading-relaxed max-w-xl">
                          {p}
                        </p>
                      ))}
                    </div>

                    <div className="flex justify-center lg:justify-end">
                      <div className="relative w-full max-w-full sm:max-w-md lg:max-w-lg aspect-[16/10] rounded-none overflow-hidden shadow-2xl bg-black">
                        {sec.image && (
                          <Image
                            src={sec.image}
                            alt={sec.imageAlt || "Variation Architecture"}
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
                  <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-3xl mx-auto py-2">
                    {sec.image && (
                      <div className="relative w-full max-w-full sm:max-w-sm lg:max-w-md aspect-[16/10] rounded-none overflow-hidden shadow-2xl bg-black mb-2">
                        <Image
                          src={sec.image}
                          alt={sec.imageAlt || "The Stance Form"}
                          fill
                          sizes="(max-width: 1024px) 100vw, 500px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-3 max-w-2xl">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="instrument-font text-base sm:text-lg lg:text-xl text-stone-800 font-medium leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. STILLNESS LAYOUT */}
                {sec.layout === "stillness" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                    <div className="space-y-4">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="instrument-font text-base sm:text-lg lg:text-xl text-stone-800 font-medium leading-relaxed max-w-xl">
                          {p}
                        </p>
                      ))}
                    </div>

                    {sec.image && (
                      <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-full sm:max-w-md lg:max-w-lg aspect-[16/10] rounded-none overflow-hidden shadow-2xl bg-black">
                          <Image
                            src={sec.image}
                            alt={sec.imageAlt || "Stillness Form"}
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
                    <div className="space-y-4">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="instrument-font text-base sm:text-lg lg:text-xl text-stone-800 font-medium leading-relaxed max-w-xl">
                          {p}
                        </p>
                      ))}
                    </div>

                    {sec.image && (
                      <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-full sm:max-w-md lg:max-w-lg aspect-[16/10] rounded-none overflow-hidden shadow-2xl bg-black">
                          <Image
                            src={sec.image}
                            alt={sec.imageAlt || "Release Form"}
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
