"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, X, ArrowUpRight, Globe, Layers, ShieldCheck } from "lucide-react";
import { ThreeStudioBoxCanvas } from "@/components/ThreeStudioBoxCanvas";
import { getCloudinaryUrl } from "@/lib/cloudinary";

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
  // Mohamed Ragab & Samson Imoh
  {
    id: "mohamed-ragab",
    name: "Mohamed Ragab",
    role: "Growth Strategy & Brand Building",
    image: getCloudinaryUrl("/images/about/team-5.jpg"),
    alt: "Mohamed Ragab — Growth Strategy & Brand Building",
    bio: "I work on growth strategy and brand-building, with a background in psychology/coaching and hands-on execution. Excited to be here.",
    tags: ["Growth Strategy", "Brand Building", "Execution"],
  },
  {
    id: "samson-imoh",
    name: "Samson Imoh",
    role: "Full Stack Software Engineer",
    image: getCloudinaryUrl("/images/about/team-7.jpg"),
    alt: "Samson Imoh — Full Stack Software Engineer",
    bio: "Full Stack Software Engineer focused on building scalable web applications and modern software solutions using C#, ASP.NET Core, React, Next.js, and Azure.",
    tags: ["Full Stack", "C# / ASP.NET", "Next.js & Azure"],
  },

  // Sarah Mahmoud & Mohammed Umar
  {
    id: "sarah-mahmoud",
    name: "Sarah Mahmoud",
    role: "Digital Marketing & Content Strategy",
    image: getCloudinaryUrl("/images/about/team-1.jpg"),
    alt: "Sarah Mahmoud — Digital Marketing & Content Strategy",
    bio: "I'm a pharmacist with a strong interest in digital marketing, specializing in content strategy, Meta ads, audience targeting, and marketing analytics to drive brand growth.",
    tags: ["Digital Marketing", "Meta Ads", "Audience Targeting"],
  },
  {
    id: "mohammed-umar",
    name: "Mohammed Umar",
    role: "Data Science & Machine Learning",
    image: getCloudinaryUrl("/images/about/team-umar.jpg"),
    alt: "Mohammed Umar — Data Science & Machine Learning",
    bio: "I'm passionate about data science and machine learning, exploring innovative technology solutions, social media marketing, and branding.",
    tags: ["Data Science", "Machine Learning", "Social Media"],
  },

  // Yahya Azez
  {
    id: "yahya-azez",
    name: "Yahya Azez",
    role: "Graphic Designer & Visual Identities",
    image: getCloudinaryUrl("/images/about/team-8.jpg"),
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

  // Split 5 team members into alternating rows
  const row1Members = ALL_TEAM_MEMBERS.slice(0, 2); // Mohamed Ragab & Samson Imoh
  const row2Members = ALL_TEAM_MEMBERS.slice(2, 4); // Sarah Mahmoud & Mohammed Umar
  const row3Member = ALL_TEAM_MEMBERS[4]; // Yahya Azez

  return (
    <section ref={containerRef} className="w-full bg-[#050505] text-white py-12 sm:py-16 lg:py-24 select-none">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-10 lg:px-14 space-y-20 lg:space-y-28">
        
        {/* 1. 3D ROLLING CUBE CANVAS SHOWCASE */}
        <div className="border-b border-white/15 pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl sm:text-5xl font-light font-sans tracking-tight text-white">
                Kinetic 3D Studio Canvas
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-stone-400 uppercase tracking-widest">
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/15 pb-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-light font-sans tracking-tight text-white">
                Team & Specialists
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-stone-400 uppercase tracking-widest">
              5 CORE SPECIALISTS
            </span>
          </div>

          <div className="space-y-16 lg:space-y-24">
            
            {/* ROW 1: Left Editorial Scroll Block (Cols 1 & 2) + Right Team Cards (Cols 3 & 4: Mohamed & Samson) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-center">
              <div className="kinetic-scroll-block lg:col-span-2 p-8 sm:p-12 bg-white/80 border border-stone-300 rounded-2xl shadow-xs space-y-6" data-speed="20">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block">
                    LOOMIE PHILOSOPHY
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
                  <span>CORE DISCIPLINARIES</span>
                </div>
              </div>

              {row1Members.map((member) => (
                <TeamCard key={member.id} member={member} onSelect={setSelectedMember} />
              ))}
            </div>

            {/* ROW 2: Left Team Cards (Cols 1 & 2: Sarah & Umar) + Right Editorial Scroll Block (Cols 3 & 4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-center">
              {row2Members.map((member) => (
                <TeamCard key={member.id} member={member} onSelect={setSelectedMember} />
              ))}

              <div className="kinetic-scroll-block lg:col-span-2 p-8 sm:p-12 bg-[#0E0E0E] text-white rounded-2xl shadow-xl space-y-6 relative overflow-hidden" data-speed="-25">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <span className="font-mono text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>TECHNICAL LEADERSHIP</span>
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

            {/* ROW 3: Left Editorial Scroll Block (Cols 1 & 2) + Right Team Card (Yahya) & Join Us Card (Cols 3 & 4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-center">
              <div className="kinetic-scroll-block lg:col-span-2 p-8 sm:p-12 bg-white/80 border border-stone-300 rounded-2xl shadow-xs space-y-6" data-speed="18">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                    <Layers className="w-4 h-4 text-stone-700" />
                    <span>VISUAL & SPATIAL IDENTITY</span>
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
                  <span className="font-mono text-xs text-stone-500 font-bold uppercase">PERFORMANCE & CRAFT</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-700" />
                </div>
              </div>

              <TeamCard member={row3Member} onSelect={setSelectedMember} />

              <div className="brandappart-card-item flex flex-col space-y-3">
                <div className="relative w-full aspect-[4/4.6] rounded-2xl overflow-hidden bg-[#0E0E0E] border border-stone-800 p-6 flex flex-col justify-between shadow-md">
                  <div className="space-y-3">
                    <span className="font-mono text-[11px] font-bold text-[#FF3B00] uppercase tracking-widest block">
                      JOIN OUR TEAM
                    </span>
                    <h4 className="text-xl font-light font-sans text-white tracking-tight leading-snug">
                      Want to build with Loomie?
                    </h4>
                    <p className="font-sans text-xs text-stone-400 leading-relaxed font-normal">
                      We are always looking for visionary designers, engineers, and brand strategists.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full py-3 px-4 rounded-xl bg-white text-[#0E0E0E] hover:bg-[#FF3B00] hover:text-white transition-colors duration-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between group"
                  >
                    <span>GET IN TOUCH</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
                <div className="pt-1 space-y-0.5">
                  <h3 className="text-lg font-normal font-sans tracking-tight text-[#0E0E0E]">
                    Open Roles
                  </h3>
                  <p className="font-sans text-xs text-stone-500 font-light">
                    Careers & Collaboration
                  </p>
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
