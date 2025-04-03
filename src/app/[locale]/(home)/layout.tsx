// src/app/[locale]/layout.tsx
import { Ad, Direction, Footer, InfoPanel, Navbar } from "@/components";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="fixed top-1/2 left-1 z-50 transition-all duration-700 animate-scaleAd">
        <Ad />
      </div>
      <InfoPanel />
      <Navbar />
      <Direction />
      <div className="px-4">{children}</div>
      <footer className="flex w-full">
        <Footer />
      </footer>
    </div>
  );
}
