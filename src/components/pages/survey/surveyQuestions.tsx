"use client";

import QuestionCard from "@/components/pages/survey/questionCard";
import { finalizeSurvey } from "@/services/survey";
import useSurveyStore from "@/store/surveyStore";
import React, { useState } from "react";
import ShareButtons from "../../ui/buttons/shareButtons";
import Image from "next/image";


 const surveyQuestions = [
  {
    category: "General Information",
    questions: [
      { question: "Age:", type: "number", name: "age" },
      {
        question: "Gender:",
        type: "select",
        name: "gender",
        options: ["Male", "Female"],
      },
      {
        question: "Country and City:",
        type: "custom",
        name: "countryCity",
        component: "CountrySearch",
      },
      { question: "Yearly income in USD:", type: "number", name: "income" },
      { question: "BMI (Body Mass Index):", type: "number", name: "bmi" },
      {
        question: "Marital status:",
        type: "select",
        name: "maritalStatus",
        options: ["Married", "Single", "Divorced", "Widowed"],
      },
      { question: "Number of children:", type: "number", name: "children" },
    ],
  },
  {
    category: "Medical and Family History",
    questions: [
      {
        question: "Do you have a family history of heart disease?",
        type: "radio",
        name: "heartDisease",
        options: ["Yes", "No"],
      },
      {
        question: "Do you have a family history of cancer?",
        type: "radio",
        name: "cancer",
        options: ["Yes", "No"],
      },
      {
        question: "Do you have a family history of mental illness?",
        type: "radio",
        name: "mentalIllness",
        options: ["Yes", "No"],
      },
      {
        question:
          "Are there other chronic illnesses in your family (e.g., ALS, multiple sclerosis)?",
        type: "radio",
        name: "chronicIllnesses",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    category: "Lifestyle and Habits",
    questions: [
      {
        question: "Do you smoke?",
        type: "radio",
        name: "smoke",
        options: ["Yes", "No"],
      },
      { question: "Alcohol use (1-5):", type: "number", name: "alcohol" },
      {
        question: "Physical activity (1-5):",
        type: "number",
        name: "physicalActivity",
      },
      { question: "Stress level (1-5):", type: "number", name: "stressLevel" },
    ],
  },
  {
    category: "Mental Health and Well-being",
    questions: [
      {
        question: "Do you have a history of depression?",
        type: "radio",
        name: "depression",
        options: ["Yes", "No"],
      },
      {
        question: "Have you had suicidal tendencies in the past?",
        type: "radio",
        name: "suicidalTendencies",
        options: ["Yes", "No"],
      },
      {
        question:
          "Have you received psychological therapy in the past or present?",
        type: "radio",
        name: "therapy",
        options: ["Yes", "No"],
      },
      {
        question:
          "Have you experienced traumatic events like severe injury, accident, or war?",
        type: "radio",
        name: "trauma",
        options: ["Yes", "No"],
      },
      {
        question: "Loneliness level (1-5):",
        type: "number",
        name: "lonelinessLevel",
      },
      {
        question:
          "Do you have strong social support (e.g., friends and family)? (1-5):",
        type: "number",
        name: "socialSupport",
      },
    ],
  },
  {
    category: "Driving Behavior",
    questions: [
      {
        question: "Do you have a valid driver's license?",
        type: "radio",
        name: "validLicense",
        options: ["Yes", "No"],
      },
      {
        question: "Do you use your mobile phone while driving?",
        type: "radio",
        name: "phoneDriving",
        options: ["Yes", "No"],
      },
      {
        question: "How many traffic violations have you had in the past year?",
        type: "number",
        name: "trafficViolations",
      },
      {
        question: "Have you had accidents in the past?",
        type: "radio",
        name: "pastAccidents",
        options: ["Yes", "No"],
      },
      {
        question: "Has your license been revoked in recent years?",
        type: "radio",
        name: "licenseRevoked",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    category: "Environmental and Occupational Risks",
    questions: [
      {
        question: "Do you live in a high-traffic area that poses a risk?",
        type: "radio",
        name: "highTraffic",
        options: ["Yes", "No"],
      },
      {
        question:
          "Do you live in an area of natural disasters (e.g., earthquakes, floods)?",
        type: "radio",
        name: "naturalDisasters",
        options: ["Yes", "No"],
      },
      {
        question:
          "Are there dangerous animals in your area (e.g., venomous snakes, scorpions, crocodiles)?",
        type: "radio",
        name: "dangerousAnimals",
        options: ["Yes", "No"],
      },
      {
        question:
          "Are you exposed to extreme weather (e.g., temperatures above 40°C or below -10°C)?",
        type: "radio",
        name: "extremeWeather",
        options: ["Yes", "No"],
      },
      {
        question: "Do you have access to clean drinking water at home?",
        type: "radio",
        name: "cleanWater",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    category: "Advanced Medical Information and Healthcare Access",
    questions: [
      {
        question: "Do you have diabetes?",
        type: "radio",
        name: "diabetes",
        options: ["Yes", "No"],
      },
      {
        question: "Do you have high blood pressure?",
        type: "radio",
        name: "highBloodPressure",
        options: ["Yes", "No"],
      },
      {
        question: "Have you had previous hospitalizations?",
        type: "radio",
        name: "hospitalizations",
        options: ["Yes", "No"],
      },
      {
        question:
          "Do you have access to healthcare services near where you live? (1-5):",
        type: "number",
        name: "healthcareAccess",
      },
    ],
  },
  {
    category: "Diet and Sleep Habits",
    questions: [
      {
        question: "Do you maintain a healthy diet?",
        type: "radio",
        name: "healthyDiet",
        options: ["Yes", "No"],
      },
      {
        question: "Average sleep hours per night (1-12):",
        type: "number",
        name: "sleepHours",
      },
      {
        question: "Main dietary sources:",
        type: "select",
        name: "dietarySources",
        options: ["Vegetarian", "Meat-based"],
      },
    ],
  },
  {
    category: "Job Type and Work Stress",
    questions: [
      {
        question: "Job type:",
        type: "select",
        name: "jobType",
        options: ["Physical", "Sedentary", "Risky"],
      },
      {
        question: "Work stress level (1-5):",
        type: "number",
        name: "workStress",
      },
      {
        question: "Do you have access to social support at work?",
        type: "radio",
        name: "workSupport",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    category: "Hobbies and Leisure Activities",
    questions: [
      {
        question:
          "Do you engage in risky leisure activities (e.g., extreme sports)?",
        type: "radio",
        name: "riskyLeisure",
        options: ["Yes", "No"],
      },
      {
        question: "Do you travel frequently (domestic or international)?",
        type: "radio",
        name: "frequentTravel",
        options: ["Yes", "No"],
      },
      {
        question:
          "Do you use safety gear during leisure activities (e.g., helmet when biking)?",
        type: "radio",
        name: "safetyGear",
        options: ["Yes", "No"],
      },
    ],
  },
];

const Survey = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { responses, updateResponse } = useSurveyStore();

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
    if (currentStep < surveyQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Survey Responses from Store:", responses); // Log or process responses
      setIsComplete(true);
      finalizeSurvey();
    }
  };

  const shareUrl = "http://i-dai.com/share/";
  const title = "You Probably Will Die Of COVID-19 .";
  const description = "Do you want to know your destiny? click here !";
  const image =
    "https://plus.unsplash.com/premium_photo-1674850274669-c6cb57ea5265?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
        {!isComplete ? (
          <div className="h-full py-10">
            <QuestionCard
              category={surveyQuestions[currentStep].category}
              questions={surveyQuestions[currentStep].questions}
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
              {currentStep < surveyQuestions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Survey;
