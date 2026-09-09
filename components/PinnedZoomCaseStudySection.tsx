"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PinnedZoomProps {
  images: string[];
  projectTitle: string;
  impactText?: string;
}

export function PinnedZoomCaseStudySection({
  images,
  projectTitle,
  impactText,
}: PinnedZoomProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageSceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const impactSceneRef = useRef<HTMLDivElement>(null);

  // Guarantee 5 images for the 5 cinematic scenes
  const displayImages = React.useMemo(() => {
    if (!images || images.length === 0) return Array(5).fill("/images/project-minimal.jpg");
    const result: string[] = [];
    for (let i = 0; i < 5; i++) {
      result.push(images[i % images.length]);
    }
    return result;
  }, [images]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!trackRef.current) return;

      const totalImageScenes = displayImages.length; // 5 scenes
      const sceneDuration = 2; // duration units per scene in GSAP timeline

      // Timeline pinned scrub for cinematic movie scene sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Animate 5 Cinematic Image Scenes (Camera push zoom 1.0 -> 1.65 + crossfade, pure visuals without text)
      imageSceneRefs.current.forEach((sceneEl, index) => {
        if (!sceneEl) return;

        const tStart = index * sceneDuration;

        if (index === 0) {
          // Scene 1 starts fully visible at scale 1.0, zooms in continuously to 1.65 and fades out
          tl.fromTo(
            sceneEl,
            { scale: 1.0, opacity: 1 },
            { scale: 1.65, opacity: 1, duration: sceneDuration, ease: "none" },
            0
          ).to(sceneEl, { opacity: 0, duration: 0.5, ease: "power1.inOut" }, tStart + sceneDuration - 0.5);
        } else {
          // Scenes 2-5 start transparent at scale 1.0, fade in while zooming to 1.65
          tl.fromTo(
            sceneEl,
            { scale: 1.0, opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power1.inOut" },
            tStart - 0.3
          ).to(
            sceneEl,
            { scale: 1.65, duration: sceneDuration, ease: "none" },
            tStart - 0.3
          );

          if (index < totalImageScenes) {
            tl.to(sceneEl, { opacity: 0, duration: 0.5, ease: "power1.inOut" }, tStart + sceneDuration - 0.5);
          }
        }
      });

      // Scene 6: THE IMPACT Text Movie Scene Zoom & Reveal (Scale 0.85 -> 1.0, zero text cut-off)
      if (impactSceneRef.current) {
        const impactStart = totalImageScenes * sceneDuration - 0.3;

        tl.fromTo(
          impactSceneRef.current,
          { scale: 0.85, opacity: 0 },
          { scale: 1.0, opacity: 1, duration: sceneDuration, ease: "power2.out" },
          impactStart
        );
      }
    }, trackRef);

    return () => ctx.revert();
  }, [displayImages]);

  const defaultImpactParagraph = `The campaign reached more than 34 million people and generated over 65 media features. But beyond reach, it positioned ${projectTitle} as a brand rooted in feeling, creativity, and community — one that celebrates the emotions that make stories matter.`;

  return (
    <div ref={trackRef} className="relative w-full h-[250vh] bg-[#050505] text-white select-none border-b border-white/10">
      
      {/* Sticky Viewport Stage Container */}
      <div ref={stageRef} className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Ambient Background Canvas */}
        <div className="absolute inset-0 bg-[#050505] pointer-events-none" />

        {/* Large Full-Bleed Cinematic Movie Stage Container */}
        <div className="w-[94vw] sm:w-[94vw] max-w-[1900px] h-[86vh] relative overflow-hidden rounded-none border border-stone-300 bg-stone-900 z-20">
          
          {/* Scenes 1 - 5: Pure Cinematic Image Push-Zoom Layers (No text overlays) */}
          {displayImages.map((imgUrl, idx) => (
            <div
              key={idx}
              ref={(el) => {
                imageSceneRefs.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full origin-center opacity-0"
              style={{
                opacity: idx === 0 ? 1 : 0,
              }}
            >
              <Image
                src={imgUrl}
                alt={`${projectTitle} Cinematic Scene ${idx + 1}`}
                fill
                quality={95}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}

          {/* Scene 6: THE IMPACT Text Movie Scene Zoom (Fits completely within container bounds) */}
          <div
            ref={impactSceneRef}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 md:p-14 z-30 opacity-0 bg-[#F7F6F2] origin-center overflow-hidden"
          >
            <div className="max-w-3xl sm:max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black font-sans tracking-tight text-[#0E0E0E] uppercase leading-none select-none">
                THE IMPACT
              </h2>

              <p className="text-base sm:text-xl lg:text-2xl font-medium font-sans text-[#0E0E0E] leading-relaxed max-w-2xl sm:max-w-3xl mx-auto">
                {impactText ? `${impactText}. ${defaultImpactParagraph}` : defaultImpactParagraph}
              </p>

              <div className="pt-2 sm:pt-4">
                <p className="text-sm sm:text-lg md:text-xl font-bold font-sans text-[#0E0E0E] tracking-tight">
                  Full case study available upon request.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
