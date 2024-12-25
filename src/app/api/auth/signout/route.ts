import { NextResponse } from "next/server";

export async function POST() {
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
