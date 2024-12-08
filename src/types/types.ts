export type Question = {
  question: string;
  type: "number" | "select" | "radio" | "custom-country" | "custom-city";
  name: string;
  options?: string[] | number[];
  min?: number;
  max?: number;
  defaultValue?: number | string;
  description?: string;
  component?: string;
};

export type Category = {
  category: string;
  questions: Question[];
};
