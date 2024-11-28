"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
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

  // useEffect(() => {
  //   const hasAgreed = Cookies.get("termsAgreed");
  //   if (hasAgreed) {
  //     router.push("/api/signin");
  //   }
  // }, [router]);

  const handleCheckboxChange = (key: string) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleAgree = () => {
    if (isChecked.is18Plus && isChecked.agreeTerms) {
      //Cookies.set("termsAccepted", "true", { expires: 365 });
      router.push("/api/signin");
    } else {
      alert("Please check all required boxes.");
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed  text-black inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-1  md:top-3 md:text-2xl left-3  md:left-5 text-gray-500 hover:text-gray-800 hover:scale-125 transition-transform"
          onClick={handleClose}
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold   text-center">
          You Must Be 18+ years old to Enter
        </h2>
        <hr className="border-t py-3 mt-2 w-3/4 mx-auto border-gray-300" />

        {/* Terms Text */}
        <div className="max-h-60 px-34 overflow-y-auto border p-4 rounded-md bg-gray-50 text-black mb-4">
          <h1 className="text-2xl font-bold text-center">
            Privacy Policy and Terms of Use
          </h1>
          <h3 className="text-gray-600 text-sm  mb-4 text-center">
            Last Updated: November 24, 2024
          </h3>

          {termsAndPolicy.sections.map((section) => (
            <div key={section.content}>
              <h1 className="text-lg font-bold text-center mb-2">
                {section.content}
              </h1>
              {section.subsections.map((sub, i) => (
                <div className="pb-2" key={sub.content}>
                  <hr
                    key={i}
                    className="border-t mb-2 w-2/4 mx-auto border-gray-300"
                  />
                  <h2 className="text-md font-bold">{sub.content}</h2>
                  {sub.details.map((detail, idx) => {
                    if (detail.type === "paragraph") {
                      return (
                        <p className="font-serif" key={idx}>
                          {detail.content}
                        </p>
                      );
                    } else if (detail.type === "list" && detail.items) {
                      return (
                        <ul key={idx} className="list-disc ml-5 font-serif">
                          {detail.items.map((item, listIdx) => (
                            <li key={listIdx}>{item}</li>
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
        <div className="flex flex-col gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-primary mr-2"
              checked={isChecked.is18Plus}
              onChange={() => handleCheckboxChange("is18Plus")}
              required
            />
            <span className="text-sm font-semibold">I AM 18+ YEARS OLD</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-primary mr-2"
              checked={isChecked.agreeTerms}
              onChange={() => handleCheckboxChange("agreeTerms")}
              required
            />
            <span className="text-sm font-semibold">
              I HAVE READ AND AGREE TO THE TERMS OF USE AND PRIVACY POLICY.
            </span>
          </label>
          <button
            onClick={handleAgree}
            className="btn bg-slate-800 text-white text-3xl tracking-wide hover:bg-slate-600 w-full"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
