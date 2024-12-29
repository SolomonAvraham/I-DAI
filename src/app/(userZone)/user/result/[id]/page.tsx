import ResultsPage from "@/components/pages/resultsPage/resultsPage";
import { getResult } from "@/services/userService";
import { redirect } from "next/navigation";

export type ResultPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await Promise.resolve(params);

  const userResult = await getResult(id);

  if (
    userResult.message === "User not found" ||
    userResult.message === "Invalid ID format"
  ) {
    return redirect("/");
  }

  if (
    userResult.message === "User not submitted" ||
    userResult.message === "User has no result"
  ) {
    return redirect("/user/questions");
  }
  return (
    <div className=" min-h-screen bg-gray-100 ">
      <ResultsPage {...userResult} />
    </div>
  );
}
