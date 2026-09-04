"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const imgs = ["get (1).jpg", "get (2).jpg", "get (2).png", "get.jpg", "get (1).png"];

const AutoScroll = () => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  useEffect(() => {
    if (swiper && swiper.autoplay) {
      swiper.autoplay.start();
    }
  }, [swiper]);

  return (
    <div className="w-full relative z-40 flex flex-col items-center">
      <Swiper
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (_, className) => {
            return `<span class="inline-block w-3.5 h-3.5 bg-black/60 rounded-full mx-2 transition-all duration-300 cursor-pointer ${className}"></span>`;
          },
        }}
        onSwiper={(s) => setSwiper(s)}
        spaceBetween={24}
        slidesPerView={1.15}
        centeredSlides={true}
        modules={[Pagination, Autoplay]}
        className="w-full flex flex-col z-40 pb-12 relative"
      >
        {imgs.map((img, i) => (
          <SwiperSlide
            className="group cursor-pointer transition-transform duration-300 relative overflow-hidden rounded-2xl shadow-2xl border-2 border-black/40"
            key={i}
          >
            {/* Definite height so Swiper and Image fill never collapse */}
            <div className="w-full relative h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px]">
              <Image
                src={`/${img}`}
                alt="Naruto Feature Banner"
                fill
                priority={i === 0}
                className="object-cover w-full h-full group-hover:scale-105 duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AutoScroll;
