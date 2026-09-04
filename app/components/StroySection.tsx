"use client";

import React, { useEffect, useRef } from "react";
import NarutoNinjaButton from "./NarutoNinjaButton";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useScroll } from "../context/ScrollProvider";

const StroySection = () => {
  const story = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const imgNaruto = useRef(null);
  const imgBoruto = useRef(null);
  const { N, changeNImageSrc } = useScroll();

  useEffect(() => {
    if (typeof window !== "undefined") {
      changeNImageSrc("/letter_n.webp");
      gsap.set(N.current, { right: "-200px", opacity: 0 });
      gsap.set(story.current, { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" });

      const st = ScrollTrigger.create({
        trigger: "#story",
        start: "top center",
        end: "+=1000",
        onEnterBack: () => {
          changeNImageSrc("/letter_n.webp");
          gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
        },
        onEnter: () => {
          changeNImageSrc("/letter_n.webp");
          gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
        },
        onLeaveBack: () => {
          gsap.to(N.current, { right: "-200px", opacity: 0, duration: 1 });
        },
      });

      const tlStory = gsap.to(story.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        opacity: 1,
        scrollTrigger: {
          trigger: story.current,
          start: "top 100%",
          end: "1000",
          scrub: true,
        },
      });

      // Card 1 + Naruto Image Stagger
      gsap.set(card1.current, { opacity: 0, y: 50 });
      gsap.set(imgNaruto.current, { opacity: 0, scale: 0.85, x: 40 });

      const tlCard1 = gsap.timeline({
        scrollTrigger: {
          trigger: card1.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      tlCard1
        .to(card1.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          imgNaruto.current,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          "-=0.25",
        );

      // Card 2 + Boruto Image Stagger
      gsap.set(card2.current, { opacity: 0, y: 50 });
      gsap.set(imgBoruto.current, { opacity: 0, scale: 0.85, x: 40 });

      const tlCard2 = gsap.timeline({
        scrollTrigger: {
          trigger: card2.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      tlCard2
        .to(card2.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          imgBoruto.current,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          "-=0.25",
        );

      return () => {
        st.kill();
        tlStory.kill();
        tlCard1.kill();
        tlCard2.kill();
      };
    }
  }, [changeNImageSrc, N]);

  return (
    <>
      <section className="relative z-20 w-full overflow-hidden" id="story">
        <div className="narutobg story relative w-full min-h-full">
          <MaxWidthWrapper className="flex items-center flex-col relative w-full">
            <NarutoNinjaButton
              transparent
              text="About Naruto"
              padding="py-2.5 px-8 md:py-3 md:px-10 justify-center gap-4 self-center tracking-wider"
              className="my-6 md:my-8 z-[60] flex items-center self-center text-xl md:text-2xl"
            />
            <section className="relative pb-6 sm:pb-12 md:pb-24 lg:pb-[580px] mt-2 w-full">
              <div className="relative w-full">
                <div className="flex flex-col gap-3 items-center lg:items-start w-full">
                  <Image
                    ref={story}
                    width={400}
                    height={100}
                    className="w-72 sm:w-96 lg:w-[55rem] translate-x-0 lg:-translate-x-[17rem] max-w-full object-contain self-center lg:self-start"
                    alt="news"
                    src={"/top_story.svg"}
                  />
                  <div
                    ref={card1}
                    className="translate-x-0 lg:translate-x-56 opacity-0 w-full max-w-sm sm:max-w-md lg:max-w-xl pr-4 sm:pr-8 lg:pr-48 px-5 sm:px-8 py-7 sm:py-10 lg:py-14 relative z-30 tracking-wider bg-white shadow-xl mx-auto lg:mx-0"
                  >
                    <Image
                      ref={imgNaruto}
                      width={650}
                      height={650}
                      className="-top-14 sm:-top-20 md:-top-28 lg:-top-36 -right-4 sm:-right-8 md:-right-36 lg:-right-60 absolute z-40 w-[11rem] sm:w-[15rem] md:w-[22rem] lg:w-[32rem] max-w-none pointer-events-none drop-shadow-2xl object-contain"
                      alt="naruto"
                      src={"/naruto.png"}
                    />
                    <div className="flex leading-6 flex-col items-start w-[58%] sm:w-[62%] lg:w-auto lg:max-w-[280px]">
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 font-bebas">Naruto</h1>
                      <p className="font-medium tracking-tight text-xs sm:text-sm md:text-base lg:text-2xl leading-relaxed">
                        From its debut in 1999, all the way to its stunning conclusion—look back on the trials and
                        tribulations of an outcast ninja’s coming of age and the famous scenes that shaped his story!!
                      </p>
                      <NarutoNinjaButton className="text-sm sm:text-base lg:text-xl font-normal mt-3 sm:mt-4" text="More Info" />
                    </div>
                  </div>
                  <div
                    ref={card2}
                    className="translate-x-0 lg:-translate-x-24 xl:-translate-x-32 opacity-0 w-full max-w-sm sm:max-w-md lg:max-w-xl pr-4 sm:pr-8 lg:pr-48 px-5 sm:px-8 py-7 sm:py-10 lg:py-14 relative z-30 tracking-wider bg-white shadow-xl mt-12 sm:mt-16 md:mt-24 mx-auto lg:mx-0"
                  >
                    <Image
                      ref={imgBoruto}
                      width={650}
                      height={650}
                      className="-top-12 sm:-top-18 md:-top-26 lg:-top-32 -right-3 sm:-right-8 md:-right-36 lg:-right-56 absolute z-40 w-[10rem] sm:w-[14rem] md:w-[20rem] lg:w-[30rem] max-w-none pointer-events-none drop-shadow-2xl object-contain"
                      alt="boruto"
                      src={"/char_boruto.webp"}
                    />
                    <div className="flex leading-6 flex-col items-start w-[58%] sm:w-[62%] lg:w-auto lg:max-w-[280px]">
                      <h1 className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-3xl sm:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 font-bebas">
                        BORUTO
                        <span className="font-normal tracking-tight text-xs sm:text-sm lg:text-lg block sm:inline">
                          -NARUTO NEXT GENERATIONS-
                        </span>
                      </h1>
                      <p className="font-medium tracking-tight text-xs sm:text-sm md:text-base lg:text-2xl leading-relaxed">
                        The story of a young boy who dreams of becoming Hokage is passed on to a new generation! See how
                        the world of NARUTO has changed over the years!!
                      </p>
                      <NarutoNinjaButton className="text-sm sm:text-base lg:text-xl font-normal mt-3 sm:mt-4" text="More Info" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </MaxWidthWrapper>
        </div>
      </section>
    </>
  );
};

export default StroySection;
