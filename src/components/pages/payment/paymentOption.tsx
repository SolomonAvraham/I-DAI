import React from "react";

interface PaymentOptionProps {
  title: string;
  description: string;
  price: string;
  onClick?: () => void; // Future functionality
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  title,
  description,
  price,
  onClick,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="mt-4 text-2xl font-bold">{price}</div>
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
