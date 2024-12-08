"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Country Search Component
type CountriesSearchProps = {
  initialValue: string | null;
  onCountrySelect: (country: string) => void;
};

export function CountriesSearch({
  onCountrySelect,
  initialValue  ,
}: CountriesSearchProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<
    { countryName: string; emoji: string }[]
  >([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    initialValue  
  );

   useEffect(() => {
      setSelectedCountry(initialValue);
   }, [initialValue]);

  
  
  const searchContainerRef = useRef<HTMLDivElement>(null);
   // Debounced fetch countries
  const fetchCountries = useCallback(
    async (searchTerm: string) => {
      // Clear error if search is different from selected country
      if (selectedCountry !== searchTerm) {
        setError(null);
      }

      if (searchTerm.trim() === "") {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `/api/countries/search?search=${encodeURIComponent(searchTerm)}`
        );

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setResults(data);
          setIsDropdownOpen(true);
        } else {
          setResults([]);
          setError("Country not found");
          setIsDropdownOpen(false);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("An error occurred while fetching countries");
        setIsDropdownOpen(false);
      } finally {
        setLoading(false);
      }
    },
    [selectedCountry]
  );

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search && search !== selectedCountry) {
        fetchCountries(search);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, fetchCountries, selectedCountry]);

  // Handle country selection
  const handleCountrySelect = (country: {
    countryName: string;
    emoji: string;
  }) => {
    const countryName = country.countryName;
    onCountrySelect(countryName);
    setSearch(countryName);
    setSelectedCountry(countryName);
    setResults([]);
    setIsDropdownOpen(false);
    setError(null);
  };

  return (
    <div ref={searchContainerRef} className="relative w-full">
      <input
        type="text"
        value={selectedCountry ?? search }
        onChange={(e) => {
  
          const value = e.target.value;
          setSearch(value);

          // If input is cleared, reset everything
          if (value === "" || value !== selectedCountry) {
            onCountrySelect("");
            setSelectedCountry(null);
            setResults([]);
            setIsDropdownOpen(false);
            setError(null);
          }
        }}
        onFocus={() => {
          // Only show dropdown if there are results and no country is selected
          if (results.length > 0 && !selectedCountry) {
            setIsDropdownOpen(true);
          }
        }}
        placeholder="Search Country"
        className="border select select-bordered 
              bg-slate-100 text-black  
              focus:outline-blue-500 focus:ring-1 focus:ring-blue-200  w-full text-center rounded-lg  placeholder-shown:text-sm placeholder-shown:text-center"
        required
      />
      {!selectedCountry && isDropdownOpen && results.length > 0 && (
        <div className="absolute z-10 border mt-1 bg-white max-h-48 overflow-y-auto shadow-lg w-full rounded-lg">
          {results.map((country) => (
            <div
              key={country.countryName}
              onClick={() => handleCountrySelect(country)}
              className="cursor-pointer font-medium p-2 hover:bg-gray-100 flex justify-between items-center"
            >
              {country.countryName}
              <span className="mr-2">{country.emoji || "🌍"}</span>
            </div>
          ))}
        </div>
      )}
      {loading && (
        <h1 className="text-center text-xs mt-1 font-medium">Loading...</h1>
      )}
      {error && (
        <h1 className="text-center text-xs mt-1 font-medium text-red-500">
          {error}
        </h1>
      )}
    </div>
  );
}
