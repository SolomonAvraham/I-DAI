import Image from "next/image";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { getServerSession } from "next-auth/next";

const imageURL =
  "https://images.pexels.com/photos/3992945/pexels-photo-3992945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

export const metadata: Metadata = {
  title: "You Probably Will Die Of COVID-19",
  description: "Do you want to know your destiny? click here!",
  openGraph: {
    title: "You Probably Will Die Of COVID-19",
    description: "Do you want to know your destiny? click here!",
    url: "https://i-dai.com",
    siteName: "I-DAI",
    images: [
      {
        url: imageURL,
        width: 1200,
        height: 630,
        alt: "Result",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "You Probably Will Die Of COVID-19",
    description: "Do you want to know your destiny? click here!",
    images: [imageURL],
  },
};

export default async  function SharePage() {
const session = await getServerSession();

  return (
    <>
      <Head>
        <meta property="og:title" content="You Probably Will Die Of COVID-19" />
        <meta
          property="og:description"
          content="Do you want to know your destiny? click here!"
        />
        <meta property="og:image" content={imageURL} />
        <meta property="og:url" content="https://i-dai.com/result" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content={process.env.FACEBOOK_CLIENT_ID} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://i-dai.com/result" />
        <meta
          name="twitter:title"
          content="You Probably Will Die Of COVID-19"
        />
        <meta
          name="twitter:description"
          content="Do you want to know your destiny? click here!"
        />
        <meta name="twitter:image" content={imageURL} />
        <meta
          name="twitter:image:alt"
          content="An exciting personality quiz result"
        />
      </Head>
      <div className="relative min-h-screen py-10 bg-gray-100 flex items-center justify-center">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={"/video/skull.mp4"}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay for Opacity */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center flex flex-col items-center justify-center gap-10 text-white">
          <div className="w-10/12 md:w-full">
            <h3 className="text-left font-semibold text-3xl md:text-6xl">
              Here is
            </h3>
            <h1 className="text-4xl tracking-wide md:text-8xl font-bold ">
              <span className="text-5xl md:text-8xl text-red-700">
                {session?.user?.name || "YOUR"}
              </span>{" "}
              Result:
            </h1>{" "}
            <hr className="border-t w-full mt-4 mx-auto mb-6 opacity-35  " />{" "}
            <p className="text-5xl font-bold text-red-700 md:text-8xl">
              COVID-19
            </p>
          </div>

          <Image
            src={imageURL}
            alt="Image"
            width={500}
            height={500}
            className=" h-auto w-1/2 md:w-3/4 rounded-lg mb-6 "
          />
          <h3 className="text-2xl md:text-4xl font-semibold">
            Stay cautious and stay safe!
          </h3>
          <button className="px-3 py-3 md:py-5 md:px-4 text-lg md:text-4xl bg-slate-900 text-white rounded-lg hover:bg-slate-700 focus:outline-none">
            <Link href="/?trigger=true">
              Do you want to know your destiny?
              <br />
              CLICK HERE!
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
