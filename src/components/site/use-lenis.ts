import { useEffect } from "react";

type LenisInstance = import("lenis").default;

let activeLenis: LenisInstance | null = null;

const smoothEase = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/** Lenis smooth scrolling, wired to rAF and disabled for reduced-motion users. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lenis: LenisInstance | null = null;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({
        duration: 1.15,
        easing: smoothEase,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.1,
      });
      lenis = instance;
      activeLenis = instance;
      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (activeLenis === lenis) activeLenis = null;
      lenis?.destroy();
    };
  }, []);
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.scrollIntoView({ behavior: "auto", block: "start" });
    return;
  }

  if (activeLenis) {
    activeLenis.scrollTo(el, {
      duration: 1.15,
      easing: smoothEase,
      offset: -88,
    });
    return;
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
