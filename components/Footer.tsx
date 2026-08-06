"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
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
        {/* Info & Navigation Grid (Matching Reference Screenshot 2 100%) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-border-custom text-sm">
          {/* Brand Info (Left Column) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <LoomieLogoMark className="w-12 h-6" />
              <span className="font-extrabold text-lg tracking-wider uppercase font-sans text-foreground">
                LOOMIE
              </span>
            </div>
            <p className="text-foreground-secondary font-sans text-sm sm:text-base max-w-lg leading-relaxed font-medium">
              LOOMIE is a premium design & technology studio.{" "}
              <strong className="text-foreground">Clear. Connected. Complete.</strong> — Specializing in kinetic web development, brutalist spatial concepts, and digital branding.
            </p>
          </div>

          {/* Navigation Links (Middle Column) */}
          <div className="md:col-span-3">
            <h4 className="font-bold uppercase tracking-wider text-xs text-foreground mb-5 font-mono">
              NAVIGATION
            </h4>
            <ul className="space-y-3 font-mono text-xs font-bold uppercase text-foreground-secondary">
              <li>
                <Link href="/story" className="hover:text-foreground transition-colors">
                  Story
                </Link>
              </li>
              <li>
                <Link href="/values" className="hover:text-foreground transition-colors">
                  Values
                </Link>
              </li>
              <li>
                <Link href="/identity" className="hover:text-foreground transition-colors">
                  Identity
                </Link>
              </li>
              <li>
                <Link href="/who-we-build-for" className="hover:text-foreground transition-colors">
                  Who We Build For
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Connect & Book
                </Link>
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

        {/* Monumental Full-Bleed Wall-to-Wall LOOMIE Logo Reveal (Edge-to-Edge Wider) */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pt-10 pb-6 overflow-hidden border-b border-border-custom flex justify-center items-center px-0">
          <h2
            ref={giantLogoRef}
            className="text-[20vw] sm:text-[21.5vw] font-black tracking-tighter leading-none text-foreground uppercase select-none font-sans text-center flex items-center justify-center gap-0.5 sm:gap-1 w-full max-w-none px-2"
          >
            <span className="inline-block">L</span>
            <span className="inline-flex items-center justify-center px-0.5 sm:px-1">
              <LoomieLogoMark className="h-[0.72em] w-auto inline-block align-middle drop-shadow-[0_20px_40px_rgba(255,255,255,0.12)]" />
            </span>
            <span className="inline-block">M</span>
            <span className="inline-block">I</span>
            <span className="inline-block">E</span>
          </h2>
        </div>

        {/* Bottom Copyright Bar (Matching Reference Screenshot 2 100%) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-foreground-secondary font-mono font-bold uppercase tracking-wider">
          <p>© {new Date().getFullYear()} LOOMIE STUDIO. ALL RIGHTS RESERVED.</p>
          <p className="text-foreground">CLEAR. CONNECTED. COMPLETE.</p>
        </div>
      </div>
    </footer>
  );
}
