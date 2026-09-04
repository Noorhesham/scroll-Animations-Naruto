"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import NarutoNinjaButton from "./NarutoNinjaButton";

const Naruto = () => {
  const [currentNaruto, setCurrentNaruto] = useState(1);

  const handleNext = useCallback(() => {
    setCurrentNaruto((c) => (c < 3 ? c + 1 : 1));
  }, []);

  // Auto-change between the 3 Naruto stances every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [handleNext, currentNaruto]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-30">
      <div className="relative w-full h-full">
        {[1, 2, 3].map((num) => {
          const positionClass =
            num === 1
              ? "top-20 sm:top-16 lg:top-[2rem] z-[36]"
              : num === 2
              ? "top-24 sm:top-20 lg:top-20 scale-100 lg:scale-110 z-[36]"
              : "top-20 sm:top-16 lg:top-[2rem] scale-125 lg:scale-110 z-[36]";

          return (
            <Image
              key={num}
              src={`/naruto${num}.png`}
              alt="Naruto"
              width={1400}
              height={1400}
              priority
              className={`object-contain w-[20rem] sm:w-[28rem] md:w-[36rem] lg:w-[45rem] h-full absolute left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-700 ease-out select-none ${positionClass} ${
                currentNaruto === num
                  ? "opacity-100 blur-0 pointer-events-auto"
                  : "opacity-0 blur-sm pointer-events-none"
              }`}
              onClick={handleNext}
              title="Click to change stance!"
            />
          );
        })}
      </div>

      {/* Click Me! button */}
      <div className="absolute right-4 sm:right-10 md:right-16 lg:right-20 bottom-16 sm:bottom-20 lg:bottom-auto lg:top-[36%] z-50 pointer-events-auto text-base sm:text-2xl lg:text-3xl">
        <NarutoNinjaButton className="text-base sm:text-2xl lg:text-3xl" onClick={handleNext} text="Click Me !" />
      </div>
    </div>
  );
};

export default Naruto;
