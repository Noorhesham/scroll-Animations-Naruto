"use client";

import React, { useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { useScroll } from "../context/ScrollProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NarutoNinjaButton from "./NarutoNinjaButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const GamesCard = () => (
  <div className="flex flex-col w-full h-full shadow-xl bg-white border border-neutral-200">
    <div className="mb-3 py-3 px-6 text-left text-2xl bg-black text-white">
      <h1 className="font-bebas">GAMES</h1>
    </div>
    <div className="group flex flex-col flex-1 justify-between">
      <div>
        <div className="overflow-hidden bg-gray-200 w-full aspect-[4/3] sm:aspect-square relative">
          <Image
            src={"/games.jpg"}
            className="object-cover group-hover:scale-110 duration-200"
            alt="games"
            fill
          />
        </div>
        <div className="min-h-48 group-hover:text-muted-foreground duration-200 bg-white text-gray-900 flex flex-col items-start p-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="p-2 bg-zinc-200 text-sm text-gray-900">PS4</div>
            <div className="p-2 bg-zinc-200 text-sm text-gray-900">PS5</div>
            <div className="p-2 bg-zinc-200 text-sm text-gray-900">Switch</div>
            <div className="p-2 bg-zinc-200 text-sm text-gray-900">Xbox one</div>
            <div className="p-2 bg-zinc-200 text-sm text-gray-900">Xbox Series X|S</div>
            <div className="p-2 bg-zinc-200 text-sm text-gray-900">Steam</div>
          </div>
          <p className="text-xl font-normal mt-2">naruto-x-boruto-ultimate-ninja-storm-connections</p>
        </div>
      </div>
      <div className="p-3 pt-0">
        <NarutoNinjaButton className="text-xl mt-2 w-full justify-center" text="More Info On Games" />
      </div>
    </div>
  </div>
);

const EventsCard = () => (
  <div className="flex flex-col w-full h-full shadow-xl bg-white border border-neutral-200">
    <div className="mb-3 py-3 px-6 text-left text-2xl bg-black text-white">
      <h1 className="font-bebas">Events</h1>
    </div>
    <div className="group flex flex-col flex-1 justify-between">
      <div>
        <div className="overflow-hidden bg-gray-200 w-full aspect-[4/3] sm:aspect-square relative">
          <Image
            src={"/events.jpg"}
            className="object-cover group-hover:scale-110 duration-200"
            alt="events"
            fill
          />
        </div>
        <div className="min-h-48 group-hover:text-muted-foreground duration-200 bg-white text-gray-900 flex flex-col items-start p-3">
          <p className="text-xl font-normal">Anime Tokyo Station Naruto Games and Exhibitions</p>
        </div>
      </div>
      <div className="p-3 pt-0">
        <NarutoNinjaButton className="text-xl mt-2 w-full justify-center" text="More Info On Events" />
      </div>
    </div>
  </div>
);

const MerchCard = () => (
  <div className="flex flex-col w-full h-full shadow-xl bg-white border border-neutral-200">
    <div className="mb-3 py-3 px-6 text-left text-2xl bg-black text-white">
      <h1 className="font-bebas">Merch</h1>
    </div>
    <div className="group flex flex-col flex-1 justify-between">
      <div>
        <div className="overflow-hidden bg-gray-200 w-full aspect-[4/3] sm:aspect-square relative">
          <Image
            src={"/merch.jpg"}
            className="object-cover group-hover:scale-110 duration-200"
            alt="merch"
            fill
          />
        </div>
        <div className="min-h-48 group-hover:text-muted-foreground duration-200 bg-white text-gray-900 flex flex-col items-start p-3">
          <div className="p-2 bg-zinc-200 text-gray-900">Toys</div>
          <p className="text-xl font-normal mt-2">ICHIBANKUJI NARUTO WILL OF FIRE SPUN</p>
        </div>
      </div>
      <div className="p-3 pt-0">
        <NarutoNinjaButton className="text-xl mt-2 w-full justify-center" text="More Info On Merch" />
      </div>
    </div>
  </div>
);

const Collection = () => {
  const { N, changeNImageSrc } = useScroll();

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#others",
      start: "top center",
      end: "+=1000",
      onEnter: () => {
        changeNImageSrc("/letter_u.webp");
        gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
      },
      onEnterBack: () => {
        changeNImageSrc("/letter_u.webp");
        gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [changeNImageSrc, N]);

  return (
    <section className="relative" id="others">
      <div className="collectionbg relative">
        <MaxWidthWrapper className="pt-12 md:pt-20 flex items-center flex-col relative z-10">
          <section className="relative pb-16 md:pb-24 mt-2 w-full flex flex-col items-center">
            <div className="relative w-full">
              <div className="flex flex-col gap-3 items-center lg:items-start w-full">
                <Image
                  width={400}
                  height={100}
                  className="w-72 sm:w-96 lg:w-[55rem] translate-x-0 lg:translate-x-[-17rem] self-center lg:self-start max-w-full object-contain"
                  alt="news"
                  src={"/top_others.svg"}
                />
              </div>

              {/* Mobile: Swiper with AutoPlay & Continuous Touch Swiping */}
              <div className="block lg:hidden w-full mt-6 pb-6">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 2800,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  spaceBetween={18}
                  slidesPerView={1.1}
                  centeredSlides={true}
                  className="w-full !overflow-visible"
                >
                  <SwiperSlide className="h-auto flex">
                    <GamesCard />
                  </SwiperSlide>
                  <SwiperSlide className="h-auto flex">
                    <EventsCard />
                  </SwiperSlide>
                  <SwiperSlide className="h-auto flex">
                    <MerchCard />
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* Desktop: Exact original 3-column row - 100% UNTOUCHED */}
              <div className="hidden lg:flex w-full lg:w-[80%] tracking-wide flex-nowrap flex-row items-stretch justify-start gap-4 pb-6 mt-6">
                <div className="w-1/3 flex flex-col">
                  <GamesCard />
                </div>
                <div className="w-1/3 flex flex-col">
                  <EventsCard />
                </div>
                <div className="w-1/3 flex flex-col">
                  <MerchCard />
                </div>
              </div>
            </div>
          </section>
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

export default Collection;
