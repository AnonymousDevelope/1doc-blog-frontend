"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Blog } from "@/types/blog";
import { useBlogApi } from "@/hooks/useBlog";

interface BlogResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  blogs: Blog[];
}

export default function BlogList() {
  const [blogData, setBlogData] = useState<BlogResponse>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    blogs: [],
  });

  const [loading, setLoading] = useState(true);

  const { getBlogs } = useBlogApi();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogData(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-[200px] w-full" />
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-6 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (blogData.blogs?.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-muted-foreground">
          No blogs found
        </h2>
        <p className="mt-2 text-muted-foreground">
          Create your first blog to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogData.blogs?.map((blog) => (
        <Link key={blog.id} href={`/dashboard/blogs/${blog.id}`}>
          <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
            {blog.image && (
              <div className="relative h-[200px] w-full">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="line-clamp-2 text-muted-foreground">
                {blog?.content.replace(/<[^>]*>/g, "").substring(0, 150)}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                {blog.categories.slice(0, 3).map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
                {blog.categories.length > 3 && (
                  <Badge variant="outline">+{blog.categories.length - 3}</Badge>
                )}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
