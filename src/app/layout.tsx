import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/providers/sessionProvider/sessionProvider";
import FloatingBubble from "@/components/features/floatingBubble/floatingBubble";
import QueryProvider from "@/components/providers/queryProvider/queryProvider";
import Navbar from "@/components/layouts/nav/nav";

const imageUrl =
  "https://images.pexels.com/photos/1270184/pexels-photo-1270184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

export const metadata: Metadata = {
  metadataBase: new URL("https://i-dai.com"),
  title: {
    default: "I-DAI - Discover Your fate",
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
      <body className="min-h-screen  ">
        <SessionProvider session={session}>
          <QueryProvider>
            <header className="rounded-b-2xl ">
              <Navbar />
            </header>
            {children}
          </QueryProvider>
        </SessionProvider>
        <FloatingBubble />
      </body>
    </html>
  );
}
