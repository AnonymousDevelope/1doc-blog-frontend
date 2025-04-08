"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useBlogApi } from "@/hooks/useBlog";
import { useEffect, useState } from "react";
import BlogForm from "../../../_components/blog-form";

export default function Page() {
  const [blog, setBlog] = useState(null);
  const { getBlogById } = useBlogApi();

  const params = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(String(params.id));
        setBlog(blogData);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    fetchBlog();
  }, []);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/dashboard/blogs/${params.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Edit Blog</h1>
      </div>
      <BlogForm blog={blog} />
    </div>
  );
}
