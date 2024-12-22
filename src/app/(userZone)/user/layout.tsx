import KoFiButton from "@/components/features/KoFiButton/KoFiButton";
 
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        {children}
      </div>
      <KoFiButton />
    </div>
  );
}
