import React from "react";
import { Navbar } from "@/components/Navbar";
import { AkaruCinematicExpandingImage } from "@/components/AkaruCinematicExpandingImage";
import { AboutUsSection } from "@/components/AboutUsSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "About Us — Studio Disciplines & Capabilities | LOOMIE",
  description:
    "LOOMIE is a kinetic web & design studio. Clear. Connected. Complete. Digital marketing, SEO architecture, brand strategy, and WebGL motion engineering.",
};

export default function AboutUsPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      <Navbar />
      <AkaruCinematicExpandingImage
        badge="LOOMIE - ABOUT US"
        title="RESULT DRIVEN KINETIC DESIGN & SYSTEMS"
        subtitle="SCROLL TO EXPAND DISCOVERY"
        image={getCloudinaryUrl("/images/about/brand-architecture.jpg")}
        alt="LOOMIE Brand & Systems Architecture"
      />
      <div>
        <AboutUsSection />
      </div>
      <Footer />
    </main>
  );
}
