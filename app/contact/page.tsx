import React from "react";
import { Navbar } from "@/components/Navbar";
import { SubpageHeroHeader } from "@/components/SubpageHeroHeader";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Book a Call — LOOMIE Studio",
  description:
    "Schedule a 30-minute discovery call with LOOMIE Studio or contact us directly. Clear. Connected. Complete.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#F5F3EF] text-[#0E0E0E] overflow-hidden">
      <Navbar />
      <SubpageHeroHeader
        badge="[LOOMIE STUDIO // CONTACT]"
        line1="START A PROJECT"
        line2="& BUILD TOGETHER"
        bannerImage="/images/contact/contact-hero.jpg"
        bannerAlt="LOOMIE Contact & Strategy Workspace"
      />
      <div>
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
