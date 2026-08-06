import React from "react";
import { Navbar } from "@/components/Navbar";
import { IdentitySection } from "@/components/IdentitySection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Identity — CAD Blueprint | LOOMIE Studio",
  description:
    "Explore the LOOMIE visual identity specifications, CAD grid geometry, color tokens, and Montserrat typography system.",
};

export default function IdentityPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <div className="pt-20">
        <IdentitySection />
      </div>
      <Footer />
    </main>
  );
}
