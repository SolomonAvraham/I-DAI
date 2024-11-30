import mongoose, { Schema, Document } from "mongoose";

 export interface IUser extends Document {
  name: string;
  email: string;
  questions?: mongoose.Types.ObjectId[];  
}

 const userSchema: Schema = new Schema(
   {
     name: { type: String, required: true, trim: true },
     email: { type: String, required: true, unique: true, lowercase: true },
     image: { type: String, required: true },
     questions: [
       { type: Schema.Types.ObjectId, ref: "questions" },
     ],
   },
   { timestamps: true }
 );
///results, payments-packages
 userSchema.index({ email: 1 });

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
