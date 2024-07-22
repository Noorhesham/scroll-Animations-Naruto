"use client";
import Image from "next/image";
import { useContext, useRef } from "react";
import StroySection from "./components/StroySection";
import Hero from "./components/Hero";
import Comics from "./components/Comics";
import { useScroll } from "./context/ScrollProvider";
import Anime from "./components/Anime";
import Collection from "./components/Collection";

export default function Home() {
  const { logo, N } = useScroll();
  const scrollEnd = useRef(null);

  return (
    <>
      <section className="relative bg-main min-h-screen overflow-hidden">
        <div id="N" ref={N} className="w-64 z-50 fixed top-0 opacity-0 h-full">
          <Image src="/letter_n.webp" fill alt="naruto" className="object-contain" />
        </div>
        <div ref={logo} className="fixed top-0 left-10 w-96 h-96 z-[99]">
          <Image className="object-contain scale-100" fill src="/logo.webp" alt="logo" />
        </div>
        <Hero refScroll={scrollEnd} />
        <StroySection />
        <Comics />
        <Anime />
        <Collection />
      </section>
    </>
  );
}
