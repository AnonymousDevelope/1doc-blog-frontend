"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  // In a real app, this would upload to a storage service
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      // In a real app, this would be the URL returned from your storage service
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("image-upload")?.click()}
          disabled={isUploading}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? "Uploading..." : "Upload Image"}
        </Button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {value && (
        <div className="relative rounded-md overflow-hidden border">
          <div className="aspect-video relative">
            <Image
              src={value || "/placeholder.svg"}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={onRemove}
            className="absolute top-2 right-2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
