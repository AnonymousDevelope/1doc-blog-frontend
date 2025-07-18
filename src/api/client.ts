import axios, { AxiosInstance } from "axios";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const getCookie = (name: string): string | undefined => {
  if (typeof window === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
};
export const createApiClient = (serverToken?: string): AxiosInstance => {
  apiClient.interceptors.request.use(
    (config) => {
      let token: string | undefined;
      if (typeof window !== "undefined") {
        token = getCookie("token") || undefined;
      } else {
        token = serverToken || undefined;
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
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