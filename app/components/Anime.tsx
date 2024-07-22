import React, { useEffect } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useScroll } from "../context/ScrollProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import NarutoNinjaButton from "./NarutoNinjaButton";

const Anime = () => {
  const { N, scroller, changeNImageSrc } = useScroll();
  const kakashi = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#anime",
      start: "top center",
      end: "+=1000",
      markers: true,
      scroller: scroller.current,
      onEnter: () => {
        changeNImageSrc("/letter_r.webp");
        gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
      },
      onEnterBack: () => {
        changeNImageSrc("/letter_r.webp");
        gsap.fromTo(N.current, { right: "-200px", opacity: 0 }, { right: "10px", opacity: 1, duration: 1 });
      },
    });
    gsap.set(kakashi.current, { clipPath: "polygon(0 0, 100% 0,100% 100%, 0% 100%)", opacity: 0 });
    gsap.to(kakashi.current, {
      clipPath: "polygon(0px -172px, 100% -247px, 100% 100%, 0% 100%)",
      opacity: 1,
      duration: 6,
      scrollTrigger: {
        trigger: kakashi.current,
        start: "top 100%",
        end: "1000",
        scrub: true,
        scroller: scroller.current,
        markers: true,
      },
      ease: "power4.inOut",
    });
    return () => {
      trigger.kill();
    };
  }, [changeNImageSrc, N, scroller]);

  return (
    <section className="relative min-h-[140vh]" data-scroll-section id="anime">
      <div className="absolute z-50 inset-0 w-full h-screen">
        <video
          src="/Naruto AMV - Runnin [ReUpload].mp4"
          className="w-full h-full object-cover"
          muted
          loop={true}
          autoPlay
        ></video>
      </div>
      <div className=" relative h-full min-h-screen backdrop-brightness-75 z-[60]">
        <MaxWidthWrapper>
          <div className="flex flex-col items-start">
            <Image width={400} height={100} className="w-[55rem] -ml-10" alt="news" src={"/top_anime.svg"} />
            <div className=" flex mt-5  gap-4 flex-wrap items-center">
              <div className="flex  items-center  flex-col ">
                <div className="  relative h-80 w-[14rem]">
                  <Image src="/naruto1_visual.webp" alt="naruto" fill className=" object-cover" />
                </div>
                <div className=" flex items-center relative bg-white p-4 w-full h-full px-4 py-2">
                  <Image
                    src="/anime_logo_naruto_en.webp"
                    alt="naruto"
                    width={200}
                    height={200}
                    className=" w-32  mx-auto object-contain"
                  />
                </div>
              </div>
              <div className="flex  items-center  flex-col ">
                <div className="  relative h-80 w-[14rem]">
                  <Image src="/naruto1_visual.webp" alt="naruto" fill className=" object-cover" />
                </div>
                <div className=" flex items-center relative bg-white p-4 w-full h-full px-4 py-2">
                  <Image
                    src="/anime_logo_naruto_en.webp"
                    alt="naruto"
                    width={200}
                    height={200}
                    className=" w-32  mx-auto object-contain"
                  />
                </div>
              </div>
              <div className="flex  items-center  flex-col ">
                <div className="  relative h-80 w-[14rem]">
                  <Image src="/naruto1_visual.webp" alt="naruto" fill className=" object-cover" />
                </div>
                <div className=" flex items-center relative bg-white p-4 w-full h-full px-4 py-2">
                  <Image
                    src="/anime_logo_naruto_en.webp"
                    alt="naruto"
                    width={200}
                    height={200}
                    className=" w-32  mx-auto object-contain"
                  />
                </div>
              </div>
            </div>
            <NarutoNinjaButton className=" text-2xl mt-5" text="More Info on the Anime" />
          </div>
        </MaxWidthWrapper>
      </div>
      <section ref={kakashi} className="    absolute bottom-0  w-full min-h-[20vh]">
        <div className="  kakashi3 w-full"></div>
      </section>
    </section>
  );
};

export default Anime;
