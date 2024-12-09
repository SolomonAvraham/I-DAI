import CountriesAndCities from "@/db/models/countriesAndCitiesModel"; // Adjust path as needed
import connectToDatabase from "@/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { search } = Object.fromEntries(new URL(req.url).searchParams);

    if (!search || !search.trim()) {
      return NextResponse.json([], { status: 200 });
    }

    const regexSearch = new RegExp(search, "i");

    const results = await CountriesAndCities.find(
      { countryName: { $regex: regexSearch } },
      { countryName: 1, emoji: 1, _id: 0 }
    ).sort({ countryName: 1 });

    if (!results.length) {
      return NextResponse.json([], { status: 404 });
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("🚀 ~ Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch country data" },
      { status: 500 }
    );
  }
}
