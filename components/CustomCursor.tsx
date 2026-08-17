"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X, ExternalLink } from "lucide-react";

const CURSOR_SPIN_CHARS = ["S", "E", "E", "•", "M", "O", "R", "E", "•"];

/**
 * High-Performance GSAP Ticker QuickSetter Magnetic Custom Cursor & Modal Engine
 * Inspired by Cobra Winfrey / CodePen Kinetic Showcase Pattern:
 * - GSAP quickSetter for butter-smooth 60fps+ cursor tracking (speed = 0.35)
 * - Ticker deltaRatio interpolation for uniform physics across all refresh rates
 * - Link hover state (.linkhover) & Card hover active state (.active)
 * - Spinning circular text ring (SEE•MORE•)
 * - Modal iframe / project preview lightbox drawer with Esc key & Close handlers
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.35;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const tickerFunc = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    };

    gsap.ticker.add(tickerFunc);

    // Event listeners for cards (.inner, .thumb) & links (a, button)
    const updateListeners = () => {
      const cards = document.querySelectorAll(".inner, .thumb, .waterfall-3d-card, .akaru-project-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => cursor.classList.add("active"));
        card.addEventListener("mouseleave", () => cursor.classList.remove("active"));
      });

      const links = document.querySelectorAll("a, button, .summary-list-item");
      links.forEach((link) => {
        link.addEventListener("mouseenter", () => cursor.classList.add("linkhover"));
        link.addEventListener("mouseleave", () => cursor.classList.remove("linkhover"));
      });
    };

    const timer = setTimeout(updateListeners, 800);

    // Escape Key Modal Listener
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape" || evt.key === "Esc" || evt.keyCode === 27) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      gsap.ticker.remove(tickerFunc);
      clearTimeout(timer);
    };
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    document.body.classList.remove("active");
    setTimeout(() => {
      setModalSrc(null);
    }, 400);
  };

  return (
    <>
      {/* GSAP QuickSetter Magnetic Follower Cursor with Spinning Text Ring */}
      <div
        id="cursor"
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#a58725] pointer-events-none z-[99999] transition-all duration-300 flex items-center justify-center font-mono text-[9px] font-bold text-white uppercase tracking-widest [&.active]:scale-[2.6] [&.active]:border-[#fe4e01] [&.active]:bg-[#08350e] [&.active]:text-[#eeece5] [&.linkhover]:scale-[1.8] [&.linkhover]:border-[#fe4e01] [&.linkhover]:bg-[#fe4e01]/20"
      >
        {/* Spinning Circular Text Ring (CodePen SEE•MORE• pattern) */}
        <strong className="circle absolute inset-0 w-full h-full rounded-full animate-[rotateCircle_10s_linear_infinite] flex items-center justify-center pointer-events-none">
          <span className="word absolute w-full h-full">
            {CURSOR_SPIN_CHARS.map((char, i) => (
              <span
                key={i}
                className="char absolute text-[8px] font-bold font-mono text-[#a58725] group-[.active]:text-white"
                style={{
                  transform: `rotate(${i * 40}deg) translateY(-14px)`,
                  transformOrigin: "center 14px",
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </strong>
      </div>

      {/* Lightbox Modal Drawer for Project Preview */}
      {modalOpen && modalSrc && (
        <div className="fixed inset-0 z-[99998] bg-[#0c0c0a]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 select-none animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-[#a58725]/30 pb-4 max-w-7xl w-full mx-auto">
            <div className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-[#a58725]">
              <span className="w-2 h-2 rounded-full bg-[#fe4e01] animate-ping" />
              <span>LOOMIE CODEPEN PREVIEW // {modalTitle}</span>
            </div>

            <button
              id="close"
              onClick={closeModal}
              className="px-5 py-2 bg-[#fe4e01] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#a58725] transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              <span>ESC / CLOSE</span>
            </button>
          </div>

          <div className="my-auto max-w-7xl w-full mx-auto h-[75vh] border border-[#a58725]/30 rounded-2xl overflow-hidden shadow-2xl relative bg-black">
            <iframe
              id="pen"
              src={modalSrc}
              className="w-full h-full border-0"
              title="Project Live Preview"
            />
          </div>

          <div className="flex items-center justify-between max-w-7xl w-full mx-auto border-t border-[#a58725]/30 pt-4 font-mono text-xs text-white/70 uppercase tracking-widest">
            <span>LOOMIE KINETIC STUDIO © 2026</span>
            <a
              id="penlink"
              href={modalSrc}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#fe4e01] flex items-center gap-1.5 transition-colors"
            >
              <span>VIEW FULLSCREEN</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
