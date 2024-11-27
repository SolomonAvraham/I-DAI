import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
  
export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "You are not signed in" },
      { status: 401 }
    );
  }

   const response = NextResponse.json(
    { message: "Signed out successfully" },
    { status: 200 }
  );

   response.cookies.set("next-auth.session-token", "", {
    maxAge: -1,
    path: "/",
  });

  response.cookies.set("next-auth.csrf-token", "", {
    maxAge: -1,
    path: "/",
  });

  return response;
}
