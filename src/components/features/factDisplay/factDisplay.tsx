"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Fact = { fact: string }; // Define the structure of a fact

interface FactDisplayProps {
  facts: Fact[];
  categoryName?: string;
  onClose: () => void;
}

const FactDisplay: React.FC<FactDisplayProps> = ({ facts, onClose }) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentFactIndex((prev) => (prev + 1) % facts.length);
        setIsVisible(true);
      }, 7000);
    }, 7000);

    return () => clearInterval(intervalId);
  }, [facts.length]);


  const handleClose = () => {
    setIsVisible(false);
    // Add a small delay to allow exit animation
    setTimeout(() => {
      onClose();
    }, 300);
  };


  return (
    <motion.div
      className="absolute w-52 h-52 bg-white rounded-full shadow-xl hidden md:flex border border-black/20 items-center justify-center z-40"
      style={{ top: "30%", left: "3%", transform: "translate(-50%, -50%)" }}
      animate={{
        x: [0, 50, -50, 0], // Moving left and right
        y: [0, 20, -20, 0], // Moving up and down
      }}
      transition={{
        duration: 40, // Slower movement
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {" "}
      <div className="card-body text-center">
        <AnimatePresence mode="wait">
          <button
            onClick={handleClose}
            className="absolute top-5 right-3 btn btn-xs btn-circle text-white text-sm hover:text-white/30"
          >
            X
          </button>
          {isVisible && facts.length > 0 && (
            <motion.div
              key={currentFactIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              {typeof facts[currentFactIndex] === "string" ? (
                <p className="text-black font-bold text-sm tracking-wider">
                  {facts[currentFactIndex]}
                </p>
              ) : (
                <p className="text-black font-extrabold text-sm tracking-wider">
                  {facts[currentFactIndex]?.fact}
                </p>
              )}
            </motion.div>
          )}
          {facts.length === 0 && <p className="text-sm">No facts available.</p>}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FactDisplay;
