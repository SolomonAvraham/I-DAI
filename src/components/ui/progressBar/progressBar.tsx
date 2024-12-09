'use client';
import { useMemo } from "react";

const ProgressBar = ({
  currentCategory,
  totalCategories,
}: {
  currentCategory: number;
  totalCategories: number;
}) => {
  const progressPercentage = useMemo(() => {
    return Math.round((currentCategory / (totalCategories - 1)) * 100);
  }, [currentCategory, totalCategories]);

  return (
    <div className="flex items-center justify-between w-full mb-6 space-x-4">
      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${progressPercentage}%`,
            maxWidth: "100%",
          }}
        ></div>
      </div>
      <div className="flex items-center">
        <span className="text-blue-800 lg:text-2xl font-bold  lg:ml-4">
          {progressPercentage}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
