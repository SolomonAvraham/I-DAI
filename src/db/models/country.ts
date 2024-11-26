import mongoose, { Schema, Document, Model } from "mongoose";

const CountrySchema = new Schema(
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

export interface ICountry extends Document {
  countryName: string;
  cities: string[];
  emoji: string;
}

const Country: Model<ICountry> =
  mongoose.models.Country || mongoose.model<ICountry>("Country", CountrySchema);

export default Country;
