import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogList from "./_components/blog-list";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link href="/blogs/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Blog
          </Button>
        </Link>
      </div>
      <BlogList />
    </div>
  );
}
