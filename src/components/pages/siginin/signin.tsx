 "use client";

import CountdownTimer from "@/components/ui/counter/counter";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SignInProps {
  providers: Record<string, any> | null;
}

const SignIn: React.FC<SignInProps> = ({ providers }) => {
  const router = useRouter();

  const handleGuest = async () => {
    try {
      await signOut({ redirect: false });

      localStorage.removeItem("questionnaireProgress");
      router.refresh();
      router.push("/user/questions");
    } catch (error) {
      console.error("Error entering as guest:", error);
    }
  };

  if (!providers) {
    return <div>No providers available</div>;
  }

  return (
    <div className="text-black flex flex-col items-center justify-center h-screen bg-gray-50 px-5">
      <h1 className="text-lg md:text-4xl tracking-wide font-bold mb-8 text-center md:px-5">
        You can continue using our system without signing up or paying a dime.
        But here’s the twist: we’re on a mission to find the one person who
        actually died laughing—and that could be you! Sign up to help us connect
        and make history together.
      </h1>

      <div className="flex flex-col items-center justify-center py-7">
        {Object.values(providers).map((provider: any) => (
          <button
            key={provider.name}
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="flex items-center  justify-center gap-2 mb-4 px-6 py-3 md:px-12 md:py-8 md:text-2xl border border-gray-300 bg-white text-gray-600 rounded-2xl hover:bg-gray-100 shadow-md"
          >
            <img
              src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000" // You can use a local or online Google logo
              alt="Google logo"
              className="w-5 h-5 md:w-10 md:h-10"
            />
            Sign in with {provider.name}
          </button>
        ))}
        <button
          onClick={handleGuest}
          className="flex items-center  justify-center gap-2 mb-4 px-6 py-3 md:px-12 md:py-8 md:text-2xl border border-gray-300 bg-white text-gray-600 rounded-2xl hover:bg-gray-100 shadow-md"
        >
          Enter as a guest{" "}
        </button>
      </div>
      <CountdownTimer />
    </div>
  );
};

export default SignIn;
