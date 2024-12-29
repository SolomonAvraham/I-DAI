"use client";

import VideoBackground from "@/components/layouts/nav/videoBackground";
import React from "react";
 
const ErrorPage = () => {
  return (
    <div className=" text-white relative flex justify-center items-center h-screen  text-center">
      <VideoBackground />
      <div>
        <h1 className="text-8xl font-bold text-warning ">ERROR</h1>
        <h1 className="text-5xl font-bold text-error">500</h1>
        <p className="text-4xl mt-4 ">Something went wrong!</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 btn text-white text-2xl"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
