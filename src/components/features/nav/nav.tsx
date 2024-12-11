"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { Session } from "next-auth";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  let user: Session | null = session;

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="navbar  bg-gray-900 px-4 py-2 z-50">
      <div className="flex-1 normal-case font-semibold text-xl">I-DAI</div>
      <div className="flex-none gap-4 items-center">
        <div className="text-sm text-left cursor-default">
          <p className="font-semibold">
            Hello, {user ? user?.user.name : "Guest"}.
          </p>
        </div>
        {/* User Info */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {user?.user.image ? (
                <Image
                  width={40}
                  height={40}
                  src={user?.user.image}
                  alt={`${user?.user.name}'s Avatar`}
                />
              ) : (
                <span className=" object-contain text-4xl">
                  <FaUserCircle />
                </span>
              )}
            </div>
          </label>

          {user && (
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
          )}
        </div>
      </div>
    </div>
  );
}
