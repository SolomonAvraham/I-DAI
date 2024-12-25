import connectToDatabase from "@/db";
import UserModel from "@/db/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises"; // Use promises API for async operations
import mongoose from "mongoose";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await Promise.resolve(params);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID format" },
        {
          status: 200,
        }
      );
    }

    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        {
          status: 200,
        }
      );
    }

    if (!user.formSubmitted) {
      return NextResponse.json(
        { success: false, message: "User not submitted" },
        {
          status: 200,
        }
      );
    }

    const { _id, name, questions, email, image } = user;

    if (questions[0]["causeofdeath"] === "") {
      return NextResponse.json(
        { success: false, message: "User has no result" },
        {
          status: 200,
        }
      );
    }

    const result = questions[0]["causeofdeath"];

    const imagesFolder = path.join(process.cwd(), "public/images");
    const files = await fs.readdir(imagesFolder);
    const imageFiles = files.filter((file) =>
      [".jpg", ".jpeg", ".png"].includes(path.extname(file).toLowerCase())
    );

    const matchedImage = imageFiles.find((file) => file === `${result}.jpg`);

    const resultImage = matchedImage
      ? `/images/${matchedImage}`
      : `/images/unknown.jpg`;

    return NextResponse.json(
      {
        id: _id,
        name,
        image: image ?? null,
        result,
        resultImage,
        email: email ?? null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
