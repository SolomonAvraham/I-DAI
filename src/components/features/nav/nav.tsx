"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  let creditsLeft;
  
  useEffect(() => {
    creditsLeft = localStorage.getItem("attempts");
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Signout failed");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const user = session?.user;
  return (
    <div className="navbar bg-base-200 px-4 py-2 z-50">
      <div className="flex-1">
        <a href="/user" className="btn btn-ghost normal-case text-xl">
          I-DAI
        </a>
      </div>
      <div className="flex-none gap-4 items-center">
        {/* Credits */}
        <div className="text-sm text-left cursor-default">
          <p className="font-semibold">Welcome, {user?.name}!</p>
          <p className="text-gray-200">Credits Left: {creditsLeft ?? 1}</p>
        </div>
        {/* User Info */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                width={40}
                height={40}
                src={user?.image || "/avatar.png"}
                alt={`${user?.name}'s Avatar`}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-50 p-2 gap-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li className="mt-3">
              <a className="justify-between" href="/user/profile">
                Profile
                <span className="badge">View</span>
              </a>
            </li>

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
    </div>
  );
}
