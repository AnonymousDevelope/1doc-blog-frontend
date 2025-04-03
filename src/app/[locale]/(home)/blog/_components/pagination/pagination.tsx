"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { BsSkipBackward, BsSkipForward } from "react-icons/bs";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  basePath: string; // Masalan, "/blog"
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, basePath }) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    onPageChange(page);
    router.push(`${basePath}?page=${page}`);
  };

  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(totalPages, currentPage + 2);

      items.push(1);
      if (leftBound > 2) items.push("...");
      for (let i = Math.max(2, leftBound); i <= Math.min(totalPages - 1, rightBound); i++) {
        items.push(i);
      }
      if (rightBound < totalPages - 1) items.push("...");
      if (totalPages > 1) items.push(totalPages);
    }

    return items;
  };

  return (
    <div className="flex justify-center mt-8 space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
      >
        <BsSkipBackward />
        
      </button>
      {getPaginationItems().map((item, index) =>
        typeof item === "number" ? (
          <button
            key={index}
            onClick={() => handlePageChange(item)}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              currentPage === item
                ? "bg-blue-300 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {item}
          </button>
        ) : (
          <span key={index} className="px-4 py-2 text-gray-500 dark:text-gray-400">
            ...
          </span>
        )
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
      >
        <BsSkipForward />
      </button>
    </div>
  );
};

export default Pagination;