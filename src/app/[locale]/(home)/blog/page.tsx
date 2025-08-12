"use client";
import React, { useState, useEffect } from "react";
import { BlogCard, Pagination, BlogCardSkeleton } from "./_components";
import { useSearchParams, useParams } from "next/navigation";
import { getBlogs } from "@/api/services/blogService";
import type { Blog } from "@/api/types/blogTypes";
const ITEMS_PER_PAGE = 6;
const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getBlogs(page, ITEMS_PER_PAGE, locale as string);
        const recentBlog = await getBlogs(1, 4, locale as string); // Fetch recent blogs
        setRecentBlogs(recentBlog.blogs); // Set recent blogs state
        setBlogs(response.blogs);
        setTotalBlogs(response?.total || 0);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch blogs");
        } else {
          setError("Failed to fetch blogs");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchParams, locale]);
  const totalPages = Math.ceil(totalBlogs / ITEMS_PER_PAGE);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    window.history.pushState({}, "", `?${params.toString()}`);
  };

  const handleRetry = () => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
    setLoading(true);
    setError(null);

    const fetchBlogs = async () => {
      try {
        const response = await getBlogs(page, ITEMS_PER_PAGE, locale as string);
        setBlogs(response.blogs);
        setTotalBlogs(response?.total || 0);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch blogs");
        } else {
          setError("Failed to fetch blogs");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  };

  // Determine the indices for the recent news section
  const lastBlog = recentBlogs[recentBlogs.length - 1]; // Last blog (most recent)
  const previousBlogs = recentBlogs.slice(0, recentBlogs.length - 1); // Blogs before the last one

  return (
    <div className="max-w-7xl mx-auto px-2">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Blog
      </h1>

      {/* Loading State with Skeleton */}
      {loading && (
        <>
          <section className="py-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Songi yangiliklar
            </h2>
            <div className="grid grid-cols-1 gap-3 px-2 md:grid-cols-2 md:px-2">
              <div className="grid grid-cols-1 gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <BlogCardSkeleton key={index} size="small" />
                ))}
              </div>
              <BlogCardSkeleton size="large" />
            </div>
          </section>
          <section className="py-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Barcha yangiliklar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <BlogCardSkeleton key={index} size="large" />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Error State with Retry Option */}
      {!loading && error && (
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={handleRetry}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      )}
      {/* Recent News Section */}
      {!loading && !error && blogs.length > 0 && (
        <section className="py-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Songi yangiliklar
          </h2>
          <div className="grid grid-cols-1 gap-3 px-2 md:grid-cols-2 md:px-2">
            <div className="grid grid-rows-3 gap-3">
              {previousBlogs.map((item) => (
                <BlogCard
                  key={item.id}
                  blog={item}
                  size="small"
                  locale={locale as string}
                />
              ))}
            </div>
            {lastBlog && (
              <BlogCard
                blog={lastBlog}
                size="large"
                locale={locale as string}
              />
            )}
          </div>
        </section>
      )}
      {/* All Blogs Section */}
      {!loading && !error && blogs.length > 0 && (
        <section className="py-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Barcha yangiliklar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((item) => (
              <BlogCard
                key={item.id}
                blog={item}
                size="large"
                locale={locale as string}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              basePath={`/${locale}/blog`}
            />
          )}
        </section>
      )}

      {/* No Blogs Found */}
      {!loading && !error && blogs.length === 0 && (
        <div className="text-center text-gray-500">No blogs found.</div>
      )}
    </div>
  );
};

export default Blog;
