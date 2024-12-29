"use client";

import ShareButtons from "@/components/features/buttons/shareButtons";
import { signOutSession } from "@/services/userService";
import useUserStore from "@/store/userStore";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type ResultsPageProps = {
  name: string;
  result: string;
  image: string;
  email: string;
  id: string;
  resultImage: string;
};

const ResultsPage = (userResult: ResultsPageProps) => {
  const { name, resultImage, result, image, email, id } = userResult;
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { setUser } = useUserStore();

  useEffect(() => {
    if (!email) {
      setShowModal(true);
      setTimeout(() => setShowButton(true), 3500);
    }
  }, [email]);

  useEffect(() => {
    async function signOutAndSetUser() {
      await signOutSession();

      await signOut({ redirect: false });

      setUser({ name, id, image });

      localStorage.removeItem("questionnaireProgress");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
    }

    signOutAndSetUser();
  }, []);

  const shareUrl = `https://i-dai.com/result/${id}`;
  //const shareTitle = "I Discovered My Life Expectancy Risk Factors";
  //const shareDescription = `Discovered your destiny. Will you dare to know yours?`;

  return (
    <div className=" flex flex-col items-center justify-center px-1">
      {showModal && (
        <div className="modal modal-open">
          <div
            className="modal-box bg-slate-800 cursor-pointer grid place-items-center text-white"
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

            <button
              onClick={() => setShowModal(false)}
              className="btn btn-outline text-white text-xl mt-3"
              disabled={!showButton}
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* <div className="bg-white shadow-xl rounded-lg p-2 w-[48rem] max-w-2xl lg:w-[45rem] mx-auto">   */}
        <div className="text-center py-5 mb-1">
          <h1 className="text-2xl md:text-4xl tracking-wide py-2  font-bold ">
            No one knows when, But we know how{" "}
            <span className="text-red-700 ">{name ?? "Guest"}</span> Will leave
            the world:
          </h1>
          <hr className="border-t w-full md:w-1/2 mx-auto" />
          <p className="text-4xl md:text-5xl text-red-700 font-bold tracking-wider mt-3">
            {result || "Unknown"}
          </p>
        </div>
        <Image
          src={resultImage ?? "/images/i-dai.png"}
          alt={result.toString() ?? "Unknown"}
          width={500}
          height={500}
          loading="lazy"
          quality={75}
          placeholder="blur"
          blurDataURL={image ?? "/images/i-dai.png"}
          className="w-full h-auto rounded-lg"
        />
        <div className="mb-6 text-center mt-10">
          <ShareButtons
            shareUrl={shareUrl}
            image={image ?? "/images/unknown.jpg"}
          />
        </div>
        <hr className="border-t py-3 w-1/2 mx-auto" />{" "}
        <h2 className="text-xl lg:text-2xl font-semibold text-center">
          Thanks for sharing your data with the world
        </h2>
      {/* </div> */}
    </div>
  );
};

export default ResultsPage;
