"use client";

import { questions } from "@/utils/questionsData";
import { QuestionInput } from "../../features/inputs/questionnaireInputs";
import { useQuestionnaireProgress } from "@/hooks/useQuestionnaireProgress";
import ProgressBar from "@/components/features/progressBar/progressBar";
import BMICalculator from "@/components/features/BMICalculator/BMICalculator";
import { PiArrowBendDownRightFill } from "react-icons/pi";
import { useEffect, useState } from "react";
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
    value: string | number | boolean |null | undefined
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

    let hasErrors = formErrors && Object.keys(formErrors).filter(key => 
      questions[currentCategory].questions.some(q => q.name === key)
    ).length > 0;
    
    if (questions[currentCategory].questions.some(q => q.type === 'custom-country')) {
      const countryAndCityErrors = validateField("country", selectedCountry);
      if (countryAndCityErrors) {
        setErrors(prev => ({ ...prev, country: countryAndCityErrors }));
        hasErrors = true;
      }
    }

    if (formErrors && Object.keys(formErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...formErrors }));
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
      <FactDisplay
        facts={getCategoryFacts(currentCategoryName, riskCategories)}
        categoryName={currentCategoryName}
      />
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
        {sendQuestionsMutation.isPending ? (
          <Loading />
        ) : (
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
        )}
      </div>
    </>
  );
};

export default QuestionnaireForm;
