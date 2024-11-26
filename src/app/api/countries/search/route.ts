import Country from "@/db/models/country"; // Adjust path as needed
import connectToDatabase from "@/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

     const { search } = Object.fromEntries(new URL(req.url).searchParams);

    if (!search || !search.trim()) {
      return NextResponse.json([], { status: 200 }); // Return an empty array if no search query is provided
    }

    const regexSearch = new RegExp(search, "i"); // Case-insensitive regex for matching country names

    // Search for countries that match the `search` string in their `countryName`
    const results = await Country.find(
      { countryName: { $regex: regexSearch } }, // Match countryName
      { countryName: 1, emoji: 1, _id: 0 } // Project only the fields we need
    ).sort({ countryName: 1 }); // Sort by countryName in ascending order

    if (!results.length) {
      return NextResponse.json([], { status: 404 }); // Return an empty array if no matches are found
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
