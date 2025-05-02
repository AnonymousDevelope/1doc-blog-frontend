import React from "react";

interface TeamMemberCardSkeletonProps {
  count?: number; // Number of skeleton cards to render (default: 1)
}

const TeamMemberCardSkeleton: React.FC<TeamMemberCardSkeletonProps> = ({
  count = 1,
}) => {
  // Create an array of skeleton cards based on the count prop
  const skeletonCards = Array(count).fill(0);
  return (
    <>
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-6 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-card animate-pulse"
        >
          {/* Skeleton: Avatar qismi */}
          <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 mb-4 border-4 border-gray-200 dark:border-gray-700"></div>

          {/* Skeleton: Ism va lavozim */}
          <div className="text-center mb-3 w-full">
            <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>

          {/* Skeleton: Qisqa ta’rif */}
          <div className="w-full mb-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
          </div>

          {/* Skeleton: Ijtimoiy tarmoqlar */}
          <div className="flex gap-4">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TeamMemberCardSkeleton;