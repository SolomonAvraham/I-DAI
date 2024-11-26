import useSurveyStore from "@/store/surveyStore";

 
export const finalizeSurvey = async () => {
  const { responses } = useSurveyStore.getState();
  console.log("Survey Responses:", responses);  
 const completeResponses = {
   ...responses,
   cleanWater: responses.cleanWater || "No",  
 };
    
    
    
  try {
    const res = await fetch("/api/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completeResponses),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to save survey response");
    }

    const data = await res.json();
    console.log("Survey saved successfully:", data);
  } catch (error) {
    console.error("Error saving survey:", error);
  }
};
