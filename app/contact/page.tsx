import React from "react";
import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Book a Meeting | LOOMIE Studio",
  description:
    "Let's Build Bold Together. Book a strategy call with LOOMIE Studio or explore our Frequently Asked Questions.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Preloader variant="brief" pageTitle="CONTACT US" />
      <Navbar />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
