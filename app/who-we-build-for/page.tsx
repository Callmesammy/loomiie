import React from "react";
import { Navbar } from "@/components/Navbar";
import { SubpageHeroHeader } from "@/components/SubpageHeroHeader";
import { WhoWeBuildForSection } from "@/components/WhoWeBuildForSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who We Build For — LOOMIE Studio",
  description:
    "LOOMIE builds strategic brand identity systems, product packaging, and WebGL web applications for entrepreneurs, product businesses, and digital-first enterprises.",
};

export default function WhoWeBuildForPage() {
  return (
    <main className="relative min-h-screen bg-[#F5F3EF] text-[#0E0E0E] overflow-hidden">
      <Navbar />
      <SubpageHeroHeader
        badge="[LOOMIE PARTNERSHIPS // AUDIENCE]"
        line1="AMBITIOUS FOUNDERS"
        line2="& DIGITAL BUILDERS"
        bannerImage="/images/about/brand-architecture.jpg"
        bannerAlt="Brand Systems Architecture"
      />
      <div>
        <WhoWeBuildForSection />
      </div>
      <Footer />
    </main>
  );
}
