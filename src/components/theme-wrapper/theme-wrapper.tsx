"use client";
import { useTheme } from "@/context/theme.context";
import { ReactNode } from "react";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return <div data-theme={theme}>{children}</div>;
}