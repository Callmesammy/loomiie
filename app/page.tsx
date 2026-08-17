import { Preloader } from "@/components/Preloader";
import { HorizontalProjectSlider } from "@/components/HorizontalProjectSlider";
import { ScrollTextReveal } from "@/components/ScrollTextReveal";
import { AkaruProjetsSection } from "@/components/AkaruProjetsSection";
import { RoshanServicesInlineSection } from "@/components/RoshanServicesInlineSection";
import { FlyingGameLogoOverlay } from "@/components/FlyingGameLogoOverlay";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Preloader />
      <FlyingGameLogoOverlay />
      <HorizontalProjectSlider />
      <ScrollTextReveal />
      <Marquee />
      <AkaruProjetsSection />
      <RoshanServicesInlineSection />
      <Footer />
    </main>
  );
}