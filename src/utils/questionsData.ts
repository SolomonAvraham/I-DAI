import { Category } from "@/types/types";

export const questions: Category[] = [
  {
    category: "General Information",
    questions: [
      {
        question: "Age:",
        type: "number",
        name: "age",
        min: 18,
        max: 120,
      },
      {
        question: "Gender:",
        type: "select",
        name: "gender",
        options: ["Male", "Female"],
      },
      {
        question: "Country:",
        type: "custom-country",
        name: "Country",
        component: "CountrySearch",
      },
      {
        question: "City:",
        type: "custom-city",
        name: "City",
        component: "CitiesSearch",
      },
      {
        question: "Yearly income in USD:",
        type: "number",
        name: "income",
        min: 0,
        max: 1000000,
        defaultValue: 0,
      },
      {
        question: "BMI (Body Mass Index):",
        type: "select",
        name: "bmi",
        options: [
          "Below-18.5",
          "18.5-24.9",
          "25.0-29.9",
          "30.0-34.9",
          "35.0-39.9",
          "Above-40",
        ],
      },
      {
        question: "Marital status:",
        type: "select",
        name: "maritalStatus",
        options: ["Married", "Single", "Divorced", "Widowed"],
      },
      {
        question: "Number of children:",
        type: "select",
        name: "children",
        options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        defaultValue: 0,
      },
    ],
  },
  {
    category: "Medical and Family History",
    questions: [
      {
        question: "Do you have a family history of heart disease?",
        type: "radio",
        name: "heartDisease",
        options: [0, 1],
      },
      {
        question: "Do you have a family history of cancer?",
        type: "radio",
        name: "cancer",
        options: [0, 1],
      },
      {
        question: "Do you have a family history of mental illness?",
        type: "radio",
        name: "mentalIllness",
        options: [0, 1],
      },
      {
        question:
          "Are there other chronic illnesses in your family (e.g., ALS, multiple sclerosis)?",
        type: "radio",
        name: "chronicIllnesses",
        options: [0, 1],
      },
    ],
  },
  {
    category: "Lifestyle and Habits",
    questions: [
      {
        question: "Do you smoke?",
        type: "radio",
        name: "smoke",
        options: [0, 1],
      },
      {
        question: "Alcohol use (0-5):",
        type: "select",
        name: "alcohol",
        description:
          "0 not drinking at all, 1 is the lowest, and 5 is the highest.",
        options: [0, 1, 2, 3, 4, 5],
      },
      {
        question: "Physical activity (1-5):",
        type: "select",
        name: "physicalActivity",
        options: [1, 2, 3, 4, 5],
        description: "1 is the lowest, and 5 is the highest.",
      },
      {
        question: "Daily stress level (NOT at work)(1-5):",
        type: "select",
        name: "stressLevel",
        options: [1, 2, 3, 4, 5],
        description: "1 is the lowest, and 5 is the highest.",
      },
    ],
  },
  {
    category: "Mental Health and Well-being",
    questions: [
      {
        question: "Do you have a history of depression?",
        type: "radio",
        name: "depression",
        options: [0, 1],
      },
      {
        question: "Have you had suicidal tendencies in the past?",
        type: "radio",
        name: "suicidalTendencies",
        options: [0, 1],
      },
      {
        question:
          "Have you received psychological therapy in the past or present?",
        type: "radio",
        name: "therapy",
        options: [0, 1],
      },
      {
        question:
          "Have you experienced traumatic events like severe injury, accident, or war?",
        type: "radio",
        name: "trauma",
        options: [0, 1],
      },
      {
        question: "Loneliness level (1-5):",
        type: "select",
        name: "lonelinessLevel",
        options: [1, 2, 3, 4, 5],
        description: "1 is the lowest, and 5 is the highest.",
      },
      {
        question:
          "Do you have strong social support (e.g., friends and family)? (1-5):",
        name: "socialSupport",
        type: "select",
        options: [1, 2, 3, 4, 5],
        description: "1 is the lowest, and 5 is the highest.",
      },
    ],
  },
  {
    category: "Driving Behavior",
    questions: [
      {
        question: "Do you have a valid driver's license?",
        type: "radio",
        name: "validLicense",
        options: [0, 1],
      },
      {
        question: "Do you use your mobile phone while driving?",
        type: "radio",
        name: "phoneDriving",
        options: [0, 1],
      },
      {
        question: "How many traffic violations have you had in the past year?",
        type: "number",
        name: "trafficViolations",
        min: 0,
        max: 100,
        defaultValue: 0,
      },
      {
        question: "Have you had accidents in the past as a driver?",
        type: "radio",
        name: "pastAccidents",
        options: [0, 1],
      },
      {
        question: "Has your license been revoked in recent years?",
        type: "radio",
        name: "licenseRevoked",
        options: [0, 1],
      },
    ],
  },
  {
    category: "Environmental and Occupational Risks",
    questions: [
      {
        question: "Do you live in a high-traffic area that poses a risk?",
        type: "radio",
        name: "highTraffic",
        options: [0, 1],
      },
      {
        question:
          "Do you live in an area of natural disasters (e.g., earthquakes, floods)?",
        type: "radio",
        name: "naturalDisasters",
        options: [0, 1],
      },
      {
        question:
          "Are there dangerous animals in your area (e.g., venomous snakes, scorpions, crocodiles)?",
        type: "radio",
        name: "dangerousAnimals",
        options: [0, 1],
      },
      {
        question:
          "Are you exposed to extreme weather (e.g., temperatures above 40°C or below -10°C)?",
        type: "radio",
        name: "extremeWeather",
        options: [0, 1],
      },
      {
        question: "Do you have access to clean drinking water at home?",
        type: "radio",
        name: "cleanWater",
        options: [0, 1],
      },
    ],
  },
  {
    category: "Advanced Medical Information and Healthcare Access",
    questions: [
      {
        question: "Do you have diabetes?",
        type: "radio",
        name: "diabetes",
        options: [0, 1],
      },
      {
        question: "Do you have high blood pressure?",
        type: "radio",
        name: "highBloodPressure",
        options: [0, 1],
      },
      {
        question: "Have you had previous hospitalizations in the last 3 years?",
        type: "radio",
        name: "hospitalizations",
        options: [0, 1],
      },
      {
        question:
          "Do you have access to healthcare services near where you live? (1-5):",
        type: "select",
        name: "healthcareAccess",
        options: [1, 2, 3, 4, 5],
        description: "1 is the lowest, and 5 is the highest.",
      },
    ],
  },
  {
    category: "Diet and Sleep Habits",
    questions: [
      {
        question: "Do you maintain a healthy diet?",
        type: "radio",
        name: "healthyDiet",
        options: [0, 1],
      },
      {
        question: "Average sleep hours per night (1-12):",
        type: "select",
        name: "sleepHours",
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      {
        question: "Main dietary sources:",
        type: "select",
        name: "dietarySources",
        options: ["Vegan", "Vegetarian", "Meat-based", "Normal-Undefined"],
      },
    ],
  },
  {
    category: "Job Type and Work Stress",
    questions: [
      {
        question: "Job type:",
        type: "select",
        name: "jobType",
        options: ["Physical", "Sedentary", "Risky"],
      },
      {
        question: "Work stress level (1-5):",
        type: "select",
        name: "workStress",
        options: [1, 2, 3, 4, 5],
        description: "1 is the lowest, and 5 is the highest.",
      },
      {
        question: "Do you have access to social support at work?",
        type: "radio",
        name: "workSupport",
        options: [0, 1],
      },
    ],
  },
  {
    category: "Hobbies and Leisure Activities",
    questions: [
      {
        question:
          "Do you engage in risky leisure activities (e.g., extreme sports)?",
        type: "radio",
        name: "riskyLeisure",
        options: [0, 1],
      },
      {
        question: "Do you travel frequently (domestic or international)?",
        type: "radio",
        name: "frequentTravel",
        options: [0, 1],
      },
      {
        question:
          "Do you use safety gear during leisure activities (e.g., helmet when biking)?",
        type: "radio",
        name: "safetyGear",
        options: [0, 1],
      },
    ],
  },
];
