import React from "react";
import { Navbar } from "@/components/Navbar";
import { ValuesSection } from "@/components/ValuesSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Values — From Idea to Identity | LOOMIE Studio",
  description:
    "LOOMIE is a premium design & technology studio. Clear. Connected. Complete. — Exploring our 5 Core Pillars.",
};

export default function ValuesPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <div className="pt-20">
        <ValuesSection />
      </div>
      <Footer />
    </main>
  );
}
