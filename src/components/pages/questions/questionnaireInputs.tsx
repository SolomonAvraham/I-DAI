import React from "react";
import { Question } from "@/types/types";
import { CountriesSearch } from "@/components/ui/inputs/countrySearch";
import { CitiesSearch } from "@/components/ui/inputs/citiesSearch";
import { QuestionsValue } from "@/store/questionsStore";

interface QuestionInputProps {
  question: Question;
  currentValue: QuestionsValue;
  selectedCountry?: string | null;
  selectedCity?: string | null;
  handleInputChange: (name: string, value: string | number | boolean) => void;
  setSelectedCountry?: (country: string | null) => void;
  setSelectedCity?: (city: string | null) => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  currentValue,
  selectedCountry,
  selectedCity,
  handleInputChange,
  setSelectedCountry,
  setSelectedCity,
}) => {
  switch (question.type) {
    case "number":
      return (
        <div className="flex items-center justify-center w-full">
          <input
            value={String(currentValue) || question.defaultValue || ""}
            type="number"
            min={question.min}
            max={question.max}
            onChange={(e) => handleInputChange(question.name, e.target.value)}
            className={`
              w-full lg:w-1/3 max-w-xs input input-bordered 
              bg-slate-100 text-black text-center 
              focus:outline-blue-500 focus:ring-2 focus:ring-blue-200
              ${question.name === "income" && "lg:w-6/12"}
             `}
            required
          />
          {question.name === "income" && (
            <span className="text-black px-2 text-lg">$</span>
          )}
        </div>
      );

    case "select":
      return (
        <select
          value={String(currentValue || "")}
          onChange={(e) => handleInputChange(question.name, e.target.value)}
          className="
            w-full lg:w-3/4 max-w-xs select select-bordered 
            bg-slate-100 text-black text-center
            focus:outline-blue-500 focus:ring-2 focus:ring-blue-200
          "
          required
        >
          <option value="" disabled>
            Select an option
          </option>
          {question.options?.map((option: string | number) => (
            <option key={option} value={option}>
              {option}
              {option === 10 && "+"}
            </option>
          ))}
        </select>
      );

    case "radio":
      return (
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {question.options?.map((option: string | number) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                checked={currentValue === option}
                type="radio"
                name={question.name}
                value={option}
                onChange={(e) =>
                  handleInputChange(question.name, e.target.value)
                }
                className="radio radio-primary"
                required
              />
              <span className="text-black">{option}</span>
            </label>
          ))}
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
                setSelectedCity?.(country);
                handleInputChange("city", "");
              }
              handleInputChange("country", country);
            }}
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
