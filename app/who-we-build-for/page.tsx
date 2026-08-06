import React from "react";
import { Navbar } from "@/components/Navbar";
import { PinnedProjects } from "@/components/PinnedProjects";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who We Build For — Ambitious Startups & Builders | LOOMIE Studio",
  description:
    "LOOMIE designs for visionary founders, ambitious startups, and category leaders seeking clear, connected, and complete digital identities.",
};

export default function WhoWeBuildForPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <div className="pt-20">
        <PinnedProjects />
      </div>
      <Footer />
    </main>
  );
}
