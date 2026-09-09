import React from "react";
import { Navbar } from "@/components/Navbar";
import { SubpageHeroHeader } from "@/components/SubpageHeroHeader";
import { StorySection } from "@/components/StorySection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "Our Story — LOOMIE Chronicle",
  description:
    "Explore LOOMIE's studio chronicle across Phase 01 (The Spark), Phase 02 (The Evolution), and Phase 03 (The Discipline). Clear. Connected. Complete.",
};

export default function StoryPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      <Navbar />
      <SubpageHeroHeader
        badge="[LOOMIE CHRONICLE - EST. 2026]"
        line1="BUILDING WHAT'S NEXT"
        line2="TOGETHER"
        bannerImage={getCloudinaryUrl("/images/partners/film-production.jpg")}
        bannerAlt="LOOMIE Strategic Production Alliances"
      />
      <div>
        <StorySection />
      </div>
      <Footer />
    </main>
  );
}
