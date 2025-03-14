import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import VideoBackground from "@/components/layouts/videos/videoBackground";
import { redirect } from "next/navigation";
import { getResult } from "@/services/userService";
import { BASE_URL } from "@/utils/axiosInstance";

// Dynamic metadata generation based on search params
type PageParams = {
  params: Promise<{ id: string }>;
};

// Metadata generation function
export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;

  const userResult = await getResult(id);

  if (!userResult || userResult.message) {
    return {
      title: "Discover Your Destiny - Death Prediction Quiz",
      description:
        "Take our quiz to uncover how your story might end. Are you brave enough to know?",
    };
  }

  const { name, resultImage } = userResult;
  const baseUrl = BASE_URL || "https://i-dai.com";
  const imageURL = resultImage || `${baseUrl}/images/unknown.jpg`;

  return {
    metadataBase: new URL(baseUrl),
    keywords: [
      "death prediction",
      "fortune telling",
      "destiny reveal",
      "future prediction",
      "personality quiz",
      "fate quiz",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    title: `${name}'s Destiny Has Been Revealed!`,
    description: `${name} just discovered their fate. Want to know yours? Take the quiz now!`,
    openGraph: {
      title: `${name}'s Death Prediction Result`,
      description: `${name} discovered their destiny. Will you dare to know yours?`,
      url: `${baseUrl}/result/${id}`,
      siteName: "I-DAI | Death Prediction",
      images: [
        {
          url: imageURL,
          width: 1200,
          height: 630,
          alt: `${name}'s destiny prediction result`,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name}'s Death Prediction Result`,
      description: `${name} just discovered their destiny. Are you brave enough to know yours?`,
      images: [imageURL],
      creator: "@Dev-Sol",
    },
    verification: {
      google: "6weViLacn2yP7-SoVboEMltL6voLiTGSMUBfJphiWqI",
    },
    alternates: {
      canonical: `${baseUrl}/result/${id}`,
    },
  };
}

export default async function PublicResultPage({ params }: PageParams) {
  const { id } = await Promise.resolve(params);
  const userResult = await getResult(id);

  if (
    userResult.message === "User not found" ||
    userResult.message === "Invalid ID format"
  ) {
    return redirect("/");
  }

  if (
    userResult.message === "User not submitted" ||
    userResult.message === "User has no result"
  ) {
    return redirect("/user/questions");
  }

  const { name, result, resultImage } = userResult;

  return (
    <div className="relative min-h-screen">
      <VideoBackground />

      <div className="relative container mx-auto z-10 text-center flex flex-col items-center justify-center gap-2 text-white">
        <div className="text-center py-1 mb-1 md:w-4/5">
          <h1 className="text-2xl md:text-6xl tracking-wide py-2 font-bold">
            No one knows when, But we know how{" "}
            <span className="text-red-700">{name ?? "Guest"}</span> Will leave
            the world:
          </h1>
          <hr className="border-t opacity-15 w-full md:w-1/2 mx-auto" />
          <p className="text-4xl md:text-6xl text-red-700 font-bold tracking-wider mt-3">
            {result || "Unknown"}
          </p>
          <hr className="border-t mt-3 opacity-15 w-full md:w-1/2 mx-auto" />
        </div>

        <div className="w-5/6 md:w-[35%]">
          <Image
            src={resultImage ?? "/images/unknown.jpg"}
            alt={result?.toString() ?? "Unknown"}
            width={500}
            height={500}
            loading="lazy"
            quality={75}
            placeholder="blur"
            blurDataURL={resultImage ?? "/images/unknown.jpg"}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <h3 className="text-2xl md:text-4xl font-semibold">
          Stay cautious and stay safe!
        </h3>

        <button className="px-3 py-3 md:py-5 md:px-7 text-lg md:text-4xl bg-slate-900 text-white rounded-lg hover:bg-slate-700 focus:outline-none">
          <Link href="/?trigger=true">
            Do you want to know your destiny?
            <br />
            CLICK HERE!
          </Link>
        </button>
      </div>
    </div>
  );
}
