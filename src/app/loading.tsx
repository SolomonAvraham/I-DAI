import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="text-center">
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner text-base-content w-16 h-16"></span>
        </div>
        <p className="mt-4 text-xl font-bold text-base-content">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
