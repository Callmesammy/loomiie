import React from "react";
import { Navbar } from "../../components/Navbar";
import { WhoWeBuildForSection } from "../../components/WhoWeBuildForSection";
import { Footer } from "../../components/Footer";
import { Preloader } from "../../components/Preloader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who We Build For | LOOMIE Studio",
  description:
    "Startups, small & medium businesses, and growing brands that need a strong, consistent identity.",
};

export default function WhoWeBuildForPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Preloader variant="brief" pageTitle="WHO WE BUILD FOR" />
      <Navbar />
      <div className="pt-20">
        <WhoWeBuildForSection />
      </div>
      <Footer />
    </main>
  );
}
