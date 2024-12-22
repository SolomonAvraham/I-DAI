import SignIn from "@/components/pages/siginin/signin";
import { getProviders } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="py-10 bg-gray-50">
      <SignIn providers={providers} />
    </div>
  );
}
