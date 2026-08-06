import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { CaseStudyClient } from "@/components/CaseStudyClient";
import { Metadata } from "next";

interface ProjectDetail {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  client: string;
  year: string;
  services: string[];
  liveUrl: string;
  heroImage: string;
  challenge: string;
  solution: string;
  impact: string;
  gallery: string[];
  nextSlug: string;
  nextTitle: string;
}

const PROJECTS_DATA: Record<string, ProjectDetail> = {
  "vortex-matte-titanium": {
    slug: "vortex-matte-titanium",
    title: "VORTEX MATTE TITANIUM MODULE",
    category: "Spatial Hardware & Industrial Design",
    subtitle: "Minimalist zero-plastic matte packaging identity engineered for sensory consumer rituals.",
    client: "VORTEX LABS TOKYO",
    year: "2026",
    services: ["Industrial Design", "Brand Identity", "Packaging Substrates", "WebGL Engine"],
    liveUrl: "https://vortexlabs.com",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
    challenge:
      "VORTEX needed a physical and digital brand identity that communicated high-precision engineering without feeling cold or generic. They required a zero-plastic packaging system and a kinetic web interface that performed seamlessly across global markets.",
    solution:
      "We engineered a monolithic brutalist design system based on matte titanium palettes (#000000 & #FFFFFF), equal-radius typography, and custom 60 FPS WebGL shaders that mirror the physical weight of their hardware.",
    impact:
      "+240% increase in pre-order conversion rates, featured in ArchDaily and Designboom, winning Best Industrial Design Systems 2026.",
    gallery: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    ],
    nextSlug: "outfindr-mountain-dynamics",
    nextTitle: "OUTFINDR MOUNTAIN DYNAMICS",
  },
  "outfindr-mountain-dynamics": {
    slug: "outfindr-mountain-dynamics",
    title: "OUTFINDR MOUNTAIN DYNAMICS",
    category: "Outdoor & Spatial Exploration",
    subtitle: "High-contrast telemetry UI and physical weather-proof brand architecture for alpine expeditions.",
    client: "OUTFINDR ALPINE GROUP",
    year: "2026",
    services: ["Spatial Architecture", "Outdoor Identity", "Telemetry UI/UX", "Brand Guidelines"],
    liveUrl: "https://outfindralpine.com",
    heroImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1800&q=80",
    challenge:
      "Alpine explorers needed a high-contrast visual system that remained 100% legible in zero-visibility blizzard conditions while maintaining a luxury aesthetic for consumer retail.",
    solution:
      "We built a high-contrast monochrome design system with oversized Montserrat typography, tactical HUD telemetry, and weatherproof physical badging.",
    impact:
      "Deployed live across 40 alpine stations globally and adopted as the visual standard for extreme weather expedition gear.",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
    ],
    nextSlug: "sat-cybernetic-hud",
    nextTitle: "SAT CYBERNETIC SYSTEM HUD",
  },
  "sat-cybernetic-hud": {
    slug: "sat-cybernetic-hud",
    title: "SAT CYBERNETIC SYSTEM HUD",
    category: "Autonomous WebGL Interface",
    subtitle: "Autonomous telemetry dashboard and kinetic real-time data visualization engine.",
    client: "SAT ROBOTICS INC",
    year: "2026",
    services: ["WebGL Engine", "Real-Time Telemetry", "HUD Interface Design", "Design Tokens"],
    liveUrl: "https://satrobotics.ai",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80",
    challenge:
      "SAT required a unified dashboard interface that could render over 50,000 live robotic sensor telemetry data points at 60 FPS without UI latency.",
    solution:
      "We developed a custom GPU-accelerated WebGL shader engine with brutalist typography and dark mode high-contrast telemetry indicators.",
    impact:
      "Reduced operator decision latency by 40% and established a new benchmark for autonomous hardware interface design.",
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1400&q=80",
    ],
    nextSlug: "lumino-3d-kinetic",
    nextTitle: "LUMINO 3D KINETIC REALM",
  },
  "lumino-3d-kinetic": {
    slug: "lumino-3d-kinetic",
    title: "LUMINO 3D KINETIC REALM",
    category: "Motion Shaders & WebGL",
    subtitle: "Fluid 3D kinetic web application built with WebGL shaders and real-time physics.",
    client: "LUMINO STUDIO LONDON",
    year: "2026",
    services: ["3D WebGL Shaders", "Kinetic Typography", "Spatial Web App", "Sound Architecture"],
    liveUrl: "https://luminostudio.com",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=80",
    challenge:
      "LUMINO wanted an interactive web experience that wowed visitors at first glance, blending fluid 3D spatial geometry with brutalist editorial layouts.",
    solution:
      "We created custom fragment shaders and dynamic cursor tracking physics, delivering an immersive 3D realm that loads in under 1 second.",
    impact:
      "Winner of Awwwards Site of the Month and over 1,500,000 unique interactive visitors in the first 30 days.",
    gallery: [
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1400&q=80",
    ],
    nextSlug: "brutalist-spatial-pavilion",
    nextTitle: "BRUTALIST SPATIAL PAVILION",
  },
  "brutalist-spatial-pavilion": {
    slug: "brutalist-spatial-pavilion",
    title: "BRUTALIST SPATIAL PAVILION",
    category: "Architecture & Acoustics",
    subtitle: "Monolithic physical architecture and sonic acoustic spatial identity.",
    client: "AURA ARCHITECTURE ZURICH",
    year: "2026",
    services: ["Spatial Pavilion Design", "Acoustic Engineering", "Environmental Signage", "Brand System"],
    liveUrl: "https://aurapavilion.ch",
    heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=80",
    challenge:
      "AURA needed an architectural pavilion identity that harmonized raw concrete physical structures with digital acoustic telemetry.",
    solution:
      "We engineered raw concrete signage engraved with strict grid typography paired with a web audio acoustic visualizer.",
    impact:
      "Exhibited at Venice Biennale 2026 and awarded International Architectural Identity of the Year.",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    ],
    nextSlug: "vortex-matte-titanium",
    nextTitle: "VORTEX MATTE TITANIUM MODULE",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = PROJECTS_DATA[resolvedParams.slug] || PROJECTS_DATA["vortex-matte-titanium"];

  return {
    title: `${project.title} — Case Study | LOOMIE Studio`,
    description: project.subtitle,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = PROJECTS_DATA[resolvedParams.slug] || PROJECTS_DATA["vortex-matte-titanium"];

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Preloader variant="brief" pageTitle={project.title} />
      <Navbar />
      <CaseStudyClient project={project} />
      <Footer />
    </main>
  );
}
