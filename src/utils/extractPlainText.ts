import React, { ReactNode, ReactElement } from "react";

/**
 * Recursively extracts plain text from React nodes.
 * @param parsedContent - A ReactNode (string, number, boolean, element, or array) to extract text from.
 * @returns The extracted plain text string.
 */
export const extractPlainText = (parsedContent: ReactNode): string => {
  if (parsedContent == null || parsedContent === false || parsedContent === true) {
    return "";
  }

  if (typeof parsedContent === "string" || typeof parsedContent === "number") {
    return String(parsedContent).trim();
  }

  if (Array.isArray(parsedContent)) {
    return parsedContent
      .map((item) => extractPlainText(item))
      .filter(Boolean)
      .join(" ")
      .trim();
  }

  if (React.isValidElement(parsedContent)) {
    const element = parsedContent as ReactElement<{ children?: ReactNode }>; // ✅ Fix
    return extractPlainText(element.props.children);
  }

  return "";
};

/**
 * Truncates a string and adds ellipsis if it exceeds the given max length.
 * @param text - Input text string to truncate.
 * @param maxLength - Maximum length before truncation.
 * @returns Truncated string with ellipsis if applicable.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (typeof text !== "string") {
    console.warn("truncateText: Expected string input, received", typeof text);
    return "";
  }

  if (!Number.isFinite(maxLength) || maxLength < 0) {
    console.warn("truncateText: maxLength must be a non-negative number");
    return text;
  }

  if (text.length === 0 || text.length <= maxLength) {
    return text;
  }

  // Try not to cut in the middle of a word
  if (maxLength > 3) {
    const lastSpace = text.lastIndexOf(" ", maxLength);
    if (lastSpace !== -1 && lastSpace > maxLength - 10) {
      return text.slice(0, lastSpace) + "...";
    }
  }

  return text.slice(0, maxLength) + "...";
};
