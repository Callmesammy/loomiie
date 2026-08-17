"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    // Check if user has already given cookie preference
    const consent = localStorage.getItem("loomie_cookie_consent");
    if (!consent) {
      // Delay slightly for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("loomie_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem("loomie_cookie_consent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Bottom-Left Cookie Consent Card (Matching DBTM / Modern Minimalist Aesthetic) */}
      <div className="fixed bottom-6 left-6 z-[9999] max-w-[380px] w-[calc(100vw-3rem)] bg-white text-[#0E0E0E] border border-stone-800/90 shadow-2xl p-6 sm:p-7 rounded-sm select-none animate-in fade-in slide-in-from-bottom-6 duration-500 font-sans">
        <div className="space-y-3">
          <p className="text-base sm:text-lg font-normal text-[#0E0E0E] leading-snug">
            We use cookies to improve your experience.
          </p>

          <div>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="text-xs font-mono font-bold text-stone-600 underline hover:text-[#0E0E0E] transition-colors cursor-pointer"
            >
              View Settings
            </button>
          </div>

          {/* Action Buttons Row */}
          <div className="pt-3 flex items-center gap-3">
            <button
              onClick={handleRejectAll}
              className="flex-1 py-3 px-4 border border-[#0E0E0E] bg-white text-[#0E0E0E] font-mono text-xs font-bold uppercase tracking-wider rounded-full hover:bg-stone-100 transition-all duration-300 shadow-xs cursor-pointer text-center"
            >
              REJECT ALL
            </button>

            <button
              onClick={handleAcceptAll}
              className="flex-1 py-3 px-4 border border-[#0E0E0E] bg-[#0E0E0E] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-full hover:bg-stone-800 transition-all duration-300 shadow-md cursor-pointer text-center"
            >
              ACCEPT ALL
            </button>
          </div>
        </div>
      </div>

      {/* Optional Cookie Settings Modal */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className="bg-white border border-stone-800 rounded-xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 border-b border-stone-200 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
                <Cookie className="w-4 h-4 text-[#0E0E0E]" />
                <span>LOOMIE // COOKIE PREFERENCES</span>
              </div>
              <h3 className="text-2xl font-light font-sans text-[#0E0E0E]">
                Cookie Privacy Settings
              </h3>
            </div>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
              <p>
                LOOMIE uses essential and analytical cookies to analyze traffic, remember site preferences, and optimize WebGL graphics performance.
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-md flex items-center justify-between">
                  <div>
                    <div className="font-mono text-xs font-bold text-[#0E0E0E]">ESSENTIAL COOKIES</div>
                    <div className="text-[11px] text-stone-500">Required for session navigation & 3D canvas state.</div>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 border border-emerald-200 rounded-xs">ALWAYS ACTIVE</span>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-md flex items-center justify-between">
                  <div>
                    <div className="font-mono text-xs font-bold text-[#0E0E0E]">ANALYTICS & PERFORMANCE</div>
                    <div className="text-[11px] text-stone-500">Anonymous traffic measurements & telemetry.</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0E0E0E] cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-stone-200">
              <Link
                href="/cookies"
                className="font-mono text-xs font-bold text-stone-600 underline hover:text-[#0E0E0E]"
              >
                Read Full Cookie Policy
              </Link>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2.5 bg-[#0E0E0E] text-white rounded-full font-mono text-xs font-bold uppercase hover:bg-stone-800 transition-colors"
              >
                SAVE PREFERENCES
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
