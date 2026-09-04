"use client";

import { useEffect, useRef } from "react";

interface AutoPlaySliderOptions {
  interval?: number; // Time between auto-scroll steps (default 3200ms)
  resumeDelay?: number; // Delay after user touch/swipe before auto-play resumes (default 4000ms)
  enabled?: boolean;
}

/**
 * useAutoPlaySlider:
 * Smoothly auto-plays native horizontal touch sliders (overflow-x-auto snap-x) on mobile devices (< 1024px).
 * - Leaves desktop completely untouched (>= 1024px).
 * - Pauses on user touch/swipe and seamlessly resumes after resumeDelay.
 * - Loops seamlessly back to the first slide upon reaching the end.
 */
export function useAutoPlaySlider<T extends HTMLElement = HTMLDivElement>(
  options: AutoPlaySliderOptions = {}
) {
  const sliderRef = useRef<T>(null);
  const { interval = 3200, resumeDelay = 4000, enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;
    const container = sliderRef.current;
    if (!container) return;
    if (typeof window === "undefined") return;

    let timer: NodeJS.Timeout | null = null;
    let resumeTimeout: NodeJS.Timeout | null = null;
    let isInteracting = false;

    const getNextSlidePosition = () => {
      const children = Array.from(container.children) as HTMLElement[];
      if (children.length <= 1) return 0;

      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      // If at or near the end (within 35px), loop back to the beginning
      if (currentScroll >= maxScroll - 35) {
        return 0;
      }

      // Find next slide target position
      const baseOffset = children[0].offsetLeft;
      for (let i = 1; i < children.length; i++) {
        const target = children[i].offsetLeft - baseOffset;
        if (target > currentScroll + 25) {
          return target;
        }
      }

      return 0;
    };

    const runAutoPlay = () => {
      if (isInteracting) return;
      if (window.innerWidth >= 1024) return; // Mobile & tablet only

      const nextLeft = getNextSlidePosition();
      container.scrollTo({
        left: nextLeft,
        behavior: "smooth",
      });
    };

    const startTimer = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(runAutoPlay, interval);
    };

    const handleTouchStart = () => {
      isInteracting = true;
      if (resumeTimeout) clearTimeout(resumeTimeout);
    };

    const handleTouchEnd = () => {
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isInteracting = false;
      }, resumeDelay);
    };

    // Only start on mobile/tablet
    if (window.innerWidth < 1024) {
      startTimer();
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        if (timer) clearInterval(timer);
      } else {
        startTimer();
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (timer) clearInterval(timer);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, [interval, resumeDelay, enabled]);

  return sliderRef;
}

export default useAutoPlaySlider;
