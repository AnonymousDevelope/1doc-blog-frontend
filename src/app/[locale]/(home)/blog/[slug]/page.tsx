"use client";
import React, { useEffect, useState } from "react";
import "./page.scss"; // Module SCSS import
import { CalendarIcon, Clock, Eye } from "lucide-react";
import Image from "next/image";
import { AdCardBlog } from "./_components";
import type { Blog } from "@/api/types/blogTypes";
import { getBlogById } from "@/api/services/blogService";

interface PageProps {
  params: {
    slug: string;
  };
}

export const news: Blog[] = [
  {
    id: 1,
    slug: "tech-trends",
    title: "Latest Tech Trends",
    content: "Discover the latest tech trends shaping the future.",
    image: "/blog/no-image.png",
    readTime: 5,
    views: 120,
    author: {
      name: "John Doe", avatar: "/avatars/john.png",
      _id: "",
      email: ""
    },
    categories: ["Technology", "Innovation"],
    comments: [],
    publishedAt: "2025-03-01",
    small_description: "Discover the latest tech trends shaping the future.",
    keywords: ["tech", "trends", "future"],
    max_read_time: undefined,
    publish_date: undefined
  },
  // ... other news items
];

const Page = ({ params }: PageProps) => {
  const { slug } = params;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const locale = "uz"; // Example locale
        const fetchedBlog = await getBlogById(slug, locale);
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <section className="blogView">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
          {blog.title}
        </h1>
        <div className="news_item flex flex-row gap-3 items-center">
          <div className="items-center flex gap-2">
            <CalendarIcon size={16} />
            <span className="text-xs text-gray-500 dark:text-slate-400">{blog.publishedAt}</span>
          </div>
          <div className="items-center flex gap-2">
            <Eye size={16} />
            <span className="text-xs text-gray-500 dark:text-slate-400">{blog.views}</span>
          </div>
          <div className="items-center flex gap-2">
            <Clock size={16} />
            <span className="text-xs text-gray-500 dark:text-slate-400">{blog.readTime} min</span>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 mt-6 md:grid-cols-[1.3fr,0.7fr] lg:grid-cols-[1.3fr,0.7fr] gap-4">
        <div className="blog-content flex gap-3 flex-col">
          <Image
            src={blog.image}
            width={800}
            height={700}
            alt={blog.title}
            className="rounded-md object-cover"
          />
          <p className="text-gray-700 dark:text-slate-100 text-justify">
            {blog.content}
          </p>
          <div className="flex flex-row gap-3">
            {blog.keywords.map((keyword, index) => (
              <div key={index} className="px-2 py-1 bg-blue-400/30 text-gray-900 dark:text-white rounded-md text-xs">
                {keyword}
              </div>
            ))}
          </div>
        </div>
        <div className="w-auto flex flex-col gap-3">
          <h1 className="text-xl font-bold">Ohirgi maqolalar</h1>
          {news.map((item) => (
            <AdCardBlog key={item.id} news={item} />
          ))}
        </div>
      </div>
      <div className="mt-12">
        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
          <Image src="/home/reklama.png" width={200} height={50} alt="Advertisement" />
        </div>
      </div>
    </section>
  );
};

export default Page;
