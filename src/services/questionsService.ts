import useQuestionsStore from "@/store/questionsStore";
import axios from "axios";

export type QuestionResponse = {
  result?: string;
  id?: string;
};

export async function sendQuestions({
  userId,
  userName,
}: {
  userId: string | null;
  userName: string | null;
}): Promise<QuestionResponse> {
  const { responses } = useQuestionsStore.getState();
  const causeofdeath = "";

  const completeResponses = {
    ...responses,
    causeofdeath,
  };

  const res = await axios.post<Promise<QuestionResponse>>(`/api/questions/`, {
    completeResponses,
    userId,
    userName,
  });
  return res.data;
}
