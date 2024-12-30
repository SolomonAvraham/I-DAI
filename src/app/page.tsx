"use client";

import HomePageButton from "@/components/features/buttons/homePageButton";
import VideoBackground from "@/components/layouts/nav/videoBackground";
import VideoPlayer from "@/components/layouts/nav/videoPlayer";
import { useSearchParams } from "next/navigation";


export default function Home() {
  const searchParams = useSearchParams();
  const shouldTriggerButton = searchParams.get("trigger") === "true";

  return (
    <div className=" grid place-items-center md:inline  text-white min-h-screen relative">
      <VideoBackground />

      <div className="grid gap-7 md:gap-3 lg:gap-0 xl:gap-2">
        <div className="font-semibold lg:mt-0 md:px-5  text-center md:text-left md:mt-10">
          <h1 className="tracking-wider md:text-left text-2xl md:text-6xl xl:text-8xl">
            Statistically Speaking:
          </h1>
          <h2 className="md:tracking-wide text-3xl md:text-6xl lg:text-7xl xl:text-8xl">
            While Life Ends, Data Lives
          </h2>
        </div>

        <div className="w-[90%] lg:w-1/2 xl:w-5/12  max-w-4xl aspect-video mx-auto lg:mb-2 lg:mt-4 mt-10 mb-10">
          <VideoPlayer />
        </div>

        <div className="flex  flex-col items-center text-center font-semibold text-slate-100 gap-10 lg:gap-3  tracking-widest">
          <h2 className=" text-3xl md:text-5xl lg:text-4xl">
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
