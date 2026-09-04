/**
 * Motion Tokens & Easing curves for the Naruto Experience
 * Inspired by Japanese cinematic action pacing and manga panel storytelling.
 */

export const MOTION = {
  duration: {
    instant: 0.15,
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    cinematic: 1.5,
    intermission: 1.8,
  },
  ease: {
    smooth: "power2.out",
    snappy: "power3.out",
    dramatic: "expo.out",
    cinematic: "power4.inOut",
    mangaCut: "power3.inOut",
    chakraPulse: "sine.inOut",
  },
  stagger: {
    tight: 0.08,
    standard: 0.15,
    dramatic: 0.25,
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
