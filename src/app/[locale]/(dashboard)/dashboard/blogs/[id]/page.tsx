"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBlogApi } from "@/hooks/useBlog";
import DeleteBlogButton from "../../_components/delete-blog-button";
import { useEffect, useState } from "react";

export default function Page() {
  const [blog, setBlog] = useState(null);
  const { getBlogById } = useBlogApi();

  const params = useParams();

  useEffect(() => {
    console.log(params);
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(params.id);
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

  const languages = [
    { code: "en", label: "English" },
    { code: "uz", label: "O'zbekcha" },
    { code: "ru", label: "Русский" },
    { code: "uz_cyrl", label: "Ўзбекча" },
    { code: "qq", label: "Qaraqalpaqsha" },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{blog.title}</h1>
      </div>

      {blog.image && (
        <div className="mb-6 relative h-[400px] w-full rounded-lg overflow-hidden">
          <Image
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {blog.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/blogs/${params.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <DeleteBlogButton id={params.id} />
        </div>
      </div>

      <Tabs defaultValue="en" className="w-full">
        <TabsList className="mb-4">
          {languages.map((lang) => (
            <TabsTrigger key={lang.code} value={lang.code}>
              {lang.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {languages.map((lang) => (
          <TabsContent key={lang.code} value={lang.code} className="mt-0">
            {blog.translations?.[lang.code] ? (
              <div className="prose max-w-none">
                <h2>{blog.translations?.[lang.code].title}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.translations[lang.code].content,
                  }}
                />
              </div>
            ) : (
              <div className="text-muted-foreground italic">
                No translation available for this language.
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
