"use client";
import React, { useState, useEffect } from "react";
import { BlogCard, Pagination } from "./_components";
import { useSearchParams } from "next/navigation";

interface News {
  id: number;
  title: string;
  image: string;
  max_read_time: string;
  publish_date: string;
  small_description: string;
  keywords: string[];
}

const news: News[] = [
  { id: 1, title: "Tech Trends 2025", image: "/blog/no-image.png", max_read_time: "5 min", publish_date: "2025-03-01", small_description: "Discover the latest tech trends shaping the future.", keywords: ["Tech", "Trends", "Future"] },
  { id: 2, title: "AI in Everyday Life", image: "/blog/no-image.png", max_read_time: "4 min", publish_date: "2025-02-25", small_description: "How AI is transforming daily routines.", keywords: ["AI", "Daily Life", "Innovation"] },
  { id: 3, title: "Cybersecurity Tips", image: "/blog/no-image.png", max_read_time: "6 min", publish_date: "2025-02-20", small_description: "Stay safe online with these tips.", keywords: ["Cybersecurity", "Safety", "Tips"] },
  { id: 4, title: "The Future of Work", image: "/blog/no-image.png", max_read_time: "7 min", publish_date: "2025-02-15", small_description: "What’s next for remote and hybrid work?", keywords: ["Work", "Remote", "Hybrid"] },
  { id: 5, title: "Cloud Computing Basics", image: "/blog/no-image.png", max_read_time: "5 min", publish_date: "2025-02-10", small_description: "An intro to cloud computing.", keywords: ["Cloud", "Tech", "Basics"] },
  { id: 6, title: "Blockchain Explained", image: "/blog/no-image.png", max_read_time: "8 min", publish_date: "2025-02-05", small_description: "Understanding blockchain technology.", keywords: ["Blockchain", "Crypto", "Tech"] },
  { id: 7, title: "Web Dev Trends", image: "/blog/no-image.png", max_read_time: "6 min", publish_date: "2025-01-30", small_description: "Latest trends in web development.", keywords: ["Web", "Dev", "Trends"] },
  { id: 8, title: "Data Science 101", image: "/blog/no-image.png", max_read_time: "5 min", publish_date: "2025-01-25", small_description: "Basics of data science.", keywords: ["Data", "Science", "Intro"] },
  { id: 9, title: "IoT Innovations", image: "/blog/no-image.png", max_read_time: "7 min", publish_date: "2025-01-20", small_description: "Internet of Things advancements.", keywords: ["IoT", "Tech", "Innovation"] },
  { id: 10, title: "5G Revolution", image: "/blog/no-image.png", max_read_time: "6 min", publish_date: "2025-01-15", small_description: "The impact of 5G technology.", keywords: ["5G", "Tech", "Network"] },
  { id: 11, title: "Quantum Computing", image: "/blog/no-image.png", max_read_time: "9 min", publish_date: "2025-01-10", small_description: "The future of computing.", keywords: ["Quantum", "Tech", "Future"] },
  { id: 12, title: "AR/VR Trends", image: "/blog/no-image.png", max_read_time: "5 min", publish_date: "2025-01-05", small_description: "Augmented and Virtual Reality.", keywords: ["AR", "VR", "Tech"] },
];

const ITEMS_PER_PAGE = 6;

const Blog = () => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentNews = news.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-6xl mx-auto px-2">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Blog
      </h1>
      {/* Recent News Section */}
      <section className="py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          So&apos;ngi yangiliklar
        </h2>
        <div className="grid grid-cols-1 gap-3 px-2 md:grid-cols-2 md:px-2">
          <div className="grid grid-cols-1 gap-3">
            {news.slice(0, 3).map((item) => (
              <BlogCard key={item.id} news={item} size="small" />
            ))}
          </div>
          <BlogCard news={news[3]} size="large" />
        </div>
      </section>
      {/* Yangiliklar bo'limi */}
      <section className="py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Barcha yangiliklar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentNews.map((item) => (
            <BlogCard key={item.id} news={item} size="large" />
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          basePath="/blog"
        />
      </section>
    </div>
  );
};

export default Blog;