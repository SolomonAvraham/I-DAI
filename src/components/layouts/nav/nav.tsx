"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { signOutSession } from "@/services/userService";

export default function Navbar() {
  const router = useRouter();
  const [hideUserInfo, setHideUserInfo] = useState(true);
  const usePathName = usePathname();
  const { data: session } = useSession();

  const { name, image, setUser, clearUser } = useUserStore();

  useEffect(() => {
    const isUserResult = usePathName.startsWith("/user/result");

    if (usePathName === "/user/questions" || isUserResult) {
      setHideUserInfo(false);
    }
  }, [usePathName]);

  useEffect(() => {
    const user = session?.user;
    if (user) {
      setUser({ name: user.name, image: user.image });
    }
  }, [session]);

  useEffect(() => {
    const storedName = localStorage.getItem("name");

    if (!name) {
      setUser({ name: storedName });
    }
  }, [name]);

  async function handleSignOut() {
    await signOutSession();
    await signOut({ callbackUrl: "/" });

    clearUser();
    localStorage.removeItem("questionnaireProgress");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
  }
  const routing =
    usePathName === "/signin" ||
    usePathName === "/user/questions" ||
    usePathName.startsWith("/user/result");

  return (
    <nav
      className={`
        ${routing ? "bg-gray-100" : "bg-transparent"}
        navbar  text-black flex items-center justify-between md:px-6 md:py-2 z-50`}
    >
      <button
        onClick={() => {
          router.refresh();
          router.push("/");
        }}
        className={` 
          ${routing ? "text-black" : "text-white"}

          order-1 tracking-wider  normal-case font-bold md:text-3xl text-2xl hover:text-gray-400  cursor-pointer`}
      >
        I-DAI
      </button>
      {!hideUserInfo && name && (
        <div className="order-2 inline-flex items-center gap-1">
          <p className="text-sm font-semibold text-black cursor-default">
            Hello, {name}.
          </p>

          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar cursor-default"
            >
              <div className=" cursor-pointer  rounded-full">
                {session?.user?.image ? (
                  <Image
                    width={40}
                    height={40}
                    src={session?.user.image ?? image}
                    alt={`${name}'s Avatar`}
                  />
                ) : (
                  <span className="text-black text-4xl">
                    <FaUserCircle />
                  </span>
                )}
              </div>
            </label>

            <ul
              tabIndex={0}
              className="mt-3 z-50 p-2 gap-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  onClick={handleSignOut}
                  className="btn btn-error w-1/2 mx-auto"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
