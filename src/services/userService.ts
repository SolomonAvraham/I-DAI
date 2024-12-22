import axiosInstance from "@/utils/axiosInstance";

export type GoogleLoginResponse = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export const getResult = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/user/result/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching result:", error);
    throw error;
  }
};

export const isUserExistsGoogle = async (user: GoogleLoginResponse) => {
  try {
    const response = await axiosInstance.post(
      "/api/user/isUserExistsGoogle/",
      user
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};
