import Image from "next/image";
import Head from "next/head";

 
export default function SharePage( ) {
 // const { id } = params;

  const pageTitle = "Ultimate Personality Quiz";
  const description = `Discover your personalized quiz results for ID: !`;
  const shareUrl = `https://i-dai.com/share/`;
  const imageUrl =
    "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800&h=600&fit=crop&auto=format";

  return (
    <>
      <Head>
        {/* Basic HTML Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={shareUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={imageUrl} />

        {/* Additional SEO Tags */}
        <link rel="canonical" href={shareUrl} />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8 max-w-xl">
          <h1 className="text-2xl font-bold mb-4 text-blue-800">Quiz Result</h1>
          <Image
            src={imageUrl}
            alt="Quiz Result"
            width={300}
            height={300}
            className="rounded-lg mb-4"
          />
          <p className="text-lg text-gray-700">{description}</p>
          <div className="mt-4 text-sm text-gray-500">Share ID fffff</div>
        </div>
      </div>
    </>
  );
}
