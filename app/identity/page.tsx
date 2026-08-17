import React from "react";
import { Navbar } from "@/components/Navbar";
import { SubpageHeroHeader } from "@/components/SubpageHeroHeader";
import { AboutUsSection } from "@/components/AboutUsSection";
import { StorySection } from "@/components/StorySection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — LOOMIE Studio | Digital Marketing & Creative Direction",
  description:
    "LOOMIE is a kinetic web & design studio led by Sarah Mahmoud (Head of Digital Marketing & Performance Lead). Clear. Connected. Complete.",
};

export default function IdentityPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <SubpageHeroHeader
        badge="[WHO WE ARE // ABOUT US]"
        line1="DIGITAL MARKETING &"
        line2="STUDIO ARCHITECTURE"
        bannerImage="/images/manifesto/keyboard.jpg"
        bannerAlt="Studio Architecture & Design System"
      />
      <div>
        <AboutUsSection />
        <StorySection />
      </div>
      <Footer />
    </main>
  );
}
