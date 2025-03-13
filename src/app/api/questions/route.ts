import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/db";
import QuestionsModel from "@/db/models/questionsModel";
import UserModel from "@/db/models/userModel";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const bodyToArray = new Array(body.completeResponses);
    const id = body.userId;
    const userName = body.userName;

    const imagesPath = path.join(process.cwd(), "public/images");
    const files = fs.readdirSync(imagesPath);
    const randomResult = path.parse(files[Math.floor(Math.random() * files.length)]).name;

    // const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
    // const apiKey = process.env.API_KEY as string;

    // const apiResponse = await axios.post(apiUrl, bodyToArray, {
    //   headers: {
    //     Authorization: `Bearer ${apiKey}`,
    //     "Content-Type": "application/json",
    //   },
    // });

    // if (apiResponse.status === 200) {
    //   const responseObject = JSON.parse(apiResponse.data);
    //   const resultArray = responseObject.result;
    //   if (Array.isArray(resultArray) && resultArray.length > 0) {
    //     let result = resultArray[0].pop();

    let result = randomResult;

    const count = await UserModel.countDocuments({});

    if (
      result === "Death due to extreme laughter" ||
      (result === "Death due to laughter (extreme cases of asphyxiation)" &&
        count >= 500000)
    ) {
      result = "Heart attack (myocardial infarction)";
    }

    const newQuestion = new QuestionsModel({
      ...body.completeResponses,
      causeofdeath: result,
    });

    if (!id) {
      const newUser = new UserModel({
        name: userName,
        questions: [newQuestion],
        formSubmitted: true,
      });

      await newUser.save();

      return NextResponse.json(
        {
          id: newUser._id,
        },
        { status: 201 }
      );
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $push: { questions: newQuestion },
        $set: { formSubmitted: true },
      },
      { new: true, upsert: false }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    await updatedUser.save();

    return NextResponse.json(
      {
        id: updatedUser._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred", errorMessage: error },
      { status: 500 }
    );
  }
}
