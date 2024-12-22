import connectToDatabase from "@/db";
import UserModel from "@/db/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const { email, name, image } = body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      const newUser = new UserModel({ email, name, image });

      await newUser.save();

      return NextResponse.json(
        { submitted: false, id: newUser._id, name: newUser.name },
        { status: 200 }
      );
    }

    if (user && user.formSubmitted) {
      return NextResponse.json(
        { submitted: true, id: user._id },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { submitted: false, id: user._id, name: user.name },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
