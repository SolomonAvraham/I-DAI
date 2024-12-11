import { useState, useEffect } from "react";
import useQuestionsStore from "@/store/questionsStore";
import { QuestionsValue } from "@/store/questionsStore";

export const useQuestionnaireProgress = () => {
  const { responses, updateResponse } = useQuestionsStore();
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
 
  useEffect(() => {
    const savedProgress = localStorage.getItem("questionnaireProgress");
    if (savedProgress) {
      const { savedCategory, savedResponses, savedCountry, savedCity } =
        JSON.parse(savedProgress);

      setCurrentCategory(savedCategory);

      if (savedCountry) {
        setSelectedCountry(savedCountry);
      }
      if (savedCity) {
        setSelectedCity(savedCity);
      }

      Object.entries(savedResponses).forEach(([key, value]) => {
        updateResponse(key, value as QuestionsValue);
      });
    }
  }, []);

  const saveProgress = () => {
    const progressToSave = {
      savedCategory: currentCategory,
      savedResponses: responses,
      savedCountry: selectedCountry,
      savedCity: selectedCity,
    };
    localStorage.setItem(
      "questionnaireProgress",
      JSON.stringify(progressToSave)
    );
  };

  return {
    currentCategory,
    setCurrentCategory,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity,
    responses,
    updateResponse,
    saveProgress, 
  };
};
