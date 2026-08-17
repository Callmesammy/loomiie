"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { SubpageHeroHeader } from "@/components/SubpageHeroHeader";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ArrowUpRight, X, Sparkles, Layers, Globe } from "lucide-react";

interface CaseStudy {
  id: string;
  number: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  alt: string;
  summary: string;
  fullStory: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
}

const FEATURED_CASE_STUDIES: CaseStudy[] = [
  {
    id: "sat-telemetry",
    number: "01",
    title: "SAT Cybernetic HUD & Telemetry Interface",
    client: "SAT Telemetry Systems",
    category: "UI/UX Architecture & WebGL",
    year: "2026",
    image: "/images/projects/hero-project-1.jpg",
    alt: "SAT Cybernetic HUD Telemetry Interface",
    summary:
      "Tactile real-time data dashboard and cybernetic interface engineered with Next.js 15, Three.js GLSL shaders, and high-frequency telemetry data streams.",
    fullStory:
      "SAT required a mission-critical telemetry dashboard capable of processing real-time telemetry datasets without dropping frame rate. LOOMIE architected a custom WebGL GPU-accelerated canvas interface paired with Next.js 15 server components, delivering instantaneous data visualization and zero-latency user interaction.",
    deliverables: ["UI/UX Architecture", "Three.js GLSL Shaders", "Telemetry Dashboards", "Next.js 15"],
    metrics: [
      { label: "FRAME RATE", value: "60 FPS GPU" },
      { label: "DATA LATENCY", value: "< 12 ms" },
      { label: "USER ADOPTION", value: "+ 340%" },
    ],
  },
  {
    id: "play-kinetic",
    number: "02",
    title: "Play Kinetic Spatial Brand System",
    client: "Play Kinetic Entertainment",
    category: "Spatial & Brand Identity",
    year: "2026",
    image: "/images/projects/hero-project-2.jpg",
    alt: "Play Kinetic Brand Identity and Spatial Architecture",
    summary:
      "Systemic logomark architecture, visual identity tokens, tactile packaging rituals, and spatial signage for an ambitious international entertainment brand.",
    fullStory:
      "Play Kinetic needed a bold, enduring visual language that could transition seamlessly from physical architectural signage to digital app interfaces. We developed custom typographic tokens, tactile packaging systems, and kinetic motion guidelines that elevated brand recognition across 12 global markets.",
    deliverables: ["Brand Strategy", "Design Tokens", "Tactile Packaging", "Spatial Signage"],
    metrics: [
      { label: "MARKET REACH", value: "12 GLOBAL CITIES" },
      { label: "BRAND RECOGNITION", value: "+ 280%" },
      { label: "DESIGN TOKENS", value: "140+ ASSETS" },
    ],
  },
  {
    id: "horizon-edge",
    number: "03",
    title: "Horizon Autonomous Web Infrastructure",
    client: "Horizon Digital Networks",
    category: "Full-Stack & Edge Architecture",
    year: "2026",
    image: "/images/projects/hero-project-3.jpg",
    alt: "Horizon Digital Networks Headless E-Commerce App",
    summary:
      "High-speed headless e-commerce and full-stack edge web application deployed on Cloudflare Workers D1 edge infrastructure.",
    fullStory:
      "Horizon sought to replace their legacy monolithic stack with an ultra-fast, edge-computed digital store. LOOMIE built a Next.js 15 headless architecture powered by Cloudflare D1 distributed edge databases, achieving 99+ Lighthouse performance scores worldwide.",
    deliverables: ["Next.js 15", "Cloudflare D1 Edge", "Headless E-Commerce", "TypeScript"],
    metrics: [
      { label: "LIGHTHOUSE SCORE", value: "99 / 100" },
      { label: "GLOBAL TTFB", value: "18 ms EDGE" },
      { label: "CONVERSION RATE", value: "+ 4.2%" },
    ],
  },
];

export default function WorkPage() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  return (
    <main className="relative min-h-screen bg-[#F5F3EF] text-[#0E0E0E] overflow-hidden select-none">
      <Navbar />

      {/* Hero Header */}
      <SubpageHeroHeader
        badge="[LOOMIE STUDIO // FEATURED CASE STUDIES]"
        line1="SELECTED WORK &"
        line2="EDITORIAL CASE STUDIES"
        bannerImage="/images/projects/hero-project-1.jpg"
        bannerAlt="LOOMIE Featured Work"
      />

      {/* Main Content: 3 Curated Projects with Rich Editorial Text */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 max-w-[1700px] mx-auto w-full space-y-20">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-300 pb-6">
          <div>
            <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">
              CURATED CASE STUDIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-light font-sans tracking-tight text-[#0E0E0E]">
              Featured Work
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
            03 SELECTED PRODUCTIONS
          </span>
        </div>

        {/* 3 High-Impact Editorial Case Study Cards */}
        <div className="space-y-20 sm:space-y-28">
          {FEATURED_CASE_STUDIES.map((project, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center border-b border-stone-300 pb-16 sm:pb-24 ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Frame (5 Cols or 6 Cols) */}
                <div
                  className={`lg:col-span-6 relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-stone-300 bg-stone-200 shadow-xl group cursor-pointer ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                  onClick={() => setSelectedCaseStudy(project)}
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    priority={idx === 0}
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 font-mono text-xs font-bold px-3 py-1 bg-black/80 text-white backdrop-blur-md rounded-xs">
                    PROJECT {project.number} // {project.year}
                  </div>
                </div>

                {/* Narrative Text Block (6 Cols) */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
                      <span>[{project.number}]</span>
                      <span>/</span>
                      <span>{project.category}</span>
                      <span>/</span>
                      <span>{project.client}</span>
                    </div>

                    <h3 className="text-3xl sm:text-5xl font-light font-sans tracking-tight text-[#0E0E0E] leading-[1.05]">
                      {project.title}
                    </h3>
                  </div>

                  <p className="font-sans text-base sm:text-lg text-stone-700 leading-relaxed font-normal">
                    {project.summary}
                  </p>

                  {/* Deliverable Tags */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.deliverables.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 bg-white border border-stone-300 rounded-full font-mono text-xs font-bold text-stone-800 uppercase shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 flex items-center gap-4">
                    <button
                      onClick={() => setSelectedCaseStudy(project)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E0E0E] text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors shadow-md cursor-pointer"
                    >
                      <span>READ FULL CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </button>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-stone-700 uppercase hover:text-[#0E0E0E] transition-colors"
                    >
                      <span>REQUEST SIMILAR SYSTEM</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* FULL CASE STUDY MODAL OVERLAY */}
      {selectedCaseStudy && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCaseStudy(null)}
        >
          <div
            className="bg-white border border-stone-300 rounded-2xl max-w-2xl w-full p-6 sm:p-10 space-y-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-stone-200 pb-6">
              <div className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
                [{selectedCaseStudy.number}] // {selectedCaseStudy.category}
              </div>
              <h3 className="text-2xl sm:text-4xl font-light font-sans text-[#0E0E0E]">
                {selectedCaseStudy.title}
              </h3>
              <p className="font-mono text-xs font-bold text-stone-500 uppercase">
                CLIENT: {selectedCaseStudy.client} • {selectedCaseStudy.year}
              </p>
            </div>

            {/* Modal Image */}
            <div className="relative w-full h-[260px] sm:h-[320px] rounded-xl overflow-hidden border border-stone-300">
              <Image
                src={selectedCaseStudy.image}
                alt={selectedCaseStudy.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Modal Full Narrative Story */}
            <div className="space-y-4 font-sans text-sm text-stone-700 leading-relaxed">
              <h4 className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
                THE CHALLENGE & EXECUTION
              </h4>
              <p>{selectedCaseStudy.fullStory}</p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200 bg-stone-50 p-4 rounded-xl text-center">
              {selectedCaseStudy.metrics.map((m, mIdx) => (
                <div key={mIdx} className="space-y-1">
                  <div className="font-mono text-[10px] text-stone-500 font-bold uppercase">{m.label}</div>
                  <div className="font-sans text-lg font-bold text-[#0E0E0E]">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Modal CTA */}
            <div className="pt-4 flex justify-between items-center border-t border-stone-200">
              <span className="font-mono text-xs font-bold text-stone-500 uppercase">LOOMIE CASE STUDY</span>
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-[#0E0E0E] text-white rounded-full font-mono text-xs font-bold uppercase hover:bg-stone-800 transition-colors"
              >
                START A PROJECT
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
