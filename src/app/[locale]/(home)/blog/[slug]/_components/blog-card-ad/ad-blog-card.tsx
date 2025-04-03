"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsCalendar, BsClock, BsEye } from "react-icons/bs";
import { Link } from "@/i18n/navigation";

interface News {
  id: number;
  image: string;
  max_read_time: string;
  publish_date: string;
  small_description: string;
  link: string;
}

interface CardBlogProps {
  news: News;
}

const AdCardBlog: React.FC<CardBlogProps> = ({ news }) => {
  const router = useRouter();

  // Kartaga bosilganda ishlaydigan funksiya
  const handleCardClick = () => {
    router.push(`/blog/${news.link}`); // Masalan, /blog/1 sahifasiga o'tadi
  };
  return (
    <div
      className={`rounded-md bg-white dark:bg-gray-800 shadow-md overflow-hidden h-auto cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-row`}
      onClick={handleCardClick} // Klik hodisasi qo'shildi
    >
      <div className={`w-1/3`}>
        <Image
          src={news.image}
          alt={news.link}
          width={150}
          height={150}
          className={`w-full object-cover aspect-[4/3] h-full`}
        />
      </div>
      <div
        className={`w-full sm:w-2/3 p-4 flex flex-col gap-2 justify-between`}
      >
        <Link href={news.link} className="text-sm text-gray-600 dark:text-gray-400">
          {news.small_description}
        </Link>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="flex flex-row gap-2 items-center"><BsCalendar />{news.publish_date}</span>
          <div className="flex flex-row gap-3 items-center">
            <span className="flex flex-row gap-2 items-center"><BsEye className="scale-150" />{23}</span>
            <span className="flex flex-row gap-2 items-center"><BsClock className="scale-110" />{news.max_read_time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCardBlog;