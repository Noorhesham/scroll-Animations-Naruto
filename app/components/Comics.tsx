"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useState } from "react";
import { useScroll } from "../context/ScrollProvider";
import Image from "next/image";
import NarutoNinjaButton from "./NarutoNinjaButton";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Comics = () => {
  const { N, changeNImageSrc } = useScroll();
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#comics",
      start: "top center",
      end: "+=1000",
      onEnter: () => {
        changeNImageSrc("/A.webp");
        gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
      },
      onEnterBack: () => {
        changeNImageSrc("/A.webp");
        gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [changeNImageSrc, N]);

  return (
    <section id="comics" className="pt-8 sm:pt-14 lg:pt-36 pb-8 sm:pb-14 lg:pb-[580px] relative z-20 min-h-0 lg:min-h-[1050px] flex items-center overflow-hidden">
      {/* Manga Panel Background */}
      <figure className="comics absolute inset-0 z-0 pointer-events-none" />

      <MaxWidthWrapper className="relative z-20 w-full">
        {/* Comics Header Brush Banner */}
        <div className="w-full flex justify-start mb-8 md:mb-12">
          <Image
            width={480}
            height={120}
            className="w-72 sm:w-88 md:w-[420px] object-contain drop-shadow-md"
            alt="Comics Section Header"
            src="/top_comics.svg"
            priority
          />
        </div>

        {/* 2-Column Responsive Manga Showcase */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 w-full">
          {/* Left Column: Interactive Quiz & Comics Info */}
          <div className="flex flex-col items-center lg:items-start max-w-lg w-full z-20">
            {/* Interactive Circular Quiz Badge */}
            <div className="relative group flex flex-col items-center justify-center text-center w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-black text-white p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.35)] border-4 border-black transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
              {/* Question Mark Watermark in Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="180" viewBox="0 0 58 126">
                  <path
                    d="M39-27.609a30.478,30.478,0,0,1-.716-6.941c0-8.008,2.327-14.059,10.025-24.381C57.98-71.744,61.56-81.355,61.56-94.7c0-19.932-9.846-31.322-29-31.322s-29,11.39-29,31.322v12.28H22.177V-95.948c0-8.9,3.58-12.28,9.846-12.28s9.846,3.381,9.846,12.28c0,11.924-2.506,20.11-11.278,32.568-7.7,10.856-10.2,18.153-10.2,28.119a23.175,23.175,0,0,0,1.074,7.653Zm-18.438,8.72V-.024H39.541V-18.888Z"
                    transform="translate(-3.56 126.024)"
                    fill="#fff"
                  />
                </svg>
              </div>

              {/* Quiz Badge Content */}
              <span className="text-amber-400 font-bebas text-lg md:text-xl tracking-widest uppercase relative z-10">
                Manga Quiz
              </span>

              <p className="text-2xl sm:text-3xl font-bebas text-center leading-tight tracking-wider text-white my-3 relative z-10 max-w-[220px]">
                WHICH VOLUME COVER IS THIS ?
              </p>

              {/* Interactive Answer Box */}
              <div className="relative z-10 mt-1">
                {showAnswer ? (
                  <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <span className="bg-amber-400 text-black font-bebas text-lg px-3 py-0.5 font-bold uppercase rounded-xs">
                      Volume 72 (Final)
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowAnswer(false)}
                      className="text-[11px] text-gray-300 hover:text-white underline mt-2 cursor-pointer transition"
                    >
                      Close Answer
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAnswer(true)}
                    className="border-2 border-white/80 hover:border-amber-400 hover:bg-amber-400 hover:text-black text-white px-5 py-1.5 font-bebas text-base uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[3px_3px_0px_0px_rgba(255,255,255,0.4)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    See Answer
                  </button>
                )}
              </div>
            </div>

            {/* Manga Blurb & CTA Button */}
            <div className="flex flex-col items-center lg:items-start gap-4 mt-8 w-full">
              <p className="text-black font-sans font-semibold text-sm md:text-base max-w-md text-center lg:text-left leading-relaxed bg-white/90 backdrop-blur-sm p-4 rounded-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Follow Naruto Uzumaki’s complete journey from mischievous outcast to Seventh Hokage across 72 timeless manga volumes!
              </p>
              <NarutoNinjaButton
                text="MORE INFO ON THE COMICS"
                padding="py-3 px-6 md:py-3.5 md:px-8"
                className="text-lg md:text-xl mt-1"
              />
            </div>
          </div>

          {/* Right Column: Featured Manga Comic Volume Cover (Taller & Larger) */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="relative group">
              {/* Volume 72 Ribbon Badge */}
              <div className="absolute -top-4 -right-4 z-30 bg-red-600 text-white font-bebas text-xl md:text-2xl px-5 py-1.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider">
                Vol. 72 • Final
              </div>

              {/* Comic Book Tall Showcase Frame */}
              <div className="relative bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rounded-xs overflow-hidden w-[300px] sm:w-[380px] md:w-[460px] lg:w-[500px] h-[460px] sm:h-[560px] md:h-[660px] lg:h-[740px] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
                <Image
                  fill
                  src="/comic.png"
                  alt="Naruto Manga Volume 72 Cover"
                  className="object-cover object-center block"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Comics;
