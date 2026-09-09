import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { CaseStudyClient } from "@/components/CaseStudyClient";
import { Metadata } from "next";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface ProjectDetail {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  client: string;
  year: string;
  services: string[];
  liveUrl?: string;
  heroImage: string;
  challenge: string;
  solution: string;
  impact: string;
  gallery: string[];
  nextSlug: string;
  nextTitle: string;
  nextHeroImage?: string;
  nextCategory?: string;
}

const PROJECTS_DATA: Record<string, ProjectDetail> = {
  "crunchy-brand": {
    slug: "crunchy-brand",
    title: "CRUNCHY",
    category: "Food & Beverage Packaging",
    subtitle: "High-contrast tactile snack packaging, brand design tokens, and interactive digital storefront.",
    client: "CRUNCHY FOODS LTD",
    year: "2026",
    services: ["Packaging Design", "Brand Identity", "Design Tokens", "Art Direction"],
    heroImage: getCloudinaryUrl("crunchy-1.jpg"),
    challenge:
      "Crunchy required a bold, modern snack food identity that commands instant attention across retail shelves and digital app stores.",
    solution:
      "LOOMIE crafted custom 3D packaging renders, tactile label finishes, and an interactive digital store that boosted customer engagement.",
    impact:
      "+340% sales growth in retail stores, expanded across 240+ physical retail locations globally.",
    gallery: [
      getCloudinaryUrl("crunchy-1.jpg"),
      getCloudinaryUrl("crunchy-2.jpg"),
      getCloudinaryUrl("crunchy-3.jpg"),
      getCloudinaryUrl("crunchy-4.jpg"),
      getCloudinaryUrl("crunchy-5.jpg"),
      getCloudinaryUrl("crunchy-6.jpg"),
      getCloudinaryUrl("crunchy-7.jpg"),
      getCloudinaryUrl("crunchy-8.jpg"),
      getCloudinaryUrl("crunchy-9.jpg"),
      getCloudinaryUrl("crunchy-10.jpg"),
      getCloudinaryUrl("crunchy-11.jpg"),
      getCloudinaryUrl("crunchy-12.jpg"),
      getCloudinaryUrl("crunchy-13.jpg"),
      getCloudinaryUrl("crunchy-14.jpg"),
      getCloudinaryUrl("crunchy-15.jpg"),
      getCloudinaryUrl("crunchy-16.jpg"),
      getCloudinaryUrl("crunchy-17.jpg"),
      getCloudinaryUrl("crunchy-18.jpg"),
      getCloudinaryUrl("crunchy-19.jpg"),
      getCloudinaryUrl("crunchy-20.jpg"),
    ],
    nextSlug: "banana-health",
    nextTitle: "BANANA HEALTH",
    nextHeroImage: getCloudinaryUrl("/images/services/service-color.jpg"),
    nextCategory: "Logo & Branding",
  },
  "banana-health": {
    slug: "banana-health",
    title: "BANANA HEALTH",
    category: "Logo & Branding",
    subtitle: "Modern wellness identity, iconic symbolic mark, and design tokens for telehealth platform.",
    client: "BANANA HEALTH LABS",
    year: "2026",
    services: ["Logo Design", "Visual Identity", "Color Tokens", "Brand Charter"],
    heroImage: getCloudinaryUrl("service-color.jpg"),
    challenge:
      "Banana Health needed an approachable yet trustworthy visual identity for its telehealth application.",
    solution:
      "We created a warm, cheerful color palette, custom type tokens, and a versatile symbolic logo mark.",
    impact:
      "+210% user app adoption, 98.4% customer satisfaction across mobile and desktop platforms.",
    gallery: [
      getCloudinaryUrl("service-color.jpg"),
      getCloudinaryUrl("service-sketch.jpg"),
      getCloudinaryUrl("service-uiux.jpg"),
      getCloudinaryUrl("service-desktop.jpg"),
    ],
    nextSlug: "apple-drink",
    nextTitle: "APPLE DRINK",
    nextHeroImage: "/Apple Drink/Gemini_Generated_Image_bzwot3bzwot3bzwo.jpg",
    nextCategory: "Motion & Visual Identity",
  },
  "apple-drink": {
    slug: "apple-drink",
    title: "APPLE DRINK",
    category: "Motion & Visual Identity",
    subtitle: "Refreshing Apple Drink visual identity, 3D kinetic motion animation, dynamic packaging, and digital campaign.",
    client: "APPLE DRINK CO.",
    year: "2026",
    services: ["Visual Identity", "3D Motion Video", "Packaging Design", "Art Direction"],
    heroImage: "/Apple Drink/Gemini_Generated_Image_bzwot3bzwot3bzwo.jpg",
    challenge:
      "Apple Drink required an iconic visual identity and 3D video animation for their global beverage product launch.",
    solution:
      "LOOMIE engineered fluid 3D motion graphics, vibrant tactile packaging renders, and high-impact digital campaign assets.",
    impact:
      "14.2 Million video impressions and +280% brand engagement across global markets.",
    gallery: [
      "/Apple Drink/Gemini_Generated_Image_bzwot3bzwot3bzwo.jpg",
      "/Apple Drink/Gemini_Generated_Image_bzwot3bzwot3bzwo (1).jpg",
      "/Apple Drink/Gemini_Generated_Image_j3134uj3134uj313.png",
      "/Apple Drink/Gemini_Generated_Image_j90zq6j90zq6j90z.jpg",
      "/Apple Drink/next_create_a_mini_video_anima (1).mp4",
      "/Apple Drink/Gemini_Generated_Image_yfv018yfv018yfv0.jpg",
      "/Apple Drink/Gemini_Generated_Image_yfv018yfv018yfv0 (1).jpg",
      "/Apple Drink/sardar-faizan-AGdr5D8qDzA-unsplash.jpg",
    ],
    nextSlug: "ping",
    nextTitle: "PING",
    nextHeroImage: "/Ping/Screenshot (949).png",
    nextCategory: "UI/UX & App Architecture",
  },
  ping: {
    slug: "ping",
    title: "PING",
    category: "UI/UX & App Architecture",
    subtitle: "Modern social messaging app interface, real-time activity streams, clean dark mode typography, and sleek design system.",
    client: "PING TECHNOLOGIES",
    year: "2026",
    services: ["Mobile UI/UX", "App Architecture", "Design System", "Interaction Design"],
    liveUrl: "https://ping-tx5v.vercel.app/",
    heroImage: "/Ping/Screenshot (949).png",
    challenge:
      "Ping needed an ultra-responsive social interaction platform designed with elegant dark mode aesthetics and real-time connectivity.",
    solution:
      "LOOMIE created high-fidelity UI components, custom dark theme design tokens, and fluid user journey maps.",
    impact:
      "Engineered for over 1M+ daily active interactions with a 99.8% visual satisfaction rate.",
    gallery: [
      "/Ping/Screenshot (949).png",
      "/Ping/Screenshot (950).png",
      "/Ping/Screenshot (951).png",
      "/Ping/Screenshot (952).png",
      "/Ping/Screenshot (953).png",
      "/Ping/Screenshot (954).png",
      "/Ping/Screenshot (955).png",
      "/Ping/Screenshot (956).png",
      "/Ping/Screenshot (957).png",
      "/Ping/Screenshot (958).png",
      "/Ping/Screenshot (959).png",
      "/Ping/Screenshot (960).png",
      "/Ping/Screenshot (961).png",
      "/Ping/Screenshot (962).png",
      "/Ping/Screenshot (963).png",
      "/Ping/Screenshot (964).png",
    ],
    nextSlug: "luxury-hotel",
    nextTitle: "VINE LUXURY HOTEL",
    nextHeroImage: "/luxury-hotel/Screenshot (965).png",
    nextCategory: "Hospitality & Architectural Design",
  },
  "luxury-hotel": {
    slug: "luxury-hotel",
    title: "VINE LUXURY HOTEL",
    category: "Hospitality & Architectural Design",
    subtitle: "Ultra-luxury boutique hotel visual identity, immersive spatial web experience, and architectural design system.",
    client: "VINE HOSPITALITY GROUP",
    year: "2026",
    services: ["Visual Identity", "Architectural UX", "Spatial Web", "Brand Strategy"],
    liveUrl: "https://vine-phi.vercel.app/",
    heroImage: "/luxury-hotel/Screenshot (965).png",
    challenge:
      "VINE required an ultra-luxury hospitality brand identity and interactive web experience designed for high-net-worth global travelers.",
    solution:
      "LOOMIE engineered immersive spatial web aesthetics, custom typography tokens, and high-conversion reservation journeys.",
    impact:
      "+310% direct booking conversion rate and 85,000+ global guest experiences delivered.",
    gallery: [
      "/luxury-hotel/Screenshot (965).png",
      "/luxury-hotel/Screenshot (966).png",
      "/luxury-hotel/Screenshot (967).png",
      "/luxury-hotel/Screenshot (968).png",
      "/luxury-hotel/Screenshot (969).png",
      "/luxury-hotel/Screenshot (970).png",
      "/luxury-hotel/Screenshot (971).png",
      "/luxury-hotel/Screenshot (972).png",
      "/luxury-hotel/Screenshot (973).png",
      "/luxury-hotel/Screenshot (974).png",
      "/luxury-hotel/Screenshot (975).png",
      "/luxury-hotel/Screenshot (976).png",
      "/luxury-hotel/Screenshot (977).png",
      "/luxury-hotel/Screenshot (978).png",
      "/luxury-hotel/Screenshot (979).png",
      "/luxury-hotel/Screenshot (980).png",
    ],
    nextSlug: "crunchy-brand",
    nextTitle: "CRUNCHY",
    nextHeroImage: getCloudinaryUrl("crunchy-1.jpg"),
    nextCategory: "Food & Beverage Packaging",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = PROJECTS_DATA[resolvedParams.slug] || PROJECTS_DATA["crunchy-brand"];

  return {
    title: `${project.title} — Case Study | LOOMIE`,
    description: project.subtitle,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = PROJECTS_DATA[resolvedParams.slug] || PROJECTS_DATA["crunchy-brand"];

  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      <Navbar />
      <CaseStudyClient project={project} />
      <Footer />
    </main>
  );
}
