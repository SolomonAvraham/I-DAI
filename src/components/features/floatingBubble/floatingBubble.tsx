"use client";

import { useState, useEffect } from "react";

const FloatingBubble: React.FC = () => {
  const [deathCount, setDeathCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      setDeathCount(elapsedSeconds * 2); // 2 deaths per second
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden fixed bottom-5 right-5 lg:flex flex-col items-center space-y-2 z-40">
      {/* Main Floating Bubble */}
      <div
        className="relative border border-slate-800 bg-slate-900 text-white flex items-center justify-center text-center rounded-full shadow-lg animate-bounce-slow"
        style={{
          width: "120px",
          height: "120px",
          animation: "float 3s infinite",
        }}
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1 hover:scale-110 right-1 text-sm text-white bg-red-600 border border-red-400 rounded-full w-5 h-5 flex items-center justify-center"
          aria-label="Close"
        >
          X
        </button>
        <div className="text-xs mt-5 font-bold">
          <p>Each second,</p>
          <p>2 human beings die.</p>
          <p className="text-lg font-semibold mt-1">{deathCount}</p>
        </div>
      </div>

      {/* Tiny Thought Bubbles */}
      <div className="space-y-1">
        <div
          className="border border-slate-800 bg-slate-700 rounded-full shadow"
          style={{
            width: "30px",
            height: "30px",
            animation: "float-tiny 2.5s infinite",
          }}
        />
        <div
          className="mr-1 border border-slate-800 bg-slate-700 rounded-full shadow"
          style={{
            width: "20px",
            height: "20px",
            animation: "float-tiny 3s infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes float-tiny {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-bounce-slow {
          animation: float 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FloatingBubble;
