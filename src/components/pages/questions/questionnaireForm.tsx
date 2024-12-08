"use client";

import { finalizeQuestions } from "@/services/questions";
 import React, { useEffect, useMemo, useState } from "react";
import { questions } from "@/utils/questions";
 import { QuestionInput } from "./questionnaireInputs";
import { useQuestionnaireProgress } from "@/hooks/useQuestionnaireProgress";

const QuestionnaireForm = () => {
  const {
    currentCategory,
    setCurrentCategory,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity,
    responses,
    updateResponse,
    saveProgress,
  } = useQuestionnaireProgress();
  const handleInputChange = (
    name: string,
    value: string | number | boolean
  ) => {
    updateResponse(name, value);
    saveProgress();
  };

  const isCurrentCategoryComplete = () => {
    const currentQuestions = questions[currentCategory].questions;
    return currentQuestions.every((q) => {
      const value = responses[q.name];

      if (q.type === "custom-country") {
        return selectedCountry !== null;
      }

      if (q.type === "custom-city") {
        return selectedCity !== null;
      }

      if (q.type === "number") {
        return value !== undefined && value !== null && value !== "";
      }

      if (q.type === "select" || q.type === "radio") {
        return value !== undefined && value !== null && value !== "";
      }

      return false;
    });
  };

  const handleNextCategory = () => {
    if (isCurrentCategoryComplete()) {
      if (currentCategory < questions.length - 1) {
        const nextCategory = currentCategory + 1;
        setCurrentCategory(nextCategory);
        saveProgress();
      } else {
        finalizeQuestions();
      }
    } else {
      alert("Please complete all questions in the current category");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCurrentCategoryComplete()) {
      finalizeQuestions();
      localStorage.removeItem("questionnaireProgress");
      alert("Questionnaire submitted successfully!");
    }
  };

  const progressPercentage = useMemo(() => {
    return Math.round(((currentCategory + 1) / questions.length) * 100);
  }, [currentCategory]);

  return (
    <div
      className="
      container 
      flex 
      flex-col
      justify-center 
      items-center  
      px-4 
      py-8
      lg:h-[55rem]
      text-center
      lg:text-left
    "
    >
      <div
        className="
        w-full 
        lg:w-[50rem]
        xl:w-[70rem]
        h-full
        bg-gray-50 
        rounded-2xl 
        shadow 
        border 
        flex 
        flex-col 
        justify-between
        items-center
      "
      >
        <div
          className="
          w-full 
          rounded-l-2xl 
          p-6 
          py-20
          flex 
          flex-col 
          justify-center
          h-1/5
        "
        >
          <h2
            className="
            text-2xl 
            md:text-6xl 
            xl:text-7xl 
            text-center 
            font-bold 
            text-blue-800 
            mb-2
            mt-10
            tracking-wide
          "
          >
            {questions[currentCategory].category}
          </h2>
          <hr className="border-t w-full mx-auto border-gray-200 mb-2" />
          <div className="flex items-center justify-between w-full mb-6">
            <progress
              value={currentCategory + 1}
              max={10}
              className="w-full progress-primary h-3 mr-4"
            ></progress>
            <div className="text-blue-800 lg:text-2xl font-bold">
              {progressPercentage}%
            </div>
          </div>{" "}
        </div>

        <div
          className="
          w-full 
          px-6
          flex
          flex-col
          items-center
          justify-center  
        "
        >
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg space-y-6 h-full flex flex-col justify-center"
          >
            {questions[currentCategory].questions.map((question) => (
              <div
                key={question.name}
                className="
                  flex 
                  flex-col
                  lg:flex-row 
                  gap-3
                  justify-center
                  items-center   
                "
              >
                <label
                  className="
                  text-base 
                  font-medium 
                  text-black 
                  w-full
                  flex-col
                  items-center
                  justify-center
                "
                >
                  {question.question}
                  {question.description && (
                    <p className="text-xs text-gray-600 mt-1">
                      {question.description}
                    </p>
                  )}
                </label>
                <div className="w-full flex justify-center items-center">
                  {
                    <QuestionInput
                      question={question}
                      currentValue={responses[question.name]}
                      selectedCountry={selectedCountry}
                      selectedCity={selectedCity}
                      handleInputChange={handleInputChange}
                      setSelectedCountry={setSelectedCountry}
                      setSelectedCity={setSelectedCity}
                    />
                  }
                </div>
              </div>
            ))}
          </form>
        </div>

        <div
          className="
          w-full
          flex
          lg:gap-3
          lg:justify-evenly
          items-center
          p-6
          h-1/5
          justify-center
          gap-6
        "
        >
          {currentCategory > 0 && (
            <button
              type="button"
              className="
                btn btn-primary 
                w-1/3
                lg:w-1/5
                text-lg
                lg:text-2xl
              text-white
              px-12
          
              "
              onClick={() => setCurrentCategory((prev) => prev - 1)}
            >
              Previous
            </button>
          )}
          {currentCategory < questions.length - 1 ? (
            <button
              type="button"
              className="
                btn btn-primary 
                w-1/3
                lg:w-1/5
                text-lg
                lg:text-2xl
          text-white
              "
              onClick={handleNextCategory}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="
                btn btn-success 
                w-1/3
                lg:w-1/4
                lg:text-2xl
                text-lg
              "
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
