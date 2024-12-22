export type Question = {
  question: string;
  type: "number" | "select" | "radio" | "custom-country" | "custom-city";
  name: string;
  options?: string[] | number[];
  min?: number;
  max?: number;
  description?: string;
  component?: string;
  dataType?: "number" | "string";
};

export type Category = {
  category: string;
  questions: Question[];
};
