"use client";

import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const SlidingImage = () => {
  const firstImage = useRef<HTMLImageElement>(null);
  const secondImage = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let xPercent = 0;
    const direction = 1;
    let reqId: number;

    const animation = () => {
      if (xPercent >= 100) xPercent = 0;
      if (firstImage.current) {
        gsap.set(firstImage.current, { xPercent });
      }
      if (secondImage.current) {
        gsap.set(secondImage.current, { xPercent });
      }
      xPercent += 0.04 * direction;
      reqId = requestAnimationFrame(animation);
    };

    reqId = requestAnimationFrame(animation);
    return () => {
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex w-full h-full pointer-events-none z-20">
      <Image
        ref={firstImage}
        src={"/cloud.webp"}
        alt="cloud"
        fill
        className="absolute left-0 top-0 object-cover z-20 opacity-90"
      />
      <Image
        style={{ left: "-100%" }}
        ref={secondImage}
        src={"/cloud.webp"}
        alt="cloud"
        fill
        className="absolute left-full top-0 object-cover z-20 opacity-90"
      />
    </div>
  );
};

export default SlidingImage;
