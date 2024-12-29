import KoFiButton from "@/components/features/KoFiButton/KoFiButton";
 
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-gray-100 flex flex-col items-center justify-center min-h-screen">
      <div className=" bg-gray-100 p-6">{children}</div>
      <KoFiButton />
    </div>
  );
}
