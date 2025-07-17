import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBlogById } from "@/api/services/blogService";
import DeleteBlogButton from "../../_components/delete-blog-button";
interface PageProps {
  params: Promise<{ id: string }>;
}
const NotFoundBlogID = () => (
  <>
    <div className="text-center py-12 text-muted-foreground">Blog not found</div>
  </>
)
export default async function Page({ params }: PageProps) {
  const id = (await params).id;
  if (!id) return <NotFoundBlogID />
  const blog = await getBlogById(id);
  if (!blog) {
    return <div className="text-center py-12 text-muted-foreground">Blog not found</div>;
  }
  const languages = [
    { code: "en", label: "English" },
    { code: "uz", label: "O'zbekcha" },
    { code: "ru", label: "Русский" },
    { code: "uz-kr", label: "Ўзбекча" },
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
      </div>

      {blog.image && (
        <div className="mb-6 relative h-[400px] w-full rounded-lg overflow-hidden">
          <Image
            src={blog.image || "/placeholder.svg"}
            alt={blog.title || "Blog Image"}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {blog.categories?.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/blogs/${id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <DeleteBlogButton id={id.toString()} />
        </div>
      </div>

      <Tabs defaultValue="uz" className="w-full">
        <TabsList className="mb-4">
          {languages.map((lang) => (
            <TabsTrigger key={lang.code} value={lang.code}>
              {lang.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {languages.map((lang: { code: string; label: string }) => {
          const translation = (blog.content as unknown as Record<string, { title: string; content: string }>)[lang.code];
          return (
            <TabsContent key={lang.code} value={lang.code} className="mt-0">
              {translation ? (
                <div className="prose max-w-none flex flex-col gap-4">
                    <h2>
                      <p className="font-bold mb-2">Title:</p>
                      {translation?.title}
                    </h2>
                    <div>
                      <p className="font-bold mb-2">Content:</p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: translation?.content,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground italic">
                    No translation available for this language.
                  </div>
                )}
              </TabsContent>
            );
          })
        }
      </Tabs>
    </div>
  );
}