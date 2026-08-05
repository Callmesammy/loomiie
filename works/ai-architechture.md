# AI & Technical Architecture Overview

## Structural Layers

1. **Global Smooth Scroll Layer:**
   - Wrapper: `Lenis` virtual scroll context.
   - Syncs requestAnimationFrame (RAF) loop directly with GSAP ScrollTrigger refresh cycles.

2. **Theme Management Layer:**
   - Context Provider: Theme state (`light` | `dark`).
   - Trigger: View Transitions API creating a expanding radial clip-path mask over the document root originating from the click pointer coordinates.

3. **Component Hierarchy:**
   - `AppLayout`: High-level wrapper containing smooth scroll root.
   - `Navbar`: Contains fixed SVG logo and dynamic theme toggle button.
   - `HeroSection`: Large kinetic display text and pin-scroll trigger.
   - `PortfolioGrid`: Staggered project cards with hover transitions and Unsplash image assets.
   - `Footer`: Continuous marquees and contact CTA.