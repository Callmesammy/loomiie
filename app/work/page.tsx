"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowUpRight, X, Sparkles, Filter } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface WorkProject {
  id: string;
  title: string;
  client: string;
  category: string;
  filterCategory: "Branding" | "WebGL & Motion" | "UI/UX Architecture" | "Full Stack";
  year: string;
  image: string;
  alt: string;
  aspectRatio: "wide" | "compact"; // wide = 7 cols, compact = 5 cols
  summary: string;
  fullStory: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
}

const ALL_WORK_PROJECTS: WorkProject[] = [
  // Row 1: Left Wide (7 cols), Right Compact (5 cols)
  {
    id: "prink-beverages",
    title: "PRINK",
    client: "Prink Beverage Co.",
    category: "Food & Beverages",
    filterCategory: "Branding",
    year: "2026",
    image: getCloudinaryUrl("/images/project-packaging.jpg"),
    alt: "PRINK Tactile Beverage Packaging & Brand System",
    aspectRatio: "wide",
    summary:
      "Vibrant 3D packaging rituals, gut-health beverage identity, and spatial brand activation across retail & digital touchpoints.",
    fullStory:
      "PRINK required a high-energy, modern beverage identity that commands attention on store shelves and digital storefronts alike. LOOMIE crafted custom 3D can renders, tactile label finishes, and an interactive digital store that boosted direct-to-consumer sales by 320%.",
    deliverables: ["3D Packaging Design", "Brand Strategy", "E-Commerce", "Art Direction"],
    metrics: [
      { label: "D2C SALES", value: "+ 320%" },
      { label: "SHELF PRESENCE", value: "140+ STORES" },
      { label: "RECOGNITION", value: "AWWWARDS SITE" },
    ],
  },
  {
    id: "banana-health",
    title: "Banana Health",
    client: "Banana Health Labs",
    category: "Logo & Branding",
    filterCategory: "Branding",
    year: "2026",
    image: getCloudinaryUrl("/images/services/service-color.jpg"),
    alt: "Banana Health Brand Identity and Color Palette",
    aspectRatio: "compact",
    summary:
      "Modern wellness identity, iconic symbolic mark, and design tokens for a fast-growing digital health platform.",
    fullStory:
      "Banana Health needed a approachable yet trustworthy visual identity for its telehealth application. We created a warm, cheerful color palette, custom type tokens, and a versatile symbolic logo mark that bridges digital apps and physical merchandise.",
    deliverables: ["Logo Design", "Visual Identity", "Color Tokens", "Brand Charter"],
    metrics: [
      { label: "USER APP ADOPTION", value: "+ 210%" },
      { label: "BRAND TOKENS", value: "85 ASSETS" },
      { label: "CUSTOMER CSAT", value: "98.4%" },
    ],
  },

  // Row 2: Left Compact (5 cols), Right Wide (7 cols)
  {
    id: "automotive-telemetry",
    title: "Vortex Chassis",
    client: "Vortex Automotive",
    category: "Automotive & UI Hardware",
    filterCategory: "UI/UX Architecture",
    year: "2026",
    image: getCloudinaryUrl("/images/project-minimal.jpg"),
    alt: "Vortex Automotive Matte Chassis & Hardware UI",
    aspectRatio: "compact",
    summary:
      "Matte chassis interface, autonomous HUD cockpit controls, and tactile hardware design tokens.",
    fullStory:
      "Vortex Automotive commissioned LOOMIE to design a high-definition dashboard cockpit UI for their electric vehicle prototype. We created a high-contrast dark interface with 60 FPS GLSL rendered telemetry gauges.",
    deliverables: ["Cockpit UI/UX", "Hardware Tokens", "GLSL Canvas 2D/3D", "Design System"],
    metrics: [
      { label: "DISPLAY LATENCY", value: "< 8 ms" },
      { label: "FRAME RATE", value: "60 FPS GPU" },
      { label: "SAFETY RATING", value: "5-STAR HUD" },
    ],
  },
  {
    id: "sat-cybernetic",
    title: "SAT Cybernetic HUD",
    client: "SAT Telemetry Systems",
    category: "Autonomous Aerospace & WebGL",
    filterCategory: "WebGL & Motion",
    year: "2026",
    image: getCloudinaryUrl("/images/hero-3d-fluid.jpg"),
    alt: "SAT Cybernetic WebGL Shader Engine",
    aspectRatio: "wide",
    summary:
      "Real-time data dashboard and cybernetic WebGL shader engine built for high-scale aerospace telemetry processing.",
    fullStory:
      "SAT required a mission-critical telemetry interface capable of visualizing dense spatial data streams in real time. We built a Next.js 15 app powered by custom Three.js GLSL shaders, delivering ultra-fluid 60 FPS performance.",
    deliverables: ["Three.js Shaders", "Next.js 15 App", "Real-Time Telemetry", "TypeScript"],
    metrics: [
      { label: "DATA THROUGHPUT", value: "1.2 GB/s" },
      { label: "GPU RENDER", value: "120 FPS" },
      { label: "GLOBAL SERVERS", value: "24 EDGES" },
    ],
  },

  // Row 3: Left Wide (7 cols), Right Compact (5 cols)
  {
    id: "play-kinetic",
    title: "Play Kinetic",
    client: "Play Kinetic Systems",
    category: "Spatial Play & Brand Systems",
    filterCategory: "Branding",
    year: "2026",
    image: getCloudinaryUrl("/images/projects/hero-project-2.jpg"),
    alt: "Play Kinetic Modular Brand Identity System",
    aspectRatio: "wide",
    summary:
      "Kinetic modular identity system, spatial architecture, and playful visual narratives for digital platforms.",
    fullStory:
      "Play Kinetic bridges spatial design with dynamic motion. LOOMIE engineered a modular building-block design language that scales seamlessly from architectural signage to mobile applications.",
    deliverables: ["Spatial Identity", "Kinetic Motion", "Brand Guidelines", "Design Systems"],
    metrics: [
      { label: "GLOBAL MARKETS", value: "12 CITIES" },
      { label: "ENGAGEMENT", value: "+ 180%" },
      { label: "ASSET LIBRARY", value: "200+ COMPONENTS" },
    ],
  },
  {
    id: "horizon-edge",
    title: "Horizon Cloud Edge",
    client: "Horizon Digital Networks",
    category: "Full-Stack Infrastructure",
    filterCategory: "Full Stack",
    year: "2026",
    image: getCloudinaryUrl("/images/projects/hero-project-3.jpg"),
    alt: "Horizon Cloud Edge Full Stack Infrastructure",
    aspectRatio: "compact",
    summary:
      "High-speed headless e-commerce and full-stack edge web application deployed on Cloudflare Workers D1 edge.",
    fullStory:
      "Horizon replaced their legacy stack with an ultra-fast edge store. LOOMIE built a Next.js 15 headless architecture powered by Cloudflare Workers D1, achieving 99+ Lighthouse performance globally.",
    deliverables: ["Next.js 15", "Cloudflare Workers", "Headless E-Commerce", "Tailwind CSS"],
    metrics: [
      { label: "LIGHTHOUSE SCORE", value: "99 / 100" },
      { label: "TTFB SPEED", value: "18 ms EDGE" },
      { label: "CONVERSION RATE", value: "+ 4.2%" },
    ],
  },
];

const CATEGORY_FILTERS = [
  "All",
  "Branding",
  "WebGL & Motion",
  "UI/UX Architecture",
  "Full Stack",
] as const;

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);

  const filteredProjects = ALL_WORK_PROJECTS.filter((project) => {
    if (activeFilter === "All") return true;
    return project.filterCategory === activeFilter;
  });

  return (
    <main className="relative min-h-screen bg-[#0E0E10] text-[#F5F4EF] overflow-x-hidden font-sans select-none">
      <Navbar />

      {/* Page Container */}
      <div className="pt-28 sm:pt-36 pb-24 px-6 sm:px-12 md:px-16 max-w-[1700px] mx-auto w-full space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#e5c158] uppercase tracking-widest block">
              [LOOMIE STUDIO // INDEX]
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-white leading-[0.95]">
              Work
            </h1>
            <p className="text-stone-400 text-base sm:text-lg max-w-xl font-light leading-relaxed pt-1">
              Engineering bespoke digital experiences, systemic brand identities, and WebGL shader motion engines.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 items-center">
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white text-black shadow-lg scale-105"
                      : "bg-white/5 border border-white/10 text-stone-300 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical 2-Column Responsive Portfolio Grid (dzinrstudio.com Style) */}
        <div className="space-y-12 sm:space-y-16">
          {/* Pair up filtered projects into 2-column alternating rows */}
          {Array.from({ length: Math.ceil(filteredProjects.length / 2) }).map((_, rowIndex) => {
            const firstProj = filteredProjects[rowIndex * 2];
            const secondProj = filteredProjects[rowIndex * 2 + 1];
            const isReversedRow = rowIndex % 2 === 1;

            return (
              <div
                key={rowIndex}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
              >
                {/* First Card in Row */}
                {firstProj && (
                  <div
                    className={`${
                      isReversedRow ? "lg:col-span-5" : "lg:col-span-7"
                    } group cursor-pointer space-y-4`}
                    onClick={() => setSelectedProject(firstProj)}
                  >
                    {/* Media Container Card */}
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#161619] border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-white/30">
                      <Image
                        src={firstProj.image}
                        alt={firstProj.alt}
                        fill
                        priority={rowIndex === 0}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 font-mono text-xs font-bold px-3 py-1.5 bg-black/70 text-white backdrop-blur-md rounded-full border border-white/10">
                        {firstProj.year}
                      </div>
                    </div>

                    {/* Card Label & Circular Arrow Button */}
                    <div className="flex items-center justify-between pt-1 px-1">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-[#e5c158] transition-colors">
                          {firstProj.title}
                        </h3>
                        <p className="text-stone-400 font-sans text-sm mt-1 font-light">
                          {firstProj.category}
                        </p>
                      </div>

                      <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-105 transition-all duration-300 shrink-0">
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Second Card in Row */}
                {secondProj && (
                  <div
                    className={`${
                      isReversedRow ? "lg:col-span-7" : "lg:col-span-5"
                    } group cursor-pointer space-y-4`}
                    onClick={() => setSelectedProject(secondProj)}
                  >
                    {/* Media Container Card */}
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#161619] border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-white/30">
                      <Image
                        src={secondProj.image}
                        alt={secondProj.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 font-mono text-xs font-bold px-3 py-1.5 bg-black/70 text-white backdrop-blur-md rounded-full border border-white/10">
                        {secondProj.year}
                      </div>
                    </div>

                    {/* Card Label & Circular Arrow Button */}
                    <div className="flex items-center justify-between pt-1 px-1">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-[#e5c158] transition-colors">
                          {secondProj.title}
                        </h3>
                        <p className="text-stone-400 font-sans text-sm mt-1 font-light">
                          {secondProj.category}
                        </p>
                      </div>

                      <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-105 transition-all duration-300 shrink-0">
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* FULL CASE STUDY MODAL OVERLAY */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#141416] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-10 space-y-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-white animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-white/10 pb-6">
              <div className="font-mono text-xs font-bold text-[#e5c158] uppercase tracking-widest">
                {selectedProject.category} // {selectedProject.year}
              </div>
              <h3 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
                {selectedProject.title}
              </h3>
              <p className="font-mono text-xs text-stone-400 uppercase">
                CLIENT: {selectedProject.client}
              </p>
            </div>

            {/* Modal Image */}
            <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Modal Narrative Story */}
            <div className="space-y-4 font-sans text-sm text-stone-300 leading-relaxed">
              <h4 className="font-mono text-xs font-bold text-stone-400 uppercase tracking-widest">
                THE CHALLENGE & EXECUTION
              </h4>
              <p>{selectedProject.fullStory}</p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 bg-white/5 p-4 rounded-2xl text-center">
              {selectedProject.metrics.map((m, mIdx) => (
                <div key={mIdx} className="space-y-1">
                  <div className="font-mono text-[10px] text-stone-400 font-bold uppercase">{m.label}</div>
                  <div className="font-sans text-lg font-bold text-[#e5c158]">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Modal CTA */}
            <div className="pt-4 flex justify-between items-center border-t border-white/10">
              <span className="font-mono text-xs font-bold text-stone-400 uppercase">LOOMIE CASE STUDY</span>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white text-black rounded-full font-mono text-xs font-bold uppercase hover:bg-stone-200 transition-colors"
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
