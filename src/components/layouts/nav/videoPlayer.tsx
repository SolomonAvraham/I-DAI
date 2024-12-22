"use client";

import React, { useRef } from "react";
import { RiFullscreenLine } from "react-icons/ri";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // const changeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (videoRef.current) {
  //     videoRef.current.volume = event.target.value;
  //   }
  // };

  return (
    <div className="video-container relative">
      <button
        onClick={toggleFullscreen}
        className="btn btn-xs text-white hover:bg-slate-50 hover:text-black text-sm absolute top-1 right-2 z-10"
      >
        <RiFullscreenLine />
      </button>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="rounded-2xl w-full"
      >
        <source src="/video/I-dai.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls */}
      {/* <div className="flex justify-between items-center mt-4">
         <div className="flex items-center gap-2">
          <label htmlFor="volume" className="text-sm">
            Volume:
          </label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue="1"
            onChange={changeVolume}
            className="slider"
          />
        </div>

       </div> */}
    </div>
  );
}
