"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCalendar, BsClock, BsEye } from "react-icons/bs";
import { Blog } from "@/api/types/blogTypes";
import { formatDate } from "@/api/utils/formatDate";
import parse from "html-react-parser";
import { extractPlainText, truncateText } from "@/utils/extractPlainText";

interface CardBlogProps {
  blog: Blog;
  size?: "small" | "large";
  locale?: string;
}

const CardBlog: React.FC<CardBlogProps> = ({ blog, size = "small", locale = "uz-UZ" }) => {
  const isLarge = size === "large";

  const parseText = parse(blog.content || "");
  const plainText = extractPlainText(parseText);
  const truncatedText = truncateText(plainText, 100);

  return (
    <Link
      href={`/blog/${blog.id}`}
      className={`block rounded-md bg-white dark:bg-gray-800 shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 
        ${isLarge ? "flex flex-col" : "flex flex-col sm:flex-row"}`}
    >
      {/* Image */}
      <div className={`relative w-full ${isLarge ? "" : "sm:w-1/3"} h-full`}>
        <Image
          src={blog.image?.trim() ? blog.image : "/blog/no-image.png"}
          alt={blog.title || "Blog image"}
          width={isLarge ? 800 : 400}
          height={isLarge ? 600 : 300}
          className="w-full h-full object-cover aspect-[4/3]"
        />
      </div>

      {/* Content */}
      <div className={`w-full flex flex-col justify-between p-4 ${isLarge ? "flex-grow" : "sm:w-2/3"}`}>
        <div>
          {/* Title */}
          <h3
            className={`${isLarge ? "text-xl" : "text-lg"} font-medium text-gray-900 dark:text-gray-100 line-clamp-2`}
          >
            {blog.title}
          </h3>

          {/* Description */}
          {plainText && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
              {truncatedText}
              {plainText.length > 100 && "..."}
            </p>
          )}

          {/* Categories */}
          {blog.categories?.length > 0 && (
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
          )}
        </div>

        {/* Footer */}
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
