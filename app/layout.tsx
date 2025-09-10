import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Extraction Platform",
  description: "AI-powered document extraction and analysis platform for teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Tabs defaultValue="build" className="flex flex-col h-full">
              <header className="flex h-16 shrink-0 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <span className="text-sm text-muted-foreground">Home</span>
                </div>
                
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="build">Build</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                    <TabsTrigger value="automate">Automate</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline">Export</Button>
                  <Button>Share</Button>
                </div>
              </header>
              <div className="flex flex-1 flex-col">
                {children}
              </div>
            </Tabs>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
