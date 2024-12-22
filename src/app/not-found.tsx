import React from "react";
import Link from "next/link";
import VideoBackground from "@/components/layouts/nav/videoBackground";

const NotFoundPage = () => {
  return (
    <div className=" text-white relative flex justify-center items-center h-screen  text-center">
<VideoBackground/>
      <div>
        <h1 className="text-6xl md:text-9xl font-bold ">404</h1>
        <h1 className="text-3xl md:text-6xl font-bold ">Page Not Found</h1>
        <p className="text-lg md:text-xl mt-4">
          Oops! The page you are looking for doesn&#39;t exist.
        </p>
        <button className="mt-6 btn text-white text-xl">
          <Link href="/">Go Home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
