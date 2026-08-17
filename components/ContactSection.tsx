"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, Check, Copy, Calendar as CalendarIcon, ArrowUpRight } from "lucide-react";
import { Preloader } from "@/components/Preloader";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What services does LOOMIE provide?",
    answer:
      "LOOMIE specializes in brand identity systems, kinetic digital design, 3D WebGL interfaces, custom typography, and high-performance web applications built for ambitious enterprises.",
  },
  {
    id: "faq-2",
    question: "How does your branding process work?",
    answer:
      "Every project follows our 3-phase discipline: 1. Discovery & Core Positioning, 2. Identity Construction & Motion Design, 3. Production Stress Testing & Full Multi-Platform Launch.",
  },
  {
    id: "faq-3",
    question: "What is the typical project timeline?",
    answer:
      "A complete brand identity architecture typically spans 4 to 6 weeks. Full kinetic web applications with WebGL shaders span 6 to 10 weeks depending on interactive scope.",
  },
  {
    id: "faq-4",
    question: "How much does a project cost?",
    answer:
      "We tailor our scope to your commercial scale. Core identity frameworks start from $15,000, with comprehensive end-to-end digital branding & WebGL engagements starting from $35,000.",
  },
  {
    id: "faq-5",
    question: "Can I see examples of past work?",
    answer:
      "You can explore our Creative Archive on the homepage or view our detailed Case Studies to inspect our exact technical specifications and commercial results.",
  },
];

/**
 * Monumental High-Fashion Editorial Contact Section for LOOMIE
 * Features:
 * - Studio Hero Photo Integration (/images/contact/contact-hero.jpg)
 * - LOOMIE Preloader integration while Calendly loads
 * - Direct Inquiry Card with 1-click email copy
 * - Live Calendly Discovery Call Inline Embed Widget
 * - Accordion FAQ List
 */
export function ContactSection({
  calendlyUrl = "https://calendly.com/samsonimoh17/30min",
}: {
  calendlyUrl?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");
  const [isCalendlyLoading, setIsCalendlyLoading] = useState<boolean>(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Load official Calendly inline widget script dynamically
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Hide preloader after Calendly initializes
    const timer = setTimeout(() => {
      setIsCalendlyLoading(false);
    }, 2400);

    const ctx = gsap.context(() => {
      const anims = document.querySelectorAll(".contact-anim-block");
      anims.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@loomiestudio.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="w-full bg-[#F5F3EF] text-[#0E0E0E] py-16 lg:py-28 select-none"
    >
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-14 space-y-20 lg:space-y-28">
        
        {/* 1. SECTION TITLE HEADING */}
        <div className="space-y-4 border-b border-stone-300 pb-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter uppercase font-sans text-[#0E0E0E] leading-[0.9]">
            GET IN TOUCH
          </h1>
          <p className="font-mono text-xs sm:text-sm font-bold text-stone-600 uppercase tracking-widest">
            CLEAR. CONNECTED. COMPLETE.
          </p>
        </div>

        {/* 2. HIGH-FASHION EDITORIAL GRID (LEFT INQUIRIES & IMAGE / RIGHT CALENDLY) */}
        <div className="contact-anim-block grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Studio Photo, Direct Inquiries & Discipline */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Studio Workspace Photo Card */}
            <div className="relative w-full h-[260px] sm:h-[320px] rounded-lg overflow-hidden border border-stone-300 shadow-xs group">
              <Image
                src="/images/contact/contact-hero.jpg"
                alt="LOOMIE Studio Contact Workspace"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">
                  STUDIO WORKSPACE // STRATEGY & DIRECT INQUIRIES
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h2 className="text-3xl sm:text-4xl font-light font-sans tracking-tight text-[#0E0E0E] leading-[1.05]">
                Let us build together.
              </h2>
              <p className="font-sans text-stone-700 text-base font-normal leading-relaxed">
                Whether you are ready to launch a new brand identity, engineer a WebGL experience, or build a digital product, we are here to collaborate.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-8 bg-white border border-stone-300 rounded-lg shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block">
                  DIRECT EMAIL INQUIRIES
                </span>
                <a
                  href="mailto:hello@loomiestudio.com"
                  className="text-2xl sm:text-3xl font-light font-sans tracking-tight text-[#0E0E0E] hover:underline block pt-1"
                >
                  hello@loomiestudio.com
                </a>
              </div>

              <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                <span className="font-sans text-xs text-stone-500 font-medium">
                  Guaranteed response within 24 hours
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 bg-[#0E0E0E] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-stone-800 transition-colors flex items-center gap-2"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "COPIED" : "COPY"}</span>
                </button>
              </div>
            </div>

            {/* Studio Process & Engagement Card */}
            <div className="p-8 bg-white border border-stone-300 rounded-lg shadow-xs space-y-4">
              <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block">
                STUDIO DISCIPLINE
              </span>
              <p className="font-sans text-sm text-stone-700 leading-relaxed font-normal">
                Direct 30-minute strategic discovery session. No pitch decks, no middle management, no unnecessary complexity.
              </p>
              <div className="pt-2 flex items-center gap-2 font-mono text-xs font-bold text-[#0E0E0E]">
                <span>READ CASE STUDIES</span>
                <ArrowUpRight className="w-4 h-4 text-stone-600" />
              </div>
            </div>

            {/* Official Social Media Channels Card */}
            <div className="p-8 bg-white border border-stone-300 rounded-lg shadow-xs space-y-4">
              <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block">
                CONNECT ON SOCIALS
              </span>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold text-[#0E0E0E]">
                <a
                  href="https://www.instagram.com/byloomie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-stone-300 rounded-full bg-white hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/loomieofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-stone-300 rounded-full bg-white hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://x.com/Loomieofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-stone-300 rounded-full bg-white hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 flex items-center gap-1.5"
                >
                  <span>X / Twitter</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Calendly Inline Scheduling Embed with Preloader Overlay */}
          <div className="lg:col-span-7 bg-white border border-stone-300 rounded-lg p-6 sm:p-8 shadow-xs space-y-6 relative min-h-[760px]">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block">
                  SCHEDULE A STRATEGY CALL
                </span>
                <h3 className="text-2xl font-normal font-sans tracking-tight text-[#0E0E0E] pt-1">
                  30 Minute Discovery Call
                </h3>
              </div>
              <CalendarIcon className="w-6 h-6 text-stone-600" />
            </div>

            {/* Calendly Inline Widget Container */}
            <div className="w-full min-h-[680px] rounded-md overflow-hidden bg-stone-50 border border-stone-200 relative">
              
              {/* Studio Preloader Overlay while Calendly loads */}
              {isCalendlyLoading && (
                <div className="absolute inset-0 z-20 bg-[#F5F3EF] flex items-center justify-center transition-opacity duration-700">
                  <div className="scale-90 transform">
                    <Preloader variant="brief" pageTitle="SCHEDULE A STRATEGY CALL" />
                  </div>
                </div>
              )}

              <div
                className="calendly-inline-widget w-full h-[680px]"
                data-url={calendlyUrl}
                style={{ minWidth: "320px", height: "680px" }}
              />
            </div>
          </div>

        </div>

        {/* 3. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
        <div className="contact-anim-block space-y-10 pt-10 border-t border-stone-300">
          <div className="space-y-2 border-b border-stone-300 pb-6">
            <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-light font-sans tracking-tight text-[#0E0E0E]">
              Everything you need to know.
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-stone-300 rounded-md overflow-hidden transition-all duration-300 shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-sans font-normal text-lg sm:text-xl text-[#0E0E0E] hover:text-stone-600 transition-colors"
                  >
                    <span>{item.question}</span>
                    <div className="p-1 rounded-full bg-stone-100 border border-stone-200">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 font-sans text-stone-700 text-base leading-relaxed border-t border-stone-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
