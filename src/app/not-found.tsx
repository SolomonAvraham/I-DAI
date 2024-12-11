import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className=" text-white relative flex justify-center items-center h-screen  text-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute -z-10 top-0 bottom-0 right-0 left-0 w-full h-full object-cover opacity-95"
      >
        <source src="/video/skull.mp4" type="video/mp4" />
      </video>{" "}
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
