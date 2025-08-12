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
import SkeletonBlogPage from "./_components/blog-skelton/blog-skelton";
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
    return <p className="text-center text-gray-500 dark:text-gray-400">Blog topilmadi.</p>;
  }

  const formattedPublishedAt = formatDate(blog.publishedAt, locale);
  const news: BlogWithFormattedDate[] = newsResponse.blogs.map((item: Blog) => ({
    ...item,
    formattedPublishedAt: formatDate(item.publishedAt, locale),
  }));

  return (
    <section className="blogView max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      {/* Header */}
      <header className="mb-6 space-y-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 leading-snug">
          {blog.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} />
            <span>{formattedPublishedAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={16} />
            <span>{blog.views}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{blog.readTime} min</span>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
        {/* Blog Content */}
        <div className="flex flex-col gap-6">
          <Image
            src={blog.image || "/blog/no-image.png"}
            width={1200}
            height={675}
            alt={blog.title}
            className="rounded-lg object-cover aspect-video"
          />
          <div className="prose dark:prose-invert max-w-none leading-relaxed">
            {parse(blog.content)}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {blog.categories.length > 0 ? (
              blog.categories.map((keyword: string) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                >
                  {keyword}
                </span>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Kategoriya mavjud emas</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
            Oxirgi maqolalar
          </h2>
          <NextIntlClientProvider locale={locale}>
            {news.length > 0 ? (
              <div className="flex flex-col gap-3">
                {news.map((item) => (
                  <AdCardBlog key={item.id} news={item} locale={locale} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Hozircha maqolalar yo‘q</p>
            )}
          </NextIntlClientProvider>
        </aside>
      </div>

      {/* Advertisement */}
      <div className="mt-12">
        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center p-4">
          <Image
            src="/home/reklama.png"
            width={200}
            height={50}
            alt="Reklama"
            className="object-contain"
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
    <Suspense fallback={<SkeletonBlogPage />}>
      <BlogContent slug={slug} locale={locale} />
    </Suspense>
  );
};

export default Page;
