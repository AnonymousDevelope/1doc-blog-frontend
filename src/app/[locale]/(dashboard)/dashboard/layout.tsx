import React from "react";
import { AppSidebar } from "./_components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <div className="flex gap-8 w-full">
          <AppSidebar />
          <SidebarInset>
            <div className="pr-4 rounded min-h-[300px]">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}
