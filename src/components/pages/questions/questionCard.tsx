"use client";

import React from "react";
import CountriesAndCitiesSearch from "@/components/ui/inputs/countrySearch";

type QuestionCardProps = {
  category: string;
  questions: {
    question: string;
    type: string;
    name: string;
    options?:  number[] | string[];
    component?: string;
    min?: number;
    max?: number;
    defaultValue?: number;
    description?: string;
  }[];
  onInputChange: (name: string, value: string | number | boolean) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  category,
  questions,
  onInputChange,
}) => {
  return (
    <div className="h-full w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Category Header */}
      <h2 className="tracking-wide text-3xl md:text-5xl text-center font-extrabold text-blue-800 pb-5">
        {category}
      </h2>

      <div
        className="border rounded-lg shadow-md bg-white w-full flex-1 overflow-y-auto"
        style={{
          padding: "1.5rem",
          maxHeight: "100%",
        }}
      >
        {/* Questions */}
        <div className="flex flex-col justify-center  gap-5  h-full text-black">
          {questions.map((q, index) => (
            <div
              key={index}
              className="flex flex-col justify-center text-left items-center md:flex-row gap-4 md:gap-7"
            >
              <label
                className="text-gray-800 font-semibold md:w-1/4"
                htmlFor={q.name}
              >
                {q.question}
              </label>

              {/* Input Types */}
              {q.type === "text" && (
                <input
                  id={q.name}
                  type="text"
                  name={q.name}
                  className="border  bg-white  rounded-md px-4 py-2 text-base  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => onInputChange(q.name, e.target.value)}
                  required
                  aria-label={q.question}
                />
              )}

              {q.type === "number" && (
                <div className="flex flex-col items-center gap-1">
                  <input
                    id={q.name}
                    type="number"
                    name={q.name}
                    className="border  bg-white  rounded-md px-4 py-2 text-center  w-24  focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => onInputChange(q.name, e.target.value)}
                    required
                    aria-label={q.question}
                    min={q.min ?? 0}
                    max={q.max ?? 120}
                    defaultValue={q.defaultValue ? q.defaultValue : 0}
                  />
                  {q.description && (
                    <p className="text-xs text-gray-500">{q.description}</p>
                  )}
                </div>
              )}

              {q.type === "radio" && q.options && (
                <div className="flex  items-center justify-center  gap-4">
                  {q.options.map((option, idx) => (
                    <label key={idx} className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name={q.name}
                        value={option}
                        className="w-11 cursor-pointer"
                        onChange={(e) => onInputChange(q.name, e.target.value)}
                        required
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {q.type === "select" && q.options && (
                <>
                  <select
                    id={q.name}
                    name={q.name}
                    className="border  bg-white rounded-md px-4 py-2 text-base   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => onInputChange(q.name, e.target.value)}
                    required
                    aria-label={q.question}
                  >
                    <option value="">
                      {q.defaultValue ?? "Select an option"}
                    </option>
                    {q.options.map((option, idx) => (
                      <option key={idx} value={option}  >
                        {option}
                      </option>
                    ))}
                  </select>
                  {q.description && (
                    <p className="text-xs text-gray-500">{q.description}</p>
                  )}{" "}
                </>
              )}

              {/* Custom Component Handling */}
              {q.type === "custom" &&
                q.component === "CountriesAndCitiesSearch" && (
                  <CountriesAndCitiesSearch
                    onCountrySelect={(country) =>
                      onInputChange("country", country)
                    }
                    onCitySelect={(city) => onInputChange("city", city)}
                  />
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
