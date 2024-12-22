import ResultsPage from "@/components/pages/resultsPage/resultsPage";
import { getResult } from "@/services/userService";
import { redirect } from "next/navigation";
 

type ResultPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ResultPage({ params }: ResultPageProps) {
  // You can now safely use params.id
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
    <div className="py-10 grid place-items-center">
      <ResultsPage {...userResult} id={id} />
    </div>
  );
}
