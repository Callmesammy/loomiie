"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { LoomieLogoMark } from "@/components/LoomieLogoMark";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface PreloaderProps {
  onComplete?: () => void;
  variant?: "full" | "brief";
  pageTitle?: string;
}

export function Preloader({ onComplete, variant = "full" }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const preloaderBgRef = useRef<HTMLDivElement>(null);
  const preloaderLogoRef = useRef<HTMLDivElement>(null);
  const revealerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemImgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const itemTargets = [
    { x: "-22vw", y: "-28vh", rotation: -20 },
    { x: "24vw", y: "-22vh", rotation: 15 },
    { x: "-30vw", y: "26vh", rotation: 12 },
    { x: "20vw", y: "24vh", rotation: -15 },
  ];

  const EXIT_DISTANCE = 3.5;
  const itemExits = itemTargets.map((target) => ({
    x: parseFloat(target.x) * EXIT_DISTANCE + "vw",
    y: parseFloat(target.y) * EXIT_DISTANCE + "vh",
    rotation: target.rotation * 2.5,
  }));

  const itemImages = [
    getCloudinaryUrl("/images/project-minimal.jpg"),
    "/cloud-architecture/card1-architecture.jpg",
    getCloudinaryUrl("brand-architecture.jpg"),
    getCloudinaryUrl("/images/services/service-desktop.jpg"),
  ];

  const isBrief = variant === "brief";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const validRevealers = revealerRefs.current.filter(Boolean);
      const floatingTweens: gsap.core.Tween[] = [];

      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => {
          setIsLoading(false);
          document.body.style.overflow = "auto";
          if (onComplete) onComplete();
        },
      });

      if (validRevealers.length > 0) {
        tl.to(validRevealers, {
          clipPath: "circle(100% at 50% 50%)",
          duration: isBrief ? 0.4 : 0.9,
          stagger: isBrief ? 0.08 : 0.18,
          ease: "power2.inOut",
        });
      }

      if (!isBrief) {
        itemRefs.current.forEach((item, i) => {
          if (!item) return;
          const target = itemTargets[i];
          const image = itemImgRefs.current[i];

          tl.to(
            item,
            {
              x: target.x,
              y: target.y,
              scale: 1,
              opacity: 1,
              rotation: target.rotation,
              duration: 1.0,
              ease: "power3.out",
              onStart: () => {
                if (image) {
                  floatingTweens[i] = gsap.to(image, {
                    y: gsap.utils.random(-15, -25),
                    duration: gsap.utils.random(1.5, 2.5),
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                  });
                }
              },
            },
            i === 0 ? "-=0.4" : "<0.075"
          );
        });

        if (preloaderLogoRef.current) {
          tl.to(
            preloaderLogoRef.current,
            { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
            "<"
          );
        }

        tl.to({}, { duration: 0.5 });

        tl.add(() => {
          floatingTweens.forEach((tween) => tween && tween.kill());
        });

        itemRefs.current.forEach((item, i) => {
          if (!item) return;
          const exit = itemExits[i];
          tl.to(
            item,
            {
              x: exit.x,
              y: exit.y,
              scale: 2.5,
              rotation: exit.rotation,
              opacity: 0,
              duration: 0.6,
              ease: "power2.in",
            },
            i === 0 ? ">" : "<0.075"
          );
        });

        if (preloaderLogoRef.current) {
          tl.to(
            preloaderLogoRef.current,
            { scale: 1.8, opacity: 0, duration: 0.6, ease: "power2.in" },
            "<"
          );
        }
      }

      tl.to(containerRef.current, {
        xPercent: -100,
        duration: 0.6,
        ease: "power3.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isBrief, onComplete]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] w-full h-screen overflow-hidden bg-[#050505] text-white select-none"
    >
      {/* Dynamic Barlow Condensed Font */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900&family=Instrument+Sans:wght@400;500;600;700&display=swap");
        .barlow-font {
          font-family: "Barlow Condensed", sans-serif;
        }
      `}</style>

      <div ref={preloaderBgRef} className="absolute inset-0 w-full h-full bg-[#050505]" />

      {/* 4 Circle Revealer Layers */}
      <div
        ref={(el) => {
          revealerRefs.current[0] = el;
        }}
        style={{ clipPath: "circle(0% at 50% 50%)" }}
        className="absolute inset-0 w-full h-full bg-[#c49241] origin-center"
      />
      <div
        ref={(el) => {
          revealerRefs.current[1] = el;
        }}
        style={{ clipPath: "circle(0% at 50% 50%)" }}
        className="absolute inset-0 w-full h-full bg-[#f75828] origin-center"
      />
      <div
        ref={(el) => {
          revealerRefs.current[2] = el;
        }}
        style={{ clipPath: "circle(0% at 50% 50%)" }}
        className="absolute inset-0 w-full h-full bg-[#e01b22] origin-center"
      />
      <div
        ref={(el) => {
          revealerRefs.current[3] = el;
        }}
        style={{ clipPath: "circle(0% at 50% 50%)" }}
        className="absolute inset-0 w-full h-full bg-[#050505] origin-center"
      />

      {!isBrief && (
        <>
          {/* 4 Preloader Showcase Items */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {itemImages.map((src, i) => (
              <div
                key={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                style={{ transform: "translate(-50%, -50%) scale(0)", opacity: 0 }}
                className="absolute top-1/2 left-1/2 w-[18vw] sm:w-[14vw] max-w-[200px] aspect-square overflow-hidden rounded-xl border border-white/20 shadow-2xl bg-black"
              >
                <Image
                  ref={(el) => {
                    itemImgRefs.current[i] = el as unknown as HTMLImageElement;
                  }}
                  src={src}
                  alt={`Showcase ${i + 1}`}
                  fill
                  priority
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Preloader Center Official LOOMIE Logo & Motto */}
          <div
            ref={preloaderLogoRef}
            style={{ transform: "translate(-50%, -50%) scale(0.5)", opacity: 0 }}
            className="absolute top-1/2 left-1/2 pointer-events-none z-20 flex items-center justify-center flex-col gap-2"
          >
            <div className="flex items-center gap-1 font-bold text-5xl sm:text-7xl tracking-tighter uppercase barlow-font text-white">
              <span>L</span>
              <span className="inline-flex items-center justify-center px-1">
                <LoomieLogoMark className="h-[0.75em] w-auto inline-block text-white" />
              </span>
              <span>MIE</span>
            </div>
            <span className="font-mono text-[9px] xs:text-[10px] sm:text-xs font-bold tracking-[0.16em] sm:tracking-[0.3em] text-white/90 uppercase whitespace-nowrap">
              CLEAR. CONNECTED. COMPLETE.
            </span>
          </div>
        </>
      )}
    </div>
  );
}
