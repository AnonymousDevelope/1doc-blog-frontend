"use client";
import React from "react";
import { Blog } from "@/api/types/blogTypes";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import parse from "html-react-parser";
import Image from "next/image";
// Import the updated extractPlainText function
import {extractPlainText,truncateText} from "@/utils/extractPlainText"; 
interface MiniCardBlogProps {
  card: Blog;
}

const MiniCardBlog: React.FC<MiniCardBlogProps> = ({ card }) => {
  // Parse the HTML content
  const parsedContent = parse(card.content);

  // Extract plain text from the parsed content
  const plainTextContent = extractPlainText(parsedContent);

  // Truncate the plain text to 100 characters
  const truncatedContent = truncateText(plainTextContent, 100);

  return (
    <div className="group flex flex-col items-center sm:h-80 h-96 bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative w-full h-1/2">
        <Image
          src={card.image || "/blog/no-image.png"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          alt={card.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={(e) => (e.currentTarget.src = "/blog/no-image.png")}
        />
      </div>
      <div className="p-4 w-full flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-foreground line-clamp-2">{card.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground flex-1">{truncatedContent}</p>
        <Link
          href={`/blog/${card.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4"
        >
          <Button aria-label={`Read more about ${card.title}`}>
            Подробнее
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MiniCardBlog;