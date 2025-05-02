// api/services/blogService.ts
import { AxiosInstance } from "axios";
import { createApiClient } from "../client"; // Import the factory function
import { Blog } from "../types/blogTypes";

// Default client for client-side usage
const defaultApiClient = createApiClient();

// Fetch all blogs
export const getBlogs = async (
  page: number = 1,
  limit: number = 10,
  locale: string,
  customApiClient: AxiosInstance = defaultApiClient // Optional custom client
): Promise<{ blogs: Blog[]; total: number }> => {
  const response = await customApiClient.get<{ blogs: Blog[]; total: number }>("/blogs", {
    params: { page, limit, locale },
  });
  return response.data;
};

// Fetch a single blog by ID
export const getBlogById = async (
  id: string,
  locale: string = "uz",
  customApiClient: AxiosInstance = defaultApiClient // Optional custom client
): Promise<Blog> => {
  const response = await customApiClient.get<Blog>(`/blogs/${id}`, {
    params: { locale },
  });
  return response.data;
};