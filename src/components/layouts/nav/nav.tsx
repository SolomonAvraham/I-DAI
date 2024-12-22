"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const usePathName = usePathname();
  const [hideUserInfo, setHideUserInfo] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (usePathName === "/user/questions") {
      setHideUserInfo(false);
    }
  }, [usePathName]);

  const { data: session } = useSession();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setUserName(storedName);
  }, []);

  return (
    <nav className="navbar   text-black shadow-black shadow-2xl flex items-center justify-between px-6 py-2 z-50">
      <button
        onClick={() => router.push("/")}
        className=" order-1 tracking-wider  normal-case font-bold text-2xl hover:text-gray-400  cursor-pointer text-white"
      >
        I-DAI
      </button>
      <div
        className={` order-2 ${hideUserInfo && "hidden"} gap-1 items-center`}
      >
        {!hideUserInfo && (
          <>
            {" "}
            <div className="text-sm text-white  cursor-default">
              <p className="font-semibold">
                Hello, {!userName ? session?.user?.name : userName ?? "Guest"}.
              </p>
            </div>
            {/* User Info */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar cursor-default"
              >
                <div className=" rounded-full">
                  {session?.user.image ? (
                    <Image
                      width={40}
                      height={40}
                      src={session?.user?.image}
                      alt={`${session?.user.name}'s Avatar`}
                    />
                  ) : (
                    <span className="text-white  text-4xl">
                      <FaUserCircle />
                    </span>
                  )}
                </div>
              </label>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
