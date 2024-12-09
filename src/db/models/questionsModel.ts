import mongoose, { Schema, Document } from "mongoose";

export interface IQuestions extends Document {
  // General Information
  age: number;
  gender: "Male" | "Female";
  country: string;
  city: string;
  income: number;
  bmi:
    | "Below-18.5"
    | "18.5-24.9"
    | "25.0-29.9"
    | "30.0-34.9"
    | "35.0-39.9"
    | "Above-40";
  maritalStatus: "Married" | "Single" | "Divorced" | "Widowed";
  children: number;

  // Medical and Family History
  heartDisease: number;
  cancer: number;
  mentalIllness: number;
  chronicIllnesses: number;

  // Lifestyle and Habits
  smoke: number;
  alcohol: 1 | 2 | 3 | 4 | 5;
  physicalActivity: 1 | 2 | 3 | 4 | 5;
  stressLevel: 1 | 2 | 3 | 4 | 5;

  // Mental Health and Well-being
  depression: number;
  suicidalTendencies: number;
  therapy: number;
  trauma: number;
  lonelinessLevel: 1 | 2 | 3 | 4 | 5;
  socialSupport: 1 | 2 | 3 | 4 | 5;

  // Driving Behavior
  validLicense: number;
  phoneDriving: number;
  trafficViolations: number;
  pastAccidents: number;
  licenseRevoked: number;

  // Environmental and Occupational Risks
  highTraffic: number;
  naturalDisasters: number;
  dangerousAnimals: number;
  extremeWeather: number;
  cleanWater: number;

  // Advanced Medical Information and Healthcare Access
  diabetes: number;
  highBloodPressure: number;
  hospitalizations: number;
  healthcareAccess: 1 | 2 | 3 | 4 | 5;

  // Diet and Sleep Habits
  healthyDiet: number;
  sleepHours: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  dietarySources: "Vegan" | "Vegetarian" | "Meat-based" | "Normal-Undefined";

  // Job Type and Work Stress
  jobType: "Physical" | "Sedentary" | "Risky";
  workStress: 1 | 2 | 3 | 4 | 5;
  workSupport: number;

  // Hobbies and Leisure Activities
  riskyLeisure: number;
  frequentTravel: number;
  safetyGear: number;
}

const questionsSchema: Schema = new Schema(
  {
    // General Information
    age: { type: Number, required: true, min: 18, max: 120 },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    income: { type: Number, required: true, min: 0, max: 1000000 },
    bmi: {
      type: String,
      enum: [
        "Below-18.5",
        "18.5-24.9",
        "25.0-29.9",
        "30.0-34.9",
        "35.0-39.9",
        "Above-40",
      ],
      required: true,
    },
    maritalStatus: {
      type: String,
      enum: ["Married", "Single", "Divorced", "Widowed"],
      required: true,
    },
    children: { type: Number, required: true, min: 0, max: 10 },

    // Medical and Family History
    heartDisease: { type: Number, required: true },
    cancer: { type: Number, required: true },
    mentalIllness: { type: Number, required: true },
    chronicIllnesses: { type: Number, required: true },

    // Lifestyle and Habits
    smoke: { type: Number, required: true },
    alcohol: { type: Number, min: 1, max: 5, required: true },
    physicalActivity: { type: Number, min: 1, max: 5, required: true },
    stressLevel: { type: Number, min: 1, max: 5, required: true },

    // Mental Health and Well-being
    depression: { type: Number, required: true },
    suicidalTendencies: { type: Number, required: true },
    therapy: { type: Number, required: true },
    trauma: { type: Number, required: true },
    lonelinessLevel: { type: Number, min: 1, max: 5, required: true },
    socialSupport: { type: Number, min: 1, max: 5, required: true },

    // Driving Behavior
    validLicense: { type: Number, required: true },
    phoneDriving: { type: Number, required: true },
    trafficViolations: { type: Number, required: true, min: 0, max: 100 },
    pastAccidents: { type: Number, required: true },
    licenseRevoked: { type: Number, required: true },

    // Environmental and Occupational Risks
    highTraffic: { type: Number, required: true },
    naturalDisasters: { type: Number, required: true },
    dangerousAnimals: { type: Number, required: true },
    extremeWeather: { type: Number, required: true },
    cleanWater: { type: Number, required: true },

    // Advanced Medical Information and Healthcare Access
    diabetes: { type: Number, required: true },
    highBloodPressure: { type: Number, required: true },
    hospitalizations: { type: Number, required: true },
    healthcareAccess: { type: Number, min: 1, max: 5, required: true },

    // Diet and Sleep Habits
    healthyDiet: { type: Number, required: true },
    sleepHours: { type: Number, min: 1, max: 12, required: true },
    dietarySources: {
      type: String,
      enum: ["Vegan", "Vegetarian", "Meat-based", "Normal-Undefined"],
      required: true,
    },

    // Job Type and Work Stress
    jobType: {
      type: String,
      enum: ["Physical", "Sedentary", "Risky"],
      required: true,
    },
    workStress: { type: Number, min: 1, max: 5, required: true },
    workSupport: { type: Number, required: true },

    // Hobbies and Leisure Activities
    riskyLeisure: { type: Number, required: true },
    frequentTravel: { type: Number, required: true },
    safetyGear: { type: Number, required: true },
  },
  { timestamps: true }
);

const QuestionsModel =
  mongoose.models.Questions ||
  mongoose.model<IQuestions>("Questions", questionsSchema);

export default QuestionsModel;
