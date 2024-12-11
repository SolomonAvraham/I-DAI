"use client";

import { finalizeQuestions } from "@/services/questionsService";
import { questions } from "@/utils/questionsData";
import { QuestionInput } from "./questionnaireInputs";
import { useQuestionnaireProgress } from "@/hooks/useQuestionnaireProgress";
import ProgressBar from "@/components/ui/progressBar/progressBar";
import { useRouter } from "next/navigation";
import BMICalculator from "@/components/ui/BMICalculator/BMICalculator";
import { PiArrowBendDownRightFill } from "react-icons/pi";
import { useState } from "react";

const QuestionnaireForm = () => {
  const router = useRouter();
  const [openBMICalculator, setOpenBMICalculator] = useState(false);

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

      // Special handling for different input types
      switch (q.type) {
        case "number":
          // For number inputs, check if value is not undefined, null, or empty string
          return value !== undefined && value !== null && value !== "";

        case "select":
          // For select inputs, ensure a value is selected
          return value !== undefined && value !== null && value !== "";

        case "radio":
          // For radio inputs, the value should be explicitly 0 or 1
          return value === 0 || value === 1;

        case "custom-country":
          return selectedCountry !== null && selectedCountry !== "";

        case "custom-city":
          return selectedCity !== null && selectedCity !== "";

        default:
          return false;
      }
    });
  };

  const handleNextCategory = () => {
    // Check if this is the last category
    const isLastCategory = currentCategory === questions.length - 1;

    // If not the last category, proceed with validation
    if (!isLastCategory) {
      if (isCurrentCategoryComplete()) {
        const nextCategory = currentCategory + 1;
        setCurrentCategory(nextCategory);
        saveProgress();
      } else {
        alert("Please complete all questions in the current category");
      }
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the last category specifically
    const lastCategoryQuestions = questions[questions.length - 1].questions;
    const isLastCategoryComplete = lastCategoryQuestions.every((q) => {
      const value = responses[q.name];

      switch (q.type) {
        case "number":
          return value !== undefined && value !== null && value !== "";
        case "select":
          return value !== undefined && value !== null && value !== "";
        case "radio":
          return value === 0 || value === 1;
        default:
          return false;
      }
    });

    if (isLastCategoryComplete) {
      finalizeQuestions();
      localStorage.removeItem("questionnaireProgress");
      router.push("/user/result");
    }
  };

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
      lg:h-[60rem]
      text-center
      lg:text-left
      relative
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
          h-[15%]
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
          <ProgressBar
            currentCategory={currentCategory}
            totalCategories={questions.length}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="
          w-full 
          px-6
          flex
          flex-col
          items-center
          justify-between
          flex-grow
          h-[70%]
        "
        >
          <div className="w-full max-w-lg space-y-6 flex flex-col justify-center flex-grow">
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
                <div
                  className={`w-full flex justify-center items-center ${
                    question.name === "bmi" && "flex-col gap-5"
                  }`}
                >
                  <QuestionInput
                    question={question}
                    currentValue={responses[question.name]}
                    selectedCountry={selectedCountry}
                    selectedCity={selectedCity}
                    handleInputChange={handleInputChange}
                    setSelectedCountry={setSelectedCountry}
                    setSelectedCity={setSelectedCity}
                  />{" "}
                  {question.name === "bmi" && (
                    <div className="flex gap-3 items-end">
                      <span className="text-5xl text-gray-600 ">
                        <PiArrowBendDownRightFill />
                      </span>{" "}
                      <button
                        type="button"
                        className="text-xs text-black  border hover:shadow font-semibold hover:bg-gray-300  bg-slate-200 p-2 rounded-xl"
                        onClick={() => setOpenBMICalculator(true)}
                      >
                        BMI Calculator
                      </button>
                    </div>
                  )}
                </div>

                {openBMICalculator && question.name === "bmi" && (
                  <BMICalculator
                    setOpenBMICalculator={setOpenBMICalculator}
                    onBMIChange={(bmi) => handleInputChange("bmi", bmi)}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            className="
            w-full
            flex
            lg:gap-3
            lg:justify-evenly
            items-center
            p-6
            h-[15%]
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
                  lg:w-1/5
                  text-lg
                  lg:text-2xl
                  text-white
                "
                disabled={!isCurrentCategoryComplete()}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
