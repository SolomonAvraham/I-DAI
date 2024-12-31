import React from "react";
import { Question } from "@/types/types";
import { CountriesSearch } from "@/components/features/inputs/countrySearch";
import { CitiesSearch } from "@/components/features/inputs/citiesSearch";
import { QuestionsValue } from "@/store/questionsStore";

interface QuestionInputProps {
  question: Question;
  currentValue: QuestionsValue;
  selectedCountry?: string | null;
  selectedCity?: string | null;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  setSelectedCountry?: (country: string | null) => void;
  setSelectedCity?: (city: string | null) => void;
  error?: string;
  countryAndCityErrors?: string;
}

const getOptionLabel = (
  option: string | number,
  questionName: string
): string => {
  if (questionName === "children") {
    if (option === 0) return "0";
    if (option === 10) return "10+";
    return option.toString();
  }

  if (questionName === "sleepHours") {
    if (option === 12) return "12+";
    return option.toString();
  }

  return option.toString();
};

export const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  currentValue,
  selectedCountry,
  selectedCity,
  handleInputChange,
  setSelectedCountry,
  setSelectedCity,
  error,
  countryAndCityErrors,
}) => {
  const errorClasses = error ? "border-red-500 focus:border-red-500" : "";

  const inputBaseClasses = `
    w-full max-w-xs 
    bg-slate-100 text-black 
    focus:outline-blue-500 focus:ring-2 focus:ring-blue-200
  `;

  const ErrorMessage = () =>
    error ? (
      <div className="text-red-500 text-center font-semibold text-xs mt-1">
        {error}
      </div>
    ) : null;

  switch (question.type) {
    case "number":
      return (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center">
            <input
              value={currentValue === null ? "" : String(currentValue)}
              type="number"
              min={question.min}
              max={question.max}
              placeholder={question.min?.toString() || ""}
              onChange={(e) =>
                handleInputChange(question.name, Number(e.target.value))
              }
              // readOnly
              // onFocus={(e) => e.target.removeAttribute('readonly')}
              className={`
              ${inputBaseClasses} ${errorClasses}
            input input-bordered border-black border-[0.001px] text-center text-black
            ${question.name === "trafficViolations" && "w-7 md:w-11/12"}
            ${question.name === "age" && "w-4/12 md:w-11/12"}
            ${question.name === "bmi" && " w-11/12 "} 
            `}
              required
            />
            {question.name === "income" && (
              <span className="text-black px-2 md:text-lg">$</span>
            )}
          </div>
          <ErrorMessage />
        </div>
      );

    case "select":
      return (
        <div className="flex flex-col items-center justify-center w-full">
          <select
            value={currentValue === undefined ? "" : String(currentValue)}
            onChange={(e) => {
              const rawValue = e.target.value;
              const typedValue =
                question.dataType === "number" ? Number(rawValue) : rawValue;
              handleInputChange(question.name, typedValue); // Pass the converted value
            }}
            className={`
            ${inputBaseClasses} ${errorClasses} lg:w-44
            select select-bordered text-center border-black border-[0.0001px]
          `}
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            {question.options?.map((option: string | number) => (
              <option key={option} value={option}>
                {getOptionLabel(option, question.name)}
              </option>
            ))}
          </select>
          <ErrorMessage />
        </div>
      );

    case "radio":
      return (
        <div className="flex flex-col justify-center  items-center">
          <div className="flex flex-wrap gap-4 justify-center w-full">
            {question.options?.map((option: string | number) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  checked={Number(currentValue) === Number(option)}
                  type="radio"
                  name={question.name}
                  value={Number(option)}
                  onChange={(e) =>
                    handleInputChange(question.name, Number(e.target.value))
                  }
                  className={`radio radio-primary ${errorClasses}`}
                />
                <span className="text-black">
                  {option === 0 ? "No" : option === 1 ? "Yes" : option}
                </span>
              </label>
            ))}
          </div>
          <ErrorMessage />
        </div>
      );

    case "custom-country":
      return (
        <div className="w-full lg:w-3/4 text-black max-w-xs mx-auto">
          <CountriesSearch
            initialValue={selectedCountry ?? null}
            onCountrySelect={(country) => {
              setSelectedCountry?.(country);
              if (!country) {
                setSelectedCity?.(null);
                handleInputChange("city", "");
              }
              handleInputChange("country", country || "");
            }}
            formError={countryAndCityErrors}
          />
        </div>
      );

    case "custom-city":
      return selectedCountry ? (
        <div className="w-full lg:w-3/4 text-black max-w-xs mx-auto">
          <CitiesSearch
            initialValue={selectedCity ?? null}
            country={selectedCountry}
            onCitySelect={(city) => {
              setSelectedCity?.(city);
              handleInputChange("city", city);
            }}
            disabled={!selectedCountry}
            formError={countryAndCityErrors}
          />
        </div>
      ) : (
        <div className="mt-2 text-sm text-center">
          <p className="text-gray-600">Please select a country first.</p>
        </div>
      );

    default:
      return null;
  }
};
