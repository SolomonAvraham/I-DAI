import { create } from "zustand";

type QuestionsValue = string | number | boolean | null;

type QuestionsStore = {
  responses: Record<string, QuestionsValue>;
  updateResponse: (name: string, value: QuestionsValue) => void; // Function to update a specific response
  resetQuestions: () => void;
};

const useQuestionsStore = create<QuestionsStore>((set) => ({
  responses: {},
  updateResponse: (name: string, value: QuestionsValue) =>
    set((state) => ({
      responses: { ...state.responses, [name]: value },
    })),
  resetQuestions: () => set({ responses: {} }),
}));

export default useQuestionsStore;
