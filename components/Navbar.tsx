"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { LoomieLogoMark } from "./LoomieLogoMark";
import { Preloader } from "./Preloader";

interface MenuNavItem {
  label: string;
  href: string;
  number: string;
  image: string;
  alt: string;
}

const MENU_ITEMS: MenuNavItem[] = [
  {
    label: "Home",
    href: "/",
    number: "01",
    image: "/images/projects/hero-project-1.jpg",
    alt: "LOOMIE Kinetic Web & Design Studio",
  },
  {
    label: "Work",
    href: "/work",
    number: "02",
    image: "/images/projects/hero-project-2.jpg",
    alt: "LOOMIE Work & Portfolio Showcase",
  },
  {
    label: "Expertise",
    href: "/expertise",
    number: "03",
    image: "/images/services/service-sketch.jpg",
    alt: "LOOMIE Studio Capabilities & Core Disciplines",
  },
  {
    label: "About Us",
    href: "/about-us",
    number: "04",
    image: "/images/about/brand-architecture.jpg",
    alt: "LOOMIE Team & 3D Rolling Cube Canvas",
  },
  {
    label: "Story",
    href: "/story",
    number: "05",
    image: "/images/services/service-color.jpg",
    alt: "LOOMIE Studio Chronicle & Genesis",
  },
  {
    label: "Values",
    href: "/values",
    number: "06",
    image: "/images/services/service-uiux.jpg",
    alt: "LOOMIE Core Discipline Values",
  },
  {
    label: "Connect",
    href: "/contact",
    number: "07",
    image: "/images/services/service-desktop.jpg",
    alt: "LOOMIE Studio Booking & Collaboration",
  },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Preloader Navigation State for Submenu Clicks
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingTitle, setNavigatingTitle] = useState("LOOMIE KINETIC STUDIO");

  const overlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  // Auto-cycle menu preview photo when menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveImageIndex((prev) => (prev + 1) % MENU_ITEMS.length);
        setIsFading(false);
      }, 250);
    }, 4000);

    return () => clearInterval(interval);
  }, [menuOpen]);

  // Reset menu & navigating preloader on route change
  useEffect(() => {
    setIsNavigating(false);
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = "auto";
      if (overlayRef.current) {
        overlayRef.current.style.display = "none";
        gsap.set(overlayRef.current, { xPercent: 0, opacity: 1 });
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage || window.innerWidth < 1024) {
        setShowNavbar(true);
      } else {
        setShowNavbar(window.scrollY > 120);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHomePage, pathname]);

  // GSAP Menu Toggle (Opening & Closing)
  const toggleMenu = () => {
    if (!overlayRef.current) return;

    if (!menuOpen) {
      setMenuOpen(true);
      document.body.style.overflow = "hidden";

      gsap.killTweensOf([overlayRef.current, menuLinksRef.current?.children || []]);
      gsap.set(overlayRef.current, { display: "flex", opacity: 1, xPercent: 100 });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        xPercent: 0,
        duration: 0.45,
        ease: "power3.out",
      });

      if (menuLinksRef.current) {
        tl.fromTo(
          menuLinksRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    } else {
      closeMenuWithSwipeLeft();
    }
  };

  // Swipe Left GSAP Exit Animation on Submenu Click + Preloader Trigger
  const closeMenuWithSwipeLeft = (targetHref?: string, label?: string) => {
    if (targetHref && pathname !== targetHref) {
      setIsNavigating(true);
      setNavigatingTitle(`LOOMIE // ${label || "DISCOVERY"}`);
    }

    if (!overlayRef.current) {
      if (targetHref) {
        if (pathname === targetHref) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setIsNavigating(false);
        } else {
          setTimeout(() => router.push(targetHref), 350);
        }
      }
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setMenuOpen(false);
        document.body.style.overflow = "auto";
        if (overlayRef.current) {
          overlayRef.current.style.display = "none";
          gsap.set(overlayRef.current, { xPercent: 0, opacity: 1 });
        }
        if (targetHref) {
          if (pathname === targetHref) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsNavigating(false);
          } else {
            setTimeout(() => router.push(targetHref), 350);
          }
        }
      },
    });

    if (menuLinksRef.current) {
      tl.to(menuLinksRef.current.children, {
        x: -30,
        opacity: 0,
        duration: 0.25,
        stagger: 0.02,
        ease: "power2.in",
      });
    }

    tl.to(
      overlayRef.current,
      {
        xPercent: -100,
        duration: 0.45,
        ease: "power3.inOut",
      },
      "-=0.15"
    );
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (menuOpen) {
      closeMenuWithSwipeLeft("/", "HOME");
    } else {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setIsNavigating(true);
        setNavigatingTitle("LOOMIE // HOME");
        setTimeout(() => router.push("/"), 350);
      }
    }
  };

  const handleSubmenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    closeMenuWithSwipeLeft(href, label);
  };

  const handleLinkHover = (index: number) => {
    if (index === activeImageIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveImageIndex(index);
      setIsFading(false);
    }, 200);
  };

  const currentMedia = MENU_ITEMS[activeImageIndex];

  return (
    <>
      {/* Submenu Click Navigation Loading Preloader Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] bg-[#F5F3EF] flex items-center justify-center animate-in fade-in duration-200">
          <Preloader variant="brief" pageTitle={navigatingTitle} />
        </div>
      )}

      {/* Universal Floating Header Overlay — Sleek Mobile Sizing */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-2 sm:pt-3 px-4 sm:px-10 lg:px-14 pointer-events-none flex items-center justify-between">
        {/* Top Left: LOOMIE Logo Mark */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="pointer-events-auto group flex items-center gap-1 font-bold text-sm sm:text-2xl tracking-tighter uppercase px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#0E0E0E] text-white border border-white/20 shadow-2xl transition-all duration-300 hover:scale-105 select-none font-sans cursor-pointer backdrop-blur-md"
          aria-label="LOOMIE Home"
        >
          <span>L</span>
          <span className="inline-flex items-center justify-center px-0.5 relative">
            <LoomieLogoMark className="h-[0.75em] w-auto inline-block align-middle transition-transform duration-700 ease-out group-hover:rotate-180 text-white" />
          </span>
          <span>MIE</span>
        </a>

        {/* Top Right: MENU • Button */}
        <button
          onClick={toggleMenu}
          className={`pointer-events-auto px-4 py-1.5 sm:px-7 sm:py-3 bg-[#0E0E0E] text-white rounded-full font-mono text-[11px] sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase flex items-center gap-2 sm:gap-3 shadow-2xl transition-all duration-500 border border-white/15 group ${
            !isHomePage || showNavbar
              ? "opacity-100 translate-y-0 hover:bg-[#222225] hover:scale-105 active:scale-95"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          aria-label="Toggle Navigation Menu"
        >
          <span>MENU</span>
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform duration-300" />
        </button>
      </header>

      {/* FULL-SCREEN OVERLAY MENU */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9990] bg-[#F5F3EF] text-[#0E0E0E] hidden flex-col justify-between p-6 sm:p-12 lg:p-16 select-none overflow-hidden"
        style={{ display: "none" }}
      >
        {/* Menu Top Header Bar */}
        <div className="flex items-center justify-between max-w-[1800px] w-full mx-auto pb-4 border-b border-stone-300 shrink-0">
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-1 font-bold text-2xl tracking-tighter uppercase text-[#0E0E0E]"
          >
            <span>L</span>
            <span className="inline-flex items-center justify-center px-0.5">
              <LoomieLogoMark className="h-[0.75em] w-auto inline-block align-middle text-[#0E0E0E]" />
            </span>
            <span>MIE</span>
          </a>

          <button
            onClick={toggleMenu}
            className="p-3 rounded-full bg-stone-200 hover:bg-[#0E0E0E] hover:text-white transition-colors duration-300 cursor-pointer"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Main Grid Layout */}
        <div className="max-w-[1800px] w-full mx-auto my-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT COLUMN: Dynamic Hover Photo Preview Box */}
            <div className="lg:col-span-8 hidden lg:block">
              <div className="relative w-full h-[360px] xl:h-[460px] rounded-2xl overflow-hidden border border-stone-300 bg-stone-900 shadow-2xl">
                <Image
                  src={currentMedia.image}
                  alt={currentMedia.alt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 60vw, 800px"
                  className={`object-cover transition-all duration-700 ease-out ${
                    isFading ? "opacity-0 scale-95 blur-xs" : "opacity-100 scale-100 blur-none"
                  }`}
                />
                <div className="absolute top-4 left-4 font-mono text-xs font-bold px-3 py-1 bg-black/80 text-white backdrop-blur-md rounded-xs">
                  {currentMedia.number} // {currentMedia.label.toUpperCase()}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Navigation Links List shifted rightwards on mobile */}
            <div
              ref={menuLinksRef}
              className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3 sm:gap-4 font-sans tracking-tight text-3xl sm:text-4xl xl:text-5xl font-light pl-8 sm:pl-16 lg:pl-0"
            >
              {MENU_ITEMS.map((item, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => handleLinkHover(idx)}
                    onClick={(e) => handleSubmenuClick(e, item.href, item.label.toUpperCase())}
                    className={`group cursor-pointer transition-all duration-300 py-1 ${
                      isActive
                        ? "text-[#0E0E0E] font-normal translate-x-0 lg:-translate-x-2"
                        : "text-stone-400 hover:text-[#0E0E0E]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] sm:text-xs text-stone-500 uppercase tracking-widest max-w-[1800px] w-full mx-auto border-t border-stone-300 pt-4 shrink-0">
          <span className="text-[#0E0E0E] font-bold">LOOMIE KINETIC STUDIO © 2026</span>
          <div className="flex items-center gap-4 text-[#0E0E0E] font-bold">
            <a href="https://www.instagram.com/byloomie/" target="_blank" rel="noopener noreferrer" className="hover:underline">INSTAGRAM</a>
            <span>•</span>
            <a href="https://www.linkedin.com/company/loomieofficial/" target="_blank" rel="noopener noreferrer" className="hover:underline">LINKEDIN</a>
            <span>•</span>
            <a href="https://x.com/Loomieofficial" target="_blank" rel="noopener noreferrer" className="hover:underline">X</a>
          </div>
        </div>
      </div>
    </>
  );
}
