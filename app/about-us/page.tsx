import React from "react";
import { Navbar } from "@/components/Navbar";
import { AkaruCinematicExpandingImage } from "@/components/AkaruCinematicExpandingImage";
import { AboutUsSection } from "@/components/AboutUsSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Studio Disciplines & Capabilities | LOOMIE Studio",
  description:
    "LOOMIE is a kinetic web & design studio. Clear. Connected. Complete. Digital marketing, SEO architecture, brand strategy, and WebGL motion engineering.",
};

export default function AboutUsPage() {
  return (
    <main className="relative min-h-screen bg-[#F5F3EF] text-[#0E0E0E] overflow-hidden">
      <Navbar />
      <AkaruCinematicExpandingImage
        badge="LOOMIE STUDIO // ABOUT US"
        title="RESULT DRIVEN KINETIC DESIGN & SYSTEMS"
        subtitle="SCROLL TO EXPAND DISCOVERY"
        image="/images/about/brand-architecture.jpg"
        alt="LOOMIE Studio Brand & Systems Architecture"
      />
      <div>
        <AboutUsSection />
      </div>
      <Footer />
    </main>
  );
}
