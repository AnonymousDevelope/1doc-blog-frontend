import React from "react";
import Image from "next/image";
import { BsCalendar, BsClock, BsEye } from "react-icons/bs";
import { Link } from "@/i18n/navigation";
import type { Blog } from "@/api/types/blogTypes";
import parse from "html-react-parser"
import { formatDate } from "@/api/utils/formatDate";
import {extractPlainText,truncateText} from "@/utils/extractPlainText";
interface CardBlogProps {
  news: Blog;
  locale:string
}
const AdCardBlog: React.FC<CardBlogProps> = async ({ news,locale }) => {
 const parsedContent = parse(news.content);
   // Extract plain text from the parsed content
   const plainTextContent = extractPlainText(parsedContent);
   // Truncate the plain text to 100 characters
   const truncatedContent = truncateText(plainTextContent, 100);
  // Kartaga bosilganda ishlaydigan kod
  return (
    <Link
      className={`rounded-md bg-white dark:bg-gray-800 shadow-md overflow-hidden h-auto cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-row`}
      href={`/blog/${news.id}`}
    >
      <div className={`w-1/3`}>
        <Image
          src={news.image ? news.image : "/blog/no-image.png"}
          alt={news.id as string}
          width={150}
          height={150}
          className={`w-full object-cover aspect-[4/3] h-full`}
          loading="lazy"
        />
      </div>
      <div
        className={`w-full sm:w-2/3 p-4 flex flex-col gap-2 justify-between`}
      >
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {
            // split news content add ...
            truncatedContent
          }
        </span>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="flex flex-row gap-2 items-center"><BsCalendar />{formatDate(news.publishedAt,locale).toString()}</span>
          <div className="flex flex-row gap-3 items-center">
            <span className="flex flex-row gap-2 items-center"><BsEye className="scale-150" />{news.views}</span>
            <span className="flex flex-row gap-2 items-center"><BsClock className="scale-110" />{news.readTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AdCardBlog;