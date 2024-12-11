"use client";

import { useState, useEffect, useRef } from "react";

const BMICalculator = ({
  onBMIChange,
  setOpenBMICalculator,
}: {
  onBMIChange: (bmiCategory: string) => void;
  setOpenBMICalculator: (open: boolean) => void;
}) => {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(100);
  const [bmi, setBMI] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
 

  const calculateBMICategory = (bmiValue: number): string => {
    if (bmiValue < 18.5) return "Below-18.5";
    if (bmiValue >= 18.5 && bmiValue <= 24.9) return "18.5-24.9";
    if (bmiValue >= 25.0 && bmiValue <= 29.9) return "25.0-29.9";
    if (bmiValue >= 30.0 && bmiValue <= 34.9) return "30.0-34.9";
    if (bmiValue >= 35.0 && bmiValue <= 39.9) return "35.0-39.9";
    return "Above-40";
  };

  const calculateBMI = () => {
    if (weight && height) {
      const bmiValue = weight / (height / 100) ** 2; // Height in meters
      setBMI(parseFloat(bmiValue.toFixed(2))); // Limit to 2 decimal places
      const category = calculateBMICategory(bmiValue);
      onBMIChange(category); // Send category to parent
    }
  };

  // Close modal when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setOpenBMICalculator(false);
    }
  };

  // Disable scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling

    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling on unmount
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-full w-full fixed top-0 left-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="cursor-pointer text-black text-center p-3 rounded-2xl gap-4 bg-gray-100 border shadow border-gray-400"
      >
        <div className="flex items-center justify-center">
          {" "}
          <div
            onClick={() => setOpenBMICalculator(false)}
            className="bg-gray-300 p-2 mb-5 hover:scale-110 hover:bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
          >
            X
          </div>
          <h2 className="text-lg flex-1 md:text-2xl mb-1 font-bold tracking-wide">
            BMI Calculator
          </h2>
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="flex items-center gap-2">
            <label htmlFor="weight" className="font-medium text-xs">
              Weight (kg):
            </label>
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="input input-bordered w-16 max-w-xs bg-gray-50"
              min={0}
              max={500}
              required
            />
          </div>
          <div className="flex items-center justify-center gap-5">
            <label htmlFor="height" className="font-medium text-xs">
              Height (cm):
            </label>
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="input input-bordered w-16 max-w-xs bg-gray-50"
              min={100}
              max={300}
              required
            />
          </div>
        </div>
        <button
          type="button"
          onClick={calculateBMI}
          className="px-2 py-2 rounded-xl font-bold hover:bg-slate-400 bg-gray-300 mt-4 text-xs"
        >
          Calculate BMI
        </button>
        {bmi !== null && (
          <div className="mt-2 text-gray-700 font-semibold">
            <p>
              Your BMI is: <strong>{bmi}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
