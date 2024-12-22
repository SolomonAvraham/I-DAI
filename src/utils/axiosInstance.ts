import axios from "axios";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Modify request before sending it (e.g., add an authorization token)
//     // const token =
//     //   typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response.data; // Simplify response handling
//   },
//   (error) => {
//     // Handle errors globally
//     if (error.response.data[0] ) {
//       console.error(`API Error: ${error.response.status}`, error.response.data);
//     } else {
//       console.error("Network Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
