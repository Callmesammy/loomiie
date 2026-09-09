import { LandingSampleClient } from "@/components/LandingSampleClient";
import { CapsulesStickyColsSection } from "@/components/CapsulesStickyColsSection";
import { TelescopeTextAnimationSection } from "@/components/TelescopeTextAnimationSection";
import { TiltingSectionsScrollSection } from "@/components/TiltingSectionsScrollSection";
import { RoshanServicesInlineSection } from "@/components/RoshanServicesInlineSection";
import { FlyingGameLogoOverlay } from "@/components/FlyingGameLogoOverlay";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <LandingSampleClient />
      <FlyingGameLogoOverlay />
      <CapsulesStickyColsSection />
      <TelescopeTextAnimationSection />
      <RoshanServicesInlineSection />
      <TiltingSectionsScrollSection />
      <Footer />
    </main>
  );
}