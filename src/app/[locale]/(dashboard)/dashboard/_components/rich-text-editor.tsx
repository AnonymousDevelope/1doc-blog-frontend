"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  LinkIcon,
  ImageIcon,
  Undo,
  Redo,
  Eye,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkOpen, setLinkOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageOpen, setImageOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image,
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes with the editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  const insertLink = () => {
    if (!linkUrl) return;

    // Check if text is selected
    if (editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }

    setLinkUrl("");
    setLinkOpen(false);
  };

  const insertImage = () => {
    if (!imageUrl) return;

    editor.chain().focus().setImage({ src: imageUrl }).run();

    setImageUrl("");
    setImageOpen(false);
  };

  const formatters = [
    {
      icon: <Bold className="h-4 w-4" />,
      label: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <Italic className="h-4 w-4" />,
      label: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: <Heading2 className="h-4 w-4" />,
      label: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="h-4 w-4" />,
      label: "Heading 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <List className="h-4 w-4" />,
      label: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      label: "Numbered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 flex-wrap border rounded-md p-1 bg-muted/50">
        {formatters.map((formatter, index) => (
          <Button
            key={index}
            type="button"
            variant={formatter.isActive ? "secondary" : "ghost"}
            size="sm"
            onClick={formatter.action}
            title={formatter.label}
            className={
              formatter.isActive
                ? "bg-primary/20 text-primary font-semibold"
                : ""
            }
          >
            {formatter.icon}
          </Button>
        ))}

        <Popover open={linkOpen} onOpenChange={setLinkOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={editor.isActive("link") ? "secondary" : "ghost"}
              size="sm"
              title="Insert Link"
              className={
                editor.isActive("link")
                  ? "bg-primary/20 text-primary font-semibold"
                  : ""
              }
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 shadow-md">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Insert Link</h4>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label
                    htmlFor="link-url"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    URL
                  </label>
                  <Input
                    id="link-url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="focus-visible:ring-1 focus-visible:ring-primary"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        insertLink();
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  {editor.isActive("link") && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        editor.chain().focus().unsetLink().run();
                        setLinkOpen(false);
                      }}
                      className="text-xs"
                    >
                      Remove Link
                    </Button>
                  )}
                  <Button
                    type="button"
                    size="sm"
                    onClick={insertLink}
                    disabled={!linkUrl}
                    className="text-xs bg-primary hover:bg-primary/90"
                  >
                    Insert
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover open={imageOpen} onOpenChange={setImageOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              title="Insert Image"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 shadow-md">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Insert Image</h4>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label
                    htmlFor="image-url"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Image URL
                  </label>
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="focus-visible:ring-1 focus-visible:ring-primary"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        insertImage();
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    onClick={insertImage}
                    disabled={!imageUrl}
                    className="text-xs bg-primary hover:bg-primary/90"
                  >
                    Insert
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex gap-1 ml-auto">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
            className="text-muted-foreground hover:text-foreground"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
            className="text-muted-foreground hover:text-foreground"
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            title={showPreview ? "Edit" : "Preview"}
            className={
              showPreview
                ? "bg-primary/20 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            {showPreview ? (
              <Edit2 className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {showPreview ? (
        <div
          className="min-h-[200px] border rounded-md p-3 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        <div className="border rounded-md min-h-[200px] overflow-hidden">
          <EditorContent
            editor={editor}
            className="prose max-w-none p-3 min-h-[200px] focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
