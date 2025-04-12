import React from "react";
import "./page.scss"; // Module SCSS import
import { CalendarIcon, Clock, Eye } from "lucide-react";
const SkeletonBlogPage = () => {

  return (
   <section className="blogView animate-pulse">
      <header>
        {/* Title skeleton */}
        <div className="h-9 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
        <div className="news_item flex flex-row gap-3 items-center">
          <div className="items-center flex gap-2">
            <CalendarIcon size={16} className="text-gray-300" />
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="items-center flex gap-2">
            <Eye size={16} className="text-gray-300" />
            <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="items-center flex gap-2">
            <Clock size={16} className="text-gray-300" />
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 mt-6 md:grid-cols-[1.3fr,0.7fr] lg:grid-cols-[1.3fr,0.7fr] gap-4">
        {/* Main content skeleton */}
        <div className="blog-content flex gap-3 flex-col">
          {/* Image skeleton */}
          <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          
          {/* Paragraph skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>

          {/* Keywords skeleton */}
          <div className="flex flex-row gap-3 mt-4">
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="w-auto flex flex-col gap-3">
          {/* Sidebar title skeleton */}
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          
          {/* News cards skeleton */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex gap-3 p-3 border rounded-md">
              <div className="w-24 h-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advertisement skeleton */}
      <div className="mt-12">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>
    </section>
  );
};

export default SkeletonBlogPage;