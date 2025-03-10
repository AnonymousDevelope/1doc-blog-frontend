import React from "react";
import CardBlog from "./_components/blog-card/blog-card";

// News interfeysi
interface News {
  id: number;
  title: string;
  image: string;
  max_read_time: string;
  publish_date: string;
  small_description: string;
  keywords: string[];
}

// News ma'lumotlari
const news: News[] = [
  {
    id: 1,
    title: "Tech Trends 2025",
    image: "/blog/no-image.png",
    max_read_time: "5 min",
    publish_date: "2025-03-01",
    small_description: "Discover the latest tech trends shaping the future.",
    keywords: ["Tech", "Trends", "Future"],
  },
  {
    id: 2,
    title: "AI in Everyday Life",
    image: "/blog/no-image.png",
    max_read_time: "4 min",
    publish_date: "2025-02-25",
    small_description: "How AI is transforming daily routines.",
    keywords: ["AI", "Daily Life", "Innovation"],
  },
  {
    id: 3,
    title: "Cybersecurity Tips",
    image: "/blog/no-image.png",
    max_read_time: "6 min",
    publish_date: "2025-02-20",
    small_description: "Stay safe online with these tips.",
    keywords: ["Cybersecurity", "Safety", "Tips"],
  },
  {
    id: 4,
    title: "The Future of Work",
    image: "/blog/no-image.png",
    max_read_time: "7 min",
    publish_date: "2025-02-15",
    small_description: "What’s next for remote and hybrid work?",
    keywords: ["Work", "Remote", "Hybrid"],
  },
];

const Blog = () => {
  return (
    <div className="blog-container max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Blog
      </h1>
      {/* Recent News Section */}
      <section className="recent-news py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          So'ngi yangiliklar
        </h2>
        <div className="news-grid grid grid-cols-1 gap-3 px-2 md:grid-cols-2 md:px-5">
          {/* Birinchi 3 kichik blog */}
          <div className="small-blogs grid grid-cols-1 gap-3">
            {news.slice(0, 3).map((item) => (
              <CardBlog key={item.id} news={item} size="small" />
            ))}
          </div>
          {/* Oxirgi blog */}
          <CardBlog news={news[3]} size="large" />
        </div>
      </section>
      <section className="all-news py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
           Yangiliklar
        </h2>
        <div className="news-grid grid grid-cols-1 gap-3 px-2 md:grid-cols-3 md:px-5">
          {/* Birinchi 3 kichik blog */}
            {[...news,...news].map((item,idx) => (
              <CardBlog key={idx} news={item} size="large" />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;