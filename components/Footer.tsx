"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail } from "lucide-react";
import { LoomieLogoMark } from "./LoomieLogoMark";

export function Footer() {
  const giantLogoRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Monumental Animated Logo Reveal for L [LOGO] M I E
      if (giantLogoRef.current) {
        const children = giantLogoRef.current.children;
        if (children && children.length > 0) {
          gsap.fromTo(
            Array.from(children),
            { y: 120, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.05,
              ease: "power4.out",
              scrollTrigger: {
                trigger: giantLogoRef.current,
                start: "top 95%",
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
    <footer id="contact" ref={footerRef} className="relative bg-background border-t border-border-custom pt-16 pb-8 overflow-hidden select-none">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        {/* Main CTA Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-foreground font-bold">
              03 / GET IN TOUCH
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mt-4 max-w-3xl leading-[1.05]">
              LET&apos;S BUILD SOMETHING <span className="text-foreground border-b-4 border-foreground pb-1">EXTRAORDINARY</span>.
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:hello@loomiestudio.com"
              className="inline-flex items-center gap-4 px-8 py-5 rounded-none bg-foreground text-background font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black border border-foreground group"
            >
              <Mail className="w-5 h-5" />
              <span>hello@loomiestudio.com</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-border-custom text-sm">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <LoomieLogoMark className="w-14 h-7" />
              <span className="font-extrabold text-lg tracking-widest uppercase font-sans">
                LOOMIE
              </span>
            </div>
            <p className="text-foreground-secondary max-w-sm leading-relaxed">
              LOOMIE is a premium design & technology studio. <strong className="text-foreground">Clear. Connected. Complete.</strong> — Specializing in kinetic web development, brutalist spatial concepts, and digital branding.
            </p>
          </div>

          {/* Nav Links (Updated to match exact header menu items) */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-xs text-foreground mb-4 font-mono">
              Navigation
            </h4>
            <ul className="space-y-3 text-foreground-secondary font-mono text-xs font-semibold">
              <li>
                <a href="/story" className="hover:text-foreground transition-colors">
                  01 / Story
                </a>
              </li>
              <li>
                <a href="/values" className="hover:text-foreground transition-colors">
                  02 / Values
                </a>
              </li>
              <li>
                <a href="/identity" className="hover:text-foreground transition-colors">
                  03 / Identity
                </a>
              </li>
              <li>
                <a href="/who-we-build-for" className="hover:text-foreground transition-colors">
                  04 / Who We Build For
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-foreground transition-colors">
                  05 / Connect
                </a>
              </li>
            </ul>
          </div>

          {/* Social Connect Links (Right Column) */}
          <div className="md:col-span-3">
            <h4 className="font-bold uppercase tracking-wider text-xs text-foreground mb-5 font-mono">
              SOCIAL CONNECT
            </h4>
            <ul className="space-y-3 font-mono text-xs font-bold uppercase text-foreground-secondary">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors flex items-center justify-between">
                  <span>X / Twitter</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors flex items-center justify-between">
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors flex items-center justify-between">
                  <span>Dribbble</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors flex items-center justify-between">
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Monumental Impactful Wall-to-Wall LOOMIE Brand Headline */}
        <div className="w-full -mx-6 md:-mx-12 px-2 sm:px-4 pt-12 pb-6 overflow-hidden border-b border-border-custom bg-surface flex justify-center items-center">
          <h2
            ref={giantLogoRef}
            className="text-7xl sm:text-9xl md:text-[18vw] lg:text-[22vw] xl:text-[24vw] font-black tracking-tighter leading-[0.85] text-foreground uppercase select-none font-sans text-center flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 w-full max-w-none whitespace-nowrap"
            style={{ perspective: "1000px" }}
          >
            <span className="inline-block">L</span>
            <span className="inline-flex items-center justify-center px-0.5 sm:px-1 md:px-1.5">
              <LoomieLogoMark className="h-[0.68em] w-auto inline-block align-middle" />
            </span>
            <span className="inline-block">M</span>
            <span className="inline-block">I</span>
            <span className="inline-block">E</span>
          </h2>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-foreground-secondary font-mono font-bold uppercase">
          <p>© {new Date().getFullYear()} LOOMIE Studio. All rights reserved.</p>
          <p>CLEAR. CONNECTED. COMPLETE.</p>
        </div>
      </div>
    </footer>
  );
}
