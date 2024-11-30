import mongoose, { Schema, Document, Model } from "mongoose";

const CountriesAndCitiesSchema = new Schema(
  {
    countryName: {
      type: String,
      required: true,
    },
    cities: {
      type: [String],
      required: true,
    },
    emoji: {
      type: String,
      required: true,
    },
  },
  {
    collection: "countries&cities",
  }
);

export interface ICountriesAndCities extends Document {
  countryName: string;
  cities: string[];
  emoji: string;
}

const CountriesAndCities: Model<ICountriesAndCities> =
  mongoose.models.CountriesAndCities ||
  mongoose.model<ICountriesAndCities>(
    "CountriesAndCities",
    CountriesAndCitiesSchema
  );

export default CountriesAndCities;
