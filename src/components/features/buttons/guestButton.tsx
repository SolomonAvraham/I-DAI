"use client";

import { signOutSession } from "@/services/userService";
import useUserStore from "@/store/userStore";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function generateRandomNumber(min = 10352) {
  const randomNumber = Math.floor(Math.random() * 10000) + min + 1;
  return randomNumber;
}

export default function GuestButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const router = useRouter();

  const { setUser } = useUserStore();

  const randomNumber = generateRandomNumber();

  const handleGuest = async () => {
    try {
      await signOutSession();
      await signOut({ redirect: false });

      const nameValue =
        guestName.trim() !== ""
          ? guestName
          : `Guest ${randomNumber.toString()}`;

      setGuestName(nameValue);

      localStorage.setItem("name", nameValue);

      setUser({
        name: nameValue,
      });

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
          <div className="modal-box  bg-slate-50 flex flex-col items-center justify-center gap-3">
            <h2 className="font-bold text-lg">Enter Your Nickname here</h2>
            <input
              id="randomInput"
              type="text"
              className="input input-bordered text-center w-9/12 border border-gray-400 bg-slate-100 md:w-1/2"
              placeholder={`Guest ${randomNumber.toString()}`}
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
                className="btn btn-sm btn-ghost border border-gray-400"
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
