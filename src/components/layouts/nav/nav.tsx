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

  const { name, image, setUser, clearUser } = useUserStore();

  useEffect(() => {
    const isUserResult = usePathName.startsWith("/user/result");

    if (usePathName === "/user/questions" || isUserResult) {
      setHideUserInfo(false);
    }
  }, [usePathName]);

  const { data: session } = useSession();

  useEffect(() => {
    const userName = session?.user?.name;
    if (userName) {
      setUser({ name: userName });
    }
  }, [session?.user?.name]);

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

  const routing = usePathName === "/" || usePathName.startsWith("/result");

  return (
    <nav
      className={` ${
        routing && "bg-transparent"
      } navbar bg-gray-100 text-black flex items-center justify-between px-6 py-2 z-50`}
    >
      <button
        onClick={() => {
          router.refresh();
          router.push("/");
        }}
        className={`${
          !routing && "text-gray-900"
        } order-1 text-white tracking-wider  normal-case font-bold md:text-3xl text-2xl hover:text-gray-400  cursor-pointer`}
      >
        I-DAI
      </button>
      <div
        className={` text-white
          text order-2 ${hideUserInfo && "hidden"} gap-1 items-center`}
      >
        {!hideUserInfo && name && (
          <>
            <div className="text-sm text-black cursor-default">
              <p className="font-semibold">Hello, {name}.</p>
            </div>

            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar cursor-default"
              >
                <div className=" cursor-pointer  rounded-full">
                  {image ? (
                    <Image
                      width={40}
                      height={40}
                      src={image}
                      alt={`${name}'s Avatar`}
                    />
                  ) : (
                    <span className="text-black  text-4xl">
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
          </>
        )}
      </div>
    </nav>
  );
}
