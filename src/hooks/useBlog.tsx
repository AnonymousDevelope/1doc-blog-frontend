"use client";

import { useState, useEffect } from "react";
import { BlogInput } from "@/types/blog";

/**
 * Custom hook for blog API operations
 * Only runs on client-side to safely access cookies
 */
export function useBlogApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Only access document.cookie on the client side
  useEffect(() => {
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    setToken(cookieToken || null);
  }, []);

  // Get default headers with authorization
  const getHeaders = () => {
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // Create a new blog
  const createBlog = async (blog: BlogInput) => {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const formData = new FormData();

    formData.append("translations", JSON.stringify(blog.translations));

    formData.append("title", blog.title);

    formData.append("image", blog.image);

    formData.append("content", blog.content);

    formData.append("categories", blog.categories);

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/blogs`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create blog");
      }

      return await res.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing blog
  const updateBlog = async (id: string, blog: BlogInput) => {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(blog),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update blog");
      }

      return await res.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a blog
  const deleteBlog = async (id: string) => {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete blog");
      }

      return await res.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get all blogs
  const getBlogs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/blogs`, {
        method: "GET",
        headers: getHeaders(),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch blogs");
      }

      return await res.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single blog by ID
  const getBlogById = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "GET",
        headers: getHeaders(),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch blog");
      }

      return await res.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogs,
    getBlogById,
    isLoading,
    error,
    isAuthenticated: !!token,
  };
}
