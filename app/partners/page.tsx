import React from "react";
import { Navbar } from "@/components/Navbar";
import { SubpageHeroHeader } from "@/components/SubpageHeroHeader";
import { PartnersSection } from "@/components/PartnersSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Partners & Alliances | LOOMIE Studio",
  description:
    "Explore LOOMIE's official technology partners, WebGL graphics pipeline, spatial acoustic telemetry, and film production alliances.",
};

export default function PartnersPage() {
  return (
    <main className="relative min-h-screen bg-[#F5F3EF] text-[#0E0E0E] overflow-hidden">
      <Navbar />
      <SubpageHeroHeader
        badge="[LOOMIE ALLIANCES // EST. 2026]"
        line1="BUILDING WHAT'S NEXT"
        line2="TOGETHER"
        bannerImage="/images/partners/film-production.jpg"
        bannerAlt="LOOMIE Strategic Production Alliances"
      />
      <div>
        <PartnersSection />
      </div>
      <Footer />
    </main>
  );
}
