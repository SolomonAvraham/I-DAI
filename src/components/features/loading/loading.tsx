import React from "react";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="loading loading-spinner loading-xs md:loading-lg"></div>
    </div>
  );
}
