import axios, { AxiosInstance } from "axios";

// Base URL for the API
const API_URL = "http://localhost:5000/api/";

// Create the Axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility function to get a cookie by name
const getCookie = (name: string): string | undefined => {
  if (typeof window === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
};

// Function to create an API client with an optional token
export const createApiClient = (serverToken?: string): AxiosInstance => {
  apiClient.interceptors.request.use(
    (config) => {
      let token: string | undefined;
      // Check if we're on the client side (browser)
      if (typeof window !== "undefined") {
        // Client-side: Get token from cookies
        token = getCookie("token") || undefined;
      } else {
        // Server-side: Use the provided serverToken
        token = serverToken || undefined;
      }
      // Set the Authorization header if a token exists
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // Remove the Authorization header if no token is found
        delete config.headers.Authorization;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default createApiClient();