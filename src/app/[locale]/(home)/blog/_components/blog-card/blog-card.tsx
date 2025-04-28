"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCalendar, BsClock, BsEye } from "react-icons/bs";
import { Blog } from "@/api/types/blogTypes";
import { formatDate } from "@/api/utils/formatDate";

interface CardBlogProps {
  blog: Blog;
  size: "small" | "large";
  locale?: string; // Optional locale for date formatting
}

const CardBlog: React.FC<CardBlogProps> = ({ blog, size, locale = "uz-UZ" }) => {
  const isLarge = size === "large";

  return (
    <Link
      href={`/blog/${blog.id}`}
      className={`block rounded-md bg-white dark:bg-gray-800 shadow-md overflow-hidden h-auto transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
        isLarge ? "flex flex-col" : "flex flex-col sm:flex-row"
      }`}
    >
      <div className={`w-full ${isLarge ? "" : "sm:w-1/3"} relative h-full`}>
        <Image
          src={blog.image !== "" ? blog.image : "/blog/no-image.png"}
          alt={blog.title}
          width={isLarge ? 800 : 400} // Set width based on size
          height={isLarge ? 600 : 300} // Set height based on size
          className={`w-full h-full object-cover aspect-[4/3] ${isLarge ? "" : "sm:h-full"}`}
        />
      </div>
      <div
        className={`w-full ${
          isLarge
            ? "p-4 flex flex-col justify-between flex-grow"
            : "sm:w-2/3 p-4 flex flex-col justify-between"
        }`}
      >
        <div>
          <h3
            className={`${
              isLarge ? "text-xl" : "text-lg"
            } font-medium text-gray-900 dark:text-gray-100 line-clamp-2`}
          >
            {blog.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
            {blog.content.slice(0, 100)}...
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {blog.categories.map((category, index) => (
              <span
                key={index}
                className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-4">
          <span className="flex flex-row gap-2 items-center">
            <BsCalendar />
            {formatDate(blog.publishedAt, locale)}
          </span>
          <div className="flex flex-row gap-3 items-center">
            <span className="flex flex-row gap-2 items-center">
              <BsEye className="scale-150" />
              {blog.views}
            </span>
            <span className="flex flex-row gap-2 items-center">
              <BsClock className="scale-110" />
              {blog.readTime} min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBlog;