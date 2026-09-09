"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ExternalLink, ChevronDown, ArrowUpRight } from "lucide-react";

interface ProjectDetail {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  client: string;
  year: string;
  services: string[];
  liveUrl?: string;
  heroImage: string;
  challenge: string;
  solution: string;
  impact: string;
  gallery: string[];
  nextSlug: string;
  nextTitle: string;
  nextHeroImage?: string;
  nextCategory?: string;
}

export function CaseStudyClient({ project }: { project: ProjectDetail }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const briefSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force Lenis + window scroll position to top (0,0) on case study mount
    const forceScrollTop = () => {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    forceScrollTop();
    const timer = setTimeout(forceScrollTop, 50);

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero image subtle parallax scale
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current.querySelector("img"), {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 2. Animated on scroll sequence for (THE BRIEF), SERVICES, and CREDITS
      if (briefSectionRef.current) {
        const briefTag = briefSectionRef.current.querySelector(".cs-brief-tag");
        const briefTitle = briefSectionRef.current.querySelector(".cs-brief-title");
        const briefDesc = briefSectionRef.current.querySelector(".cs-brief-desc");
        const serviceHeader = briefSectionRef.current.querySelector(".cs-services-header");
        const serviceItems = briefSectionRef.current.querySelectorAll(".cs-service-item");
        const creditsHeader = briefSectionRef.current.querySelector(".cs-credits-header");
        const creditItems = briefSectionRef.current.querySelectorAll(".cs-credit-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: briefSectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        if (briefTag) {
          tl.fromTo(briefTag, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
        }
        if (briefTitle) {
          tl.fromTo(briefTitle, { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" }, 0.1);
        }
        if (briefDesc) {
          tl.fromTo(briefDesc, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }, 0.25);
        }

        if (serviceHeader) {
          tl.fromTo(serviceHeader, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.15);
        }
        if (serviceItems.length) {
          tl.fromTo(
            serviceItems,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.08 },
            0.25
          );
        }

        if (creditsHeader) {
          tl.fromTo(creditsHeader, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.4);
        }
        if (creditItems.length) {
          tl.fromTo(
            creditItems,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.06 },
            0.5
          );
        }
      }

      // 3. (THE WORK) block animation
      const theWorkBlock = document.querySelector(".cs-the-work-block");
      if (theWorkBlock) {
        gsap.fromTo(
          theWorkBlock,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: theWorkBlock,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Big Single Banner GSAP ScrollTrigger entrance animation
      const bigBanner = document.querySelector(".cs-big-single-banner");
      if (bigBanner) {
        gsap.fromTo(
          bigBanner,
          { y: 55, scale: 0.96, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bigBanner,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 5. Next Project Expanding Card GSAP ScrollTrigger entrance animation
      const nextCard = document.querySelector(".cs-next-project-card");
      if (nextCard) {
        gsap.fromTo(
          nextCard,
          { scale: 0.82, y: 80, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 6. GSAP ScrollTrigger Stagger Reveal for all 3-column gallery grid items
      const galleryItems = document.querySelectorAll(".cs-gallery-item");
      galleryItems.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 55, scale: 0.95, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [project]);

  const totalGallery = project.gallery.slice(0, 20);
  const firstGalleryBatch = totalGallery.slice(0, 4);
  const bannerImage = totalGallery[4] || project.heroImage;
  const remainingGalleryBatch = totalGallery.slice(5);

  const isVideoMedia = (url: string) => url.endsWith(".mp4") || url.includes(".mp4") || url.endsWith(".webm");

  return (
    <div ref={containerRef} className="w-full bg-[#050505] text-white select-none">

      {/* 1. FULLSCREEN FULL-BLEED HERO SHOWCASE SECTION */}
      <section ref={heroImageRef} className="relative w-full min-h-[70vh] sm:min-h-[75vh] overflow-hidden flex flex-col justify-end select-none bg-stone-900 border-b border-stone-300">
        {isVideoMedia(project.heroImage) ? (
          <video src={project.heroImage} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        ) : (
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover"
          />
        )}

        {/* Framed Wireframe Box at Bottom of Viewport with Giant White Brutalist Title */}
        <div className="w-full relative z-20 pb-8 sm:pb-12 px-4 sm:px-8 md:px-12 pt-16 sm:pt-24">
          <div className="w-full border-t border-b border-white/40 py-6 sm:py-8 px-4 sm:px-8 bg-black/40">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] font-black font-sans tracking-tight text-white leading-none uppercase select-none">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. THE BRIEF + SERVICES & CREDITS SECTION */}
      <div ref={briefSectionRef} className="pt-12 pb-10 px-2 sm:px-4 md:px-6 max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-10 border-b border-white/15 px-4 sm:px-8">

          {/* LEFT COLUMN: (THE BRIEF) + Large Expressive Narrative Text */}
          <div className="lg:col-span-7 space-y-4">
            <span className="cs-brief-tag text-[#f75828] font-mono text-sm font-bold tracking-wider uppercase block">
              (THE BRIEF)
            </span>

            <p className="cs-brief-title text-2xl sm:text-3xl lg:text-4xl font-bold font-sans tracking-tight text-white leading-[1.2]">
              {project.challenge || project.subtitle}
            </p>

            <div className="cs-brief-desc space-y-3 pt-2">
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: SERVICES Accordion + CREDITS */}
          <div className="lg:col-span-5 space-y-8 lg:pl-6">

            {/* SERVICES Accordion */}
            <div className="space-y-3">
              <h3 className="cs-services-header font-mono text-xs font-black tracking-widest text-[#f75828] uppercase pb-2 border-b border-white/20">
                SERVICES
              </h3>

              <div className="divide-y divide-white/15">
                {project.services.map((service, sIdx) => (
                  <details key={sIdx} className="cs-service-item group py-3 cursor-pointer transition-colors" open={sIdx === 0}>
                    <summary className="flex items-center justify-between font-sans text-lg sm:text-xl font-medium text-white list-none select-none group-hover:text-[#f75828] transition-colors">
                      <span>{service}</span>
                      <ChevronDown className="w-5 h-5 text-stone-400 group-open:rotate-180 transition-transform duration-300" />
                    </summary>
                    <p className="font-sans text-sm text-stone-300 font-normal leading-relaxed pt-2 pr-4">
                      Comprehensive studio execution spanning strategy, visual systems, kinetic typography, and high-performance WebGL digital architecture.
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* CREDITS Section */}
            <div className="space-y-3 pt-2">
              <h3 className="cs-credits-header font-mono text-xs font-black tracking-widest text-[#f75828] uppercase pb-2 border-b border-white/20">
                CREDITS
              </h3>

              <div className="space-y-2 font-sans text-base font-medium text-stone-200">
                <div className="cs-credit-item flex items-center justify-between border-b border-white/15 pb-2">
                  <span className="text-stone-400 font-mono text-xs uppercase font-bold">PRODUCTION</span>
                  <span className="text-white">LOOMIE &amp; Co</span>
                </div>

                <div className="cs-credit-item flex items-center justify-between border-b border-white/15 pb-2">
                  <span className="text-stone-400 font-mono text-xs uppercase font-bold">CLIENT</span>
                  <span className="text-white">{project.client} ({project.year})</span>
                </div>

                {project.liveUrl && (
                  <div className="cs-credit-item flex items-center justify-between border-b border-white/15 pb-2">
                    <span className="text-stone-400 font-mono text-xs uppercase font-bold">LIVE URL</span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#f75828] hover:underline font-bold"
                    >
                      <span>LAUNCH SITE</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* 3. FIRST GALLERY BATCH (2-Column Showcase Grid with Tight Gaps) */}
        {firstGalleryBatch.length > 0 && (
          <div className="py-6 sm:py-8 border-b border-white/15">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {firstGalleryBatch.map((imgUrl, gIdx) => (
                <div
                  key={gIdx}
                  className="cs-gallery-item w-full aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden rounded-none group cursor-pointer bg-stone-900 border border-white/15"
                >
                  {isVideoMedia(imgUrl) ? (
                    <video src={imgUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <Image
                      src={imgUrl}
                      alt={`${project.title} Visual ${gIdx + 1}`}
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. (THE WORK) NARRATIVE SECTION */}
        <div className="py-12 px-4 sm:px-8 border-b border-white/15 cs-the-work-block">
          <div className="max-w-4xl space-y-4">
            <span className="text-[#f75828] font-mono text-sm font-bold tracking-wider uppercase block">
              (THE WORK)
            </span>

            <p className="text-xl sm:text-2xl lg:text-3xl font-medium font-sans text-white leading-relaxed">
              {project.solution}
            </p>

            {project.impact && (
              <p className="text-base sm:text-lg font-normal font-sans text-stone-300 leading-relaxed pt-1">
                {project.impact}
              </p>
            )}
          </div>
        </div>

        {/* 5. BIG SINGLE SHOWCASE BANNER / VIDEO IN THE MIDDLE (Full Page Segment) */}
        {bannerImage && (
          <div className="py-6 sm:py-8 border-b border-stone-300 cs-big-single-banner">
            <div className="w-full h-[80vh] sm:h-[90vh] lg:h-screen relative overflow-hidden rounded-none group cursor-pointer bg-stone-200 border border-stone-300 origin-center">
              {isVideoMedia(bannerImage) ? (
                <video
                  src={bannerImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={bannerImage}
                  alt={`${project.title} Full Page Showcase Segment`}
                  fill
                  quality={95}
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              )}
            </div>
          </div>
        )}

        {/* 6. 2-COLUMN VERTICAL SHOWCASE GRID (Tight Gaps) */}
        {remainingGalleryBatch.length > 0 && (
          <div className="py-6 sm:py-8 border-b border-stone-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {remainingGalleryBatch.map((imgUrl, gIdx) => (
                <div
                  key={gIdx}
                  className="cs-gallery-item w-full aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden rounded-none group cursor-pointer bg-stone-200 border border-stone-300"
                >
                  {isVideoMedia(imgUrl) ? (
                    <video src={imgUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <Image
                      src={imgUrl}
                      alt={`${project.title} Visual Feature ${gIdx + 5}`}
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. NEXT PROJECT EXPANDING CARD (Kinetic Background Preview & Animations) */}
        <div className="py-12">
          <Link
            href={`/work/${project.nextSlug}`}
            className="cs-next-project-card group block w-full h-[380px] sm:h-[480px] lg:h-[540px] bg-[#0E0E0E] text-white p-8 sm:p-12 md:p-16 relative overflow-hidden rounded-none transition-all duration-500 hover:border-[#E62B00] cursor-pointer origin-center border border-stone-800 shadow-2xl"
          >
            {/* Background Project Image Preview with Scale & Fade Hover Effect */}
            {(project.nextHeroImage || project.heroImage) && (
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                <Image
                  src={project.nextHeroImage || project.heroImage}
                  alt={project.nextTitle}
                  fill
                  quality={90}
                  sizes="100vw"
                  className="object-cover opacity-35 filter grayscale group-hover:grayscale-0 group-hover:opacity-75 group-hover:scale-108 transition-all duration-700 ease-out"
                />
                {/* Vignette Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/40 pointer-events-none" />
              </div>
            )}

            {/* Top Row: Next Project Tag + Magnetic Glowing Arrow Button */}
            <div className="flex items-center justify-between z-20 relative">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E62B00] animate-pulse" />
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">
                  NEXT PROJECT — {project.nextCategory || "CASE STUDY"}
                </span>
              </div>

              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#E62B00] group-hover:border-[#E62B00] group-hover:scale-110 transition-all duration-500 shadow-2xl">
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Bottom Row: Giant Brutalist Project Title & Click Hint */}
            <div className="absolute bottom-8 sm:bottom-12 md:bottom-14 left-8 sm:left-12 md:left-16 right-8 sm:right-12 md:right-16 z-20 space-y-3">
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black font-sans tracking-tight text-white uppercase leading-none group-hover:text-[#E62B00] transition-colors duration-500">
                {project.nextTitle}
              </h2>

              <p className="font-mono text-xs sm:text-sm text-stone-400 group-hover:text-white uppercase font-bold tracking-wider transition-colors duration-300">
                DISCOVER CASE STUDY → CLICK TO EXPLORE WORK
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}



