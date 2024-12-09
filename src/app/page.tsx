'use client';

import HomePageButton from "@/components/ui/buttons/homePageButton";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const shouldTriggerButton = searchParams.get("trigger") === "true";

  return (
    <div className="bg-black text-white bg-opacity-5 relative h-screen">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute -z-10 top-0 bottom-0 right-0 left-0 w-full h-full object-cover opacity-95"
      >
        <source src="/video/skull.mp4" type="video/mp4" />
      </video>

      <div className="min-h-screen grid">
        <div className="font-semibold ps-3 md:ps-8 mt-10">
          <h1 className="tracking-wider  text-3xl md:text-6xl lg:text-8xl xl:text-9xl ">
            Statistically Speaking:
          </h1>
          <h2 className=" tracking-wide text-[1.7rem] md:text-6xl lg:text-8xl xl:text-9xl ">
            While Life Ends, Data Lives
          </h2>
        </div>

        <div className="flex flex-col items-center text-center font-semibold gap-10">
          <h2 className=" text-3xl md:text-5xl xl:text-7xl ">
            Do you want to know
            <br />
            How will you die?
          </h2>
          <HomePageButton
            triggerButton={shouldTriggerButton}
            onButtonTriggered={() => {
              // Optional: Add any additional logic when button is triggered
              console.log("Home page button triggered");
            }}
          />
        </div>
      </div>
    </div>
  );
}
