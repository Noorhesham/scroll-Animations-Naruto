"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StroySection from "./components/StroySection";
import Hero from "./components/Hero";
import Comics from "./components/Comics";
import { useScroll } from "./context/ScrollProvider";
import Anime from "./components/Anime";
import Collection from "./components/Collection";
import Social from "./components/Social";
import Last from "./components/Last";
import SectionDivider from "./components/SectionDivider";

import WeeklyRanking from "./components/WeeklyRanking";
import EventsSection from "./components/EventsSection";

export default function Home() {
  const { logo, N, nSrc } = useScroll();
  const scrollEnd = useRef(null);
  const [isSagaActive, setIsSagaActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: "#story",
      start: "top 120px",
      onEnter: () => setIsSagaActive(true),
      onLeaveBack: () => setIsSagaActive(false),
    });

    return () => {
      st.kill();
    };
  }, []);

  const chapterTitles: Record<string, string> = {
    N: "Story of Naruto",
    A: "Original Manga",
    R: "Animation Saga",
    U: "Games & Merch",
    T: "Official SNS",
    O: "The Final Chapter",
  };

  // Derive current chapter letter for mobile saga tracker
  const getCurrentLetter = (src: string) => {
    if (src.includes("letter_n")) return "N";
    if (src.includes("A.webp")) return "A";
    if (src.includes("letter_r")) return "R";
    if (src.includes("letter_u")) return "U";
    if (src.includes("letter_t")) return "T";
    if (src.includes("letter_o")) return "O";
    return "N";
  };
  const currentLetter = getCurrentLetter(nSrc || "/letter_n.webp");

  return (
    <section id="top" className="relative bg-main min-h-screen overflow-hidden">
      <a className="z-[999] fixed right-10 bottom-10" href="#top">
        <Image
          alt="page_top_btn"
          src={"/page_top_btn_en.svg"}
          width={50}
          height={50}
          className="fixed bottom-1 right-2"
        />
      </a>

      {/* Mobile Full-Width Shinobi Saga Header Bar (Active after scrolling past Hero) */}
      <div
        className={`block lg:hidden fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 ease-out select-none ${
          isSagaActive
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full bg-black/95 backdrop-blur-md border-b-2 border-orange-500 shadow-[0_6px_25px_rgba(0,0,0,0.95)] px-3 sm:px-4 py-2">
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            {/* Left: Big Character Artwork Thumbnail + Chapter Details */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-14 sm:w-14 sm:h-16 rounded-md bg-neutral-950 border border-orange-500/60 overflow-hidden flex-shrink-0 shadow-[0_0_12px_rgba(249,115,22,0.4)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={nSrc || "/letter_n.webp"}
                  alt="active saga chapter"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[9px] font-extrabold tracking-widest text-orange-400 uppercase font-sans">
                    SAGA CHAPTER
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide truncate font-sans">
                  {chapterTitles[currentLetter] || "NARUTO CHRONICLES"}
                </span>
              </div>
            </div>

            {/* Right: The 6 Letters N - A - R - U - T - O Progress Track */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 bg-neutral-900/90 border border-white/10 rounded-lg p-1 sm:p-1.5">
              {(["N", "A", "R", "U", "T", "O"] as const).map((char, index) => {
                const isActive = currentLetter === char;
                const letterIndex = ["N", "A", "R", "U", "T", "O"].indexOf(currentLetter);
                const isPassed = index < letterIndex;

                return (
                  <div
                    key={char}
                    className={`flex items-center justify-center w-6 h-7 sm:w-7 sm:h-8 rounded text-xs font-black transition-all duration-300 ${
                      isActive
                        ? "bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.95)] scale-110 font-black"
                        : isPassed
                        ? "bg-orange-950/60 text-orange-400 border border-orange-500/30 font-bold"
                        : "bg-transparent text-white/30 font-semibold"
                    }`}
                  >
                    {char}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Original full-height vertical letter sidebar - 100% UNTOUCHED */}
      <div
        id="N"
        ref={N}
        className="hidden lg:block fixed top-0 right-[10px] h-full w-64 z-[9999] opacity-0 pointer-events-none select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={nSrc || "/letter_n.webp"} alt="naruto" className="object-contain w-full h-full" />
      </div>

      {/* Brand Logo: Hides on mobile when saga bar is active, stays 100% untouched on PC */}
      <div
        ref={logo}
        className={`fixed top-2 sm:top-3 lg:top-0 left-3 sm:left-6 lg:left-10 w-28 h-20 sm:w-40 sm:h-28 lg:w-96 lg:h-96 z-[99] pointer-events-none transition-all duration-300 ${
          isSagaActive ? "opacity-0 -translate-y-4 lg:opacity-100 lg:translate-y-0" : "opacity-100 translate-y-0"
        }`}
      >
        <Image className="object-contain scale-100" fill src="/logo.webp" alt="logo" priority />
      </div>

      <Hero refScroll={scrollEnd} />
      <WeeklyRanking />
      <StroySection />

      {/* Story → Comics: Kakashi Intermission */}
      <SectionDivider bgClassName="kakashi" id="divider-kakashi" />

      <Comics />

      {/* Comics → Anime: Kakashi 2 Intermission */}
      <SectionDivider bgClassName="kakashi2" id="divider-kakashi2" />

      <Anime />

      {/* Anime → Collection: Kakashi 3 Intermission */}
      <SectionDivider bgClassName="kakashi3" id="divider-kakashi3" />

      <Collection />

      {/* Official Naruto Events Showcase */}
      <EventsSection />

      {/* Events → Social: Jiraiya Intermission */}
      <SectionDivider bgClassName="jiraya" id="divider-jiraya" />

      <Social />

      {/* Social → Last: Rock Lee Intermission */}
      <SectionDivider bgClassName="rocklee" id="divider-rocklee" />

      <Last />

      <footer className="w-full bg-black text-white font-sans py-10 sm:py-12 md:py-14 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col gap-6 sm:gap-8">
          {/* Top: Shueisha & Bandai Namco Logos */}
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="relative h-8 sm:h-10 w-28 sm:w-36">
              <Image src="/shueisha_logo.svg" className="object-contain object-left" fill alt="SHUEISHA logo" />
            </div>
            <div className="relative h-8 sm:h-10 w-32 sm:w-44">
              <Image src="/bne_logo.svg" className="object-contain object-left" fill alt="BANDAI NAMCO logo" />
            </div>
          </div>

          {/* Bottom Row: Copyrights on Left, Links on Right */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-2">
            <div className="text-[10px] sm:text-[11px] leading-relaxed text-white/80 font-sans tracking-wide space-y-0.5">
              <p>©1999 by Masashi Kishimoto/ SHUEISHA Inc.</p>
              <p>©2016 by Masashi Kishimoto,Mikio Ikemoto/ SHUEISHA Inc.</p>
              <p>©2002 MASASHI KISHIMOTO</p>
              <p>©2002 MASASHI KISHIMOTO / 2007 SHIPPUDEN All Rights Reserved.</p>
              <p>©2002 MASASHI KISHIMOTO / 2017 BORUTO All Rights Reserved.</p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white font-sans font-medium whitespace-nowrap">
              <a href="#" className="hover:underline hover:text-white/80 transition-colors">
                Terms and Conditions
              </a>
              <span className="text-white/40">|</span>
              <a href="#" className="hover:underline hover:text-white/80 transition-colors">
                Privacy Policy
              </a>
              <span className="text-white/40">|</span>
              <a href="#" className="hover:underline hover:text-white/80 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
