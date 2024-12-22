"use client";

import HomePageButton from "@/components/features/buttons/homePageButton";
import VideoBackground from "@/components/layouts/nav/videoBackground";
import VideoPlayer from "@/components/layouts/nav/videoPlayer";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const shouldTriggerButton = searchParams.get("trigger") === "true";

  return (
    <div className="bg-black text-white bg-opacity-5 relative h-screen">
      <VideoBackground />

      <div className="min-h-screen  flex flex-col items-center justify-center py-10 ">
        <div className="font-semibold ps-3 md:ps-8 mt-10">
          <h1 className="tracking-wider  text-3xl md:text-6xl lg:text-8xl xl:text-9xl ">
            Statistically Speaking:
          </h1>
          <h2 className=" tracking-wide text-[1.7rem] md:text-6xl lg:text-8xl xl:text-9xl ">
            While Life Ends, Data Lives
          </h2>
        </div>

        <div className="w-[90%] md:w-[40%] max-w-4xl aspect-video mx-auto mt-10 mb-10">
          <VideoPlayer/>
          {/* <video autoPlay loop muted playsInline className=" rounded-2xl">
            <source src="/video/I-dai.mp4" type="video/mp4" />
          </video> */}
          {/* <iframe
            src="https://www.youtube.com/embed/yaPh1BRlxi4?autoplay=1&mute=1&loop=1&disablekb=1&playlist=yaPh1BRlxi4&start=0"
            className="w-full h-full rounded-3xl"
            title="I-DAI - Predict How You Will Die"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            id="ytplayer"
          ></iframe> */}
        </div>

        <div className="flex   flex-col items-center text-center font-semibold text-slate-100 gap-10 tracking-widest">
          <h2 className=" text-3xl md:text-5xl xl:text-7xl">
            Do you want to know
            <br />
            How will you die?
          </h2>
          <HomePageButton
            triggerButton={shouldTriggerButton}
            onButtonTriggered={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
