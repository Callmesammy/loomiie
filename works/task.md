# Comprehensive Implementation Checklist

## Phase 1: Environment & Base Engine Setup
- [ ] Initialize Next.js TypeScript template with Tailwind CSS configured for arbitrary values and custom plugins.
- [ ] Configure global CSS variable theme token mapping in `globals.css` (Background, Surface, Text Primary, Text Secondary, Accent).
- [ ] Implement `LenisScrollProvider` wrapping the root layout, synchronized with GSAP's `ticker` loop.
- [ ] Mount day/night responsive `LOOMIE` SVG logo in a sticky, glassmorphism header navigation bar.

## Phase 2: High-End Motion & Scroll Engineering
- [ ] **Kinetic Typography:** Implement text splitting (`SplitType`) to animate main headlines character-by-character on scroll enter.
- [ ] **Horizontal Marquee:** Build an infinite, velocity-aware scrolling marquee section using Tailwind flex containers and GSAP scroll timelines.
- [ ] **Pinned Project Cards:** Create a full-height pinned section (`ScrollTrigger.create({ pin: true })`) where cards stack over each other with z-index elevation and scale-down effects.
- [ ] **Cursor & Hover Physics:** Build a custom floating cursor ball reacting to link/card hovers via spring dampening.

## Phase 3: Radial Theme Toggle Engine
- [ ] Build `ThemeToggle` component tracking click event coordinates `(clientX, clientY)`.
- [ ] Inject dynamic `@keyframes` clip-path expanding a radial mask from $0\%$ to $150\%$ across the viewport.
- [ ] Wire SVG path morphing for the theme button icon (Sun to Moon transition).

## Phase 4: Media & Image Grid Implementation
- [ ] Implement multi-column masonry/grid system with low-resolution image placeholders (Blur Data URLs).
- [ ] Add smooth scale-up visual effects on image wrappers (`hover:scale-105 transition-transform duration-700 ease-out`).