"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className=" text-white relative flex justify-center items-center h-screen  text-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute -z-10 top-0 bottom-0 right-0 left-0 w-full h-full object-cover opacity-95"
      >
        <source src="/video/skull.mp4" type="video/mp4" />
      </video>{" "}
      <div>
        <h1 className="text-8xl font-bold text-warning ">ERROR</h1>
        <h1 className="text-5xl font-bold text-error">500</h1>
        <p className="text-4xl mt-4 ">Something went wrong!</p>
        <button
          onClick={() => router.refresh()}
          className="mt-6 btn text-white text-2xl"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
