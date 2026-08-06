import React from "react";
import { Navbar } from "@/components/Navbar";
import { StorySection } from "@/components/StorySection";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story — Born from a Blank Screen | LOOMIE Studio",
  description:
    "LOOMIE is a premium design & technology studio. Clear. Connected. Complete. Born from curiosity and the drive to create.",
};

export default function StoryPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Preloader variant="brief" pageTitle="OUR STORY" />
      <Navbar />
      <div className="pt-20">
        <StorySection />
      </div>
      <Footer />
    </main>
  );
}
