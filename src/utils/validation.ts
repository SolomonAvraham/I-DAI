import { Question } from "@/types/types";
import Joi from "joi";

interface SchemaCategories {
  [key: string]: Joi.ObjectSchema;
}

const messages = {
  "number.base": "This field must be a number",
  "number.min": "Value must be at least {#limit}",
  "number.max": "Value must not exceed {#limit}",
  "string.empty": "This field is required",
  "any.required": "This field is required",
  "string.min": "Must be at least {#limit} characters",
  "string.max": "Must not exceed {#limit} characters",
};

const questionnaireSchema: SchemaCategories = {
  "General Information": Joi.object({
    age: Joi.number().min(18).max(120).required().messages(messages),
    gender: Joi.string().valid("Male", "Female").required().messages(messages),
    country: Joi.string().required().messages(messages),
    city: Joi.string().required().messages(messages),
    income: Joi.number().min(0).required().messages(messages),
    bmi: Joi.number().min(10).max(60).required().messages(messages),
    maritalStatus: Joi.string()
      .valid("Married", "Single", "Divorced", "Widowed")
      .required()
      .messages(messages),
    children: Joi.number().min(0).max(10).required().messages(messages),
  }).unknown(true),

  "Medical and Family History": Joi.object({
    heartDisease: Joi.number().valid(0, 1).required().messages(messages),
    cancer: Joi.number().valid(0, 1).required().messages(messages),
    chronicIllnesses: Joi.number().valid(0, 1).required().messages(messages),
    chronicIllnesses_1: Joi.number().valid(0, 1).required().messages(messages),
  }).unknown(true),

  "Lifestyle and Habits": Joi.object({
    smoke: Joi.number().valid(0, 1).required().messages(messages),
    alcohol: Joi.number().min(0).max(5).required().messages(messages),
    physicalActivity: Joi.number().min(1).max(5).required().messages(messages),
    stressLeve: Joi.number().min(1).max(5).required().messages(messages),
  }).unknown(true),

  "Mental Health and Well-being": Joi.object({
    depression: Joi.number().valid(0, 1).required().messages(messages),
    suicidalTendencies: Joi.number().valid(0, 1).required().messages(messages),
    therapy: Joi.number().valid(0, 1).required().messages(messages),
    trauma: Joi.number().valid(0, 1).required().messages(messages),
    lonelinessLevel: Joi.number().min(1).max(5).required().messages(messages),
    socialSupport: Joi.number().min(1).max(5).required().messages(messages),
  }).unknown(true),

  "Driving Behavior": Joi.object({
    validLicense: Joi.number().valid(0, 1).required().messages(messages),
    phoneDriving: Joi.number().valid(0, 1).required().messages(messages),
    trafficViolations: Joi.number()
      .min(0)
      .max(100)
      .required()
      .messages(messages),
    pastAccidents: Joi.number().valid(0, 1).required().messages(messages),
    licenseRevoked: Joi.number().valid(0, 1).required().messages(messages),
  }).unknown(true),

  "Environmental and Occupational Risks": Joi.object({
    highTraffic: Joi.number().valid(0, 1).required().messages(messages),
    naturalDisasters: Joi.number().valid(0, 1).required().messages(messages),
    dangerousAnimals: Joi.number().valid(0, 1).required().messages(messages),
    extremeWeather: Joi.number().valid(0, 1).required().messages(messages),
    cleanWater: Joi.number().valid(0, 1).required().messages(messages),
  }).unknown(true),

  "Advanced Medical Information and Healthcare Access": Joi.object({
    diabetes: Joi.number().valid(0, 1).required().messages(messages),
    highBloodPressure: Joi.number().valid(0, 1).required().messages(messages),
    hospitalizations: Joi.number().valid(0, 1).required().messages(messages),
    healthcareAccess: Joi.number().min(1).max(5).required().messages(messages),
  }).unknown(true),

  "Diet and Sleep Habits": Joi.object({
    healthyDiet: Joi.number().valid(0, 1).required().messages(messages),
    sleepHours: Joi.number().min(1).max(12).required().messages(messages),
    dietarySources: Joi.string()
      .valid("Vegan", "Vegetarian", "Meat-based", "Normal-Undefined")
      .required()
      .messages(messages),
  }).unknown(true),

  "Job Type and Work Stress": Joi.object({
    jobType: Joi.string()
      .valid("Physical", "Sedentary", "Risky")
      .required()
      .messages(messages),
    workStress: Joi.number().min(1).max(5).required().messages(messages),
    workSupport: Joi.number().valid(0, 1).required().messages(messages),
  }).unknown(true),

  "Hobbies and Leisure Activities": Joi.object({
    riskyLeisur: Joi.number().valid(0, 1).required().messages(messages),
    frequentTravel: Joi.number().valid(0, 1).required().messages(messages),
    safetyGear: Joi.number().valid(0, 1).required().messages(messages),
  }).unknown(true),
};

export const validateField = (name: string, value: string | number | null | boolean| undefined) => {
  const categorySchema = Object.entries(questionnaireSchema).find(
    ([, schema]) => {
      try {
        return schema.extract(name);
      } catch {
        return false;
      }
    }
  );

  if (!categorySchema) return "Invalid field";

  const schema = Joi.object({
    [name]: (categorySchema[1] as Joi.ObjectSchema).extract(name),
  });

  const { error } = schema.validate({ [name]: value });
  return error ? error.details[0].message : null;
};

type FormResponse = string | number | boolean | null;

export const validateForm = (
  responses: Record<string, FormResponse>,
  questions: Question[],
  category: string
) => {
  const schema = questionnaireSchema[category];
  if (!schema) return null;

  // Only validate fields that are actually in the current category
  const categoryFields = questions.map((q) => q.name);
  const categoryResponses: Record<string, FormResponse> = {};

  categoryFields.forEach((field) => {
    if (responses[field] !== undefined) {
      categoryResponses[field] = responses[field];
    }
  });

  // Skip validation if the category is empty (like when going back)
  if (Object.keys(categoryResponses).length === 0) {
    return null;
  }

  const { error } = schema.validate(categoryResponses, {
    abortEarly: false,
    allowUnknown: true, // Allow unknown fields
  });

  if (!error) return null;

  return error.details.reduce((acc: Record<string, string>, detail) => {
    // Only include errors for fields that are in the current category
    const fieldName = String(detail.path[0]);
    if (categoryFields.includes(fieldName)) {
      acc[fieldName] = detail.message;
    }
    return acc;
  }, {});
};
