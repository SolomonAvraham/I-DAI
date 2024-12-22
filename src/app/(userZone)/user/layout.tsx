import KoFiButton from "@/components/features/KoFiButton/KoFiButton";
import Navbar from "@/components/layouts/nav/nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <header>
        <Navbar />
      </header>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        {children}
      </div>
      <KoFiButton />
    </div>
  );
}
