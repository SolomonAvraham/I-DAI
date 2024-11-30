import mongoose, { Schema, Document } from "mongoose";

export interface IQuestions extends Document {
  age: number;
  gender: string;
  country: string;
  city: string;
  income: number;
  bmi: number;
  maritalStatus: string;
  children: number;
  heartDisease: string;
  cancer: string;
  mentalIllness: string;
  chronicIllnesses: string;
  alcohol: number;
  physicalActivity: number;
  stressLevel: number;
  suicidalTendencies: string;
  therapy: string;
  trauma: string;
  lonelinessLevel: number;
  socialSupport: number;
  trafficViolations: number;
  cleanWater: string;
  healthcareAccess: number;
  sleepHours: number;
  dietarySources: string;
  workSupport: string;
  jobType: string;
  riskyLeisure: string;
  frequentTravel: string;
}

const questionsSchema: Schema = new Schema(
  {
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    income: { type: Number, required: true },
    bmi: { type: Number, required: true },
    maritalStatus: {
      type: String,
      enum: ["Married", "Single", "Divorced", "Widowed"],
      required: true,
    },
    children: { type: Number, required: true },
    heartDisease: { type: String, enum: ["Yes", "No"], required: true },
    cancer: { type: String, enum: ["Yes", "No"], required: true },
    mentalIllness: { type: String, enum: ["Yes", "No"], required: true },
    chronicIllnesses: { type: String, enum: ["Yes", "No"], required: true },
    alcohol: { type: Number, min: 1, max: 5, required: true },
    physicalActivity: { type: Number, min: 1, max: 5, required: true },
    stressLevel: { type: Number, min: 1, max: 5, required: true },
    suicidalTendencies: { type: String, enum: ["Yes", "No"], required: true },
    therapy: { type: String, enum: ["Yes", "No"], required: true },
    trauma: { type: String, enum: ["Yes", "No"], required: true },
    lonelinessLevel: { type: Number, min: 1, max: 5, required: true },
    socialSupport: { type: Number, min: 1, max: 5, required: true },
    trafficViolations: { type: Number, required: true },
    cleanWater: {
      type: String,
      required: false,
    },
    healthcareAccess: { type: Number, min: 1, max: 5, required: true },
    sleepHours: { type: Number, min: 1, max: 12, required: true },
    dietarySources: {
      type: String,
      enum: ["Vegetarian", "Meat-based"],
      required: true,
    },
    workSupport: { type: String, enum: ["Yes", "No"], required: true },
    jobType: {
      type: String,
      enum: ["Physical", "Sedentary", "Risky"],
      required: true,
    },
    riskyLeisure: { type: String, enum: ["Yes", "No"], required: true },
    frequentTravel: { type: String, enum: ["Yes", "No"], required: true },
  },
  { timestamps: true }
);

const questions =
  mongoose.models.questions ||
  mongoose.model<IQuestions>(
    "questions",
    questionsSchema
  );

export default questions;
