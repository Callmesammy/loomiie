"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SwappingImageItem {
  src: string;
  alt: string;
}

interface InlineSwappingImageProps {
  images: SwappingImageItem[];
  intervalMs?: number;
  className?: string;
}

function InlineSwappingImage({
  images,
  intervalMs = 3500,
  className = "",
}: InlineSwappingImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsFading(false);
      }, 250);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images, intervalMs]);

  const handleSwap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsFading(false);
    }, 200);
  };

  const current = images[currentIndex];

  return (
    <span
      onClick={handleSwap}
      className={`group relative inline-block align-middle mx-2 my-1 w-16 sm:w-22 md:w-28 lg:w-32 h-9 sm:h-12 md:h-14 lg:h-16 overflow-hidden rounded-md border border-stone-800/20 shadow-md bg-stone-200 cursor-pointer select-none transition-all duration-500 hover:scale-125 hover:-rotate-1 hover:shadow-2xl hover:z-50 hover:border-black ${className}`}
    >
      <Image
        src={current.src}
        alt={current.alt}
        fill
        sizes="(max-width: 768px) 100px, 140px"
        className={`object-cover transition-all duration-500 ease-out group-hover:scale-110 ${
          isFading ? "opacity-0 scale-90 blur-xs" : "opacity-100 scale-100 blur-none"
        }`}
      />
    </span>
  );
}

/**
 * LOOMIE Kinetic Agency Services & Capabilities Section
 * Features inline swapping photos curated with LOOMIE studio branding & core disciplines:
 * LOGOS & VISUAL MARKS, BRAND IDENTITIES, UI/UX ARCHITECTURE, PACKAGING & TACTILE CRAFT,
 * WEBSITES & WEB DEVELOPMENT, NEXT.JS 15, SPATIAL BRAND SYSTEMS, KINETIC ANIMATION (GSAP),
 * 3D WEBGL SHADERS (THREE.JS), HIGH CONVERSION DIGITAL PRODUCTS.
 */
export function RoshanServicesInlineSection() {
  return (
    <section className="relative w-full bg-[#F5F3EF] text-[#0E0E0E] py-24 px-6 sm:px-12 md:px-16 overflow-hidden select-none border-t border-b border-stone-300">
      <div className="max-w-[1700px] mx-auto w-full space-y-8">

        {/* Monumental Typography with LOOMIE Brand Inline Swapping Photos */}
        <div className="pt-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-light uppercase tracking-tight leading-[1.3] text-[#0E0E0E] font-sans">
            LOGOS & VISUAL MARKS,
            <InlineSwappingImage
              images={[
                { src: "/images/services/service-sketch.jpg", alt: "Logo Sketching" },
                { src: "/images/projects/hero-project-1.jpg", alt: "Ideas Into Reality" },
              ]}
              intervalMs={3200}
            />
            BRAND IDENTITIES,
            <InlineSwappingImage
              images={[
                { src: "/images/services/service-color.jpg", alt: "Color Swatches" },
                { src: "/images/manifesto/rose-bw.jpg", alt: "Monochrome Rose" },
              ]}
              intervalMs={4100}
            />
            UI/UX ARCHITECTURE, PACKAGING & TACTILE CRAFT,
            <InlineSwappingImage
              images={[
                { src: "/images/services/service-uiux.jpg", alt: "UI/UX Wireframes" },
                { src: "/images/manifesto/packaging-hd.jpg", alt: "Tactile Packaging" },
              ]}
              intervalMs={3600}
            />
            WEBSITES & WEB DEVELOPMENT,
            <InlineSwappingImage
              images={[
                { src: "/images/services/service-desktop.jpg", alt: "Responsive Web Development" },
                { src: "/images/projects/hero-project-2.jpg", alt: "Kinetic Play System" },
              ]}
              intervalMs={2800}
            />
            NEXT.JS 15, SPATIAL BRAND SYSTEMS,
            <InlineSwappingImage
              images={[
                { src: "/images/manifesto/architecture.jpg", alt: "Spatial Architecture" },
                { src: "/images/manifesto/code-dark.jpg", alt: "Next.js IDE Code" },
              ]}
              intervalMs={4500}
            />
            KINETIC ANIMATION (GSAP),
            <InlineSwappingImage
              images={[
                { src: "/images/manifesto/fluid-3d.jpg", alt: "3D Motion Shader" },
                { src: "/images/projects/hero-project-3.jpg", alt: "Creative Art Direction" },
              ]}
              intervalMs={3400}
            />
            3D WEBGL SHADERS (THREE.JS),
            <InlineSwappingImage
              images={[
                { src: "/images/projects/hero-project-4.jpg", alt: "Sensory Brand Experience" },
                { src: "/images/manifesto/abstract-render.jpg", alt: "3D Abstract Render" },
              ]}
              intervalMs={3900}
            />
            HIGH CONVERSION DIGITAL PRODUCTS.
          </h2>
        </div>

        {/* Section Telemetry Footer */}
        <div className="pt-8 border-t border-stone-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-stone-600 font-bold uppercase tracking-widest">
          <span>CAPABILITIES // STACK MATRIX</span>
          <span>CLEAR. CONNECTED. COMPLETE.</span>
        </div>
      </div>
    </section>
  );
}
