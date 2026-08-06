"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowUpRight, ChevronDown } from "lucide-react";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryCode: "ecommerce" | "food" | "entertainment" | "tech" | "industrial" | "spatial";
  image: string;
  aspect: string;
  span: string;
  logoOverlay?: string;
  overlayStyle?: "white" | "dark" | "blue" | "orange";
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs1",
    slug: "vortex-matte-titanium",
    title: "VORTEX Matte Titanium Module",
    category: "Spatial Hardware & Industrial Design",
    categoryCode: "industrial",
    image: "/images/project-minimal.jpg",
    aspect: "aspect-[4/3]",
    span: "col-span-12 md:col-span-7",
    logoOverlay: "VORTEX",
  },
  {
    id: "cs2",
    slug: "outfindr-mountain-dynamics",
    title: "OUTFINDR Mountain Dynamics",
    category: "Outdoor & Spatial Exploration",
    categoryCode: "spatial",
    image: "/images/project-spatial.jpg",
    aspect: "aspect-[1/1]",
    span: "col-span-12 md:col-span-5",
    logoOverlay: "OUTFINDR",
  },
  {
    id: "cs3",
    slug: "sat-cybernetic-hud",
    title: "SAT Cybernetic System HUD",
    category: "Autonomous WebGL Interface",
    categoryCode: "tech",
    image: "/images/project-digital.jpg",
    aspect: "aspect-[16/10]",
    span: "col-span-12 md:col-span-6",
    logoOverlay: "SAT",
  },
  {
    id: "cs4",
    slug: "lumino-3d-kinetic",
    title: "LUMINO 3D Kinetic Realm",
    category: "Motion Shaders & WebGL",
    categoryCode: "tech",
    image: "/images/hero-3d-fluid.jpg",
    aspect: "aspect-[16/10]",
    span: "col-span-12 md:col-span-6",
    logoOverlay: "LUMINO",
  },
  {
    id: "cs5",
    slug: "brutalist-spatial-pavilion",
    title: "Brutalist Spatial Pavilion",
    category: "Architecture & Acoustics",
    categoryCode: "spatial",
    image: "/images/project-spatial.jpg",
    aspect: "aspect-[16/10]",
    span: "col-span-12 md:col-span-7",
    logoOverlay: "AURA",
  },
  {
    id: "cs6",
    slug: "vortex-matte-titanium",
    title: "Monochrome Editorial N°5",
    category: "Editorial & Grid Typography",
    categoryCode: "entertainment",
    image: "/images/project-editorial.jpg",
    aspect: "aspect-[1/1]",
    span: "col-span-12 md:col-span-5",
    logoOverlay: "EDITORIAL",
  },
  {
    id: "cs7",
    slug: "lumino-3d-kinetic",
    title: "JEA Architectural Interior",
    category: "Spatial Living & Craft",
    categoryCode: "spatial",
    image: "/images/hero-3d-fluid.jpg",
    aspect: "aspect-[16/9]",
    span: "col-span-12 md:col-span-6",
    logoOverlay: "JEA",
  },
  {
    id: "cs8",
    slug: "outfindr-mountain-dynamics",
    title: "LAUR High-Fashion Identity",
    category: "Luxury Identity & Craft",
    categoryCode: "ecommerce",
    image: "/images/project-editorial.jpg",
    aspect: "aspect-[16/9]",
    span: "col-span-12 md:col-span-6",
    logoOverlay: "LAUR",
  },
];

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const filterOptions = [
    { id: "ALL", label: "ALL", count: 24 },
    { id: "ECOMMERCE", label: "ECOMMERCE", count: 7 },
    { id: "FOOD", label: "FOOD & BEVERAGE", count: 2 },
    { id: "ENTERTAINMENT", label: "ENTERTAINMENT", count: 3 },
    { id: "INDUSTRIAL", label: "MANUFACTURING & INDUSTRIAL", count: 2 },
    { id: "TECH", label: "TECH", count: 4 },
  ];

  const currentOption = filterOptions.find((opt) => opt.id === activeFilter) || filterOptions[0];

  const filteredStudies =
    activeFilter === "ALL"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((item) => {
          if (activeFilter === "FOOD") return item.categoryCode === "food";
          if (activeFilter === "TECH") return item.categoryCode === "tech";
          if (activeFilter === "ENTERTAINMENT") return item.categoryCode === "entertainment";
          if (activeFilter === "INDUSTRIAL") return item.categoryCode === "industrial";
          if (activeFilter === "SPATIAL") return item.categoryCode === "spatial";
          if (activeFilter === "ECOMMERCE") return item.categoryCode === "ecommerce";
          return true;
        });

  return (
    <section id="grid" className="py-32 px-6 md:px-12 max-w-[1700px] mx-auto border-t border-border-custom select-none">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-foreground-secondary mb-2 block">
            02 / CREATIVE ARCHIVE
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-foreground">
            EXPLORATION <span className="text-foreground border-b-4 border-foreground pb-1">GRID</span>
          </h2>
        </div>
      </div>

      {/* Mobile Category Dropdown (Replaces Scattered Wrapped Buttons) */}
      <div className="block md:hidden relative mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-foreground-secondary mb-2 block">
          SELECT CATEGORY
        </span>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full px-5 py-4 rounded-none bg-surface-card border-2 border-foreground text-foreground font-mono text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-between shadow-xl transition-all"
        >
          <div className="flex items-center gap-2">
            <span>{currentOption.label}</span>
            <span className="text-xs opacity-70">({currentOption.count})</span>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-180" : ""}`} />
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 z-40 mt-2 bg-background border-2 border-foreground shadow-2xl overflow-hidden flex flex-col divide-y divide-border-custom">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setActiveFilter(option.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-5 py-4 text-left font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-between transition-colors ${
                  activeFilter === option.id
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-surface-card"
                }`}
              >
                <span>{option.label}</span>
                <span>({option.count})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Horizontal Pill Filter Bar */}
      <div className="hidden md:flex flex-wrap items-center gap-3.5 mb-16">
        {filterOptions.map((pill) => (
          <button
            key={pill.id}
            onClick={() => setActiveFilter(pill.id)}
            className={`px-6 py-3.5 rounded-none text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 ${
              activeFilter === pill.id
                ? "bg-foreground text-background shadow-xl scale-105 border border-foreground"
                : "bg-surface-card border border-border-custom text-foreground-secondary hover:text-foreground hover:border-foreground"
            }`}
          >
            <span>
              {pill.label} <sup className="text-[11px] opacity-70">({pill.count})</sup>
            </span>
            <Plus className="w-4 h-4" />
          </button>
        ))}

        <button className="px-6 py-3.5 rounded-none bg-surface-card border border-border-custom text-foreground-secondary hover:text-foreground text-xs sm:text-sm font-mono font-bold tracking-wider uppercase flex items-center gap-2.5">
          <span>SEE MORE</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* 2-Column Asymmetric Case Study Showcase (Matching Reference Screenshot 100%) */}
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        {filteredStudies.map((study) => (
          <Link
            key={study.id}
            href={`/work/${study.slug}`}
            className={`${study.span} group flex flex-col justify-between cursor-pointer`}
          >
            {/* Image Container with Brand Overlay */}
            <div className={`w-full ${study.aspect} relative overflow-hidden rounded-none bg-surface-card border border-border-custom shadow-xl transition-all duration-500 group-hover:border-foreground`}>
              <Image
                src={study.image}
                alt={study.title}
                fill
                quality={80}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover rounded-none transition-all duration-700 ease-out group-hover:scale-105 group-hover:contrast-[1.08] group-hover:brightness-[1.05]"
                loading="lazy"
                style={{ transform: "translateZ(0)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-45 transition-opacity duration-300" />

              {/* Brand Logo Overlay Centered */}
              {study.logoOverlay && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter text-white/30 uppercase font-sans group-hover:text-white/60 group-hover:scale-105 transition-all duration-500">
                    {study.logoOverlay}
                  </span>
                </div>
              )}
            </div>

            {/* Case Study Meta Description Below Card (Matching Screenshot Structure) */}
            <div className="pt-4 pb-2 flex items-center justify-between border-b border-border-custom/60">
              <div>
                <h3 className="text-xl md:text-2xl font-black uppercase text-foreground leading-tight">
                  {study.title}
                </h3>
                <span className="text-xs font-mono text-foreground-secondary uppercase tracking-wider mt-1 block font-medium">
                  {study.category}
                </span>
              </div>

              <div className="w-10 h-10 rounded-none bg-surface-card border border-border-custom flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-300 shadow-sm">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
