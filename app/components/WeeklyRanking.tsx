"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaxWidthWrapper from "./MaxWidthWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Authentic Naruto Kunai Arrow SVG
const KunaiArrow = ({ className = "" }: { className?: string }) => (
  <svg
    width="26"
    height="7"
    viewBox="0 0 26 7"
    className={`fill-current text-white flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1.5 ${className}`}
  >
    <path d="M16.172,7,26,3.412,16.213,0l-4,2.66H5.692A2.913,2.913,0,0,0,2.912.527,2.942,2.942,0,0,0,0,3.5,2.942,2.942,0,0,0,2.912,6.473,2.913,2.913,0,0,0,5.692,4.34h6.431ZM2.912,4.792a1.293,1.293,0,0,1,0-2.584,1.293,1.293,0,0,1,0,2.584" />
  </svg>
);

const rankingData = {
  rank1: {
    id: "01_2669",
    title: 'The 14th "Shinobi Striker" Developer Letter Is Here! "Shinobi Striker" Has Reached Its 8th Anniversary!!',
    category: "GAMES",
    date: "08/26/2026",
    img: "/ranking_news1.jpeg",
    badge: "/ranking_1.svg",
    link: "#",
  },
  rank2: {
    id: "01_2672",
    title: "NARUTO NINJA CARDS The Official NARUTO Digital Cards App Launches Worldwide!",
    category: "GAMES",
    date: "08/21/2026",
    img: "/ranking_news2.jpeg",
    badge: "/ranking_2.svg",
    link: "#",
  },
  rank3: {
    id: "01_2671",
    title: 'Naruto Uzumaki (Sage Mode) Joins the Battle in the 49th DLC for "NARUTO TO BORUTO: Shinobi Striker"!!',
    category: "GAMES",
    date: "08/28/2026",
    img: "/ranking_news3.jpeg",
    badge: "/ranking_3.svg",
    link: "#",
  },
  rank4: {
    id: "01_2673",
    title: "[BANPRESTO] Three Types of Crane Game Prize Figures Are Rolling Out Sequentially in September!",
    category: "MERCH",
    date: "08/25/2026",
    img: "/ranking_news4.jpeg",
    badge: "/ranking_4.svg",
    link: "#",
  },
  rank5: {
    id: "01_2637",
    title:
      "The Highly-Anticipated Naruto Trading Card Game Launch! Plus, a Special Illustration and Comment from Masashi Kishimoto!",
    category: "TCG",
    date: "06/18/2026",
    img: "/ranking_news5.jpeg",
    badge: "/ranking_5.svg",
    link: "#",
  },
};

const WeeklyRanking = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rank1Ref = useRef<HTMLAnchorElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: -25,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Rank 1 Featured card reveal
      if (rank1Ref.current) {
        gsap.from(rank1Ref.current, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rank1Ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Rank 2 & 3 reveal
      if (topRowRef.current) {
        gsap.from(topRowRef.current.children, {
          y: 25,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: topRowRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Rank 4 & 5 reveal
      if (bottomRowsRef.current) {
        gsap.from(bottomRowsRef.current.children, {
          x: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomRowsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { rank1, rank2, rank3, rank4, rank5 } = rankingData;

  return (
    <section
      ref={sectionRef}
      id="ranking"
      className="relative w-full bg-black border-t-[1.5px] border-b-[1.5px] border-white py-14 sm:py-18 md:py-20 overflow-visible z-40 text-white"
    >
      {/* Frog Ornament (Gama) on TOP - resting on the top white line, z-50 unclipped */}
      <div className="absolute -top-[53px] sm:-top-[46px] md:-top-[6rem] right-3 sm:right-10 md:right-28 z-50 pointer-events-none select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ornament4.webp"
          alt="frog ornament"
          className="w-24 md:w-44 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* Left Scroll Spindle (Clearly divided from black bg with top & bottom protruding knobs) */}
      <div className="absolute lg:block hidden left-1 sm:left-1.5 md:left-2 -top-3.5 sm:-top-4 -bottom-3.5 sm:-bottom-4 w-3.5 sm:w-4 md:w-6 z-30 pointer-events-none flex flex-col items-center">
        {/* Top Knob: Black oval with white outline ring protruding above top white line */}
        <div className="w-full aspect-[2/1] rounded-full border-[1.5px] border-white bg-black flex-shrink-0 flex items-center justify-center shadow-lg">
          <div className="w-[60%] h-[55%] rounded-full border border-white/70 bg-black" />
        </div>

        {/* Vertical Spindle Rod with white border dividing it from the black section */}
        <div className="w-[75%] flex-1 bg-black border-l-[1.5px] border-r-[1.5px] border-white relative overflow-hidden">
          {/* Inner highlight line for realistic 3D scroll rod */}
          <div className="absolute inset-y-0 left-[2px] w-[1px] bg-white/40" />
          <picture className="w-full h-full block">
            <source media="(max-width: 767px)" srcSet="/ranking_scroll_sp.webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ranking_scroll.webp"
              alt="scroll rod texture"
              className="w-full h-full object-fill opacity-95 pointer-events-none"
            />
          </picture>
        </div>

        {/* Bottom Knob: Black oval with white outline ring protruding below bottom white line */}
        <div className="w-full aspect-[2/1] rounded-full border-[1.5px] border-white bg-black flex-shrink-0 flex items-center justify-center shadow-lg">
          <div className="w-[60%] h-[55%] rounded-full border border-white/70 bg-black" />
        </div>
      </div>

      <MaxWidthWrapper className="relative z-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Section Header with Japanese Subtitle matching official screenshot */}
        <div className="w-full flex items-baseline justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-14">
          <h2
            ref={titleRef}
            className="font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-white select-none text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            WEEKLY RANKING
          </h2>
          <span className="hidden sm:inline-block font-sans font-bold text-xs sm:text-sm md:text-base text-white/90 tracking-wider pb-1 sm:pb-2">
            今週の人気記事ランキング
          </span>
        </div>

        {/* Responsive Layout Grid matching the official design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start w-full">
          {/* LEFT COLUMN: Rank 1 Featured Card (5 cols on lg) */}
          <div className="lg:col-span-5 w-full">
            <a
              ref={rank1Ref}
              href={rank1.link}
              className="group block relative bg-black/40 rounded-sm overflow-visible transition-transform duration-200"
            >
              {/* Badge 1 (Overlapping top-left) */}
              <div className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 z-30 w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={rank1.badge} alt="first place" className="w-full h-full object-contain" />
              </div>

              {/* Featured Thumbnail */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900 border border-white/10 shadow-lg">
                <Image
                  src={rank1.img}
                  alt={rank1.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
              </div>

              {/* Title & Kunai */}
              <div className="mt-4 flex items-start justify-between gap-3">
                <p className="font-sans font-bold text-base sm:text-lg md:text-xl text-white leading-snug group-hover:text-main transition-colors duration-200">
                  {rank1.title}
                </p>
                <div className="pt-1.5">
                  <KunaiArrow />
                </div>
              </div>

              {/* Category & Date */}
              <div className="mt-4 pt-1 flex items-center justify-between border-t border-white/10">
                <span className="inline-block border border-white/60 rounded-full px-3 py-0.5 text-xs text-white uppercase font-sans font-bold tracking-wider">
                  {rank1.category}
                </span>
                <span className="text-xs sm:text-sm text-neutral-400 font-sans font-medium tracking-wide">
                  {rank1.date}
                </span>
              </div>
            </a>
          </div>

          {/* RIGHT COLUMN: Rank 2, 3 (Top Row) and Rank 4, 5 (Bottom Rows) (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 w-full">
            {/* Top Sub-Row: Rank 2 and Rank 3 */}
            <div ref={topRowRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-6 w-full">
              {/* Rank 2 Card */}
              <a href={rank2.link} className="group block relative bg-black/40 rounded-sm overflow-visible">
                {/* Badge 2 */}
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-30 w-10 h-10 sm:w-13 sm:h-13 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={rank2.badge} alt="second place" className="w-full h-full object-contain" />
                </div>

                {/* Thumbnail */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900 border border-white/10 shadow-md">
                  <Image
                    src={rank2.img}
                    alt={rank2.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 30vw"
                  />
                </div>

                {/* Title & Kunai */}
                <div className="mt-3 flex items-start justify-between gap-2">
                  <p className="font-sans font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug group-hover:text-main transition-colors duration-200">
                    {rank2.title}
                  </p>
                  <div className="pt-1">
                    <KunaiArrow className="w-4 h-auto" />
                  </div>
                </div>

                {/* Meta Row */}
                <div className="mt-3 pt-1 flex items-center justify-between border-t border-white/10">
                  <span className="inline-block border border-white/60 rounded-full px-2.5 py-0.5 text-[11px] text-white uppercase font-sans font-bold tracking-wider">
                    {rank2.category}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-sans font-medium tracking-wide">{rank2.date}</span>
                </div>
              </a>

              {/* Rank 3 Card */}
              <a href={rank3.link} className="group block relative bg-black/40 rounded-sm overflow-visible">
                {/* Badge 3 */}
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-30 w-10 h-10 sm:w-13 sm:h-13 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={rank3.badge} alt="third place" className="w-full h-full object-contain" />
                </div>

                {/* Thumbnail */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900 border border-white/10 shadow-md">
                  <Image
                    src={rank3.img}
                    alt={rank3.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 30vw"
                  />
                </div>

                {/* Title & Kunai */}
                <div className="mt-3 flex items-start justify-between gap-2">
                  <p className="font-sans font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug group-hover:text-main transition-colors duration-200">
                    {rank3.title}
                  </p>
                  <div className="pt-1">
                    <KunaiArrow className="w-4 h-auto" />
                  </div>
                </div>

                {/* Meta Row */}
                <div className="mt-3 pt-1 flex items-center justify-between border-t border-white/10">
                  <span className="inline-block border border-white/60 rounded-full px-2.5 py-0.5 text-[11px] text-white uppercase font-sans font-bold tracking-wider">
                    {rank3.category}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-sans font-medium tracking-wide">{rank3.date}</span>
                </div>
              </a>
            </div>

            {/* Bottom Sub-Rows: Rank 4 and Rank 5 (Horizontal Compact Cards) */}
            <div ref={bottomRowsRef} className="flex flex-col gap-4 sm:gap-5 w-full pt-1 border-t border-white/15">
              {/* Rank 4 Card */}
              <a
                href={rank4.link}
                className="group flex items-center gap-3 sm:gap-4 relative bg-black/40 rounded-sm transition-colors duration-200"
              >
                {/* Badge 4 */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 drop-shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={rank4.badge} alt="fourth place" className="w-full h-full object-contain" />
                </div>

                {/* Thumbnail */}
                <div className="relative w-24 sm:w-32 md:w-36 aspect-[16/10] flex-shrink-0 overflow-hidden bg-neutral-900 border border-white/10 shadow-sm">
                  <Image
                    src={rank4.img}
                    alt={rank4.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="150px"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-sans font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug group-hover:text-main transition-colors duration-200">
                      {rank4.title}
                    </p>
                    <KunaiArrow className="w-4 h-auto pt-1" />
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10">
                    <span className="inline-block border border-white/60 rounded-full px-2 py-0.5 text-[10px] text-white uppercase font-sans font-bold tracking-wider">
                      {rank4.category}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400 font-sans font-medium tracking-wide">
                      {rank4.date}
                    </span>
                  </div>
                </div>
              </a>

              {/* Rank 5 Card */}
              <a
                href={rank5.link}
                className="group flex items-center gap-3 sm:gap-4 relative bg-black/40 rounded-sm transition-colors duration-200"
              >
                {/* Badge 5 */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 drop-shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={rank5.badge} alt="fifth place" className="w-full h-full object-contain" />
                </div>

                {/* Thumbnail */}
                <div className="relative w-24 sm:w-32 md:w-36 aspect-[16/10] flex-shrink-0 overflow-hidden bg-neutral-900 border border-white/10 shadow-sm">
                  <Image
                    src={rank5.img}
                    alt={rank5.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="150px"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-sans font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug group-hover:text-main transition-colors duration-200">
                      {rank5.title}
                    </p>
                    <KunaiArrow className="w-4 h-auto pt-1" />
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10">
                    <span className="inline-block border border-white/60 rounded-full px-2 py-0.5 text-[10px] text-white uppercase font-sans font-bold tracking-wider">
                      {rank5.category}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400 font-sans font-medium tracking-wide">
                      {rank5.date}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default WeeklyRanking;
