"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { LoomieLogoMark } from "@/components/LoomieLogoMark";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export function LandingSampleClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderBgRef = useRef<HTMLDivElement>(null);
  const preloaderLogoRef = useRef<HTMLDivElement>(null);
  const revealerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemImgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const navLogoRef = useRef<HTMLDivElement>(null);
  const navWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const headingCharRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const footerLineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const heroImgBgRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  const [replayKey, setReplayKey] = useState<number>(0);

  // Headline text
  const headlineText = "DESIGN THAT MAKES PEOPLE LOOK TWICE";
  const headlineWords = headlineText.split(" ");

  // LOOMIE Official Submenu Links
  const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About Us", href: "/about-us" },
    { label: "Story", href: "/story" },
    { label: "Values", href: "/values" },
    { label: "Connect", href: "/contact" },
  ];

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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.reload();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reset all elements to initial state before sequence starts
      if (preloaderRef.current) gsap.set(preloaderRef.current, { display: "block" });
      if (preloaderBgRef.current) gsap.set(preloaderBgRef.current, { display: "block" });

      revealerRefs.current.forEach((rev) => {
        if (rev) gsap.set(rev, { clipPath: "circle(0% at 50% 50%)", display: "block" });
      });

      if (preloaderLogoRef.current) {
        gsap.set(preloaderLogoRef.current, { scale: 0.5, opacity: 0, xPercent: -50, yPercent: -50 });
      }

      itemRefs.current.forEach((item) => {
        if (item) gsap.set(item, { scale: 0, opacity: 1, x: 0, y: 0, rotation: 0, xPercent: -50, yPercent: -50 });
      });

      if (navLogoRef.current) gsap.set(navLogoRef.current, { scale: 0, opacity: 0 });

      navWordRefs.current.forEach((word) => {
        if (word) gsap.set(word, { yPercent: 100, y: 0 });
      });

      headingCharRefs.current.forEach((char) => {
        if (char) gsap.set(char, { y: 50, opacity: 0, scale: 0.5 });
      });

      footerLineRefs.current.forEach((line) => {
        if (line) gsap.set(line, { yPercent: 100, y: 0 });
      });

      if (heroImgBgRef.current) gsap.set(heroImgBgRef.current, { scale: 0 });
      if (heroImgRef.current) gsap.set(heroImgRef.current, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50, rotation: 8 });

      const floatingTweens: gsap.core.Tween[] = [];

      // 2. Master Animation Timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Phase 1: Preloader Circle Revealers 1 -> 4
      const validRevealers = revealerRefs.current.filter(Boolean);
      if (validRevealers.length > 0) {
        tl.to(validRevealers, {
          clipPath: "circle(100% at 50% 50%)",
          duration: 1.0,
          stagger: 0.22,
          ease: "power2.inOut",
        });
      }

      tl.set(validRevealers, { display: "none" });

      // Phase 2: Corner Showcase Items Expand Outward with Sine Floating Yoyo
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
            rotation: target.rotation,
            duration: 1.2,
            ease: "power3.out",
            onStart: () => {
              if (image) {
                floatingTweens[i] = gsap.to(image, {
                  y: gsap.utils.random(-15, -25),
                  duration: gsap.utils.random(1.5, 2.5),
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                  delay: gsap.utils.random(0, 0.5),
                });
              }
            },
          },
          i === 0 ? "-=0.5" : "<0.075"
        );
      });

      // Phase 3: Preloader Center Brand Logo Scales In
      if (preloaderLogoRef.current) {
        tl.to(
          preloaderLogoRef.current,
          { scale: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
          "<"
        );
      }

      if (preloaderBgRef.current) {
        tl.set(preloaderBgRef.current, { display: "none" });
      }

      tl.to({}, { duration: 0.8 });

      // Phase 4: Preloader Outward Explosion Exit Sequence
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
            duration: 0.75,
            ease: "power2.in",
          },
          i === 0 ? ">" : "<0.075"
        );
      });

      if (preloaderLogoRef.current) {
        tl.to(
          preloaderLogoRef.current,
          { scale: 1.8, opacity: 0, duration: 0.75, ease: "power2.in" },
          "<"
        );
      }

      if (preloaderRef.current) {
        tl.set(preloaderRef.current, { display: "none" });
      }

      // Phase 5: Hero Main Page Reveal
      if (navLogoRef.current) {
        tl.to(navLogoRef.current, { scale: 1, opacity: 1, duration: 0.75, ease: "power3.out" }, "-=0.3");
      }

      const validNavWords = navWordRefs.current.filter(Boolean);
      if (validNavWords.length > 0) {
        tl.to(
          validNavWords,
          { yPercent: 0, y: 0, duration: 0.75, stagger: 0.04, ease: "power3.out" },
          "<0.1"
        );
      }

      const validChars = headingCharRefs.current.filter(Boolean);
      if (validChars.length > 0) {
        tl.to(
          validChars,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            stagger: 0.015,
            ease: "elastic.out(0.75, 0.25)",
          },
          "<0.15"
        );
      }

      const validFooterLines = footerLineRefs.current.filter(Boolean);
      if (validFooterLines.length > 0) {
        tl.to(
          validFooterLines,
          { yPercent: 0, y: 0, duration: 0.75, stagger: 0.1, ease: "power3.out" },
          "<0.2"
        );
      }

      if (heroImgBgRef.current) {
        tl.to(heroImgBgRef.current, { scale: 1, duration: 1.0, ease: "power3.out" }, "<0.1");
      }

      if (heroImgRef.current) {
        tl.to(
          heroImgRef.current,
          { scale: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
          "<0.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [replayKey]);

  let charGlobalIndex = 0;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none bg-[#050505] text-white font-sans"
    >
      {/* Dynamic Barlow Condensed Font import */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900&family=Instrument+Sans:wght@400;500;600;700&display=swap");
        .barlow-font {
          font-family: "Barlow Condensed", sans-serif;
        }
        .instrument-font {
          font-family: "Instrument Sans", sans-serif;
        }
      `}</style>

      {/* 1. CODEGRID PRELOADER OVERLAY */}
      <div
        ref={preloaderRef}
        className="fixed inset-0 z-[9990] w-full h-screen overflow-hidden bg-[#050505] text-white"
      >
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

        {/* 4 Preloader Showcase Items */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {itemImages.map((src, i) => (
            <div
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              style={{ transform: "translate(-50%, -50%) scale(0)" }}
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
      </div>

      {/* 2. MAIN HERO LANDING SECTION */}
      <div className="relative w-full h-screen overflow-hidden bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-10 z-0">
        
        {/* TOP NAVIGATION BAR */}
        <nav className="absolute top-0 left-0 w-full p-6 sm:p-10 flex justify-between items-center z-30">
          {/* Official LOOMIE Brand Logo Mark */}
          <div ref={navLogoRef} style={{ transform: "scale(0)", opacity: 0 }} className="origin-top-left hidden lg:block">
            <a
              href="/"
              onClick={handleLogoClick}
              className="group flex items-center gap-1 font-bold text-sm sm:text-2xl tracking-tighter uppercase px-4 py-2 rounded-full bg-white text-black border border-white/20 transition-all duration-300 hover:scale-105 select-none font-sans cursor-pointer backdrop-blur-md shadow-xl"
            >
              <span>L</span>
              <span className="inline-flex items-center justify-center px-0.5 relative">
                <LoomieLogoMark className="h-[0.75em] w-auto inline-block align-middle transition-transform duration-700 ease-out group-hover:rotate-180 text-black" />
              </span>
              <span>MIE</span>
            </a>
          </div>

          {/* Official LOOMIE Submenu Links (Desktop Only) */}
          <div className="hidden lg:flex flex-wrap items-center gap-3 sm:gap-6">
            {navLinks.map((link, idx) => (
              <div key={link.label} className="overflow-hidden h-[1.6em] inline-flex items-center">
                <Link
                  href={link.href}
                  className="inline-block barlow-font font-bold text-base sm:text-xl text-white uppercase tracking-wider hover:text-[#f75828] transition-colors"
                >
                  <span
                    ref={(el) => {
                      navWordRefs.current[idx] = el;
                    }}
                    className="inline-block"
                  >
                    {link.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </nav>

        {/* HERO CENTER CONTENT */}
        <section className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden z-10">
          
          {/* HEADLINE TEXT */}
          <div className="absolute top-[28%] sm:top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[94%] sm:w-[82%] max-w-[980px] text-center z-10">
            <h1 className="barlow-font text-[3.4rem] xs:text-[4.0rem] sm:text-[4.4rem] md:text-[5.4rem] lg:text-[6.4rem] xl:text-[7.0rem] font-extrabold text-white uppercase leading-[0.88] tracking-tight">
              {headlineWords.map((word, wIdx) => (
                <span key={wIdx} className="inline-block mr-[0.25em] whitespace-nowrap overflow-hidden">
                  {word.split("").map((char, cIdx) => {
                    const idx = charGlobalIndex++;
                    return (
                      <span
                        key={cIdx}
                        ref={(el) => {
                          headingCharRefs.current[idx] = el;
                        }}
                        style={{ transform: "translateY(50px) scale(0.5)", opacity: 0 }}
                        className="inline-block"
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
          </div>

          {/* HERO VIDEO CONTAINER (LOOMIE OFFICIAL KINETIC REEL VIDEO) */}
          <div className="absolute left-1/2 bottom-[-5%] sm:bottom-[-9%] -translate-x-1/2 w-[68vw] sm:w-[48vw] md:w-[28vw] max-w-[420px] min-w-[260px] aspect-square flex justify-center items-center z-20 pointer-events-none">
            
            {/* Orange Expanding Circle Background Substrate */}
            <div
              ref={heroImgBgRef}
              style={{ transform: "scale(0)" }}
              className="w-full h-full bg-[#f75828] rounded-full origin-center transform-gpu shadow-2xl"
            />

            {/* Overlaid LOOMIE Kinetic Video Reel */}
            <div
              ref={heroImgRef}
              style={{ transform: "translate(-50%, -50%) scale(0)", opacity: 0 }}
              className="absolute top-1/2 left-1/2 w-[88%] aspect-square origin-center transform-gpu shadow-2xl rounded-3xl overflow-hidden border-2 border-white/25 bg-black"
            >
              <video
                src={getCloudinaryUrl("make_a_video_with_those_please.mp4", "video")}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        </section>

        {/* HERO FOOTER BAR: Social Media Icon Buttons */}
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 flex justify-between items-end z-30 pointer-events-none instrument-font font-medium text-xs sm:text-sm text-white uppercase tracking-wider">
          <div className="overflow-hidden h-[2.8em] flex items-center">
            <div
              ref={(el) => {
                footerLineRefs.current[0] = el;
              }}
              className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 text-white"
            >
              {/* Instagram Icon */}
              <a
                href="https://www.instagram.com/loomiestudio/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 sm:p-3 border border-white/30 rounded-full bg-white/10 text-white hover:bg-[#f75828] hover:text-white transition-all duration-300 backdrop-blur-md flex items-center justify-center group shadow-xl"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/company/loomieofficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 sm:p-3 border border-white/30 rounded-full bg-white/10 text-white hover:bg-[#f75828] hover:text-white transition-all duration-300 backdrop-blur-md flex items-center justify-center group shadow-xl"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* X / Twitter Icon */}
              <a
                href="https://x.com/Loomieofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="p-2.5 sm:p-3 border border-white/30 rounded-full bg-white/10 text-white hover:bg-[#f75828] hover:text-white transition-all duration-300 backdrop-blur-md flex items-center justify-center group shadow-xl"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="overflow-hidden h-[2.8em] flex items-center">
            <div
              ref={(el) => {
                footerLineRefs.current[1] = el;
              }}
              className="pointer-events-auto flex items-center font-mono font-bold text-xs sm:text-sm text-white"
            >
              <a
                href="https://www.instagram.com/loomiestudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f75828] transition-colors"
              >
                @LOOMIESTUDIO
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
