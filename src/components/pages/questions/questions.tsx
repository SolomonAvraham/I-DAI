"use client";

import QuestionCard from "@/components/pages/questions/questionCard";
import { finalizeQuestions } from "@/services/questions";
import useQuestionsStore from "@/store/questionsStore";
import React, { useState } from "react";
import ShareButtons from "../../ui/buttons/shareButtons";
import Image from "next/image";
import { questions } from "@/utils/questions";

const Questions = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { responses, updateResponse } = useQuestionsStore();

  const handleInputChange = (
    name: string,
    value: string | number | boolean
  ) => {
    updateResponse(name, value);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      finalizeQuestions();
    }
  };

  const shareUrl = "http://i-dai.com/result/";
  const title = "You Probably Will Die Of COVID-19 .";
  const description = "Do you want to know your destiny? click here !";
  const image =
    "https://plus.unsplash.com/premium_photo-1674850274669-c6cb57ea5265?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const progressPercentage = Math.round(
    ((currentStep + 1) / questions.length) * 100
  );
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div
        className="relative  bg-white border rounded-lg shadow-lg p-8 md:p-12 lg:p-16 max-w-4xl w-full"
        style={{
          width: "2200px",
          height: "1000px",
          maxHeight: "1000px",
          overflow: "hidden",
        }}
      >
        <div className="w-full max-w-4xl">
          {/* Progress container */}
          <div className="relative w-full">
            {/* Progress bar */}
            <progress
              className="progress progress-primary w-full"
              value={progressPercentage}
              max="100"
            ></progress>
            {/* Percentage text */}
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm font-bold text-black">
              {progressPercentage}%
            </span>
          </div>
        </div>
        {!isComplete ? (
          <div className="h-full py-10">
            <QuestionCard
              category={questions[currentStep].category}
              questions={questions[currentStep].questions}
              onInputChange={handleInputChange}
            />
          </div>
        ) : (
          <div className="flex flex-col text-black  items-center h-full gap-6 text-4xl md:text-5xl font-semibold mb-4 text-center">
            <div>You will die of: COVID-19</div>
            <Image src={image} alt="Image" width={500} height={500} />
            <h3 className="text-lg md:text-4xl ">
              Stay cautious and stay safe!
            </h3>
            <ShareButtons
              shareUrl={shareUrl}
              title={title}
              description={description}
              image={image}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        {!isComplete && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-10 px-8 ">
            <button
              className="px-6 disabled:bg-slate-400 py-2 bg-blue-900 text-white rounded-lg text-lg md:text-xl hover:bg-blue-700 transition"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button
              className="px-6 py-2 bg-blue-900 text-white rounded-lg text-lg md:text-xl hover:bg-blue-700 transition"
              onClick={handleNext}
            >
              {currentStep < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
