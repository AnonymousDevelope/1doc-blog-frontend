"use client";

import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import dynamic from "next/dynamic";
import { MultiSelect } from "./multi-select";
import { ImageUpload } from "./image-upload";
import { useBlogApi } from "@/hooks/useBlog";
import { getImagePreview } from "@/lib/utils";

// Dynamically import the RichTextEditor to avoid SSR issues with Tiptap
const RichTextEditor = dynamic(
  () => import("./rich-text-editor").then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[200px] border rounded-md p-3 animate-pulse bg-muted" />
    ),
  },
);

const languages = [
  { code: "en", label: "English" },
  { code: "uz", label: "O'zbekcha" },
  { code: "ru", label: "Русский" },
  { code: "uz_cyrl", label: "Ўзбекча" },
  { code: "qq", label: "Qaraqalpaqsha" },
];

const translationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  image: z.string(),
  translations: z.record(translationSchema),
});

type FormValues = z.infer<typeof formSchema>;

interface ActionBlog {
  categories: string[];
  image: string;
  content: {
    [key: string]: {
      title: string;
      content: string;
    };
  };
}

export default function BlogForm({ blog }: { blog?: ActionBlog }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("en");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updateBlog, createBlog, isAuthenticated } = useBlogApi();

  // Initialize form with existing blog data or defaults
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: blog
      ? {
          categories: blog.categories,
          image: blog.image,
          translations: blog.content,
        }
      : {
          categories: [],
          image: "",
          translations: {
            en: { title: "test1", content: "test1" },
            uz: { title: "test2", content: "test2" },
            ru: { title: "test3", content: "test3" },
            uz_cyrl: { title: "test4", content: "test4" },
            qq: { title: "test5", content: "test5" },
          },
        },
  });

  const onSubmit = async (values: FormValues) => {
    if (!isAuthenticated) {
      alert("You must be logged in to submit a blog");
      return;
    }

    try {
      setIsSubmitting(true);

      if (blog) {
        await updateBlog(blog.id, values);
      } else {
        await createBlog(values);
      }

      await router.push("/dashboard/");
    } catch (error) {
      console.error("Error saving blog:", error);
      // Error is already handled by the hook
    } finally {
      setIsSubmitting(false);
    }
  };
  // Get the current translation values for the active tab
  const getTranslationValues = (langCode: string) => {
    return form.watch(`translations.${langCode}`) || { title: "", content: "" };
  };

  // Update translation values for the active tab
  const updateTranslation = (
    langCode: string,
    field: "title" | "content",
    value: string,
  ) => {
    form.setValue(`translations.${langCode}.${field}`, value, {
      shouldValidate: true,
    });
  };

  // Available categories (in a real app, these might come from an API)
  const availableCategories = [
    "Technology",
    "Business",
    "Health",
    "Science",
    "Education",
    "Travel",
    "Food",
    "Fashion",
    "Sports",
    "Entertainment",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-8">
          <div className="md:col-span-1">
            <h3 className="font-medium mb-2">Preview</h3>

            <Card>
              <CardContent className="p-4">
                {form.watch("image") ? (
                  <div className="relative h-[200px] w-full rounded-md overflow-hidden mb-4">
                    <Image
                      src={getImagePreview(form.watch("image"))}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center mb-4">
                    <p className="text-muted-foreground">No image selected</p>
                  </div>
                )}
                <h4 className="font-bold text-lg mb-2">
                  {form.watch("title") || "Blog Title"}
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {form.watch("categories").map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: form.watch(`translations.${activeTab}`).content,
                    }}
                  />
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-8">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      selected={field.value}
                      options={availableCategories.map((cat) => ({
                        label: cat,
                        value: cat,
                      }))}
                      onChange={field.onChange}
                      placeholder="Select categories"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Translations</h2>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              {languages.map((lang) => (
                <TabsTrigger key={lang.code} value={lang.code}>
                  {lang.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {languages.map((lang) => {
              const translation = getTranslationValues(lang.code);

              return (
                <TabsContent
                  key={lang.code}
                  value={lang.code}
                  className="mt-0 space-y-4"
                >
                  <FormItem>
                    <FormLabel>Title ({lang.label})</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Enter title in ${lang.label}`}
                        value={translation.title}
                        onChange={(e) =>
                          updateTranslation(lang.code, "title", e.target.value)
                        }
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Content ({lang.label})</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={translation.content}
                        onChange={(value) =>
                          updateTranslation(lang.code, "content", value)
                        }
                      />
                    </FormControl>
                  </FormItem>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={() => onSubmit(form.getValues())}
          >
            {isSubmitting ? "Saving..." : blog ? "Update Blog" : "Create Blog"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
