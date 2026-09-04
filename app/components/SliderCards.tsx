"use client";

import React, { useEffect, useRef, useState } from "react";
import type SwiperType from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NarutoNinjaButton from "./NarutoNinjaButton";

const data = [
  {
    img: "/giphy (2).webp",
    date: "2026/8/15",
    desc: "Kawaki (Karma Progression) Makes His First Appearance in NARUTO X BORUTO Ultimate Ninja STORM ...",
    isfeatured: true,
  },
  {
    img: "/news1.jpg",
    date: "2026/8/12",
    desc: "Kawaki (Karma Progression) Makes His First Appearance in NARUTO X BORUTO Ultimate Ninja STORM ...",
  },
  {
    img: "/news2.jpg",
    date: "2026/8/10",
    desc: "Kawaki (Karma Progression) Makes His First Appearance in NARUTO X BORUTO Ultimate Ninja STORM ...",
    isfeatured: true,
  },
  {
    img: "/giphy (1).webp",
    date: "2026/8/5",
    desc: "Kawaki (Karma Progression) Makes His First Appearance in NARUTO X BORUTO Ultimate Ninja STORM ...",
    isfeatured: true,
  },
  {
    img: "/get.jpg",
    date: "2026/8/1",
    desc: "Kawaki (Karma Progression) Makes His First Appearance in NARUTO X BORUTO Ultimate Ninja STORM ...",
  },
  {
    img: "/get.jpg",
    date: "2026/7/28",
    desc: "Kawaki (Karma Progression) Makes His First Appearance in NARUTO X BORUTO Ultimate Ninja STORM ...",
  },
];

const cards = [...data, ...data];

const SliderCards = () => {
  const container = useRef<any>(null);
  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!swiper) return;
    swiper.slidePrev();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!swiper) return;
    swiper.slideNext();
  };

  const activeStyles =
    "border w-12 h-12 text-center border-black hover:bg-black hover:text-white text-black transition aspect-square z-50 place-items-center border-2 cursor-pointer flex items-center justify-center bg-white shadow-md active:scale-95";

  return (
    <div className="flex flex-col h-full relative z-40 w-full overflow-hidden pb-4">
      {/* Top News Badge */}
      <div className="relative pl-6 md:pl-28 lg:pl-36 z-[36]">
        <Image
          width={200}
          height={100}
          className="w-72 md:w-96 -top-32 md:-top-40 object-contain absolute left-4 md:left-20 drop-shadow-lg"
          alt="news"
          src={"/top_news.svg"}
        />
      </div>

      {/* 
        Infinite Smooth Stream:
        - loop={true} guarantees every card (including the last slide) smoothly cycles into full view
        - Zero empty space, zero cutoffs, zero dead-ends
        - slideToClickedSlide allows clicking any card to center/focus it
      */}
      <div className="w-full mt-6 pl-4 md:pl-12">
        <Swiper
          ref={container}
          onSwiper={(s) => setSwiper(s)}
          slidesPerView="auto"
          spaceBetween={24}
          loop={true}
          slideToClickedSlide={true}
          grabCursor={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="h-full w-full flex flex-col z-40 relative !overflow-visible"
        >
          {cards.map((d, i) => (
            <SwiperSlide
              className="news-card-slide group !w-72 sm:!w-80 mt-10 transition-transform duration-200 cursor-pointer"
              key={i}
            >
              <div className="flex flex-col relative z-40 w-full bg-white border-2 border-black rounded-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                {d.isfeatured && (
                  <div className="h-10 w-10 absolute right-3 top-3 z-50">
                    <Image fill src={"/pickup_en.svg"} alt="featured" className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="overflow-hidden w-full relative h-44 bg-zinc-100 border-b-2 border-black">
                  <Image
                    fill
                    src={d.img}
                    alt={d.desc}
                    className="w-full group-hover:scale-105 duration-300 h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white text-gray-900 flex flex-col justify-between min-h-[105px]">
                  <p className="text-xs font-bold text-gray-600 mb-1">{d.date}</p>
                  <p className="text-sm font-sans font-bold text-black line-clamp-2 leading-snug">{d.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-6 md:px-28 lg:px-36 mt-8 z-50 w-full">
        <NarutoNinjaButton text="SEE MORE" />
        <div className="flex items-center gap-3 mr-4">
          <button
            type="button"
            onClick={handlePrev}
            className={activeStyles}
            aria-label="previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={activeStyles}
            aria-label="next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderCards;
