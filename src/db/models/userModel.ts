import mongoose, { Schema, Document } from "mongoose";
import { questionsSchema, IQuestions as IQuestion } from "./questionsModel"; // Ensure this is exported correctly

export interface IUser extends Document {
  name: string;
  image: string;
  formSubmitted: boolean;
  email: string;
  questions: IQuestion[];
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: false },
    image: { type: String, required: false },
    formSubmitted: { type: Boolean, default: false, required: true },
    email: { type: String, required: false },
    questions: { type: [questionsSchema], required: false },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
