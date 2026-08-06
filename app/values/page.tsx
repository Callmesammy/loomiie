import React from "react";
import { Navbar } from "../../components/Navbar";
import { ValuesSection } from "../../components/ValuesSection";
import { Footer } from "../../components/Footer";
import { Preloader } from "../../components/Preloader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Values — From Idea to Identity | LOOMIE Studio",
  description:
    "LOOMIE is a premium design & technology studio. Clear. Connected. Complete. Five core principles guiding our strategy and craft.",
};

export default function ValuesPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Preloader variant="brief" pageTitle="CORE VALUES" />
      <Navbar />
      <div className="pt-20">
        <ValuesSection />
      </div>
      <Footer />
    </main>
  );
}
