import axiosInstance from "@/utils/axiosInstance";

export async function searchCountries(searchTerm: string) {
  try {
    const res = await axiosInstance.get(
      `/api/countries/search?search=${encodeURIComponent(searchTerm)}`
    );

    return res.data;
  } catch (error) {
    return error;
  }
}

export async function searchCities(searchTerm: string, country: string) {
  try {
    const res = await axiosInstance.get(
      `/api/countries/cities?country=${encodeURIComponent(
        country
      )}&search=${encodeURIComponent(searchTerm)}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
}
