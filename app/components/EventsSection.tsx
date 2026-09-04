"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Official External Link Icon from Naruto website
const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 19.858 19.36"
    className="fill-current flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
  >
    <g transform="translate(-37 -45.813)">
      <path
        d="M-8639,2106.4v-15.56h0l12.172-.031v2.8l-5.46-.007v12.8Z"
        transform="translate(8676 -2045)"
      />
      <path
        d="M-8631.313,2094.578h12.172v15.594h-12.172Z"
        transform="translate(8676 -2045)"
      />
    </g>
  </svg>
);

interface EventItem {
  id: string;
  title: string;
  isAlways?: boolean;
  location?: string;
  venueDateLabel: string;
  venueDate: string;
  img: string;
  imgContain?: boolean;
  link: string;
}

const eventsList: EventItem[] = [
  {
    id: "konoha-land",
    title: "NARUTO - Konoha Land",
    isAlways: true,
    venueDateLabel: "venue/date:",
    venueDate: "France (Parc Spirou Provence) / Permanent",
    img: "/event_konohaland.jpg",
    imgContain: true,
    link: "https://www.parc-spirou.com/en/",
  },
  {
    id: "shinobi-zato",
    title: "NARUTO&BORUTO SHINOBI-ZATO",
    isAlways: true,
    location: "HYOGO",
    venueDateLabel: "venue/date:",
    venueDate: "NIJIGEN NO MORI / Permanent",
    img: "/event_shinobizato.jpg",
    link: "https://nijigennomori.com/naruto_shinobizato/",
  },
  {
    id: "fuji-q",
    title: "NARUTO × BORUTO Fuji Hidden Leaf Village",
    isAlways: true,
    location: "YAMANASHI",
    venueDateLabel: "venue/date:",
    venueDate: "Fuji-Q Highland / Permanent",
    img: "/event_fujiq.jpg",
    link: "https://www.fujiq.jp/area/narutoboruto/",
  },
  {
    id: "ninja-show",
    title: 'Ninja Show "NARUTO"',
    isAlways: false,
    location: "KYOTO",
    venueDateLabel: "venue/date:",
    venueDate: "■ Venue: Minamiza Theatre in Kyoto\n■ Period: February to June 2027",
    img: "/event_ningeki.jpg",
    link: "https://naruto-ninjashow.com/en/",
  },
];

const EventCard = ({ item }: { item: EventItem }) => (
  <article className="group flex flex-col sm:flex-row items-stretch sm:items-start gap-4 sm:gap-6 bg-white transition-transform duration-200 w-full max-w-[420px] sm:max-w-lg lg:w-auto lg:max-w-none border lg:border-0 border-neutral-200 p-4 sm:p-5 lg:p-0 shadow-lg lg:shadow-none h-full">
    {/* Left: Square Image Container with Badges */}
    <div className="relative w-full sm:w-56 md:w-64 aspect-square flex-shrink-0 border border-neutral-300 bg-white overflow-hidden shadow-sm">
      {item.isAlways && (
        <div className="absolute top-0 left-0 z-20 bg-[#FA9427] text-white text-[11px] font-bold font-sans px-2.5 py-0.5 uppercase tracking-wider">
          ALWAYS
        </div>
      )}
      <Image
        src={item.img}
        alt={item.title}
        fill
        className={`${
          item.imgContain ? "object-contain p-2" : "object-cover"
        } transition-transform duration-500 group-hover:scale-105`}
        sizes="(max-width: 640px) 100vw, 260px"
      />
    </div>

    {/* Right: Event Information */}
    <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
      <div>
        {item.location && (
          <div className="mb-2">
            <span className="inline-block bg-neutral-200 text-neutral-800 text-[11px] font-sans font-bold px-2 py-0.5 uppercase tracking-wider">
              {item.location}
            </span>
          </div>
        )}
        <h3 className="font-sans font-bold text-base sm:text-lg text-black leading-snug tracking-tight">
          {item.title}
        </h3>
        <div className="mt-3">
          <p className="text-xs text-neutral-500 font-sans font-medium uppercase mb-0.5">
            {item.venueDateLabel}
          </p>
          <p className="text-xs sm:text-sm text-neutral-800 font-sans font-medium leading-relaxed whitespace-pre-line">
            {item.venueDate}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-1">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex items-center gap-2 border-2 border-black bg-white hover:bg-black text-black hover:text-white transition-colors duration-200 px-4 py-2 text-xs sm:text-sm font-sans font-bold tracking-wider uppercase cursor-pointer"
        >
          <span>MORE DETAILS</span>
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  </article>
);

const EventsSection = () => {
  const [showPastEvents, setShowPastEvents] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 35,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="relative w-full bg-white overflow-visible z-20">
      {/* Header Visual Banner with Painted Brush Stroke Transition */}
      <div className="relative w-full  overflow-visible">
        <div className="relative w-full max-w-[1920px] mx-auto overflow-visible">
          {/* Responsive Picture with exact official assets */}
          <picture className="w-full block select-none pointer-events-none">
            <source
              srcSet="/header_kv_sp_en.webp"
              media="(max-width: 767px)"
              width="375"
              height="102"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/header_kv_en.webp"
              alt="NARUTO/BORUTO | EVENTS"
              width="1280"
              height="200"
              className="w-full h-auto block select-none pointer-events-none"
            />
          </picture>

          {/* Naruto Ninja Ornament on the LEFT - fully visible and unclipped */}
          <div className="absolute left-[4%] sm:left-[8%] md:left-[12%] lg:left-[15%] bottom-0 translate-y-[15%] sm:translate-y-[18%] md:translate-y-[20%] z-30 pointer-events-none select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img_event.webp"
              alt="Naruto hand signs"
              className="h-28 sm:h-36 md:h-44 lg:h-52 w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>
      </div>

      {/* Official Brush Header Container (.css-1rcvpyr) with height 80px (.css-15tgp0v) */}
      <div className="absolute top-[85px] sm:top-[120px] md:top-[155px] w-full z-20 pointer-events-none">
        <div className="max-w-[1280px] px-6 sm:px-12 md:px-20 mx-auto">
          <header>
            <h1 className="sr-only">NARUTO・BORUTO | EVENTS</h1>
            <div className="relative z-10 flex items-center justify-end sm:justify-start md:ml-48 lg:ml-60 h-[65px] sm:h-[75px] md:h-[80px]">
              {/* Black Ink Brush Badge */}
              <div className="relative inline-flex items-center justify-center -rotate-1 pointer-events-auto">
                <div className="relative bg-black text-white px-7 sm:px-10 md:px-12 py-2 sm:py-2.5 shadow-2xl flex items-center justify-center [clip-path:polygon(3%_0%,_97%_2%,_100%_18%,_98%_85%,_96%_100%,_4%_98%,_0%_82%,_2%_18%)]">
                  <span className="font-bebas text-4xl sm:text-5xl md:text-6xl tracking-wider select-none uppercase drop-shadow-md">
                    EVENTS
                  </span>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>

      <div className="pt-14 sm:pt-20 md:pt-28 pb-6 sm:pb-12 lg:pb-[580px]">
        <MaxWidthWrapper className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          {/* View Past Events Toggle Bar */}
          <div className="flex items-center gap-3 mb-8 sm:mb-10 select-none">
            <span className="font-sans font-bold text-xs sm:text-sm text-black tracking-wider uppercase">
              VIEW PAST EVENTS
            </span>

            {/* Pill Toggle Switch */}
            <button
              type="button"
              onClick={() => setShowPastEvents(!showPastEvents)}
              className="relative w-14 h-7 bg-black rounded-full p-0.5 flex items-center transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle past events"
            >
              <div
                className={`w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-black shadow-md transform transition-transform duration-200 ${
                  showPastEvents ? "translate-x-7" : "translate-x-0"
                }`}
              >
                {showPastEvents ? "ON" : "OFF"}
              </div>
            </button>
          </div>

          {/* Mobile Swipeable Full-Width Slider / Desktop 2x2 Grid */}
          <div
            ref={cardsRef}
            className="flex lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch w-full overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none no-scrollbar px-4 sm:px-6 lg:px-0 pb-6"
          >
            {eventsList.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col sm:flex-row items-stretch sm:items-start gap-4 sm:gap-6 bg-white transition-transform duration-200 w-[88vw] max-w-[420px] sm:max-w-lg lg:w-auto lg:max-w-none flex-shrink-0 lg:flex-shrink snap-center border lg:border-0 border-neutral-200 p-4 sm:p-5 lg:p-0 shadow-lg lg:shadow-none"
              >
                {/* Left: Square Image Container with Badges */}
                <div className="relative w-full sm:w-56 md:w-64 aspect-square flex-shrink-0 border border-neutral-300 bg-white overflow-hidden shadow-sm">
                  {/* ALWAYS Ribbon Badge (Orange) */}
                  {item.isAlways && (
                    <div className="absolute top-0 left-0 z-20 bg-[#FA9427] text-white text-[11px] font-bold font-sans px-2.5 py-0.5 uppercase tracking-wider">
                      ALWAYS
                    </div>
                  )}

                  {/* Event Thumbnail */}
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className={`${
                      item.imgContain ? "object-contain p-2" : "object-cover"
                    } transition-transform duration-500 group-hover:scale-105`}
                    sizes="(max-width: 640px) 100vw, 260px"
                  />
                </div>

                {/* Right: Event Information */}
                <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                  <div>
                    {/* Location Badge (if exists) */}
                    {item.location && (
                      <div className="mb-2">
                        <span className="inline-block bg-neutral-200 text-neutral-800 text-[11px] font-sans font-bold px-2 py-0.5 uppercase tracking-wider">
                          {item.location}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="font-sans font-bold text-base sm:text-lg text-black leading-snug tracking-tight">
                      {item.title}
                    </h3>

                    {/* Venue & Date */}
                    <div className="mt-3">
                      <p className="text-xs text-neutral-500 font-sans font-medium uppercase mb-0.5">
                        {item.venueDateLabel}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-800 font-sans font-medium leading-relaxed whitespace-pre-line">
                        {item.venueDate}
                      </p>
                    </div>
                  </div>

                  {/* More Details Button */}
                  <div className="mt-5 pt-1">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-2 border-2 border-black bg-white hover:bg-black text-black hover:text-white transition-colors duration-200 px-4 py-2 text-xs sm:text-sm font-sans font-bold tracking-wider uppercase cursor-pointer"
                    >
                      <span>MORE DETAILS</span>
                      <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-10 md:mt-16 text-black select-none">
            {/* First Page */}
            <button
              type="button"
              disabled
              className="text-neutral-400 cursor-not-allowed hover:text-black transition-colors font-bold text-sm tracking-tighter"
              aria-label="First page"
            >
              |&#x3c;
            </button>

            {/* Previous Page */}
            <button
              type="button"
              disabled
              className="text-neutral-400 cursor-not-allowed hover:text-black transition-colors font-bold text-sm"
              aria-label="Previous page"
            >
              &#x3c;
            </button>

            {/* Current Page 1 Box */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black text-white flex items-center justify-center font-sans font-bold text-sm">
              1
            </div>

            {/* Next Page */}
            <button
              type="button"
              disabled
              className="text-neutral-400 cursor-not-allowed hover:text-black transition-colors font-bold text-sm"
              aria-label="Next page"
            >
              &#x3e;
            </button>

            {/* Last Page */}
            <button
              type="button"
              disabled
              className="text-neutral-400 cursor-not-allowed hover:text-black transition-colors font-bold text-sm tracking-tighter"
              aria-label="Last page"
            >
              &#x3e;|
            </button>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

export default EventsSection;
