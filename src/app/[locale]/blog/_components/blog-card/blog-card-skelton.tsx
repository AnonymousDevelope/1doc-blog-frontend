import React from "react";

interface BlogCardSkeletonProps {
  size: "small" | "large";
}

const BlogCardSkeleton: React.FC<BlogCardSkeletonProps> = ({ size }) => {
  const isLarge = size === "large";

  return (
    <div
      className={`rounded-md bg-white dark:bg-gray-800 shadow-md overflow-hidden h-auto transition-all duration-1000 animate-pulse ${
        isLarge ? "flex flex-col" : "flex flex-col sm:flex-row"
      }`}
    >
      <div className={`w-full ${isLarge ? "" : "sm:w-1/3"} relative`}>
        <div
          className={`w-full h-auto bg-gray-200 dark:bg-gray-700 aspect-[4/3] ${
            isLarge ? "" : "sm:h-full"
          }`}
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
          <div
            className={`${
              isLarge ? "h-6" : "h-5"
            } bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2`}
          />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2" />
          <div className="flex flex-wrap gap-1 mt-2">
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          <div className="flex flex-row gap-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;