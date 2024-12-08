import Navbar from "@/components/features/nav/nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        {children}
      </div>
    </div>
  );
}
