"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface News {
  id: number;
  title: string;
  image: string;
  max_read_time: string;
  publish_date: string;
  small_description: string;
  keywords: string[];
}

interface CardBlogProps {
  news: News;
  size: "small" | "large";
}

const CardBlog: React.FC<CardBlogProps> = ({ news, size }) => {
  const router = useRouter();

  // Kartaga bosilganda ishlaydigan funksiya
  const handleCardClick = () => {
    router.push(`/blog/${news.title.replaceAll(" ", "-")}`); // Masalan, /blog/1 sahifasiga o'tadi
  };

  return (
    <div
      className={`rounded-md bg-white dark:bg-gray-800 shadow-md overflow-hidden h-auto cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
        size === "large" ? "flex flex-col" : "flex flex-col sm:flex-row"
      }`}
      onClick={handleCardClick} // Klik hodisasi qo'shildi
    >
      <div className={`w-full ${size === "large" ? "" : "sm:w-1/3"}`}>
        <Image
          src={news.image}
          alt={news.title}
          width={size === "large" ? 400 : 150}
          height={size === "large" ? 300 : 150}
          className={`w-full h-auto object-cover aspect-[4/3] ${
            size === "large" ? "" : "sm:h-full"
          }`}
        />
      </div>
      <div
        className={`w-full ${
          size === "large"
            ? "p-4 flex flex-col justify-between flex-grow"
            : "sm:w-2/3 p-4 flex flex-col justify-between"
        }`}
      >
        <h3
          className={`${
            size === "large" ? "text-xl" : "text-lg"
          } font-medium text-gray-900 dark:text-gray-100`}
        >
          {news.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {news.small_description}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {news.keywords.map((keyword, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
            >
              {keyword}
            </span>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{news.publish_date}</span>
          <span>{news.max_read_time}</span>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;