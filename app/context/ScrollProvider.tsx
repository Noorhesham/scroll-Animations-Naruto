"use client";

import React, { createContext, useRef, useState, useEffect, useContext, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LenisProvider from "./LenisProvider";

// ─── App-level context for the floating NARUTO letter + logo ─────────────────
interface ScrollContextType {
  logo: React.RefObject<any>;
  N: React.RefObject<any>;
  nSrc: string;
  changeNImageSrc: (newSrc: string) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  logo: { current: null },
  N: { current: null },
  nSrc: "/letter_n.webp",
  changeNImageSrc: () => {},
});

// ─── Inner provider: owns refs + animations, no extra DOM wrappers ───────────
function NarutoContextProvider({ children }: { children: React.ReactNode }) {
  const logo = useRef<any>(null);
  const N = useRef<any>(null);
  const [nSrc, setNSrc] = useState<string>("/letter_n.webp");

  // Logo shrink on scroll - Desktop only (>= 1024px)
  useEffect(() => {
    if (!logo.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.to(logo.current, {
        scale: 0.4,
        transformOrigin: "top left",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=1000px",
          scrub: true,
        },
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Stable callback — won't cause ScrollTrigger re-creation in child sections
  const changeNImageSrc = useCallback((newSrc: string) => {
    setNSrc(newSrc);
    if (N.current) {
      const imgs = N.current.querySelectorAll("img");
      imgs.forEach((img: HTMLImageElement) => {
        img.src = newSrc;
        if (img.srcset) img.srcset = newSrc;
      });
    }
  }, []);

  return (
    <ScrollContext.Provider value={{ logo, N, nSrc, changeNImageSrc }}>
      {children}
    </ScrollContext.Provider>
  );
}

// ─── Public export: LenisProvider (scroll engine) + NarutoContext (app state) ─
export const ScrollProvider = ({ children }: { children: React.ReactNode }) => (
  <LenisProvider>
    <NarutoContextProvider>{children}</NarutoContextProvider>
  </LenisProvider>
);

export const useScroll = () => useContext(ScrollContext);
export default ScrollProvider;
