"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface SwappingImageItem {
  src: string;
  alt: string;
}

interface InlineSwappingImageProps {
  images: SwappingImageItem[];
  intervalMs?: number;
  className?: string;
}

/**
 * Ultra-Smooth Stacked Crossfade Inline Swapping Image Component
 * - Both images pre-rendered in memory for zero image swap decoding flash
 * - Weightless 1000ms GPU-accelerated ease-in-out cross-dissolve
 * - Fully GPU hardware composition (transform-gpu)
 */
function InlineSwappingImage({
  images,
  intervalMs = 5000,
  className = "",
}: InlineSwappingImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  const handleSwap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <span
      onClick={handleSwap}
      className={`group relative inline-block align-middle mx-2 my-1.5 w-20 sm:w-24 md:w-28 lg:w-32 h-11 sm:h-13 md:h-14 lg:h-15 overflow-hidden rounded-md border border-stone-800/20 shadow-md bg-stone-200 cursor-pointer select-none transition-transform duration-500 hover:scale-125 hover:-rotate-1 hover:shadow-2xl hover:z-50 hover:border-black transform-gpu ${className}`}
    >
      {images.map((img, index) => (
        <Image
          key={img.src}
          src={getCloudinaryUrl(img.src)}
          alt={img.alt}
          fill
          sizes="(max-width: 768px) 140px, 160px"
          className={`object-cover transition-opacity duration-1000 ease-in-out transform-gpu group-hover:scale-110 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
    </span>
  );
}

/**
 * LOOMIE Kinetic Agency Services & Capabilities Section
 */
export function RoshanServicesInlineSection() {
  return (
    <section className="relative w-full bg-[#050505] text-white py-20 sm:py-28 px-6 sm:px-12 md:px-16 overflow-hidden select-none border-t border-b border-white/10 flex flex-col justify-between">
      <div className="max-w-[1600px] mx-auto w-full my-auto space-y-10">

        {/* Streamlined High-Impact Typography with Verified Inline Swapping Photos */}
        <div className="py-4">
          <h2 className="barlow-font text-[2.1rem] xs:text-4xl sm:text-5xl md:text-[3.2rem] lg:text-[3.6rem] xl:text-[4.0rem] font-medium uppercase tracking-wide leading-[1.42] text-stone-100">
            LOGOS & BRAND IDENTITIES,
            <InlineSwappingImage
              images={[
                { src: "/cloud-architecture/card1-architecture.jpg", alt: "Brand Systems" },
                { src: getCloudinaryUrl("/images/project-minimal.jpg"), alt: "Hardware Design" },
              ]}
              intervalMs={4800}
            />
            UI/UX ARCHITECTURE & TACTILE PACKAGING,
            <InlineSwappingImage
              images={[
                { src: "/Apple Drink/Gemini_Generated_Image_bzwot3bzwot3bzwo.jpg", alt: "Product Packaging" },
                { src: "/luxury-hotel/Screenshot (965).png", alt: "Spatial Interface" },
              ]}
              intervalMs={5200}
            />
            HIGH-SPEED WEBSITES & NEXT.JS DEVELOPMENT,
            <InlineSwappingImage
              images={[
                { src: "/Ping/Screenshot (962).png", alt: "Web Apps" },
                { src: "/cloud-architecture/card6-why-us.jpg", alt: "LOOMIE Systems" },
              ]}
              intervalMs={4200}
            />
            KINETIC ANIMATION & 3D WEBGL SHADERS,
            <InlineSwappingImage
              images={[
                { src: getCloudinaryUrl("/images/project-digital.jpg"), alt: "Interactive Motion" },
                { src: getCloudinaryUrl("/images/project-editorial.jpg"), alt: "Editorial Layout" },
              ]}
              intervalMs={5000}
            />
            SPATIAL AUDIO TELEMETRY & SONIC BRANDING,
            <InlineSwappingImage
              images={[
                { src: getCloudinaryUrl("/images/partners/spatial-audio.jpg"), alt: "Spatial Sound" },
                { src: getCloudinaryUrl("/images/partners/digital-engine.jpg"), alt: "Audio Engineering" },
              ]}
              intervalMs={4600}
            />
            CINEMATIC FILM & EDITORIAL ART DIRECTION,
            <InlineSwappingImage
              images={[
                { src: getCloudinaryUrl("/images/partners/film-production.jpg"), alt: "Film Production" },
                { src: getCloudinaryUrl("/images/partners/tech-alliance.jpg"), alt: "Cinematic Reel" },
              ]}
              intervalMs={5400}
            />
            STRATEGIC DIGITAL CAMPAIGNS & IDENTITY SYSTEMS.
            <InlineSwappingImage
              images={[
                { src: getCloudinaryUrl("/images/project-packaging.jpg"), alt: "Campaign Identity" },
                { src: getCloudinaryUrl("/images/project-spatial.jpg"), alt: "Brand Architecture" },
              ]}
              intervalMs={4400}
            />
          </h2>
        </div>

        {/* Section Telemetry Footer */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-stone-400 font-semibold uppercase tracking-widest">
          <span>CAPABILITIES - STACK MATRIX // 07 CORE DISCIPLINES</span>
          <span>FULL STACK CREATIVE & MOTION ENGINEERING</span>
          <span>STUDIO CAPABILITIES</span>
        </div>
      </div>
    </section>
  );
}
