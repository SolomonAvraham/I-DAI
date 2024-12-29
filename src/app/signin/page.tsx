import SignIn from "@/components/pages/siginin/signin";
import { getProviders } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="py-5 bg-gray-100">
      <SignIn providers={providers} />
    </div>
  );
}
