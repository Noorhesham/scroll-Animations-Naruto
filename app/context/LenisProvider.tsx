"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger once at app root so it's available before any
// component-level useGSAP calls, and configure mobile resize suppression
// to prevent iOS Safari URL-bar show/hide from causing ScrollTrigger jank.
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

// ─── Why we use pointer media query instead of window.innerWidth ──────────────
//
//  OLD: window.innerWidth < 768
//  Problem: A 768px iPad in landscape would lose smooth scroll. A 1200px
//  touchscreen TV would get smooth scroll despite being touch-only.
//
//  NEW: (hover: hover) and (pointer: fine) — matches desktops/laptops that have
//  a precise pointing device (mouse/trackpad). Touch-only devices don't match.
//
// ─────────────────────────────────────────────────────────────────────────────

const DESKTOP_MQ = "(hover: hover) and (pointer: fine)";

function LenisScrollTriggerSync() {
  const lenis = useLenis();

  useLenis(() => {
    ScrollTrigger.update();
  });

  // Drive Lenis from GSAP's ticker instead of its own requestAnimationFrame.
  // Two independent rAF loops let scroll position and ScrollTrigger-driven
  // transforms resolve on different sub-frames, which reads as tearing/jitter
  // on pinned sections. One loop guarantees Lenis always updates first.
  useEffect(() => {
    if (!lenis) return;

    const raf = (time: number) => lenis.raf(time * 1000);
    let tickerAttached = true;

    const attachTicker = () => {
      if (tickerAttached) return;
      gsap.ticker.add(raf);
      tickerAttached = true;
    };

    const detachTicker = () => {
      if (!tickerAttached) return;
      gsap.ticker.remove(raf);
      tickerAttached = false;
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onVisibility = () => {
      if (document.hidden) {
        detachTicker();
        lenis.stop();
      } else {
        lenis.start();
        attachTicker();
        ScrollTrigger.refresh();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(id);
      detachTicker();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [lenis]);

  return null;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  // Lazy initialiser: only runs on client, returns false on SSR
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(DESKTOP_MQ).matches;
  });

  const mqlRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_MQ);
    mqlRef.current = mql;

    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handleChange);

    return () => mql.removeEventListener("change", handleChange);
  }, []);

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
        autoRaf: false,
        prevent: (node) => Boolean(node instanceof Element && node.closest("[data-lenis-prevent]")),
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
