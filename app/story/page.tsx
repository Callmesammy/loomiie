import React from "react";
import { Navbar } from "@/components/Navbar";
import { SubpageHeroHeader } from "@/components/SubpageHeroHeader";
import { StorySection } from "@/components/StorySection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story — LOOMIE Studio Chronicle",
  description:
    "Explore LOOMIE's studio chronicle across Phase 01 (The Spark), Phase 02 (The Evolution), and Phase 03 (The Discipline). Clear. Connected. Complete.",
};

export default function StoryPage() {
  return (
    <main className="relative min-h-screen bg-[#F5F3EF] text-[#0E0E0E] overflow-hidden">
      <Navbar />
      <SubpageHeroHeader
        badge="[LOOMIE CHRONICLE // EST. 2026]"
        line1="BUILDING WHAT'S NEXT"
        line2="TOGETHER"
        bannerImage="/images/partners/film-production.jpg"
        bannerAlt="LOOMIE Strategic Production Alliances"
      />
      <div>
        <StorySection />
      </div>
      <Footer />
    </main>
  );
}
