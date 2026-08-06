import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Marquee } from "@/components/Marquee";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Preloader />
      <Navbar />
      <HeroSection />
      <Marquee />
      <PortfolioGrid />
      <Footer />
    </main>
  );
}