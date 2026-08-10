"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, Check, Copy, Calendar as CalendarIcon, Clock, Globe, ArrowUpRight, Sparkles } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What services does your agency provide?",
    answer:
      "LOOMIE specializes in brand identity architecture, kinetic digital design, 3D WebGL interfaces, custom typographic systems, and high-performance web applications built for ambitious enterprises.",
  },
  {
    id: "faq-2",
    question: "How does your branding process work?",
    answer:
      "Every project follows our 3-phase discipline: 1. Strategic Discovery & Core Positioning, 2. Identity Construction & Motion Design, 3. Production Stress Testing & Full Multi-Platform Deployment.",
  },
  {
    id: "faq-3",
    question: "What is the typical project timeline?",
    answer:
      "A complete brand identity architecture typically spans 4 to 6 weeks. Full kinetic web applications with WebGL shaders span 6 to 10 weeks depending on interactive scope.",
  },
  {
    id: "faq-4",
    question: "How much does branding cost?",
    answer:
      "We tailor our scope to your commercial scale. Core identity frameworks start from $15,000, with comprehensive end-to-end digital branding & WebGL engagements starting from $35,000.",
  },
  {
    id: "faq-5",
    question: "Can I see examples of your past work?",
    answer:
      "You can explore our Creative Archive on the homepage or dive into our detailed Case Studies (/work/vortex-matte-titanium) to inspect our exact technical specifications and commercial results.",
  },
];

const TIME_SLOTS = ["7:00 AM", "7:30 AM", "8:00 AM", "10:30 AM", "2:00 PM", "4:30 PM"];

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calendar State
  const [selectedDate, setSelectedDate] = useState<number>(7);
  const [selectedTime, setSelectedTime] = useState<string>("10:30 AM");
  const [selectedTimezone, setSelectedTimezone] = useState<string>("UTC (GMT+0)");
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // GSAP ScrollTrigger Animations for both UP and DOWN scrolling
      const anims = document.querySelectorAll(".contact-anim-block");
      anims.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@loomie.design");
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
      className="py-16 md:py-28 px-6 md:px-12 max-w-[1700px] mx-auto select-none space-y-24 md:space-y-36"
    >
      {/* 1. CONTACT US HERO & MEETING BOOKER GRID */}
      <div className="contact-anim-block space-y-12">
        {/* Section Header */}
        <div className="pb-8 border-b border-border-custom space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-foreground/10 border border-foreground/20 text-foreground text-xs font-mono font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-foreground rounded-none animate-pulse" />
            <span>05 — CONNECT & BOOK A CALL</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter uppercase text-foreground leading-[0.92]">
            CONTACT <span className="text-foreground border-b-4 border-foreground pb-1">US.</span>
          </h1>
        </div>

        {/* 2-Column Contact Layout (Matching Reference Screenshot 2 100%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-foreground">
                LET&apos;S BUILD BOLD TOGETHER
              </h2>
              <p className="text-foreground-secondary font-sans text-sm sm:text-base leading-relaxed uppercase font-medium">
                Whether you&apos;re ready to start a project or just exploring, we&apos;d love to hear from you.
              </p>
            </div>

            {/* Email Copy Card */}
            <div className="p-6 bg-surface-card border border-border-custom shadow-xl space-y-3">
              <span className="font-mono text-xs font-bold text-foreground-secondary uppercase tracking-widest block">
                DIRECT INQUIRIES
              </span>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-lg sm:text-xl font-extrabold text-foreground">
                  hello@loomie.design
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 bg-foreground text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-1.5"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "COPIED" : "COPY"}</span>
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3 font-mono text-xs font-bold uppercase text-foreground">
              <span className="text-foreground-secondary tracking-widest block mb-2">STUDIO CHANNELS</span>
              <div className="flex flex-wrap gap-4">
                {["Instagram", "LinkedIn", "Twitter", "GitHub"].map((social) => (
                  <a
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    className="px-4 py-2 bg-surface-card border border-border-custom hover:border-foreground transition-all inline-flex items-center gap-1.5"
                  >
                    <span>{social}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-foreground-secondary" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Meeting Calendar Booker (Matching Screenshot 2 100%) */}
          <div className="lg:col-span-7 bg-surface-card border border-border-custom p-6 sm:p-8 md:p-10 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-custom pb-4 gap-3 font-mono text-xs font-bold text-foreground">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-foreground animate-pulse" />
                <span className="uppercase tracking-widest">LOOMIE MEET // STRATEGY CALL</span>
              </div>
              <div className="flex items-center gap-1.5 text-foreground-secondary">
                <Clock className="w-3.5 h-3.5 text-foreground" />
                <span>30 MIN DURATION</span>
              </div>
            </div>

            {/* Calendar Widget Interior */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
              {/* Date Selection Grid (7 cols) */}
              <div className="md:col-span-7 space-y-4 font-mono">
                <div className="flex items-center justify-between text-xs font-bold text-foreground uppercase border-b border-border-custom/60 pb-2">
                  <span>AUGUST 2026</span>
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <Globe className="w-3.5 h-3.5 text-foreground" />
                    <span>{selectedTimezone}</span>
                  </div>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 text-center text-[10px] font-bold text-foreground-secondary uppercase tracking-widest">
                  <span>SUN</span>
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs font-bold text-foreground">
                  {/* Empty offset padding for August 2026 */}
                  <span className="p-2 opacity-20">26</span>
                  <span className="p-2 opacity-20">27</span>
                  <span className="p-2 opacity-20">28</span>
                  <span className="p-2 opacity-20">29</span>
                  <span className="p-2 opacity-20">30</span>
                  <span className="p-2 opacity-20">31</span>

                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`p-2 border transition-all ${selectedDate === day
                        ? "bg-foreground text-background border-foreground font-black shadow-md scale-105"
                        : "bg-background text-foreground border-border-custom/50 hover:border-foreground"
                        }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots (5 cols) */}
              <div className="md:col-span-5 space-y-4 font-mono">
                <div className="text-xs font-bold text-foreground uppercase border-b border-border-custom/60 pb-2 flex items-center justify-between">
                  <span>FRI {selectedDate} AUG</span>
                  <span className="text-foreground-secondary">SLOTS</span>
                </div>

                <div className="space-y-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`w-full py-2.5 px-3 text-xs font-bold uppercase transition-all border text-center ${selectedTime === time
                        ? "bg-foreground text-background border-foreground shadow-md"
                        : "bg-background text-foreground border-border-custom hover:border-foreground"
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {/* Instant Book Button */}
                <button
                  onClick={() => setIsBooked(true)}
                  className="w-full py-3.5 bg-foreground text-background font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-all border border-foreground shadow-xl mt-2"
                >
                  {isBooked ? "✓ STRATEGY CALL CONFIRMED" : "CONFIRM BOOKING"}
                </button>
              </div>
            </div>

            {/* Confirmation Alert */}
            {isBooked && (
              <div className="p-4 bg-foreground/10 border border-foreground/30 text-foreground font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                <span>CONFIRMED FOR AUG {selectedDate}, 2026 AT {selectedTime} ({selectedTimezone})</span>
                <Check className="w-4 h-4 text-foreground" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION - Matching Reference Screenshot 1 100%) */}
      <div className="contact-anim-block space-y-10 pt-12 border-t border-border-custom">
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-foreground-secondary block">
            LOOMIE FAQ ARCHIVE
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-foreground tracking-tight">
            FREQUENTLY ASKED <span className="text-foreground border-b-4 border-foreground pb-1">QUESTIONS.</span>
          </h2>
        </div>

        {/* Accordion FAQ Stack (Matching Screenshot 1 100%) */}
        <div className="border-t border-border-custom divide-y divide-border-custom">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div key={faq.id} className="py-6 sm:py-8 group cursor-pointer" onClick={() => toggleFaq(faq.id)}>
                <div className="flex items-center justify-between gap-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-foreground group-hover:text-foreground-secondary transition-colors">
                    {faq.question}
                  </h3>

                  <div className="w-10 h-10 rounded-none bg-surface-card border border-border-custom flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-all flex-shrink-0">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </div>

                {isOpen && (
                  <div className="pt-4 pr-12 text-foreground-secondary font-sans text-sm sm:text-base leading-relaxed uppercase font-medium max-w-4xl transition-all">
                    <p className="border-l-2 border-foreground pl-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
