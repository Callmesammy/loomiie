import React from "react";
import { Navbar } from "@/components/Navbar";
import { IdentitySection } from "@/components/IdentitySection";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Identity — Clear. Connected. Complete. | LOOMIE Studio",
  description:
    "LOOMIE is a premium design & technology studio. Clear. Connected. Complete.",
};

export default function IdentityPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Preloader variant="brief" pageTitle="OUR IDENTITY" />
      <Navbar />
      <div className="pt-20">
        <IdentitySection />
      </div>
      <Footer />
    </main>
  );
}
