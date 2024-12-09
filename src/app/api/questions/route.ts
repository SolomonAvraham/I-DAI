import { NextResponse } from "next/server";
import connectToDatabase from "@/db"; // Adjust path as necessary
import questions from "@/db/models/questionsModel";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const newResponse = new questions(body);

    await newResponse.save();

    return NextResponse.json(
      {
        message: "Questions response saved successfully",
        response: newResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving Questions response:", error);
    return NextResponse.json(
      { error: "Failed to save Questions response" },
      { status: 500 }
    );
  }
}
