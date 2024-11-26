import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/sessionProvider/sessionProvider";

export const metadata: Metadata = {
  title: "I-DAI",
  description: "How do i die?",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="min-h-screen ">
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
