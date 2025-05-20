import { AxiosInstance } from "axios";
import { createApiClient } from "../client"; // Import the factory function
import { Blog, PostBlog } from "../types/blogTypes";

// Default client for client-side usage
const defaultApiClient = createApiClient();
// Fetch all blogs
export const getBlogs = async (
  page: number = 1,
  limit: number = 10,
  locale: string = "uz",
  customApiClient: AxiosInstance = defaultApiClient
): Promise<{ blogs: Blog[]; total: number }> => {
  const response = await customApiClient.get<{ blogs: Blog[]; total: number }>("/blogs", {
    params: { page, limit, locale },
  });
  return response.data;
};
// Fetch a single blog by ID
export const getBlogById = async (
  id: string,
  locale?: string,
  customApiClient: AxiosInstance = defaultApiClient
): Promise<Blog> => {
  const response = await customApiClient.get<Blog>(`/blogs/${id}`, {
    params: { locale },
  });
  return response.data;
};

// Create a new blog
export const createBlog = async (
  blog: PostBlog,
  customApiClient: AxiosInstance = defaultApiClient
): Promise<Blog> => {
  const formData = new FormData();
  formData.append("translations", JSON.stringify(blog.translations));
  formData.append("title", blog.title);
  formData.append("image", blog.image);
  formData.append("content", blog.content);
  formData.append("categories", blog.categories.join(","));
  const response = await customApiClient.post<Blog>("/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Update an existing blog
export const updateBlog = async (
  id: string | number,
  blog: PostBlog,
  customApiClient: AxiosInstance = defaultApiClient
): Promise<Blog> => {
  const formData = new FormData();
  formData.append("translations", JSON.stringify(blog.translations));
  formData.append("categories", blog.categories.join(","));
  if (blog.image) formData.append("image", blog.image);
  const response = await customApiClient.put<Blog>(`/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete a blog
export const deleteBlog = async (
  id: string,
  customApiClient: AxiosInstance = defaultApiClient
): Promise<void> => {
  const response = await customApiClient.delete(`/blogs/${id}`);
  return response.data;
};