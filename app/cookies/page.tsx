import React from "react";
import { Navbar } from "@/components/Navbar";
import { SubpageHeroHeader } from "@/components/SubpageHeroHeader";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { ShieldCheck, Cookie, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy & Privacy Preferences — LOOMIE Studio",
  description:
    "Learn about LOOMIE's cookie usage policies, essential web storage, performance telemetry, and privacy standards.",
};

export default function CookiesPage() {
  return (
    <main className="relative min-h-screen bg-[#F5F3EF] text-[#0E0E0E] overflow-hidden select-none">
      <Navbar />

      {/* Hero Header */}
      <SubpageHeroHeader
        badge="[LOOMIE STUDIO // LEGAL & PRIVACY]"
        line1="COOKIE POLICY &"
        line2="DATA PREFERENCES"
        bannerImage="/images/manifesto/rose-bw.jpg"
        bannerAlt="LOOMIE Cookie Policy and Privacy"
      />

      {/* Main Content */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 max-w-4xl mx-auto w-full space-y-12">
        <div className="space-y-4 border-b border-stone-300 pb-8">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">
            <Cookie className="w-4 h-4 text-[#0E0E0E]" />
            <span>COOKIE CONSENT & PRIVACY FRAMEWORK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light font-sans tracking-tight text-[#0E0E0E]">
            Cookie Policy
          </h1>
          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            Effective Date: January 1, 2026. This Cookie Policy explains how LOOMIE ("we", "us", or "our") uses cookies and similar web storage technologies when you visit our digital studio platform.
          </p>
        </div>

        {/* Policy Section 1 */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#0E0E0E] uppercase tracking-tight">
            1. What Are Cookies?
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
            Cookies are small text files placed on your browser or device by web servers. They allow websites to remember your device, store interaction preferences, and measure technical performance across sessions.
          </p>
        </div>

        {/* Policy Section 2 */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#0E0E0E] uppercase tracking-tight">
            2. Categories of Cookies We Use
          </h2>

          <div className="space-y-4 font-sans text-sm">
            <div className="p-6 bg-white border border-stone-300 rounded-xl space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#0E0E0E] uppercase tracking-wider">
                  ESSENTIAL & TECHNICAL COOKIES
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-xs">
                  REQUIRED
                </span>
              </div>
              <p className="text-stone-600 leading-relaxed text-xs sm:text-sm">
                These cookies are necessary for core site navigation, security verification, and WebGL canvas rendering. They cannot be switched off in our systems.
              </p>
            </div>

            <div className="p-6 bg-white border border-stone-300 rounded-xl space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#0E0E0E] uppercase tracking-wider">
                  PERFORMANCE & ANALYTICS COOKIES
                </span>
                <span className="font-mono text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-xs">
                  OPTIONAL
                </span>
              </div>
              <p className="text-stone-600 leading-relaxed text-xs sm:text-sm">
                Analytics cookies help us measure visitor traffic, popular case studies, and GPU graphics framerate metrics to optimize platform response speeds.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Section 3 */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#0E0E0E] uppercase tracking-tight">
            3. Managing Your Cookie Preferences
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
            You can modify your cookie choices at any time using the Cookie Consent banner at the bottom of our site, or through your web browser settings. Rejecting cookies will not prevent you from navigating LOOMIE.
          </p>
        </div>

        {/* Contact Footer Note */}
        <div className="p-6 bg-stone-200/60 border border-stone-300 rounded-xl space-y-2 font-mono text-xs text-stone-700">
          <span className="font-bold text-[#0E0E0E] uppercase block">QUESTIONS ABOUT PRIVACY?</span>
          <p>
            For privacy inquiries or data requests, contact our privacy officer at{" "}
            <a href="mailto:privacy@loomie.design" className="underline font-bold text-[#0E0E0E]">
              privacy@loomie.design
            </a>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
