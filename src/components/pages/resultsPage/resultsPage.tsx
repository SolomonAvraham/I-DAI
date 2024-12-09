"use client";

import { useRouter } from "next/navigation";
import ShareButtons from "@/components/ui/buttons/shareButtons";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ResultsPage: React.FC = () => {
  const router = useRouter();
  const { data } = useSession();

  const imageURL =
    "https://images.pexels.com/photos/3992945/pexels-photo-3992945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const shareUrl = "https://i-dai.com/result";
  const shareTitle = "I Discovered My Life Expectancy Risk Factors";
  const shareDescription = `I took the How Will You Die assessment and learned about my potential health risks. Check it out!`;

  return (
    <div className="min-h-screen text-gray-700 bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl lg:w-[45rem] w-full ">
        <div className="text-center py-5 mb-1">
          <h3 className="text-3xl text-left md:text-4xl font-bold ">
            Hey <span className="text-red-700">{data?.user?.name}</span>,
          </h3>
          <hr className="border-t w-full md:w-1/2" />
          <h1 className="text-2xl md:text-5xl py-2  font-bold ">
            You Might Die From:
          </h1>{" "}
          <p className="text-4xl md:text-6xl text-red-700 font-bold tracking-wider mt-3">COVID-19</p>
        </div>
        <Image
          src={imageURL}
          alt="Result Share Image"
          width={500}
          height={500}
          className="w-full h-auto rounded-lg"
        />
        <div className="mb-6 text-center mt-10">
          <h2 className="text-xl lg:text-2xl font-semibold">
            Share Your Results
          </h2>
          <hr className="border-t mt-3 w-1/2 mx-auto" />

          <ShareButtons
            shareUrl={shareUrl}
            title={shareTitle}
            description={shareDescription}
            image={imageURL}
          />
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push("/user/questions")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Retake Assessment
          </button>
          <button
            onClick={() => router.push("/user")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
