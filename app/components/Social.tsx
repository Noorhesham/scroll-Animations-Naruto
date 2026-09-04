"use client";

import React, { useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { useScroll } from "../context/ScrollProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NarutoNinjaButton from "./NarutoNinjaButton";
import { MessageCircle, Repeat2, Heart, Bookmark, Share2 } from "lucide-react";

const Social = () => {
  const { N, changeNImageSrc } = useScroll();

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#social",
      start: "top center",
      end: "+=1000",
      onEnter: () => {
        changeNImageSrc("/letter_t.webp");
        gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
      },
      onEnterBack: () => {
        changeNImageSrc("/letter_t.webp");
        gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [changeNImageSrc, N]);

  return (
    <section className="relative pt-10 sm:pt-16 lg:pt-28 pb-8 sm:pb-14 lg:pb-[580px] bg-main" id="social">
      <MaxWidthWrapper className="flex items-center flex-col relative z-20">
        {/* Section Header */}
        <div className="w-full flex flex-col items-start mb-10 md:mb-14">
          <Image
            width={450}
            height={120}
            className="w-72 sm:w-96 md:w-[460px] object-contain drop-shadow-md"
            alt="Official SNS Header"
            src="/top_sns.svg"
            priority
          />
          <p className="text-black/80 font-sans font-bold text-sm md:text-base mt-2 tracking-wide uppercase">
            Official X (Twitter) • Latest News & Announcements
          </p>
        </div>

        {/* Rich Official Tweets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Card 1: Featured Uchiha Clan Post */}
          <article className="flex flex-col justify-between bg-black text-white p-6 sm:p-7 rounded-2xl border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-transform duration-200 hover:-translate-y-1">
            <div>
              {/* Account Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-zinc-900 shrink-0">
                    <Image src="/logo.webp" alt="Naruto Official" fill className="object-contain p-1" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-base text-white hover:underline cursor-pointer">
                        NARUTO OFFICIAL
                      </span>
                      {/* Verified Badge */}
                      <svg className="w-4 h-4 fill-amber-400 shrink-0" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">@NARUTO_info_en • May 31, 2023</span>
                  </div>
                </div>

                {/* X Logo */}
                <svg className="w-5 h-5 fill-zinc-400 hover:fill-white transition shrink-0" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>

              {/* Post Content */}
              <p className="text-sm sm:text-base leading-relaxed text-zinc-100 mb-4">
                The Uchiha Clan — Bound by pride, destiny, and the power of the Sharingan. Look back on the bonds and battles that shaped their legacy.
                <span className="text-amber-400 font-bold block mt-2">
                  #NARUTO #Shippuden #Uchiha #Anime
                </span>
              </p>

              {/* Featured Media */}
              <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border-2 border-zinc-800 bg-zinc-950 group/img">
                <Image
                  src="/comic.png"
                  fill
                  className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                  alt="The Uchiha Clan Feature"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Engagement Action Bar */}
            <div className="flex items-center justify-between text-zinc-400 text-xs sm:text-sm mt-5 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition">
                <MessageCircle className="w-4 h-4" />
                <span>1,420</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer transition">
                <Repeat2 className="w-4 h-4" />
                <span>14.8K</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-rose-500 cursor-pointer transition">
                <Heart className="w-4 h-4 fill-rose-500/20 text-rose-500" />
                <span>58.4K</span>
              </div>
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 hover:text-amber-400 cursor-pointer transition" />
                <Share2 className="w-4 h-4 hover:text-white cursor-pointer transition" />
              </div>
            </div>
          </article>

          {/* Card 2: Gaming & Anime Post */}
          <article className="flex flex-col justify-between bg-black text-white p-6 sm:p-7 rounded-2xl border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-transform duration-200 hover:-translate-y-1">
            <div>
              {/* Account Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-zinc-900 shrink-0">
                    <Image src="/logo.webp" alt="Naruto Official" fill className="object-contain p-1" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-base text-white hover:underline cursor-pointer">
                        NARUTO OFFICIAL
                      </span>
                      <svg className="w-4 h-4 fill-amber-400 shrink-0" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">@NARUTO_info_en • Aug 15, 2023</span>
                  </div>
                </div>

                <svg className="w-5 h-5 fill-zinc-400 hover:fill-white transition shrink-0" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>

              {/* Post Content */}
              <p className="text-sm sm:text-base leading-relaxed text-zinc-100 mb-4">
                NARUTO X BORUTO Ultimate Ninja STORM Connections is on its way! Relive the most thrilling battle scenes with over 130 playable ninjas!
                <span className="text-amber-400 font-bold block mt-2">
                  #NARUTOxBORUTO #StormConnections #Gaming
                </span>
              </p>

              {/* Featured Media */}
              <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border-2 border-zinc-800 bg-zinc-950 group/img">
                <Image
                  src="/games.jpg"
                  fill
                  className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                  alt="Storm Connections Game Visual"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Engagement Action Bar */}
            <div className="flex items-center justify-between text-zinc-400 text-xs sm:text-sm mt-5 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer transition">
                <MessageCircle className="w-4 h-4" />
                <span>980</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer transition">
                <Repeat2 className="w-4 h-4" />
                <span>9.4K</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-rose-500 cursor-pointer transition">
                <Heart className="w-4 h-4 fill-rose-500/20 text-rose-500" />
                <span>34.2K</span>
              </div>
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 hover:text-amber-400 cursor-pointer transition" />
                <Share2 className="w-4 h-4 hover:text-white cursor-pointer transition" />
              </div>
            </div>
          </article>
        </div>

        {/* Follow Button Action */}
        <div className="mt-12 flex flex-col items-center">
          <NarutoNinjaButton
            className="text-xl tracking-wide"
            text="FOLLOW @NARUTO_INFO_EN ON X"
            href="https://twitter.com/NARUTO_info_en"
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Social;
