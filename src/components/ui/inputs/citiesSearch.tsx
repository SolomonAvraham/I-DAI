import React, { useState, useEffect, useRef, useCallback } from "react";

type CitiesSearchProps = {
  country: string;
  onCitySelect: (city: string) => void;
  disabled?: boolean;
  initialValue: string | null;
};

export function CitiesSearch({
  country,
  onCitySelect,
  disabled = false,
  initialValue,
}: CitiesSearchProps) {
  const [citySearch, setCitySearch] = useState("");
  const [cityResults, setCityResults] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(initialValue);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCity(initialValue);
  }, [initialValue]);

  const fetchCities = useCallback(
    async (searchTerm: string) => {
      // Clear error if search is different from selected city
      if (selectedCity !== searchTerm) {
        setError(null);
      }

      if (!country || searchTerm.trim() === "") {
        setCityResults([]);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          `/api/countries/cities?country=${encodeURIComponent(
            country
          )}&search=${encodeURIComponent(searchTerm)}`
        );
        const data = await res.json();

        if (data) {
          if (!data[0]) {
            setError("City not found");
            setIsDropdownOpen(false);
          } else {
            setCityResults(data);
            setIsDropdownOpen(true);
          }
        } else {
          setCityResults([]);
          setIsDropdownOpen(false);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        setError("An error occurred while fetching cities");
        setIsDropdownOpen(false);
      } finally {
        setLoading(false);
      }
    },
    [country, selectedCity]
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
      if (citySearch && citySearch !== selectedCity) {
        fetchCities(citySearch);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [citySearch, fetchCities, selectedCity]);

  // Handle city selection
  const handleCitySelect = (city: string) => {
    onCitySelect(city);
    setCitySearch(city);
    setSelectedCity(city);
    setCityResults([]);
    setIsDropdownOpen(false);
    setError(null);
  };

  if (disabled) {
    return (
      <div className="mt-4">
        <p>Please select a country first.</p>
      </div>
    );
  }

  return (
    <div ref={searchContainerRef} className="relative w-full">
      <input
        type="text"
        value={selectedCity ?? citySearch}
        onChange={(e) => {
          const value = e.target.value;
          setCitySearch(value);

          if (value === "" || value !== selectedCity) {
            onCitySelect("");
            setSelectedCity(null);
            setCityResults([]);
            setIsDropdownOpen(false);
            setError(null);
          }
        }}
        onFocus={() => {
          if (cityResults.length > 0 && !selectedCity) {
            setIsDropdownOpen(true);
          }
        }}
        placeholder={`Search cities in ${country}...`}
        className="border select select-bordered 
              bg-slate-100 text-black  
              focus:outline-blue-500 focus:ring-1 focus:ring-blue-200  w-full text-center rounded-lg  placeholder-shown:text-xs placeholder-shown:text-start"
        disabled={disabled}
        required
      />
      {!selectedCity && isDropdownOpen && cityResults.length > 0 && (
        <div className="absolute z-10 border mt-1 bg-white max-h-48 overflow-y-auto shadow-lg w-full rounded-lg">
          {cityResults.map((city) => (
            <div
              key={city}
              onClick={() => handleCitySelect(city)}
              className="cursor-pointer text-center p-2 hover:bg-gray-100"
            >
              {city}
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
