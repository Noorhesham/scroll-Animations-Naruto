"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionDividerProps {
  /** CSS class for the background image: "kakashi", "kakashi2", "kakashi3", "jiraya", "rocklee" */
  bgClassName?: string;
  /** Direct image source path if not using CSS class */
  imgSrc?: string;
  /** Optional custom height */
  height?: string | number;
  /** Initial clip-path for GSAP reveal. Defaults to horizontal center slit */
  initialClip?: string;
  /** Target clip-path to animate to on scroll. Defaults to full rectangle */
  animateTo?: string;
  /** ScrollTrigger start point */
  scrollStart?: string;
  /** ScrollTrigger end point */
  scrollEnd?: string;
  /** Additional container styling */
  style?: React.CSSProperties;
  /** Additional container classes */
  className?: string;
  id?: string;
  zIndex?: number;
}

/**
 * SectionDivider:
 * - Animates the entire black section with a horizontal slit clip-path reveal.
 * - Sits ON TOP of the pre-calculated space at the bottom of the main section.
 * - Transparent outer container preserves the underlying section background until revealed.
 */
const SectionDivider: React.FC<SectionDividerProps> = ({
  bgClassName,
  imgSrc,
  height,
  initialClip = "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
  animateTo = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  scrollStart = "top 80%",
  scrollEnd = "center 45%",
  style,
  className = "",
  id,
  zIndex = 70,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const blackPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blackPanelRef.current || !sectionRef.current) return;
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const targetEl = blackPanelRef.current;
    const triggerEl = sectionRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile: starts at top 65% so it doesn't trigger early over previous content
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          targetEl,
          {
            clipPath: initialClip,
            webkitClipPath: initialClip,
          },
          {
            clipPath: animateTo,
            webkitClipPath: animateTo,
            ease: "none",
            scrollTrigger: {
              trigger: triggerEl,
              start: "top 65%",
              end: "bottom 55%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      // Desktop: uses exact original scrollStart & scrollEnd
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          targetEl,
          {
            clipPath: initialClip,
            webkitClipPath: initialClip,
          },
          {
            clipPath: animateTo,
            webkitClipPath: animateTo,
            ease: "none",
            scrollTrigger: {
              trigger: triggerEl,
              start: scrollStart,
              end: scrollEnd,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [initialClip, animateTo, scrollStart, scrollEnd]);

  // Responsive height & margin:
  // Mobile: 195px-240px solid black intermission strip with zero negative margin (artwork & quotes clear and prominent)
  // Desktop: 560px height with -mt-[560px] to slice over preceding section's pre-calculated space
  const heightClass = height
    ? ""
    : "h-[195px] sm:h-[240px] md:h-[300px] lg:h-[560px] mt-0 lg:-mt-[560px]";

  const customStyle: React.CSSProperties = {
    zIndex,
    ...style,
    ...(height
      ? {
          height: typeof height === "number" ? `${height}px` : height,
          marginTop: typeof height === "number" ? `-${height}px` : `-${height}`,
        }
      : {}),
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full bg-black lg:bg-transparent overflow-hidden pointer-events-none 
        flex items-center justify-center ${heightClass} ${className}`}
      style={customStyle}
    >
      {/* The intermission artwork panel */}
      <div
        ref={blackPanelRef}
        className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden will-change-[transform,opacity,clip-path]"
      >
        <div
          className={`w-full h-full bg-center bg-no-repeat bg-contain md:bg-cover ${bgClassName || ""}`}
          style={{
            ...(imgSrc ? { backgroundImage: `url(${imgSrc})` } : {}),
          }}
        />
      </div>
    </section>
  );
};

export default SectionDivider;
