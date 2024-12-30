import KoFiButton from "@/components/features/KoFiButton/KoFiButton";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative  bg-gray-100 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full bg-gray-100">{children}</div>
      <span className="py-10 md:py-0">
        <KoFiButton />
      </span>
    </div>
  );
}
