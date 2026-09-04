"use client";

import React, { useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useScroll } from "../context/ScrollProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import NarutoNinjaButton from "./NarutoNinjaButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const PosterCard = ({
  visualSrc,
  logoSrc,
  alt,
}: {
  visualSrc: string;
  logoSrc: string;
  alt: string;
}) => (
  <div className="flex items-center flex-col shadow-2xl w-full max-w-[320px] lg:max-w-none lg:w-[14rem] bg-black/40">
    <div className="relative h-[400px] sm:h-[460px] lg:h-80 w-full lg:w-[14rem]">
      <Image src={visualSrc} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 85vw, 224px" />
    </div>
    <div className="flex items-center relative bg-white p-4 w-full h-auto px-4 py-3">
      <Image src={logoSrc} alt={alt} width={200} height={200} className="w-36 lg:w-32 mx-auto object-contain" />
    </div>
  </div>
);

const Anime = () => {
  const { N, changeNImageSrc } = useScroll();

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#anime",
      start: "top center",
      end: "+=1000",
      onEnter: () => {
        changeNImageSrc("/letter_r.webp");
        gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
      },
      onEnterBack: () => {
        changeNImageSrc("/letter_r.webp");
        gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [changeNImageSrc, N]);

  return (
    <section className="relative " id="anime">
      <div className="absolute z-50 inset-0 w-full h-full">
        <video
          src="/Naruto AMV - Runnin [ReUpload].mp4"
          className="w-full h-full object-cover"
          muted
          loop={true}
          autoPlay
          playsInline
        />
      </div>
      <div className="relative h-full min-h-0 lg:min-h-screen backdrop-brightness-75 z-[60] pt-6 sm:pt-10 lg:pt-16 pb-6 sm:pb-10 lg:pb-[580px]">
        <MaxWidthWrapper>
          <div className="flex flex-col items-center lg:items-start w-full">
            <Image
              width={400}
              height={100}
              className="w-72 sm:w-96 lg:w-[55rem] translate-x-0 lg:-ml-10 self-center lg:self-start object-contain"
              alt="news"
              src={"/top_anime.svg"}
            />

            {/* Mobile: Swiper with AutoPlay & Continuous Touch Swiping */}
            <div className="block lg:hidden w-full mt-6 pb-4">
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 2800,
                  disableOnInteraction: false,
                }}
                loop={true}
                spaceBetween={16}
                slidesPerView={1.15}
                centeredSlides={true}
                className="w-full !overflow-visible"
              >
                <SwiperSlide className="flex justify-center">
                  <PosterCard
                    visualSrc="/naruto1_visual.webp"
                    logoSrc="/anime_logo_naruto_en.webp"
                    alt="naruto part 1"
                  />
                </SwiperSlide>
                <SwiperSlide className="flex justify-center">
                  <PosterCard
                    visualSrc="/naruto2_visual.webp"
                    logoSrc="/anime_logo_naruto_s_en.webp"
                    alt="naruto shippuden"
                  />
                </SwiperSlide>
                <SwiperSlide className="flex justify-center">
                  <PosterCard
                    visualSrc="/boruto_visual.webp"
                    logoSrc="/anime_logo_boruto_en.webp"
                    alt="boruto next generations"
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop: Exact original flex row - 100% UNTOUCHED */}
            <div className="hidden lg:flex mt-6 gap-6 items-stretch justify-start w-full flex-wrap">
              <PosterCard
                visualSrc="/naruto1_visual.webp"
                logoSrc="/anime_logo_naruto_en.webp"
                alt="naruto part 1"
              />
              <PosterCard
                visualSrc="/naruto2_visual.webp"
                logoSrc="/anime_logo_naruto_s_en.webp"
                alt="naruto shippuden"
              />
              <PosterCard
                visualSrc="/boruto_visual.webp"
                logoSrc="/anime_logo_boruto_en.webp"
                alt="boruto next generations"
              />
            </div>

            <NarutoNinjaButton className="text-xl sm:text-2xl mt-6 self-center lg:self-start" text="More Info on the Anime" />
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

export default Anime;
