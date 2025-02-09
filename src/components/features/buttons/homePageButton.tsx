"use client";

import TermsPopup from "@/components/features/popups/termsPopup";
import React, { useEffect, useState } from "react";

type HomePageButtonProps = {
  triggerButton?: boolean;
  onButtonTriggered?: () => void;
};

export default function HomePageButton({
  triggerButton = false,
  onButtonTriggered,
}: HomePageButtonProps) {
  //const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
    onButtonTriggered?.();
  };

  useEffect(() => {
    if (triggerButton) {
      handleClick();
    }
  }, [triggerButton]);
  return (
    <>
      <button
        onClick={handleClick}
        className="bg-slate-800  hover:bg-slate-600 px-6 py-3 justify-center rounded-md text-white flex flex-col font-bold text-xl md:text-3xl  xl:text-5xl tracking-widest"
      >
        START
      </button>
      <TermsPopup showPopup={showPopup} setShowPopup={setShowPopup} />
    </>
  );
}
