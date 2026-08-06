"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { LoomieLogoMark } from "./LoomieLogoMark";

const NAV_ITEMS = [
  { label: "Story", href: "/story", number: "01" },
  { label: "Values", href: "/values", number: "02" },
  { label: "Identity", href: "/identity", number: "03" },
  { label: "Who We Build For", href: "/who-we-build-for", number: "04" },
  { label: "Connect", href: "/contact", number: "05" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Silky Smooth GSAP Fullscreen Menu Animation
  const toggleMenu = () => {
    if (!overlayRef.current) return;

    if (!menuOpen) {
      setMenuOpen(true);
      document.body.style.overflow = "hidden";

      gsap.killTweensOf([overlayRef.current, menuLinksRef.current?.children || []]);

      gsap.set(overlayRef.current, { display: "flex", opacity: 0, y: -20 });

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      });

      if (menuLinksRef.current) {
        tl.fromTo(
          menuLinksRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.25"
        );
      }
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          setMenuOpen(false);
          document.body.style.overflow = "auto";
          if (overlayRef.current) {
            overlayRef.current.style.display = "none";
          }
        },
      });

      if (menuLinksRef.current) {
        tl.to(menuLinksRef.current.children, {
          y: -20,
          opacity: 0,
          duration: 0.25,
          stagger: 0.03,
          ease: "power2.in",
        });
      }

      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          y: -15,
          duration: 0.35,
          ease: "power2.inOut",
        },
        "-=0.15"
      );
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "py-3 bg-background/85 backdrop-blur-xl border-b border-border-custom shadow-xl"
            : "py-6 bg-transparent"
          }`}
      >
        <div className="max-w-[1700px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo Icon with L [LoomieLogoMark] MIE Lockup */}
          <a
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.location.reload();
              }
            }}
            className="group flex items-center gap-0.5 sm:gap-1 font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter text-foreground uppercase transition-transform duration-300 hover:scale-105 select-none font-sans"
            aria-label="LOOMIE Home - Refresh"
          >
            <span>L</span>
            <span className="inline-flex items-center justify-center px-0.5 sm:px-1">
              <LoomieLogoMark className="h-[0.72em] w-auto inline-block align-middle" />
            </span>
            <span>MIE</span>
          </a>

          {/* Middle Desktop Menu Links: Hides smoothly on scroll down */}
          <nav
            className={`hidden lg:flex items-center gap-8 xl:gap-12 text-base md:text-lg font-sans transition-all duration-500 transform ${scrolled
                ? "opacity-0 -translate-y-3 pointer-events-none"
                : "opacity-100 translate-y-0 pointer-events-auto"
              }`}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground font-medium tracking-normal opacity-90 transition-all duration-300 hover:opacity-100 hover:scale-105 relative group py-1"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center justify-end">
            {/* "Lets Talk" CTA: Positions at the absolute end on desktop when not scrolled */}
            <a
              href="/contact"
              className={`hidden md:inline-flex px-7 py-3 rounded-none bg-foreground text-background font-bold text-base transition-all duration-500 hover:bg-white hover:text-black items-center gap-2.5 shadow-md border border-foreground group transform ${scrolled
                  ? "opacity-0 -translate-y-3 pointer-events-none lg:hidden"
                  : "opacity-100 translate-y-0 pointer-events-auto flex"
                }`}
            >
              <span>Lets Talk</span>
              <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Menu Trigger Button: Positioned at the absolute end, hidden on desktop when Lets Talk is visible, replaces it smoothly on scroll down */}
            <button
              onClick={toggleMenu}
              className={`px-4 py-3 sm:px-6 sm:py-3.5 rounded-none bg-surface-card border-2 border-border-custom text-foreground transition-all duration-500 hover:border-foreground hover:bg-foreground hover:text-background items-center gap-2.5 shadow-md group transform ${scrolled
                  ? "opacity-100 translate-y-0 pointer-events-auto flex"
                  : "lg:hidden opacity-100 translate-y-0 pointer-events-auto flex"
                }`}
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              )}
              <span className="hidden sm:inline-block font-mono text-sm font-extrabold tracking-widest uppercase">
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Silky Smooth Fullscreen Navigation Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[99999] bg-background/98 backdrop-blur-2xl text-foreground hidden flex-col justify-between p-6 sm:p-10 md:p-12 overflow-y-auto select-none border-b border-border-custom"
      >
        {/* Overlay Header */}
        <div className="flex items-center justify-between max-w-[1700px] w-full mx-auto pb-4 md:pb-6 border-b border-border-custom">
          <div className="flex items-center gap-4">
            <a
              href="/"
              onClick={(e) => {
                setMenuOpen(false);
                document.body.style.overflow = "auto";
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.location.reload();
                }
              }}
              className="flex items-center gap-0.5 sm:gap-1 font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter text-foreground uppercase font-sans hover:scale-105 transition-transform cursor-pointer"
            >
              <span>L</span>
              <span className="inline-flex items-center justify-center px-0.5 sm:px-1">
                <LoomieLogoMark className="h-[0.72em] w-auto inline-block align-middle" />
              </span>
              <span>MIE</span>
            </a>
            <span className="font-mono text-xs font-bold tracking-widest text-foreground-secondary uppercase hidden sm:inline-block">
              STUDIO NAVIGATION
            </span>
          </div>

          <button
            onClick={toggleMenu}
            className="p-2.5 sm:px-5 sm:py-2.5 rounded-none bg-foreground text-background font-bold text-sm transition-all duration-300 hover:bg-white hover:text-black flex items-center gap-2"
          >
            <span>Close</span>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Smooth Menu Links: Larger font & generous spacing on mobile, standard proportions on desktop */}
        <div className="max-w-[1700px] w-full mx-auto my-auto py-6 md:py-4">
          <div
            ref={menuLinksRef}
            className="flex flex-col gap-6 sm:gap-6 md:gap-3 lg:gap-4 font-sans font-bold"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={toggleMenu}
                className="group flex items-center gap-4 sm:gap-5 md:gap-6 text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl tracking-tight text-foreground-secondary hover:text-foreground transition-all duration-300 hover:translate-x-3 leading-snug py-3 sm:py-3 md:py-1"
              >
                <span className="font-mono text-base sm:text-base md:text-lg font-extrabold opacity-40 group-hover:opacity-100 text-foreground transition-opacity">
                  ({item.number})
                </span>
                <span className="group-hover:tracking-wider transition-all duration-300">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Overlay Footer */}
        <div className="max-w-[1700px] w-full mx-auto pt-4 md:pt-6 border-t border-border-custom flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-foreground-secondary gap-3 sm:gap-4">
          <div>
            <span>LOOMIE STUDIO 2026</span>
          </div>
          <div className="flex items-center gap-6 sm:gap-8">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              X / Twitter ↗
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              Instagram ↗
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
