"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { SubpageHeroHeader } from "@/components/SubpageHeroHeader";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ArrowUpRight, CheckCircle2, Layers, Sparkles, ShieldCheck, Cpu } from "lucide-react";

interface ExpertiseDetail {
  id: string;
  number: string;
  title: string;
  tagline: string;
  image: string;
  alt: string;
  description: string;
  deliverables: string[];
  tools: string[];
  caseStudyLink: string;
}

const EXPERTISE_ITEMS: ExpertiseDetail[] = [
  {
    id: "logos",
    number: "01",
    title: "Logos & Visual Marks",
    tagline: "Crafting iconic, memorable symbols and brandmarks that anchor instant brand recognition.",
    image: "/images/services/service-sketch.jpg",
    alt: "Logos and Visual Marks Architectural Sketch",
    description:
      "Our logomark craft merges geometric precision with brand positioning strategy. We design vector symbols, custom typographic logotypes, and flexible identity tokens engineered to scale from micro-favicons to spatial building signage.",
    deliverables: [
      "Vector Logomarks & Monograms",
      "Icon Systems & Glyphs",
      "Custom Type Architectures",
      "Symbolic Positioning Strategy",
      "Brand Usage Guidelines & Tokens",
    ],
    tools: ["Illustrator", "Glyphs 3", "Figma Design Tokens", "Vector Precision"],
    caseStudyLink: "/work",
  },
  {
    id: "identities",
    number: "02",
    title: "Brand Identities & Systems",
    tagline: "Building comprehensive, unified brand architecture ecosystems across print, digital, and spatial touchpoints.",
    image: "/images/services/service-color.jpg",
    alt: "Brand Identity Substrates and Palette Tokens",
    description:
      "A brand identity is a connected system. We define full visual identities — including custom color substrates, typography hierarchies, spatial signage guidelines, tactile packaging rituals, and digital design token libraries.",
    deliverables: [
      "Comprehensive Brand Architecture",
      "Color Substrates & Palette Tokens",
      "Typography Hierarchies",
      "Tactile Packaging Rituals",
      "Spatial & Signage Architecture",
    ],
    tools: ["Brand Systems", "Design Tokens", "Packaging Craft", "Typography"],
    caseStudyLink: "/work",
  },
  {
    id: "uiux",
    number: "03",
    title: "UI/UX Product Architecture",
    tagline: "Designing intuitive, high conversion digital product interfaces backed by user research and interactive prototyping.",
    image: "/images/services/service-uiux.jpg",
    alt: "UI/UX Interactive Wireframe Prototyping",
    description:
      "We design digital product architectures focused on user clarity, smooth interaction flows, and conversion rate optimization. From complex SaaS dashboards to high-conversion e-commerce applications, every interaction is friction-free.",
    deliverables: [
      "User Journey & Interaction Mapping",
      "Interactive High-Fidelity Wireframes",
      "Design Systems & Token Libraries",
      "Mobile & Desktop Product Layouts",
      "Usability Testing & Conversion Audits",
    ],
    tools: ["Figma", "Design Tokens", "User Testing", "Interactive Prototypes"],
    caseStudyLink: "/work",
  },
  {
    id: "websites",
    number: "04",
    title: "Websites & Web Development",
    tagline: "Engineering high-speed, kinetic web applications with Next.js 15, Cloudflare Edge infrastructure, and WebGL 3D shaders.",
    image: "/images/services/service-desktop.jpg",
    alt: "Responsive High-Performance Web Development",
    description:
      "We develop production-grade web applications utilizing Next.js 15, React, TypeScript, Cloudflare Workers D1 edge databases, GSAP motion timelines, and Three.js 3D WebGL graphics for uncompromised load speed and visual brilliance.",
    deliverables: [
      "Next.js 15 Full-Stack Applications",
      "Cloudflare Edge & D1 Infrastructure",
      "Three.js 3D WebGL Shader Art",
      "GSAP Motion & ScrollTrigger",
      "Custom Headless E-Commerce Architecture",
    ],
    tools: ["Next.js 15", "Three.js", "GSAP Motion", "Cloudflare D1", "TypeScript"],
    caseStudyLink: "/work",
  },
];

export default function ExpertisePage() {
  const [activeItem, setActiveItem] = useState<string>(EXPERTISE_ITEMS[0].id);

  return (
    <main className="relative min-h-screen bg-[#F5F3EF] text-[#0E0E0E] overflow-hidden select-none">
      <Navbar />

      {/* Hero Header */}
      <SubpageHeroHeader
        badge="[LOOMIE STUDIO // CAPABILITIES & EXPERTISE]"
        line1="STUDIO EXPERTISE &"
        line2="CORE CAPABILITIES"
        bannerImage="/images/services/service-desktop.jpg"
        bannerAlt="LOOMIE Studio Expertise and Capabilities"
      />

      {/* Main Content Body */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 max-w-[1700px] mx-auto w-full space-y-16">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-stone-300 pb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 min-w-max">
            {EXPERTISE_ITEMS.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#0E0E0E] text-white shadow-md"
                      : "bg-white border border-stone-300 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  <span>[{item.number}]</span> <span className="ml-1">{item.title}</span>
                </button>
              );
            })}
          </div>

          <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
            4 CAPABILITY DISCIPLINES
          </span>
        </div>

        {/* Detailed Capability Cards Stack */}
        <div className="space-y-20">
          {EXPERTISE_ITEMS.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className={`p-8 sm:p-12 bg-white border border-stone-300 rounded-2xl shadow-xs space-y-10 transition-all duration-500 ${
                activeItem === item.id ? "ring-2 ring-[#0E0E0E] shadow-xl" : ""
              }`}
            >
              {/* Card Header Row */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-stone-200 pb-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
                    <span>{item.number}</span>
                    <span>/</span>
                    <span>LOOMIE EXPERTISE CAPABILITY</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-light font-sans tracking-tight text-[#0E0E0E]">
                    {item.title}
                  </h2>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E0E0E] text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors shadow-md"
                >
                  <span>BOOK DISCOVERY CALL</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </Link>
              </div>

              {/* Grid Content: Left Image Frame + Right Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Image Frame */}
                <div className="lg:col-span-5 h-[320px] sm:h-[420px] relative rounded-xl overflow-hidden border border-stone-300 bg-stone-100 group">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 font-mono text-[10px] font-bold px-3 py-1.5 bg-black/80 text-white backdrop-blur-md rounded-xs">
                    0{item.number} // LOOMIE DISCIPLINE
                  </div>
                </div>

                {/* Right Column: Description + Deliverables List */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-xl font-normal font-sans text-[#0E0E0E]">
                      {item.tagline}
                    </h3>
                    <p className="font-sans text-sm text-stone-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Deliverables Grid */}
                  <div className="space-y-3 pt-4 border-t border-stone-200">
                    <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block">
                      CORE DELIVERABLES & OUTPUTS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs text-stone-800 font-medium">
                      {item.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#0E0E0E] shrink-0" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools / Tech Stack Tags */}
                  <div className="pt-4 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest mr-2">
                      TOOLS & STACK:
                    </span>
                    {item.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-full font-mono text-[11px] font-bold text-stone-700 uppercase"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
