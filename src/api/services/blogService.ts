import apiClient from "../client";
import { Blog } from "../types/blogTypes";

// Barcha bloglarni olish
export const getBlogs = async (page: number = 1, limit: number = 10, p0: string): Promise<{ blogs: Blog[]; total: number }> => {
  const response = await apiClient.get<{ blogs: Blog[]; total: number }>("/blogs", {
    params: { page, limit, locale: p0 },
  });
  return response.data;
};
// Ma'lum bir blogni olish
export const getBlogById = async (id: string, locale: string = "uz"): Promise<Blog> => {
  const response = await apiClient.get<Blog>(`/blogs/${id}`, {
    params: { locale },
  });
  return response.data;
};