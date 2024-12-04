import useQuestionsStore from "@/store/questionsStore";

export const finalizeQuestions = async () => {
  const { responses } = useQuestionsStore.getState();
  const completeResponses = {
    ...responses,
    cleanWater: responses.cleanWater || "No",
  };

  try {
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completeResponses),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to save questions response");
    }

    const data = await res.json();
  } catch (error) {
    console.error("Error saving questions:", error);
  }
};
