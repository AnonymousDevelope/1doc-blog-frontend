import { useState, useEffect } from "react";
import { getBlogById } from "../api/services/blogService";
import { Blog } from "../api/types/blogTypes";
export const useBlog = (id: string, locale: string = "uz") => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const data = await getBlogById(id, locale);
        setBlog(data);
      } catch (err: unknown) {
        if (err instanceof globalThis.Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch blog");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, locale]);
  return { blog, loading, error };
};