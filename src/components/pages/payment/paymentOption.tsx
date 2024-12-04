import React from "react";

interface PaymentOptionProps {
  title: string;
  description: string;
  price: string;
  discount?: string;
  onClick?: () => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  title,
  description,
  price,
  discount,
  onClick,
}) => {
  return (
    <div className="border min-h-52 flex flex-col justify-center border-gray-300 text-black rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="mt-4 text-2xl font-bold">
        {discount && (
          <span className="text-gray-400 line-through mr-2">{discount}</span>
        )}
        {price}
      </div>
      <button
        className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        onClick={onClick}
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PaymentOption;
