"use client";

import TermsPopup from "@/components/ui/popups/termsPopup";
//import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function HomePageButton() {
  //const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    //router.push("/api/auth/signin");
    //router.push("/api/auth/signin");

    setShowPopup(true);
  };
  return (
    <>
      {" "}
      <button
        onClick={handleClick}
        className="bg-slate-800  hover:bg-slate-600 px-6 py-3 justify-center rounded-md text-white flex flex-col font-bold text-xl md:text-3xl lg:text-5xl xl:text-6xl tracking-widest"
      >
        Do you want to know how will you die?
      </button>
      <TermsPopup showPopup={showPopup} setShowPopup={setShowPopup} />
    </>
  );
}
