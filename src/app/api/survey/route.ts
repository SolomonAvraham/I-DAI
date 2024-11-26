import { NextResponse } from "next/server";
import connectToDatabase from "@/db"; // Adjust path as necessary
import SurveyResponse from "@/db/models/survey";
 
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

     const newResponse = new SurveyResponse(body);

     await newResponse.save();

    return NextResponse.json(
      { message: "Survey response saved successfully", response: newResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving survey response:", error);
    return NextResponse.json(
      { error: "Failed to save survey response" },
      { status: 500 }
    );
  }
}
