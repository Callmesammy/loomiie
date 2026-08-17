"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, X, ArrowUpRight, Globe, Layers, ShieldCheck } from "lucide-react";
import { ThreeStudioBoxCanvas } from "@/components/ThreeStudioBoxCanvas";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string;
  tags: string[];
}

const ALL_TEAM_MEMBERS: TeamMember[] = [
  // Pair 1 (Row 1 Right Side)
  {
    id: "mohamed-ragab",
    name: "Mohamed Ragab",
    role: "Growth Strategy & Brand Building",
    image: "/images/about/team-5.jpg",
    alt: "Mohamed Ragab — Growth Strategy & Brand Building",
    bio: "I work on growth strategy and brand-building, with a background in psychology/coaching and hands-on execution. Excited to be here.",
    tags: ["Growth Strategy", "Brand Building", "Execution"],
  },
  {
    id: "yaya",
    name: "Yaya",
    role: "UX Design Intern",
    image: "/images/about/team-3.jpg",
    alt: "Yaya — UX Design Intern",
    bio: "I'm a UX design intern, with a background in photography and digital marketing. I'm passionate about solving problems through design and creating user experiences.",
    tags: ["UX Design", "Photography", "Digital Marketing"],
  },

  // Pair 2 (Row 2 Left Side: Samson & Nebiyu)
  {
    id: "samson-imoh",
    name: "Samson Imoh",
    role: "Full Stack Software Engineer",
    image: "/images/about/team-7.jpg",
    alt: "Samson Imoh — Full Stack Software Engineer",
    bio: "Full Stack Software Engineer focused on building scalable web applications and modern software solutions using C#, ASP.NET Core, React, Next.js, and Azure.",
    tags: ["Full Stack", "C# / ASP.NET", "Next.js & Azure"],
  },
  {
    id: "nebiyu-elias",
    name: "Nebiyu Elias",
    role: "Full Stack & Software Engineer",
    image: "/images/about/team-2.jpg",
    alt: "Nebiyu Elias — Full Stack & Software Engineer",
    bio: "Full Stack and Software Engineer focused on building web applications and custom software solutions using React, Next.js, and Python, with a background in Computer Science.",
    tags: ["Software Engineering", "React & Next.js", "Python"],
  },

  // Pair 3 (Row 3 Right Side)
  {
    id: "sarah-mahmoud",
    name: "Sarah Mahmoud",
    role: "Digital Marketing & Content Strategy",
    image: "/images/about/team-1.jpg",
    alt: "Sarah Mahmoud — Digital Marketing & Content Strategy",
    bio: "I'm a pharmacist with a strong interest in digital marketing, specializing in content strategy, Meta ads, audience targeting, and marketing analytics to drive brand growth.",
    tags: ["Digital Marketing", "Meta Ads", "Audience Targeting"],
  },
  {
    id: "mohammed-umar",
    name: "Mohammed Umar",
    role: "Data Science & Machine Learning",
    image: "/images/about/team-umar.jpg",
    alt: "Mohammed Umar — Data Science & Machine Learning",
    bio: "I'm passionate about data science and machine learning, exploring innovative technology solutions, social media marketing, and branding.",
    tags: ["Data Science", "Machine Learning", "Social Media"],
  },

  // Pair 4 (Row 4 Left Side)
  {
    id: "jenine-jaradat",
    name: "Jenine Jaradat",
    role: "Computer Science & Economics",
    image: "/images/about/team-6.jpg",
    alt: "Jenine Jaradat — Computer Science & Economics",
    bio: "I'm a final year university student studying Computer Science and Economics with experience in several fields such as marketing and data analytics.",
    tags: ["Computer Science", "Economics", "Data Analytics"],
  },
  {
    id: "yahya-azez",
    name: "Yahya Azez",
    role: "Graphic Designer & Visual Identities",
    image: "/images/about/team-8.jpg",
    alt: "Yahya Azez — Graphic Designer & Visual Identities",
    bio: "Graphic Designer & Freelancer specialized in creating professional visual identities, branding solutions, and creative design experiences.",
    tags: ["Graphic Design", "Visual Identity", "Branding"],
  },
];

/**
 * Brandappart-Style Alternating Staggered Team Grid
 * Clean & Authentic:
 * - NO AI icons (Sparkles/Stars removed)
 * - NO AI buzzwords or fake generated badges
 * - GSAP ScrollTrigger parallax drifting on scroll in empty slots
 */
export function AboutUsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Team cards reveal animation
      const cards = gsap.utils.toArray<HTMLElement>(".brandappart-card-item");
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            delay: (idx % 2) * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );
      });

      // 2. Scroll Parallax Animations for Empty Space Editorial Cards
      const parallaxBlocks = gsap.utils.toArray<HTMLElement>(".kinetic-scroll-block");
      parallaxBlocks.forEach((block) => {
        const speed = parseFloat(block.dataset.speed || "15");
        gsap.fromTo(
          block,
          { y: speed * 1.2 },
          {
            y: -speed * 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split team into 4 alternating pairs of 2
  const pair1 = ALL_TEAM_MEMBERS.slice(0, 2); // Mohamed Ragab & Yaya (Right)
  const pair2 = ALL_TEAM_MEMBERS.slice(2, 4); // Samson Imoh & Nebiyu Elias (Left)
  const pair3 = ALL_TEAM_MEMBERS.slice(4, 6); // Sarah & Umar (Right)
  const pair4 = ALL_TEAM_MEMBERS.slice(6, 8); // Jenine & Yahya (Left)

  return (
    <section ref={containerRef} className="w-full bg-[#F5F3EF] text-[#0E0E0E] py-12 sm:py-16 lg:py-24 select-none">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-10 lg:px-14 space-y-20 lg:space-y-28">
        
        {/* 1. 3D ROLLING CUBE CANVAS SHOWCASE */}
        <div className="border-b border-stone-300 pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl sm:text-5xl font-light font-sans tracking-tight text-[#0E0E0E]">
                Kinetic 3D Studio Canvas
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
              DRAG & ROTATE 3D CUBE
            </span>
          </div>

          {/* 3D Rolling Box Canvas */}
          <div className="pt-2">
            <ThreeStudioBoxCanvas />
          </div>
        </div>

        {/* 2. BRANDAPPART ALTERNATING STAGGERED GRID WITH SCROLL PARALLAX EDITORIAL BLOCKS */}
        <div className="space-y-16 lg:space-y-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-300 pb-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-light font-sans tracking-tight text-[#0E0E0E]">
                Team & Specialists
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
              8 CORE SPECIALISTS
            </span>
          </div>

          <div className="space-y-16 lg:space-y-24">
            
            {/* ROW 1: Left Editorial Scroll Block (Cols 1 & 2) + Right Team Cards (Cols 3 & 4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-center">
              <div className="kinetic-scroll-block lg:col-span-2 p-8 sm:p-12 bg-white/80 border border-stone-300 rounded-2xl shadow-xs space-y-6" data-speed="20">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block">
                    01 // LOOMIE PHILOSOPHY
                  </span>
                  <span className="font-mono text-xs text-stone-400 font-bold">EST. 2026</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-light font-sans tracking-tight text-[#0E0E0E] leading-snug">
                  CRAFTING HIGH CONVERSION DIGITAL IDENTITIES WITH UNMATCHED KINETIC PRECISION.
                </h3>

                <p className="font-sans text-sm text-stone-600 leading-relaxed font-normal">
                  We unite visual brand strategy, high conversion digital marketing, and WebGL motion engineering into one connected system.
                </p>

                <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs font-mono font-bold text-stone-700 uppercase">
                  <span>08 CORE DISCIPLINARIES</span>
                  <span>CLEAR. CONNECTED. COMPLETE.</span>
                </div>
              </div>

              {pair1.map((member) => (
                <TeamCard key={member.id} member={member} onSelect={setSelectedMember} />
              ))}
            </div>

            {/* ROW 2: Left Team Cards (Cols 1 & 2: Samson & Nebiyu) + Right Editorial Scroll Block (Cols 3 & 4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-center">
              {pair2.map((member) => (
                <TeamCard key={member.id} member={member} onSelect={setSelectedMember} />
              ))}

              <div className="kinetic-scroll-block lg:col-span-2 p-8 sm:p-12 bg-[#0E0E0E] text-white rounded-2xl shadow-xl space-y-6 relative overflow-hidden" data-speed="-25">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <span className="font-mono text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>02 // TECHNICAL LEADERSHIP</span>
                  </span>
                  <span className="font-mono text-xs text-stone-500 uppercase">ENGINEERING</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-light font-sans tracking-tight leading-snug text-stone-100">
                  SCALABLE EDGE ARCHITECTURE & HIGH PERFORMANCE SYSTEM INTEGRATIONS.
                </h3>

                <p className="font-sans text-sm text-stone-400 leading-relaxed font-normal">
                  Architected on Next.js, Cloudflare Edge pipelines, and custom Three.js WebGL shaders to deliver instantaneous load speeds and fluid interactions.
                </p>

                {/* Clean Ticker Banner */}
                <div className="pt-2 overflow-hidden border-t border-stone-800">
                  <div className="whitespace-nowrap flex gap-4 font-mono text-[11px] text-stone-400 font-bold uppercase tracking-widest">
                    <span>WEBGL 3D</span> • <span>NEXT.JS</span> • <span>CLOUDFLARE EDGE</span> • <span>GSAP MOTION</span> • <span>ASP.NET CORE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 3: Left Editorial Scroll Block (Cols 1 & 2) + Right Team Cards (Cols 3 & 4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-center">
              <div className="kinetic-scroll-block lg:col-span-2 p-8 sm:p-12 bg-white/80 border border-stone-300 rounded-2xl shadow-xs space-y-6" data-speed="18">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                    <Globe className="w-4 h-4 text-stone-700" />
                    <span>03 // PERFORMANCE & GROWTH</span>
                  </span>
                  <span className="font-mono text-xs text-stone-400">DATA-BACKED</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-light font-sans tracking-tight text-[#0E0E0E] leading-snug">
                  DATA-DRIVEN SEO ARCHITECTURE & CONVERSION OPTIMIZATION.
                </h3>

                <p className="font-sans text-sm text-stone-600 leading-relaxed font-normal">
                  Harmonizing creative storytelling with audience targeting, Meta ads management, and deep marketing analytics to maximize brand reach and revenue.
                </p>

                <div className="pt-2 flex items-center gap-2 font-mono text-xs font-bold text-[#0E0E0E]">
                  <span>MEASURABLE BRAND SCALING</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-700" />
                </div>
              </div>

              {pair3.map((member) => (
                <TeamCard key={member.id} member={member} onSelect={setSelectedMember} />
              ))}
            </div>

            {/* ROW 4: Left Team Cards (Cols 1 & 2) + Right Editorial Scroll Block (Cols 3 & 4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-center">
              {pair4.map((member) => (
                <TeamCard key={member.id} member={member} onSelect={setSelectedMember} />
              ))}

              <div className="kinetic-scroll-block lg:col-span-2 p-8 sm:p-12 bg-white border border-stone-300 rounded-2xl shadow-xs space-y-6" data-speed="-18">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                    <Layers className="w-4 h-4 text-stone-700" />
                    <span>04 // VISUAL & SPATIAL IDENTITY</span>
                  </span>
                  <span className="font-mono text-xs text-stone-400">TACTILE CRAFT</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-light font-sans tracking-tight text-[#0E0E0E] leading-snug">
                  TACTILE PACKAGING, BRAND SYSTEMS & CREATIVE GRAPHICS.
                </h3>

                <p className="font-sans text-sm text-stone-600 leading-relaxed font-normal">
                  Constructing enduring visual identities, spatial signage, and design tokens that command attention across digital and physical substrates.
                </p>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <span className="font-mono text-xs text-stone-500 font-bold uppercase">WANT TO COLLABORATE?</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0E0E0E] text-white hover:bg-stone-800 transition-colors duration-300 font-mono text-xs font-bold"
                  >
                    <span>START A PROJECT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* MEMBER BIO OVERLAY MODAL */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white border border-stone-300 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#FF3B00] shrink-0">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-xl font-normal font-sans text-[#0E0E0E]">
                  {selectedMember.name}
                </h3>
                <p className="font-mono text-xs text-stone-500 font-bold uppercase">
                  {selectedMember.role}
                </p>
              </div>
            </div>

            <p className="font-sans text-sm text-stone-700 leading-relaxed">
              {selectedMember.bio}
            </p>

            <div className="pt-4 border-t border-stone-200 flex flex-wrap gap-2">
              {selectedMember.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-full font-mono text-[11px] font-bold text-stone-700 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

interface TeamCardProps {
  member: TeamMember;
  onSelect: (m: TeamMember) => void;
}

function TeamCard({ member, onSelect }: TeamCardProps) {
  return (
    <div
      className="brandappart-card-item group flex flex-col space-y-3 cursor-pointer"
      onClick={() => onSelect(member)}
    >
      {/* Brandappart Red-Orange Gradient Portrait Frame */}
      <div className="relative w-full aspect-[4/4.6] rounded-2xl overflow-hidden bg-gradient-to-b from-[#FF3B00] via-[#FF6A00] to-[#E63000] shadow-md group-hover:shadow-2xl transition-all duration-500">
        <Image
          src={member.image}
          alt={member.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* '+' Plus Action Button in Top-Right Corner */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(member);
          }}
          aria-label={`View ${member.name} details`}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Minimal Name & Role Typography Below Image */}
      <div className="pt-1 space-y-0.5">
        <h3 className="text-lg font-normal font-sans tracking-tight text-[#0E0E0E]">
          {member.name}
        </h3>
        <p className="font-sans text-xs text-stone-500 font-light">
          {member.role}
        </p>
      </div>
    </div>
  );
}
