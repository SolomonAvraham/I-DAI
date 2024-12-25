import QuestionnaireForm from "@/components/pages/questions/questionnaireForm";
import { authOptions } from "@/lib/authOptions";
import {
  GoogleLoginResponse,
  isUserExistsGoogle,
} from "@/services/userService";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
export default async function QuestionsPage() {
  const session = await getServerSession(authOptions);

  const user = session?.user as GoogleLoginResponse;

  let userGoogle = null;

  if (user) {
    userGoogle = await isUserExistsGoogle(user);

    if (userGoogle.submitted) {
      return redirect(`/user/result/${userGoogle.id}`);
    }
  }

  return (
    <div className="py-10 grid place-items-center">
      <QuestionnaireForm {...userGoogle} />
    </div>
  );
}
