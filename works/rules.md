# Coding Standards & Development Rules

1. **Animation Performance:**
   - Never animate layout properties like `height`, `width`, `top`, or `margin`.
   - Use `will-change: transform` judiciously on active animated elements only.

2. **Theme Switching:**
   - Do not re-render the entire DOM on theme change.
   - Use standard CSS variables for colors to allow zero-lag Theme API clipping transitions.

3. **Asset Handling:**
   - SVGs must be clean, inline or optimization-ready vector code.
   - Images must use `loading="lazy"` with explicit aspect ratio wrappers to prevent layout shifts.

4. **Scroll Hooks:**
   - Clean up all GSAP / ScrollTrigger instances in lifecycle unmounts (`useEffect` cleanups or `gsap.context()`).