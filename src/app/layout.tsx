import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/sessionProvider/sessionProvider";
import FloatingBubble from "@/components/ui/floatingBubble/floatingBubble";

const imageUrl =
  "https://images.pexels.com/photos/1270184/pexels-photo-1270184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

export const metadata: Metadata = {
  metadataBase: new URL("https://i-dai.com"),
  title: {
    default: "I-DAI - Discover Your Faith",
    template: "%s | I-DAI Personality Quiz",
  },
  description: "Explore quizzes and discover insights with I-DAI.",
  openGraph: {
    title: "I-DAI - Discover Your Fate",
    description: "Explore quizzes and discover insights with I-DAI.",
    url: "https://i-dai.com",
    siteName: "I-DAI",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "I-DAI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I-DAI - Discover Your Fate",
    description: "Explore quizzes and discover insights with I-DAI.",
    images: [imageUrl], // Replace with your actual Twitter card image path
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "your-google-site-verification-code", // Replace with actual verification code if used
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
        <title>I-DAI - Predict How You Will Die</title>
        <meta
          name="description"
          content="I-DAI predicts how you will die based on your answers to various questions. A fun and insightful experience."
        />
        <meta
          name="keywords"
          content="death prediction, future prediction, health, I-DAI, answers, mortality"
        />
        <meta name="author" content="Dev-Sol" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="I-DAI | Predict How You Will Die" />
        <meta
          property="og:description"
          content="I-DAI predicts how you will die based on your answers to various questions. A fun and insightful experience."
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content="https://i-dai.com" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen  ">
        <SessionProvider session={session}>{children}</SessionProvider>
        <FloatingBubble />
      </body>
    </html>
  );
}
