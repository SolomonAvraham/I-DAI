import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  const pageTitle = "Ultimate Personality Quiz";
  const description = `Discover your personalized quiz results for ID: ${id}!`;
  const shareUrl = `https://i-dai.com/share/${id}`;
  const imageUrl =
    "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800&h=600&fit=crop&auto=format";

  return {
    title: pageTitle,
    openGraph: {
      title: pageTitle,
      description,
      url: shareUrl,
      images: [
        {
          url: imageUrl,
          alt: "Quiz Result Image",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  };
}

export default function SharePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const description = `Discover your personalized quiz results for ID: ${id}!`;
  const imageUrl =
    "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800&h=600&fit=crop&auto=format";

  return (
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
      </div>
    </div>
  );
}
