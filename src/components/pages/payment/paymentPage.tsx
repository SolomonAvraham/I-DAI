"use client";

import React from "react";
import PaymentOption from "./paymentOption";
import { useRouter } from "next/navigation";

const PaymentPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl tracking-wide text-black md:text-7xl font-bold text-center">
          Choose Your Plan
        </h1>
        <hr className="border-t mx-auto mt-1  py-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PaymentOption
            title="1 Pack"
            description="One attempt to discover how you might die."
            price="$1.99"
            onClick={() => {
              router.push("/user")
              localStorage.setItem("attempts", "1")
            }}
          />
          <PaymentOption
            title="Family Pack"
            description="Five attempts for you and your loved ones to explore how they might die."
            price="$4.99"
            discount="$9.95"
            onClick={() => {
              router.push("/user")
              localStorage.setItem("attempts", "5")
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
