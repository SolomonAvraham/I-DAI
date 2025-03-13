import type { Metadata,  Viewport } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/providers/sessionProvider/sessionProvider";
import FloatingBubble from "@/components/features/floatingBubble/floatingBubble";
import QueryProvider from "@/components/providers/queryProvider/queryProvider";
import Navbar from "@/components/layouts/nav/nav";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

 

const imageUrl = "/images/Death due to extreme laughter.jpg";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // This should be 180x180px
  },
  manifest: "/manifest.json",
  applicationName: "I-DAI",
  keywords: [
    "personality quiz",
    "death prediction",
    "fortune telling",
    "online quiz",
    "entertainment",
    "destiny",
    "fate",
    "personality test",
    "fun quiz",
    "death quiz",
  ],
  creator: "Dev-Sol",
  authors: [{ name: "I-DAI Team" }],
  publisher: "I-DAI",
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
    images: [imageUrl],
  },
  verification: {
    google: "6weViLacn2yP7-SoVboEMltL6voLiTGSMUBfJphiWqI",
  },
  alternates: {
    canonical: "https://www.i-dai.com/",
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
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "i-dai",
              url: "https://www.i-dai.com",
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="6weViLacn2yP7-SoVboEMltL6voLiTGSMUBfJphiWqI"
        />
      </head>
      <body className="">
        <SessionProvider session={session}>
          <QueryProvider>
            <header className="">
              <Navbar />
            </header>{" "}
            <main className="">{children}</main>
          </QueryProvider>
        </SessionProvider>
        <FloatingBubble />
      </body>
    </html>
  );
}
