  "use client";
  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import Image from "next/image";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { FieldPath, useForm } from "react-hook-form";
  import { z } from "zod";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  import { createBlog, updateBlog } from "@/api/services/blogService";
  import { Blog, PostBlog } from "@/api/types/blogTypes";
  import { getImagePreview } from "@/lib/utils";

  // Dynamically import the RichTextEditor
  const RichTextEditor = dynamic(
    () => import("./rich-text-editor").then((mod) => mod.RichTextEditor),
    {
      ssr: false,
      loading: () => (
        <div className="min-h-[200px] border rounded-md p-3 animate-pulse bg-muted" />
      ),
    }
  );

  // Supported languages
  const languages = [
    { code: "en", label: "English" },
    { code: "uz", label: "O'zbekcha" },
    { code: "ru", label: "Русский" },
    { code: "uz-kr", label: "Ўзбекча" },
    { code: "qq", label: "Qaraqalpaqsha" },
  ];

  // Zod schema for translations
  const translationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
  });

  // Form schema
  const formSchema = z.object({
    categories: z.array(z.string()).min(1, "At least one category is required"),
    image: z.instanceof(File).optional(),
    translations: z.object({
      en: translationSchema,
      uz: translationSchema,
      ru: translationSchema,
      "uz-kr": translationSchema,
      qq: translationSchema,
    }),
  });

  type FormValues = z.infer<typeof formSchema>;

  export default function BlogForm({ blog }: { blog?: Blog }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("en");
    const [error, setError] = useState<string | null>(null);

    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: blog
        ? {
            categories: blog.categories,
            image: blog.image as unknown as File,
            translations: blog.content as unknown as Record<
              string,
              { title: string; content: string }
            >,
          }
        : {
            categories: [],
            image: undefined,
            translations: {
              en: { title: "", content: "" },
              uz: { title: "", content: "" },
              ru: { title: "", content: "" },
              "uz-kr": { title: "", content: "" },
              qq: { title: "", content: "" },
            },
          },
    });

    const   onSubmit = async (values: FormValues) => {
      try {
        setError(null);
        if (blog) {
          await updateBlog(blog.id, values as unknown as PostBlog);
        } else {
          await createBlog(values as unknown as PostBlog );
        }
        router.push("/dashboard/");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to save blog";
        setError(errorMessage);
      }
    };

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
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-8">
            <div>
              <h3 className="font-medium mb-2">Image Preview</h3>
              {form.watch("image") ? (
                <div className="relative h-[200px] w-full rounded-md overflow-hidden mb-4">
                  <Image
                    src={getImagePreview(form.watch("image"))}
                    alt="Uploaded Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : blog?.image ? (
                <div className="relative h-[200px] w-full rounded-md overflow-hidden mb-4">
                  <Image
                    src={blog.image}
                    alt="Current Image"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center mb-4">
                  <p className="text-muted-foreground">No image selected</p>
                </div>
              )}
            </div>

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
                      value={field.value as unknown as File}
                      onChange={(file) => field.onChange(file)}
                      onRemove={() => field.onChange(undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              {languages.map((lang) => (
                <TabsContent
                  key={lang.code}
                  value={lang.code}
                  className="mt-0 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name={`translations.${lang.code}.title` as FieldPath<FormValues>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title ({lang.label})</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={`Enter title in ${lang.label}`}
                            {...field}
                            value={field.value as unknown as string}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`translations.${lang.code}.content` as FieldPath<FormValues>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content ({lang.label})</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            value={field.value as unknown as string}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Saving..."
                : blog
                ? "Update Blog"
                : "Create Blog"}
            </Button>
          </div>
        </form>
      </Form>
    );
  }
