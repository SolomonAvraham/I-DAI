import { create } from "zustand";

type SurveyResponseValue = string | number | boolean | null;  

type SurveyStore = {
  responses: Record<string, SurveyResponseValue>;  
  updateResponse: (name: string, value: SurveyResponseValue) => void; // Function to update a specific response
  resetSurvey: () => void;  
};

const useSurveyStore = create<SurveyStore>((set) => ({
  responses: {},
  updateResponse: (name: string, value: SurveyResponseValue) =>
    set((state) => ({
      responses: { ...state.responses, [name]: value },
    })),
  resetSurvey: () => set({ responses: {} }),
}));

export default useSurveyStore;
