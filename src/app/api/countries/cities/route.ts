import CountriesAndCities from "@/db/models/countriesAndCitiesModel";
import connectToDatabase from "@/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { country, search } = Object.fromEntries(
      new URL(req.url).searchParams
    );

    if (!country || !country.trim()) {
      return NextResponse.json(
        { error: "Country name is required" },
        { status: 400 }
      );
    }

    const result = await CountriesAndCities.findOne({
      countryName: country,
    }).sort();

    if (!result) {
      return NextResponse.json(
        { error: "Country data not found" },
        { status: 404 }
      );
    }

    const cities = result.cities;

    if (!cities) {
      return NextResponse.json(
        { error: "No cities found for the specified country" },
        { status: 404 }
      );
    }

    let filteredCities = cities;
    if (search && search.trim()) {
      const searchRegex = new RegExp(search, "i");
      filteredCities = cities.filter((city) => searchRegex.test(city));
    }

    const limit = 100;
    const paginatedCities = filteredCities.slice(0, limit);

    const removeDuplicates = new Set(paginatedCities);
    const removeDuplicatesToArray = Array.from(removeDuplicates);

    return NextResponse.json(removeDuplicatesToArray);
  } catch (error) {
    console.error("🚀 ~ City route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
