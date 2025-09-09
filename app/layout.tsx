import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const nunito = Nunito({
  variable: "--font-nunito",
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
        className={`${nunito.variable} font-sans antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Demo CIM</span>
                <div className="flex items-center gap-1">
                  <button className="rounded bg-muted px-2 py-1 text-xs">Build</button>
                  <button className="rounded bg-muted px-2 py-1 text-xs">Review</button>
                  <button className="rounded bg-muted px-2 py-1 text-xs">Automate</button>
                  <button className="rounded bg-muted px-2 py-1 text-xs">Export</button>
                  <button className="rounded bg-primary px-2 py-1 text-xs text-primary-foreground">Share</button>
                </div>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
