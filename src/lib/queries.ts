import { sendQuestions } from "@/services/questionsService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function UseSendQuestionsMutation() {
  const router = useRouter();

  return useMutation({
    mutationKey: ["send questions"],
    mutationFn: sendQuestions,
    onSuccess: (data) => {
      router.push(`/user/result/${data.id}`);
      //updateResponse("result", data.result);
      localStorage.removeItem("questionnaireProgress");
    },
    onError: (error) => {
      //APIError
      console.log(error);
      alert(error);
    },
  });
}
