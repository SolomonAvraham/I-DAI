"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function GuestButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestName, setGuestName] = useState("Guest");
  const router = useRouter();

  const handleGuest = async () => {
    if (!guestName.trim()) {
      alert("Please enter a name.");
      return;
    }

    try {
      localStorage.setItem("name", guestName);

      await signOut({ redirect: false });
      localStorage.removeItem("questionnaireProgress");
      localStorage.removeItem("userId");

      router.refresh();
      router.push("/user/questions");
    } catch (error) {
      console.error("Error entering as guest:", error);
    }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 mb-4 px-6 py-3 md:px-12 md:py-8 md:text-2xl border border-gray-300 bg-white text-gray-600 rounded-2xl hover:bg-gray-100 shadow-md"
      >
        Enter as a guest
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box  bg-slate-50 flex flex-col items-center justify-center">
            <h2 className="font-bold text-lg">Enter Your Nickname here</h2>
            <input
              type="text"
              className="input input-bordered text-center w-full border border-gray-400 bg-slate-100 md:w-1/2 my-4"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              maxLength={20}
            />
            <div className="modal-action">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleGuest();
                }}
                className="btn btn-lg btn-ghost border border-gray-400"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
