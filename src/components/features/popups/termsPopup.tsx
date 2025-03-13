"use client";

import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMdMail } from "react-icons/io";

interface DetailItem {
  type: string;
  content?: string;
  items?: string[];
}

interface Subsection {
  type: string;
  content: string;
  details: DetailItem[];
}

interface Section {
  type: string;
  content: string;
  subsections: Subsection[];
}

import { termsAndPolicy } from "@/utils/termsAndPolicy";

export default function TermsPopup({
  showPopup,
  setShowPopup,
}: {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState<{
    [key: string]: boolean;
  }>({
    is18Plus: false,
    agreeTerms: false,
  });

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  const handleCheckboxChange = (key: string) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleAgree = () => {
    if (isChecked.is18Plus && isChecked.agreeTerms) {
      router.push("/signin");
    } else {
      alert("Please check all required boxes.");
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed  text-black top-0 bottom-0 left-0 right-0 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto border-[1px] border-black relative">
        {/* Close Button */}
        <button
          className="absolute  top-2 right-2 md:top-3 md:right-3 text-xl md:text-2xl text-gray-500 hover:text-gray-800 hover:scale-110 transition-transform"
          onClick={handleClose}
        >
          ✕
        </button>

        {/* Header */}
        <div className="p-4 md:pt-10">
          <h2 className="md:text-xl  font-bold text-center mb-4">
            You Must Be 18+ years old to Enter
          </h2>
          <hr className="border-t w-3/4 mx-auto border-gray-300" />
        </div>

        {/* Terms Text */}
        <div className="max-h-60 md:max-h-72 mx-4 md:mx-6 overflow-y-auto border-[0.5px] border-black p-4 rounded-md bg-gray-50 text-black mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-center">
            Privacy Policy and Terms of Use
          </h1>
          <h3 className="text-gray-600 text-sm mb-4 text-center">
            Last Updated: November 24, 2024
          </h3>

          {termsAndPolicy.sections.map((section: Section) => (
            <div key={section.content} className="mb-6">
              <h1 className="text-lg md:text-xl font-bold text-center mb-2">
                {section.content}
              </h1>
              {section.subsections.map((sub: Subsection) => (
                <div className="pb-2" key={sub.content}>
                  <hr className="border-t mb-2 w-2/4 mx-auto border-gray-300" />
                  <h2 className="text-md md:text-lg font-bold">
                    {sub.content}
                  </h2>
                  {sub.details.map((detail: DetailItem, idx: number) => {
                    if (detail.type === "paragraph") {
                      return (
                        <p
                          className={`
                            ${
                              sub.content === "9. Contact Information" &&
                              "flex flex-col items-center gap-1"
                            }
                            font-serif text-sm md:text-base mb-2`}
                          key={idx}
                        >
                          {detail.content}
                          {sub.content === "9. Contact Information" && (
                            <a className='text-2xl' href="mailto:zvitubul@gmail.com" target="_blank">
                              <IoMdMail />
                            </a>
                          )}
                        </p>
                      );
                    } else if (detail.type === "list" && detail.items) {
                      return (
                        <ul
                          key={idx}
                          className="list-disc ml-5 font-serif text-sm md:text-base"
                        >
                          {detail.items.map((item: string, listIdx: number) => (
                            <li key={listIdx} className="mb-1">
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Checkbox & Verification Button */}
        <div className="flex flex-col gap-4 p-4 md:p-6 justify-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 border-2 border-black rounded appearance-none checked:bg-slate-800 checked:border-slate-800 cursor-pointer"
              checked={isChecked.is18Plus}
              onChange={() => handleCheckboxChange("is18Plus")}
              required
            />
            <span className="text-sm flex-1 font-semibold">
              I AM 18+ YEARS OLD
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 h-4 w-5 border-2 border-black rounded appearance-none checked:bg-slate-800 checked:border-slate-800 cursor-pointer"
              checked={isChecked.agreeTerms}
              onChange={() => handleCheckboxChange("agreeTerms")}
              required
            />
            <span className="text-xs md:text-sm font-semibold">
              I HAVE READ AND AGREE TO THE TERMS OF USE AND PRIVACY POLICY.
            </span>
          </label>
          <button
            onClick={handleAgree}
            className="btn bg-slate-800 text-white text-xl md:text-2xl tracking-wide hover:bg-slate-600 w-full py-2 rounded-md transition-colors"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
