"use client"

import * as React from "react"
import {
  Home,
  UserPlus,
  FolderPlus,
  BookOpen,
  Users,
  Search,
  Settings,
  FileText,
  Bot,
  Database,
  Building2,
  BarChart3,
  Package,
  FileSpreadsheet,
  Lightbulb
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Main",
      items: [
        {
          title: "Home",
          icon: Home,
        },
        {
          title: "New agent",
          icon: UserPlus,
        },
        {
          title: "New case",
          icon: FolderPlus,
        },
      ],
    },
    {
      title: "Knowledge Hub",
      items: [
        {
          title: "Knowledge Hub",
          icon: BookOpen,
        },
        {
          title: "Invite users",
          icon: Users,
        },
      ],
    },
    {
      title: "Search & Tools",
      items: [
        {
          title: "Search agents",
          icon: Search,
        },
        {
          title: "All Selected Quantity Docs",
          icon: FileText,
        },
        {
          title: "DARWIN: Multi-Select",
          icon: Settings,
        },
        {
          title: "DARWIN: Split/Merge",
          icon: Settings,
        },
        {
          title: "See all cases",
          icon: FileText,
        },
      ],
    },
    {
      title: "Agents & Analysis",
      items: [
        {
          title: "All agents",
          icon: Bot,
        },
        {
          title: "CdFs",
          icon: Database,
        },
        {
          title: "CIM Triage",
          icon: BarChart3,
        },
        {
          title: "Darwin Changelog POC",
          icon: FileSpreadsheet,
        },
        {
          title: "Deal Analysis Agent",
          icon: BarChart3,
        },
        {
          title: "Demo CIM",
          icon: Building2,
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Documentation2",
          icon: FileText,
        },
        {
          title: "GO - Builder Documentation",
          icon: Package,
        },
        {
          title: "Inventory Receiving",
          icon: Package,
        },
        {
          title: "LLM Review Review",
          icon: Lightbulb,
        },
        {
          title: "LLM Review Review2",
          icon: Lightbulb,
        },
        {
          title: "Rules Ground Truth",
          icon: FileText,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Jades Team</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-2 text-xs text-muted-foreground">
          <span>43,245 / ∞</span>
          <button className="text-xs hover:text-foreground">Upgrade</button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}