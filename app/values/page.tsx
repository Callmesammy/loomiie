import React from "react";
import { Navbar } from "@/components/Navbar";
import { ValuesSection } from "@/components/ValuesSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Values — Stacked Matrix | LOOMIE",
  description:
    "LOOMIE is a kinetic web & design studio. Clear. Connected. Complete. Five core principles guiding our strategy, craft, and digital engineering.",
};

export default function ValuesPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      <Navbar />
      <div>
        <ValuesSection />
      </div>
      <Footer />
    </main>
  );
}
