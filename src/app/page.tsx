import HomePageButton from "@/components/ui/buttons/homePageButton";

export default function Home() {
  return (
    <div className="bg-black bg-opacity-5  relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute -z-10 top-0 bottom-0 right-0 left-0 w-full h-full object-cover opacity-95"
      >
        <source src="/video/skull.mp4" type="video/mp4" />
      </video>
      <div className="flex flex-col p-11 z-10 gap-20 text-white justify-center items-center h-screen">
        <div className="text-center font-bold tracking-widest">
          <h2 className="-tracking-wider text-left  lg:text-6xl xl:text-7xl text-4xl">
            Statistically Speaking:
          </h2>
          <h1 className="lg:text-7xl xl:text-9xl text-4xl text-center">
            While Life Ends, Data Lives
          </h1>
        </div>
        <HomePageButton />
      </div>
    </div>
  );
}
