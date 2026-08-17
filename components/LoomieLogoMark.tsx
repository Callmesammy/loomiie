import React from "react";

/**
 * High-Fashion Loomie Logo Mark SVG Component
 * Featuring larger, highly expressive eye sockets & pupils
 */
export function LoomieLogoMark({ className = "w-12 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 70 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300 drop-shadow-md`}
    >
      <rect
        x="1"
        y="1"
        width="68"
        height="34"
        rx="17"
        className="fill-current stroke-current"
        strokeWidth="2.5"
      />
      {/* Left Eye Socket & Pupil (Slightly Bigger) */}
      <circle cx="22" cy="18" r="10.5" className="fill-[#E6E4DF] dark:fill-[#D8D6D0]" />
      <circle cx="22" cy="18" r="5.2" className="fill-[#0E0E0E]" />

      {/* Right Eye Socket & Pupil (Slightly Bigger) */}
      <circle cx="48" cy="18" r="10.5" className="fill-[#E6E4DF] dark:fill-[#D8D6D0]" />
      <circle cx="48" cy="18" r="5.2" className="fill-[#0E0E0E]" />
    </svg>
  );
}
