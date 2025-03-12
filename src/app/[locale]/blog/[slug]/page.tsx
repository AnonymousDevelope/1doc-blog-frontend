import React from "react";
import "./page.scss"; // Module SCSS import
import { CalendarIcon, Clock, Eye } from "lucide-react";
import Image from "next/image";
import { AdCardBlog } from "./_components"

interface PageProps {
  params: {
    slug: string;
  };
}
interface News {
  id: number;
  image: string;
  max_read_time: string;
  publish_date: string;
  small_description: string;
  link: string;
}

const news: News[] = [
  { id: 1, image: "/blog/no-image.png", max_read_time: "5 min", publish_date: "2025-03-01", small_description: "Discover the latest tech trends shaping the future.", link: "/tech-trends" },
  { id: 2, image: "/blog/no-image.png", max_read_time: "4 min", publish_date: "2025-02-25", small_description: "How AI is transforming daily routines.", link: "/ai-transformation" },
  { id: 3, image: "/blog/no-image.png", max_read_time: "6 min", publish_date: "2025-02-20", small_description: "Stay safe online with these tips.", link: "/online-safety" },
  { id: 4, image: "/blog/no-image.png", max_read_time: "6 min", publish_date: "2025-02-20", small_description: "Stay safe online with these tips.", link: "/online-safety" }
];

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return (
    <section className="blogView">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
          Blog page: {slug}
        </h1>
        <div className="news_item flex flex-row gap-3 items-center">
          <div className="items-center flex gap-2">
            <CalendarIcon size={16} />
            <span className="text-xs text-gray-500 dark:text-slate-400">2021-09-01</span>
          </div>
          <div className="items-center flex gap-2">
            <Eye size={16} />
            <span className="text-xs text-gray-500 dark:text-slate-400">123</span>
          </div>
          <div className="items-center flex gap-2">
            <Clock size={16} />
            <span className="text-xs text-gray-500 dark:text-slate-400">12 daqiqa</span>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 mt-6 md:grid-cols-[1.3fr,0.7fr]  lg:grid-cols-[1.3fr,0.7fr] gap-4">
        {/* Main content */}
        <div className="blog-content flex gap-3 flex-col">
          <Image
            src="/blog/no-image.png"
            width={800}
            height={700}
            alt="Blog Image"
            className="rounded-md object-cover"
          />
          <p className="text-gray-700 dark:text-slate-100 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ea iure earum, quisquam voluptatibus minus in quaerat incidunt tempora veniam provident, neque ratione? Praesentium magni modi accusamus corrupti, soluta nesciunt. Autem quis beatae consequuntur odit labore tempora, fuga at sunt praesentium minima dicta, accusamus suscipit ullam? Nihil sed temporibus corporis? Necessitatibus, cumque quia debitis perspiciatis est alias praesentium magnam, quibusdam eveniet dolorum dolor dignissimos totam minima saepe tempore blanditiis quod consectetur laborum velit? Delectus at molestias autem, non asperiores fugit consequuntur architecto voluptate, repellendus inventore id blanditiis explicabo assumenda hic dolores dicta provident voluptatum? Vitae quasi ex eius tempora aliquid quia voluptatum reiciendis dolores commodi iure modi assumenda laboriosam unde, ullam, voluptates expedita accusamus quidem quo tenetur ratione nam. Ipsam, dolorem, facere, sequi facilis magni hic molestiae expedita vitae totam temporibus aspernatur quos numquam laudantium veritatis doloribus officia repellendus. Placeat repellat velit repellendus ex doloribus voluptates recusandae, voluptatibus laudantium architecto delectus aperiam nihil odio eligendi in fuga. Ut et, necessitatibus aliquam amet saepe laboriosam sed debitis dicta vero voluptatum excepturi temporibus nam dolores perferendis voluptatibus minima minus molestiae tempore ab! A veritatis cum magnam natus similique fugiat laboriosam, sint nemo amet fuga? Minus debitis quasi maiores eum veritatis optio explicabo.
          </p>
          {/* Keywords list */}
          <div className="flex flex-row gap-3">
            <div className="px-2 py-1 bg-blue-400/30 text-gray-900 dark:text-white rounded-md text-xs">Tech</div>
            <div className="px-2 py-1 bg-blue-400/30 text-gray-900 dark:text-white rounded-md text-xs">Tech</div>
            <div className="px-2 py-1 bg-blue-400/30 text-gray-900 dark:text-white rounded-md text-xs">Tech</div>
            <div className="px-2 py-1 bg-blue-400/30 text-gray-900 dark:text-white rounded-md text-xs">Tech</div>
            <div className="px-2 py-1 bg-blue-400/30 text-gray-900 dark:text-white rounded-md text-xs">Tech</div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="w-auto flex flex-col gap-3">
          <h1 className="text-xl font-bold">Ohirgi maqolalar</h1>
          {news.map((item) => (
            <AdCardBlog key={item.id} news={item} />
          ))}
        </div>
      </div>
      {/* Advertisement or snippets */}
      <div className="mt-12">
        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
          <Image src="/home/reklama.png" width={200} height={50} alt="Advertisement" />
        </div>
      </div>
    </section>
  );
};

export default Page;
