"use client";

import { questions } from "@/utils/questionsData";
import { QuestionInput } from "../../features/inputs/questionnaireInputs";
import { useQuestionnaireProgress } from "@/hooks/useQuestionnaireProgress";
import ProgressBar from "@/components/features/progressBar/progressBar";
import BMICalculator from "@/components/features/BMICalculator/BMICalculator";
import { PiArrowBendDownRightFill } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { UseSendQuestionsMutation } from "@/lib/queries";
import Loading from "@/components/features/loading/loading";
import useUserStore from "@/store/userStore";
import FactDisplay from "@/components/features/factDisplay/factDisplay";
import { useRouter } from "next/navigation";
import riskCategories from "@/utils/riskCategoriesData";
import getCategoryFacts from "@/utils/getCategoryFacts";
import { validateField, validateForm } from "@/utils/validation";

const QuestionnaireForm = ({ id, name }: { id: string; name: string }) => {
  const router = useRouter();
  const [openBMICalculator, setOpenBMICalculator] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formHeaderRef = useRef<HTMLDivElement>(null);
  const [showFacts, setShowFacts] = useState(true);

  const sendQuestionsMutation = UseSendQuestionsMutation();
  const { setUser, name: userNameStore } = useUserStore();

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (id) {
      localStorage.setItem("userId", id);
      localStorage.setItem("name", name);
      setUser({ id, name });
    }
  }, [id]);

  const userName =
    typeof window !== "undefined"
      ? userNameStore
        ? userNameStore
        : "Guest"
      : null;

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

  const currentCategoryName = questions[currentCategory].category;

  const handleInputChange = (
    name: string,
    value: string | number | boolean | null | undefined
  ) => {
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error || "",
    }));

    updateResponse(name, value ?? null);
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
    const formErrors = validateForm(
      responses,
      questions[currentCategory].questions,
      questions[currentCategory].category
    );

    let hasErrors =
      formErrors &&
      Object.keys(formErrors).filter((key) =>
        questions[currentCategory].questions.some((q) => q.name === key)
      ).length > 0;

    if (
      questions[currentCategory].questions.some(
        (q) => q.type === "custom-country"
      )
    ) {
      const countryAndCityErrors = validateField("country", selectedCountry);

      if (countryAndCityErrors) {
        setErrors((prev) => ({ ...prev, country: countryAndCityErrors }));
        hasErrors = true;
      }
    }

    if (formErrors && Object.keys(formErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...formErrors }));
      hasErrors = true;
    }

    if (hasErrors) {
      alert("Please correct the errors before submitting");
      return;
    }

    const isLastCategory = currentCategory === questions.length - 1;

    // If not the last category, proceed with validation
    if (!isLastCategory) {
      if (isCurrentCategoryComplete()) {
        const nextCategory = currentCategory + 1;
        setCurrentCategory(nextCategory);
        if (window.innerWidth < 1024) {
          formHeaderRef.current?.scrollIntoView({ behavior: "smooth" });
        }

        saveProgress();
      } else {
        alert("Please complete all questions in the current category");
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm(
      responses,
      questions[currentCategory].questions,
      questions[currentCategory].category
    );

    if (formErrors) {
      setErrors(formErrors);
      alert("Please correct the errors before submitting");
      return;
    }

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
      const storedName = localStorage.getItem("name");

      if (!storedName) {
        alert("Please sign in to continue");
        router.push("/?trigger=true");
        return;
      }

      await sendQuestionsMutation.mutateAsync({ userId, userName });
    }
  };

  return (
    <>
      {showFacts &&
        <FactDisplay
          facts={getCategoryFacts(currentCategoryName, riskCategories)}
          categoryName={currentCategoryName}
          onClose={() => setShowFacts(false)}
        />}
      <div
        className="
        mx-auto
      w-11/12
      flex 
      flex-col
      justify-center 
      items-center 
      lg:h-[42rem]
      xl:h-[48rem]
      text-center
      relative
    "
        ref={formHeaderRef}
      >
        {sendQuestionsMutation.isPending ? (
          <div className="min-h-screen flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div
            className="
        w-full
        h-full
        bg-gray-50 
        rounded-2xl 
        shadow 
        border-[0.5px]
        border-gray-950
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
          flex 
          flex-col 
          justify-center
          h-[25%]
          gap-3 
        "
            >
              <h2
                className="
            text-2xl 
            md:text-6xl 
            xl:text-7xl
            lg:mt-4 
            text-center 
            font-bold 
            text-blue-800
            tracking-wide
          "
              >
                {questions[currentCategory].category}
              </h2>
              <hr className="border-t w-4/6 opacity-30 mx-auto border-black  mb-2" />
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
        "
            >
              <div
                className={` ${
                  questions[currentCategory].category ===
                    "General Information" && "lg:grid   grid-cols-2 gap-1"
                } w-full max-w-2xl space-y-6 flex flex-col justify-center flex-grow`}
              >
                {questions[currentCategory].questions.map((question) => (
                  <div
                    key={question.name}
                    className="
                  flex 
                  flex-col
                  md:flex-row 
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
                        question.name === "bmi" && "flex-col gap-3"
                      }                     ${
                        questions[currentCategory].category ===
                          "General Information" && " lg:mr-6"
                      }
`}
                    >
                      <QuestionInput
                        question={question}
                        currentValue={responses[question.name]}
                        selectedCountry={selectedCountry}
                        selectedCity={selectedCity}
                        handleInputChange={handleInputChange}
                        setSelectedCountry={setSelectedCountry}
                        setSelectedCity={setSelectedCity}
                        error={errors[question.name]}
                        countryAndCityErrors={
                          errors["country"] || errors["city"]
                        }
                      />
                      {question.name === "bmi" && (
                        <div className="flex gap-3 items-end">
                          <span className="text-5xl text-gray-600 ">
                            <PiArrowBendDownRightFill />
                          </span>{" "}
                          <button
                            type="button"
                            className="text-xs text-black  border-black border-[0.001px] hover:shadow font-semibold hover:bg-gray-300  bg-slate-200 p-2 rounded-xl"
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
            h-[25%]
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
                    className={`
                      ${currentCategory > 0 ? "w-3/4" : "w-full"}
                  btn btn-primary 
                  lg:w-1/5
                  text-lg
                  lg:text-2xl
                  text-white
                
                  `}
                    onClick={handleNextCategory}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`
                      ${currentCategory > 0 ? "w-3/4" : "w-full"}
                  btn btn-success 
                  w-1/3
                  lg:w-1/5
                  text-lg
                  lg:text-2xl
                  text-white
                `}
                    disabled={!isCurrentCategoryComplete()}
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionnaireForm;
