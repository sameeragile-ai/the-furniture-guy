import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenisScroll() {
  useEffect(() => {
    // Respect user motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    try {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      const animId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(animId);
        lenis.destroy();
      };
    } catch {
      // Graceful fallback to native browser scroll
    }
  }, []);
}
