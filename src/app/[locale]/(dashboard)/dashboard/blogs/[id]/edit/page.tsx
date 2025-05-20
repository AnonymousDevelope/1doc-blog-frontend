import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogForm from "../../../_components/blog-form";
import { getBlogById } from "@/api/services/blogService";
import { Blog } from "@/api/types/blogTypes";
interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function Page({params}:PageProps) {
  const id = (await params).id;
  const blog = (await getBlogById(id)) as Blog;
  if (!blog) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/dashboard/blogs/${id}`}>
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
