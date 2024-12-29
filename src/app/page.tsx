"use client";

import HomePageButton from "@/components/features/buttons/homePageButton";
import VideoBackground from "@/components/layouts/nav/videoBackground";
import VideoPlayer from "@/components/layouts/nav/videoPlayer";
import { useSearchParams } from "next/navigation";


export default function Home() {
  const searchParams = useSearchParams();
  const shouldTriggerButton = searchParams.get("trigger") === "true";

  return (
    <div className="text-white min-h-screen relative py-5">
      <VideoBackground />

      <div className="flex flex-col items-center justify-center py-1 ">
        <div className="font-semibold text-center md:ps-8 md:mt-10">
          <h1 className="tracking-wider text-2xl md:text-6xl lg:text-8xl xl:text-9xl ">
            Statistically Speaking:
          </h1>
          <h2 className="md:tracking-wide text-3xl md:text-6xl lg:text-8xl xl:text-9xl ">
            While Life Ends, Data Lives
          </h2>
        </div>

        <div className="w-[90%] md:w-[40%] max-w-4xl aspect-video mx-auto mt-10 mb-10">
          <VideoPlayer />
        </div>

        <div className="flex  flex-col items-center text-center font-semibold text-slate-100 gap-10 tracking-widest">
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
