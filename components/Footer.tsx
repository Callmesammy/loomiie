"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { LoomieLogoMark } from "./LoomieLogoMark";

/**
 * Rebuilt Luxury Studio Footer Component
 * - Light studio substrate (#F5F3EF) background matching site-wide aesthetic
 * - Monumental Title Case CTA ("Let's build something extraordinary together.")
 * - High-contrast studio pill action buttons
 * - 4-column studio directory & monumental LOOMIE logo watermark
 */
export function Footer() {
  const giantLogoRef = useRef<HTMLHeadingElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Scale-in Floating CTA Banner on Viewport Entry
      if (ctaCardRef.current) {
        gsap.fromTo(
          ctaCardRef.current,
          { y: 25, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaCardRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }

      // 2. Monumental Animated Logo Reveal for L [LOGO] M I E
      if (giantLogoRef.current) {
        const children = giantLogoRef.current.children;
        if (children && children.length > 0) {
          gsap.fromTo(
            Array.from(children),
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.05,
              ease: "power4.out",
              scrollTrigger: {
                trigger: giantLogoRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative bg-[#F5F3EF] text-[#0E0E0E] border-t border-stone-300 pt-20 pb-8 overflow-hidden select-none"
    >
      <div className="max-w-[1750px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Floating Scale-In Studio CTA Banner */}
        <div
          ref={ctaCardRef}
          className="bg-white border border-stone-300 p-8 sm:p-14 md:p-16 shadow-2xl mb-20 flex flex-col lg:flex-row lg:items-center justify-between gap-10"
        >
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-stone-100 border border-stone-300 font-mono text-xs font-bold uppercase tracking-widest text-[#0E0E0E]">
              <span className="w-2 h-2 bg-[#0E0E0E] rounded-full animate-pulse" />
              <span>04 — INITIATE COLLABORATION</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight font-sans text-[#0E0E0E] leading-[0.98]">
              Let&apos;s build something <span className="font-bold underline decoration-1 underline-offset-8">extraordinary</span> together.
            </h2>

            <p className="text-stone-600 font-sans text-base sm:text-lg leading-relaxed font-normal">
              Ready to elevate your digital presence? Book a direct strategy call or send us an inquiry to start the conversation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="mailto:hello@loomie.design"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0E0E0E] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-stone-800 hover:scale-105 shadow-xl group"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>hello@loomie.design</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#0E0E0E] text-[#0E0E0E] font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-[#0E0E0E] hover:text-white"
            >
              <span>Book Strategy Call</span>
              <Send className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4-Column Studio Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-stone-300 text-sm">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <LoomieLogoMark className="w-12 h-6 text-[#0E0E0E]" />
              <span className="font-bold text-xl tracking-tighter uppercase font-sans text-[#0E0E0E]">
                LOOMIE
              </span>
            </div>
            <p className="text-stone-600 max-w-md leading-relaxed font-sans text-sm sm:text-base">
              LOOMIE is a kinetic web & design agency. <strong className="text-[#0E0E0E]">Clear. Connected. Complete.</strong> Specializing in high-converting web applications, spatial brand identity, and WebGL interactive experiences.
            </p>
          </div>

          {/* Studio Navigation Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-[#0E0E0E] mb-4 font-mono">
              STUDIO DIRECTORY
            </h4>
            <ul className="space-y-3 font-mono text-xs font-bold text-stone-600">
              <li>
                <Link href="/story" className="hover:text-[#0E0E0E] transition-colors">
                  01 / Story
                </Link>
              </li>
              <li>
                <Link href="/values" className="hover:text-[#0E0E0E] transition-colors">
                  02 / Values
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#0E0E0E] transition-colors">
                  03 / About Us
                </Link>
              </li>
              <li>
                <Link href="/who-we-build-for" className="hover:text-[#0E0E0E] transition-colors">
                  04 / Who We Build For
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0E0E0E] transition-colors">
                  05 / Connect & Book
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Connect Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-[#0E0E0E] mb-4 font-mono">
              SOCIAL CHANNELS
            </h4>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold text-[#0E0E0E]">
              <a
                href="https://www.instagram.com/byloomie/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 border border-stone-300 rounded-full bg-white hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 shadow-xs flex items-center justify-center group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/loomieofficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 border border-stone-300 rounded-full bg-white hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 shadow-xs flex items-center justify-center group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://x.com/Loomieofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="p-2.5 border border-stone-300 rounded-full bg-white hover:bg-[#0E0E0E] hover:text-white transition-all duration-300 shadow-xs flex items-center justify-center group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Monumental Wall-to-Wall LOOMIE Brand Watermark */}
        <div className="w-full -mx-6 sm:-mx-10 md:-mx-14 px-2 sm:px-4 pt-12 pb-6 overflow-hidden border-b border-stone-300 flex justify-center items-center">
          <h2
            ref={giantLogoRef}
            className="text-7xl sm:text-8xl md:text-[16vw] lg:text-[18vw] xl:text-[20vw] font-black tracking-tighter leading-[0.85] text-[#0E0E0E] uppercase select-none font-sans text-center flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 w-full max-w-none whitespace-nowrap opacity-90"
            style={{ perspective: "1000px" }}
          >
            <span className="inline-block">L</span>
            <span className="inline-flex items-center justify-center px-0.5 sm:px-1 md:px-1.5">
              <LoomieLogoMark className="h-[0.68em] w-auto inline-block align-middle text-[#0E0E0E]" />
            </span>
            <span className="inline-block">M</span>
            <span className="inline-block">I</span>
            <span className="inline-block">E</span>
          </h2>
        </div>

        {/* Bottom Copyright Telemetry Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 font-mono font-bold uppercase tracking-widest gap-2">
          <p>© {new Date().getFullYear()} LOOMIE Studio. All rights reserved.</p>
          <p>CLEAR. CONNECTED. COMPLETE.</p>
        </div>
      </div>
    </footer>
  );
}
