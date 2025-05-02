import React from "react";

// Extracts plain text from parsed React content (e.g., from html-react-parser)
export const extractPlainText = (parsedContent: React.ReactNode): string => {
  // Handle null or undefined
  if (parsedContent == null) {
    return "";
  }

  // Handle strings directly
  if (typeof parsedContent === "string") {
    return parsedContent.trim();
  }

  // Handle numbers and booleans by converting to string
  if (typeof parsedContent === "number" || typeof parsedContent === "boolean") {
    return String(parsedContent).trim();
  }

  // Handle arrays (e.g., multiple children)
  if (Array.isArray(parsedContent)) {
    return parsedContent
      .map((item) => extractPlainText(item))
      .filter((text) => text !== "") // Remove empty strings
      .join(" ")
      .trim();
  }

  // Handle React elements
  if (React.isValidElement(parsedContent)) {
    return extractPlainText(parsedContent?.props?.children);
  }

  // Fallback for other types
  return "";
};

// Truncates text to a specified length, adding "..." if needed
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};