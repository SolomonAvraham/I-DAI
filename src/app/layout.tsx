import type { Metadata, MetadataRoute, Viewport } from "next";
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

export function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/", "/static/"],
    },
    sitemap: "https://i-dai.com/sitemap.xml",
    host: "https://i-dai.com",
  };
}

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
    google: process.env.GOOGLE_CLIENT_SECRET,
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
      </head>
      <body className="">
        <SessionProvider session={session}>
          <QueryProvider>
            <main className="min-high-screen">
              <header className="">
                <Navbar />
              </header>
              {children}
            </main>
          </QueryProvider>
        </SessionProvider>
        <FloatingBubble />
      </body>
    </html>
  );
}
