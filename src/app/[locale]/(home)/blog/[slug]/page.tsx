import React, { Suspense } from "react";
import "./page.scss";
import { CalendarIcon, Clock, Eye } from "lucide-react";
import Image from "next/image";
import { AdCardBlog } from "./_components";
import type { Blog } from "@/api/types/blogTypes";
import { getBlogById, getBlogs } from "@/api/services/blogService";
import { cookies } from "next/headers";
import parse from "html-react-parser";
import { formatDate } from "@/api/utils/formatDate";
import {BlogSkeleton} from "./_components";
import { NextIntlClientProvider } from "next-intl";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface BlogWithFormattedDate extends Blog {
  formattedPublishedAt: string;
}

const BlogContent = async ({ slug, locale }: { slug: string; locale: string }) => {
  const blog: Blog = await getBlogById(slug, locale);
  const newsResponse = await getBlogs(1, 4, locale);
  if (!blog) {
    return <p>Blog not found.</p>;
  }

  // Inside BlogContent
const formattedPublishedAt = formatDate(blog.publishedAt, locale);
const news: BlogWithFormattedDate[] = newsResponse.blogs.map((item: Blog) => ({
  ...item,
  formattedPublishedAt: formatDate(item.publishedAt, locale),
}));
  return (
    <section className="blogView">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
          {blog.title}
        </h1>
        <div className="news_item flex flex-row gap-3 items-center">
          <div className="items-center flex gap-2">
            <CalendarIcon size={16} />
            <span className="text-xs text-gray-500 dark:text-slate-400">
              {formattedPublishedAt}
            </span>
          </div>
          <div className="items-center flex gap-2">
            <Eye size={16} />
            <span className="text-xs text-gray-500 dark:text-slate-400">
              {blog.views}
            </span>
          </div>
          <div className="items-center flex gap-2">
            <Clock size={16} />
            <span className="text-xs text-gray-500 dark:text-slate-400">
              {blog.readTime} min
            </span>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 mt-6 md:grid-cols-[1.3fr,0.7fr] lg:grid-cols-[1.3fr,0.7fr] gap-4">
        <div className="blog-content flex gap-3 flex-col">
          <Image
            src={blog.image || "/blog/no-image.png"}
            width={800}
            height={700}
            alt={blog.title}
            className="rounded-md object-cover"
          />
          <div className="text-gray-700 dark:text-slate-100 text-justify">
            {parse(blog.content)}
          </div>
          <div className="flex flex-row gap-3">
            {blog.categories.length > 0 ? (
              blog.categories.map((keyword: string) => (
                <div
                  key={keyword}
                  className="px-2 py-1 bg-blue-400/30 text-gray-900 dark:text-white rounded-md text-xs"
                >
                  {keyword}
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No categories</p>
            )}
          </div>
        </div>
        <div className="w-auto flex flex-col gap-3">
          <h1 className="text-xl font-bold">Oxirgi maqolalar</h1>
          <NextIntlClientProvider locale={locale}>
            {news.length > 0 ? (
              news.map((item) => (
                <AdCardBlog key={item.id} news={item} locale={locale}/>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Hozircha maqolalar yoq
              </p>
            )}
          </NextIntlClientProvider>
        </div>
      </div>
      <div className="mt-12">
        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
          <Image
            src="/home/reklama.png"
            width={200}
            height={50}
            alt="Advertisement"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "uz";
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogContent slug={slug} locale={locale} />
    </Suspense>
  );
};

export default Page;