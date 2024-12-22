import React from "react";

export default function VideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed -z-10 top-0 bottom-0 right-0 left-0 w-full   mx-auto h-full object-cover opacity-95"
    >
      <source src="/video/skull.mp4" type="video/mp4" />
    </video>
  );
}
