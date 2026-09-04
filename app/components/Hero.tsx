"use client";

import React from "react";
import SlidingImage from "./SlidingImage";
import Naruto from "./Naruto";
import SliderCards from "./SliderCards";
import Image from "next/image";
import AutoScroll from "./AutoScroll";

const Hero = ({ refScroll }: { refScroll?: React.RefObject<HTMLDivElement> }) => {
  return (
    <div className="relative w-full">
      {/* 
        Hero Visuals Layering (Exact order requested by user):
        1. Sky (background on container)
        2. Clouds (SlidingImage at z-10)
        3. Mountain (mountain.webp at z-20, covering cloud bottom edge)
        4. Naruto (standing on top of mountain at z-30)
      */}
      <div className="relative sky min-h-[640px] sm:min-h-[750px] md:min-h-[900px] lg:min-h-[850px] w-full overflow-hidden">
        {/* Clouds sliding on sky */}
        <div className="overflow-hidden absolute inset-0 w-full h-full z-10 pointer-events-none">
          <SlidingImage />
        </div>

        {/* Hokage Mountain */}
        <Image
          src="/mountain.webp"
          alt="Hokage Mountain"
          width={1920}
          height={1080}
          priority
          className="absolute parallax left-0 bottom-12 sm:bottom-16 md:bottom-20 h-full w-full z-20 object-cover pointer-events-none"
        />

        {/* Naruto Character Layer */}
        <Naruto />
      </div>

      {/* News Slider Section (Pure bg-main, no overlapping tint on cards) */}
      <div className="min-h-96 bg-main -mt-16 md:-mt-20 relative h-full z-30 pt-4">
        <div className="flex justify-start flex-col relative z-40">
          <SliderCards />
        </div>
      </div>

      {/* Second Slider: AutoScroll Banner Section */}
      <section className="py-14 md:py-20 bg-main relative w-full z-30 overflow-hidden">
        <AutoScroll />
      </section>
    </div>
  );
};

export default Hero;
