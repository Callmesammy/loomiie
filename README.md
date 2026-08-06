# LOOMIE Studio — Clear. Connected. Complete.

> **LOOMIE** is a premium design & technology studio specializing in kinetic web development, brutalist spatial concepts, and digital branding.

---

## ✦ Brand Identity Specifications

* **Brand Motto**: `Clear. Connected. Complete.`
* **Color Palette**:
  * `BLACK`: `#000000` (Primary Dark Substrate)
  * `WHITE`: `#FFFFFF` (Primary High-Contrast Light)
* **Typeface**: `Montserrat` (Weights: `300 Light`, `500 Medium`, `700 Bold`, `900 Black`)
* **Logo Geometry**: The infinity-eyes mark is built on a strict grid: equal-radius pupils centered within a stadium pill container (`rect rx="17"` cutout).

---

## ✦ Key Pages & System Architecture

### 1. Landing Page (`/`)
* **Hero Section**: High-impact editorial typography, studio motto badge (`CLEAR. CONNECTED. COMPLETE.`), interactive Bento grid case studies, and live telemetry coordinates.
* **Marquee Ribbon**: Continuous kinetic typography marquee (`CLEAR. CONNECTED. COMPLETE.`).
* **Creative Archive Grid**: Dynamic pill filter bar (`ALL`, `ECOMMERCE`, `FOOD & BEVERAGE`, `ENTERTAINMENT`, `INDUSTRIAL`, `TECH`) with 2-column asymmetric cards.

### 2. Dedicated Case Study System (`/work/[slug]`)
* Inspired by high-end studio case study architecture (`dzinrstudio.com/work/hillfield`).
* **Client Metadata Grid**: Client, Year, Services, and Live URL.
* **4K Hero Showcase Frame**: High-resolution photographic previews.
* **Strategic Narrative Grid**: 3-column breakdown (`01 / THE CHALLENGE`, `02 / THE STRATEGY`, `03 / THE RESULTS`).
* **Visual Asset Gallery**: Multi-plate 4K asset gallery.
* **Next Project Navigation**: Interactive footer links to cycle through case studies.

### 3. Story Page (`/story`)
* Editorial story chronicle essay: *"Born from a blank screen and the drive to create."*
* 3 narrative phases (*The Spark*, *The Mission*, *The Process*) with quote callouts and curated high-resolution photography.

### 4. Core Values Page (`/values`)
* Editorial walkthrough of the 5 Core Pillars:
  1. `01 / CONNECTED DESIGN`: *"Logo to UI as one system."*
  2. `02 / PROVEN IN USE`: *"Tested live across platforms."*
  3. `03 / ALWAYS ITERATING`: *"Feedback-driven, trend-proof."*
  4. `04 / TOTAL CLARITY`: *"Communicates instantly, every scale."*
  5. `05 / STRATEGIC CRAFT`: *"Thinking first, polish always."*
* Compact 2-column split presentation with curatorial specification tags.

### 5. Identity Page (`/identity`)
* Interactive CAD Blueprint specification page featuring the official LOOMIE Logo Mark SVG with liquid real-time mouse cursor eye-tracking physics (`lerp: 0.12`).
* Copy-to-clipboard color swatches (`#000000` & `#FFFFFF`).
* Interactive Montserrat font specimen tester with real-time size slider.

### 6. Contact & Meeting Booking Page (`/contact`)
* Direct email card (`hello@loomie.design`) with one-click copy button.
* Interactive strategy meeting calendar booker (August 2026 date selection, time slot picker, timezone selector, and instant confirmation alert).
* Animated FAQ accordion system with expanding `+` / `-` toggle icons.

### 7. Who We Build For Page (`/who-we-build-for`)
* Interactive audience breakdown tailored for ambitious startups, builders, and enterprise leaders.

---

## ✦ Motion & Kinetic Engine

* **GSAP & ScrollTrigger**: Bidirectional animations (`toggleActions: "play reverse play reverse"`) active for both scrolling UP and DOWN.
* **Lenis Smooth Scroll**: GPU-accelerated smooth wheel physics (`LenisScrollProvider.tsx`).
* **Scroll-to-Top Integration**: Global `ScrollToTop.tsx` reset controller ensuring every page transition and case study link snaps immediately to position `0` (top of page).

---

## ✦ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack)
* **Language**: TypeScript
* **Styling**: Vanilla CSS, CSS Variables, TailwindCSS v4
* **Typography**: `Montserrat` & `Inter` via `next/font/google`
* **Icons**: [Lucide React](https://lucide.dev)

---

## ✦ Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

To create a production build:

```bash
npm run build
```

To start the production server:

<<<<<<< Updated upstream
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# loomie
=======
```bash
npm run start
```
>>>>>>> Stashed changes
