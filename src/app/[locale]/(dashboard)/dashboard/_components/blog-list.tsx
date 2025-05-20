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
import type { Blog } from "@/api/types/blogTypes";
import { getBlogs } from "@/api/services/blogService";
export default async function BlogList() {
  // Fetch blogs (returns { blogs: Blog[], total: number })
  const blogData = (await getBlogs(1, 10, "uz")).blogs;
  // If no blogs are found
  if (blogData.length === 0) {
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
      {blogData.map((blog: Blog) => (
        <Link key={blog.id} href={`/dashboard/blogs/${blog.id}`}>
          <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
            {blog.image && (
              <div className="relative h-[200px] w-full">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title || "Blog Image"}
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
                {blog?.content?.replace(/<[^>]*>/g, "").substring(0, 150) || "No content available"}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                {blog.categories.slice(0, 3).map((category: string) => (
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