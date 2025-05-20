import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImagePreview(
  image: string | File | null | undefined,
): string {
  if (!image) return "/placeholder.svg";

  if (typeof image === "string") {
    return image; // URL from form.watch or database
  }

  if (image instanceof File) {
    return URL.createObjectURL(image); // File uploaded from input
  }

  return "/placeholder.svg";
}
