"use client";

import React from "react";
import { Blog } from "@/api/types/blogTypes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import parse from "html-react-parser";
import Image from "next/image";
import { extractPlainText, truncateText } from "@/utils/extractPlainText";
import { ArrowRight, User } from "lucide-react";

interface MiniCardBlogProps {
  card: Blog;
}

const MiniCardBlog: React.FC<MiniCardBlogProps> = ({ card }) => {
  const parsedContent = parse(card.content);
  const plainTextContent = extractPlainText(parsedContent);
  const truncatedContent = truncateText(plainTextContent, 100);

  return (
    <Card className="group flex flex-col bg-card overflow-hidden rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={card.image || "/blog/no-image.png"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          alt={card.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Content Section */}
      <CardHeader className="p-5 pb-3 space-y-3">
        {/* Author Info */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-muted">
            <User className="size-4" />
          </div>
          <span className="font-medium">Admin</span>
        </div>

        {/* Title */}
        <Link
          href={`/blog/${card.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CardTitle className="text-lg lg:text-xl font-semibold text-foreground hover:text-primary transition-colors">
            {card.title}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="px-5 pb-3 flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {truncatedContent}
        </p>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0">
        <Link
          href={`/blog/${card.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="sm" className="gap-2" aria-label={`Read more about ${card.title}`}>
            Подробнее <ArrowRight className="size-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MiniCardBlog;
