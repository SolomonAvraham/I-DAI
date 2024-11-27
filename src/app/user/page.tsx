import Link from "next/link";
import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

export default function VerifyUser() {
  return (
    <div className=" h-screen">
      <h1 className="text-7xl py-5 font-bold text-center">Welcome to I-DAI</h1>
      <hr className="border-t" />
      <div className="flex flex-col py-24  gap-10 items-center h-full">
        <div className="flex items-center gap-4">
          <span className="text-8xl animate-pulse">
            <FaLongArrowAltRight />
          </span>
          <div className="card bg-black hover:bg-slate-700">
            <Link href={"/user/survey"}>
              <div className="card-body text-5xl text-white">Survey</div>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="card bg-black hover:bg-slate-700">
            <Link href={"/user/profile"}>
              <div className="card-body text-5xl text-white">Profile</div>
            </Link>
          </div>{" "}
          <span className="text-7xl animate-pulse">
            <FaLongArrowAltLeft />
          </span>
        </div>{" "}
      </div>
    </div>
  );
}
