"use client"

import * as React from "react"
import {
  Home,
  UserPlus,
  FolderPlus,
  BookOpen,
  Users,
  Bot,
  Search,
  Plus,
  FileText
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
          title: "New Agent",
          icon: UserPlus,
        },
        {
          title: "New Case",
          icon: FolderPlus,
        },
        {
          title: "Knowledge Hub",
          icon: BookOpen,
        },
        {
          title: "Invite Users",
          icon: Users,
        },
      ],
    },
  ],
  searchAgents: {
    title: "Search for Agents",
    action: {
      title: "Click here to add Agents",
      icon: Plus,
    },
  },
  knowledgeAgents: {
    title: "Knowledge Agents", 
    action: {
      title: "Click here to add Knowledge Documents",
      icon: FileText,
    },
  },
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
            <span className="text-sm font-medium">Team Name</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
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
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            {data.searchAgents.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-muted-foreground hover:text-foreground">
                  <data.searchAgents.action.icon className="h-4 w-4" />
                  <span>{data.searchAgents.action.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            {data.knowledgeAgents.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-muted-foreground hover:text-foreground">
                  <data.knowledgeAgents.action.icon className="h-4 w-4" />
                  <span>{data.knowledgeAgents.action.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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