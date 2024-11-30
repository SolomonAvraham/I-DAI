"use client";

import { useState, useEffect } from "react";

type CountriesAndCitiesSearchProps = {
  onCountrySelect: (country: string) => void;
  onCitySelect: (city: string) => void;
};

export default function CountriesAndCitiesSearch({
  onCountrySelect,
  onCitySelect,
}: CountriesAndCitiesSearchProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<
    { countryName: string; emoji: string }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [cityResults, setCityResults] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      if (search.trim() === "") {
        setResults([]);
        setError(null);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `/api/countries/search?search=${encodeURIComponent(search)}`
        );

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setResults(data);
        } else {
          setResults([]);
          setError("Country not found");
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchCountries();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedCountry || citySearch.trim() === "") {
        setCityResults([]);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          `/api/countries/cities?country=${encodeURIComponent(
            selectedCountry
          )}&search=${encodeURIComponent(citySearch)}`
        );
        const data = await res.json();
        if (data) {
          if (!data[0]) {
            setError("City not found");
          } else {
            setCityResults(data);
          }
        } else {
          setCityResults([]);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchCities();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCountry, citySearch]);

  return (
    <div className="p-4">
      {/* Country Input */}
      <div>
        <input
          type="text"
          value={selectedCountry || search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedCountry("");
            setCitySearch("");
            setCityResults([]);
          }}
          placeholder={"Search Country"}
          className="border  bg-white  p-2 w-full text-center rounded-lg  placeholder-shown:text-sm placeholder-shown:text-center"
        />
        {results.length > 0 && !selectedCountry && (
          <div className="border mt-1 bg-white max-h-60 overflow-y-auto shadow-lg">
            {results.map((country) => (
              <div
                key={country.countryName}
                onClick={() => {
                  setSelectedCountry(country.countryName);
                  onCountrySelect(country.countryName);
                  setSearch("");
                  setResults([]);
                }}
                className="cursor-pointer font-medium p-2 hover:bg-gray-100 flex justify-between items-center"
              >
                {country.countryName}
                <span className="mr-2">{country.emoji || "🌍"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* City Input */}
      {selectedCountry && (
        <div className="mt-4">
          <input
            type="text"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            placeholder={`Search cities in ${selectedCountry}...`}
            className="border  bg-white  text-center p-2 w-full rounded-lg placeholder-shown:text-sm placeholder-shown:text-center"
          />
          {cityResults.length > 0 && (
            <div className="border mt-2 bg-white max-h-60 overflow-y-auto shadow-lg">
              {cityResults.map((city) => (
                <div
                  key={city}
                  onClick={() => {
                    onCitySelect(city);
                    setCitySearch(city);
                    setCityResults([]);
                  }}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {loading && (
        <h1 className="text-center text-xs mt-1 font-medium">Loading...</h1>
      )}{" "}
      {error && (
        <h1 className="text-center text-xs mt-1 font-medium">{error}</h1>
      )}
    </div>
  );
}
