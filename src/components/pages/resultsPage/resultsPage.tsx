"use client";

import ShareButtons from "@/components/features/buttons/shareButtons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type ResultsPageProps = {
  name: string;
  result: string;
  image: string;
};

const ResultsPage = (userResult: ResultsPageProps, id: string) => {
  const { name, result, image } = userResult;
  const { data } = useSession();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!data) {
      setTimeout(() => {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      }, 2300);
    }
  }, [data]);

  const shareUrl = `https://i-dai.com/results/${id}`;
  const shareTitle = "I Discovered My Life Expectancy Risk Factors";
  const shareDescription = `Discovered your destiny. Will you dare to know yours?`;

  return (
    <div className="min-h-screen text-gray-700 bg-gray-100 flex flex-col items-center justify-center p-4">
      {showModal && (
        <div className="modal modal-open" onClick={() => setShowModal(false)}>
          <div
            className="modal-box cursor-pointer  text-white "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-3xl text-center">Heads Up!</h2>
            <hr className="border-t mt-2 mb-2 opacity-20" />
            <p className="text-lg text-center">
              Just a heads-up! This page is like a shooting star—one-time only.
              Feel free to share it as much as you like, but once you leave,
              poof! It’s gone forever (that’s the guest life). So, don’t let it
              slip away!
            </p>
          </div>
        </div>
      )}
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl lg:w-[45rem] w-full ">
        <div className="text-center py-5 mb-1">
          <h1 className="text-2xl md:text-4xl tracking-wide py-2  font-bold ">
            No one knows when, But we know how{" "}
            <span className="text-red-700 ">{name ?? "Guest"}</span> Will leave
            the world because of:
          </h1>
          <hr className="border-t w-full md:w-1/2 mx-auto" />
          <p className="text-4xl md:text-5xl text-red-700 font-bold tracking-wider mt-3">
            {result || "Unknown"}
          </p>
        </div>
        <Image
          src={image ?? "/images/unknown.jpg"}
          alt={result.toString() ?? "Unknown"}
          width={500}
          height={500}
          loading="lazy"
          quality={75}
          placeholder="blur"
          blurDataURL={image ?? "/images/unknown.jpg"}
          className="w-full h-auto rounded-lg"
        />
        <div className="mb-6 text-center mt-10">
          <ShareButtons
            shareUrl={shareUrl}
            title={shareTitle}
            description={shareDescription}
            image={image ?? "/images/unknown.jpg"}
          />
        </div>
        <hr className="border-t py-3 w-1/2 mx-auto" />{" "}
        <h2 className="text-xl lg:text-2xl font-semibold text-center">
          Thanks for sharing your data with the world
        </h2>
      </div>
    </div>
  );
};

export default ResultsPage;
