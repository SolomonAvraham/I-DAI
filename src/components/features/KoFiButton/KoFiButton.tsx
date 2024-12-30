"use client";
import React from "react";
import Image from "next/image";

const KoFiButton: React.FC = () => {
  const handleKoFiClick = () => {
    window.open("https://ko-fi.com/drztl", "_blank");
  };

  return (
    <div
      onClick={handleKoFiClick}
      className="mx-auto md:fixed bottom-4 left-3 md:flex items-center justify-center cursor-pointer "
    >
      <Image
        src="/icons/Ko-Fi/support_me_on_kofi_badge_dark.png"
        alt="Ko-fi Logo"
        width={170}
        height={170}
        className="animate-bounce"
      />
    </div>
  );
};

export default KoFiButton;
