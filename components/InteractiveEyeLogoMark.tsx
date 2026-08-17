"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface InteractiveEyeLogoMarkProps {
  className?: string;
  pupilColor?: string;
  socketColor?: string;
  pillColor?: string;
  strokeColor?: string;
  enableScrollMorph?: boolean;
}

/**
 * High-Contrast Kinetic Mouse-Tracking & 5s Idle Animation LOOMIE Eye Logo Mark
 * - 5-Second Idle Animation: If 5 seconds pass with no mouse or scroll activity, eyes perform a playful look-around & blink animation.
 * - Stopped immediately upon any mouse move, scroll, or touch.
 * - High-Contrast Sharp Visibility on dark and light backgrounds.
 * - Click triggers smooth scroll to top or page refresh.
 */
export function InteractiveEyeLogoMark({
  className = "h-[0.75em] w-auto",
  pupilColor = "fill-[#0E0E0E]",
  socketColor = "fill-[#E6E4DF] dark:fill-[#D8D6D0]",
  pillColor = "fill-[#0E0E0E] dark:fill-white",
  strokeColor = "stroke-white dark:stroke-white",
  enableScrollMorph = true,
}: InteractiveEyeLogoMarkProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const leftSocketRef = useRef<SVGCircleElement>(null);
  const rightSocketRef = useRef<SVGCircleElement>(null);

  const [isFloating, setIsFloating] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isIdleAnimatingRef = useRef<boolean>(false);

  // Playful 5-second Idle Choreography Animation
  const startIdleAnimation = () => {
    if (!leftPupilRef.current || !rightPupilRef.current) return;
    isIdleAnimatingRef.current = true;

    const left = leftPupilRef.current;
    const right = rightPupilRef.current;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });
    idleTimelineRef.current = tl;

    tl.to([left, right], { x: -3.5, y: 0, duration: 0.35, ease: "power2.inOut" })
      .to([left, right], { x: 3.5, y: 0, duration: 0.35, ease: "power2.inOut" }, "+=0.4")
      .to([left, right], { x: 0, y: -3.5, duration: 0.35, ease: "power2.inOut" }, "+=0.4")
      .to([left, right], { x: 0, y: 0, duration: 0.3, ease: "power2.inOut" }, "+=0.3")
      .to([leftSocketRef.current, rightSocketRef.current], { scaleY: 0.15, duration: 0.1, transformOrigin: "center center", yoyo: true, repeat: 1 }, "+=0.5");
  };

  const stopIdleAnimation = () => {
    if (idleTimelineRef.current) {
      idleTimelineRef.current.kill();
      idleTimelineRef.current = null;
    }
    isIdleAnimatingRef.current = false;

    if (leftPupilRef.current && rightPupilRef.current) {
      gsap.to([leftPupilRef.current, rightPupilRef.current], {
        x: 0,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
    if (leftSocketRef.current && rightSocketRef.current) {
      gsap.to([leftSocketRef.current, rightSocketRef.current], {
        scaleY: 1,
        duration: 0.15,
      });
    }
  };

  const resetIdleTimer = () => {
    if (isIdleAnimatingRef.current) {
      stopIdleAnimation();
    }
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(startIdleAnimation, 5000);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Mouse-Tracking & Idle Reset
    const handleMouseMove = (e: MouseEvent) => {
      resetIdleTimer();

      if (isIdleAnimatingRef.current) return;
      if (!containerRef.current || !leftPupilRef.current || !rightPupilRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const leftEyeCenterX = rect.left + (22 / 70) * rect.width;
      const leftEyeCenterY = rect.top + (18 / 36) * rect.height;

      const rightEyeCenterX = rect.left + (48 / 70) * rect.width;
      const rightEyeCenterY = rect.top + (18 / 36) * rect.height;

      const maxRadius = 4.2;

      const dxLeft = mouseX - leftEyeCenterX;
      const dyLeft = mouseY - leftEyeCenterY;
      const distLeft = Math.hypot(dxLeft, dyLeft);
      const angleLeft = Math.atan2(dyLeft, dxLeft);
      const moveLeft = Math.min(distLeft * 0.08, maxRadius);
      const targetLeftX = Math.cos(angleLeft) * moveLeft;
      const targetLeftY = Math.sin(angleLeft) * moveLeft;

      const dxRight = mouseX - rightEyeCenterX;
      const dyRight = mouseY - rightEyeCenterY;
      const distRight = Math.hypot(dxRight, dyRight);
      const angleRight = Math.atan2(dyRight, dxRight);
      const moveRight = Math.min(distRight * 0.08, maxRadius);
      const targetRightX = Math.cos(angleRight) * moveRight;
      const targetRightY = Math.sin(angleRight) * moveRight;

      gsap.to(leftPupilRef.current, {
        x: targetLeftX,
        y: targetLeftY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(rightPupilRef.current, {
        x: targetRightX,
        y: targetRightY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleScrollOrTouch = () => {
      resetIdleTimer();
    };

    // Start initial 5-second idle timer
    resetIdleTimer();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScrollOrTouch, { passive: true });
    window.addEventListener("touchstart", handleScrollOrTouch, { passive: true });

    // 2. ScrollTrigger Morph
    if (enableScrollMorph && containerRef.current) {
      const svgEl = containerRef.current;

      const scrollTriggerInstance = ScrollTrigger.create({
        start: "top top+=100",
        end: "bottom bottom",
        onUpdate: (self) => {
          const scrollY = window.scrollY;
          const velocity = self.getVelocity();

          if (scrollY > 120) {
            setIsFloating(true);
            const tilt = Math.max(-25, Math.min(25, velocity * 0.015));
            gsap.to(svgEl, {
              rotate: tilt,
              duration: 0.2,
              ease: "power1.out",
            });
          } else {
            setIsFloating(false);
            gsap.to(svgEl, {
              rotate: 0,
              scale: 1,
              x: 0,
              y: 0,
              duration: 0.4,
              ease: "back.out(1.5)",
            });
          }
        },
      });

      return () => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScrollOrTouch);
        window.removeEventListener("touchstart", handleScrollOrTouch);
        scrollTriggerInstance.kill();
      };
    }

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScrollOrTouch);
      window.removeEventListener("touchstart", handleScrollOrTouch);
    };
  }, [enableScrollMorph]);

  // Click Handler: Refresh page or smooth scroll to top
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.scrollY > 80) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
  };

  return (
    <svg
      ref={containerRef}
      onClick={handleClick}
      viewBox="0 0 70 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-500 select-none overflow-visible cursor-pointer filter drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)] dark:drop-shadow-[0_2px_14px_rgba(255,255,255,0.4)] ${
        isFloating ? "scale-90 hover:scale-105" : "hover:scale-105"
      }`}
    >
      {/* Outer Pill Container with High Contrast White/Titanium Border */}
      <rect
        x="1"
        y="1"
        width="68"
        height="34"
        rx="17"
        className={`${pillColor} ${strokeColor} transition-colors duration-500`}
        strokeWidth="2.5"
      />

      {/* Left Eye Socket (Bigger) */}
      <circle
        ref={leftSocketRef}
        cx="22"
        cy="18"
        r="10.5"
        className={`${socketColor} transition-colors duration-500`}
      />
      {/* Left Pupil (Mouse Tracking & Idle Playful Animation) */}
      <circle
        ref={leftPupilRef}
        cx="22"
        cy="18"
        r="5.2"
        className={`${pupilColor} transition-colors duration-500`}
      />

      {/* Right Eye Socket (Bigger) */}
      <circle
        ref={rightSocketRef}
        cx="48"
        cy="18"
        r="10.5"
        className={`${socketColor} transition-colors duration-500`}
      />
      {/* Right Pupil (Mouse Tracking & Idle Playful Animation) */}
      <circle
        ref={rightPupilRef}
        cx="48"
        cy="18"
        r="5.2"
        className={`${pupilColor} transition-colors duration-500`}
      />
    </svg>
  );
}
