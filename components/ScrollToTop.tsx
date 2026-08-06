"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const forceScrollTop = () => {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    forceScrollTop();
    const t1 = setTimeout(forceScrollTop, 50);
    const t2 = setTimeout(forceScrollTop, 150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
