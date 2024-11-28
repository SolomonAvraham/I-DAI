import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import Head from "next/head";

const imageUrl =
  "https://plus.unsplash.com/premium_photo-1674850274669-c6cb57ea5265?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const metadata: Metadata = {
  title: "You Probably Will Die Of COVID-19",
  description: "Do you want to know your destiny? click here!",
  openGraph: {
    title: "You Probably Will Die Of COVID-19",
    description: "Do you want to know your destiny? click here!",
    url: "https://i-dai.com/share/",
    siteName: "I-DAI",
    images: [
      {
        url: imageUrl,
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
    images: [imageUrl],
  },
};

export default function SharePage() {
  return (
    <>
      <Head>
        <meta property="og:title" content="You Probably Will Die Of COVID-19" />
        <meta
          property="og:description"
          content="Do you want to know your destiny? click here!"
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content="https://i-dai.com/share" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content={process.env.FACEBOOK_CLIENT_ID} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://i-dai.com/share" />
        <meta
          name="twitter:title"
          content="You Probably Will Die Of COVID-19"
        />
        <meta
          name="twitter:description"
          content="Do you want to know your destiny? click here!"
        />
        <meta name="twitter:image" content={imageUrl} />
        <meta
          name="twitter:image:alt"
          content="An exciting personality quiz result"
        />
      </Head>
      <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
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
        <div className="relative z-10 text-center flex flex-col py-16 gap-6 items-center justify-center text-white">
          <h1 className="text-4xl md:text-8xl tracking-widest font-bold mb-4">
            Your Result
          </h1>
          <hr className="border-t w-1/2 mx-auto mb-6 bg-gray-400" />
          <h2 className="text-lg md:text-4xl mb-6">
            Based on your answers, your predicted death is due to COVID-19.
          </h2>
          <Image src={imageUrl} alt="Image" width={300} height={300} />

          <h3 className="text-lg md:text-4xl mb-6">
            Stay cautious and stay safe!
          </h3>
          <button className="mt-6 py-5 px-4 text-5xl bg-slate-900 text-white rounded-lg hover:bg-slate-700 focus:outline-none">
            <Link href={"/"}>
              Do you want to know your destiny? Click here!
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
