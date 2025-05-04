"use client";

import { usePathname } from "next/navigation";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";

const items = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Create Movie", url: "/admin/create-movie", icon: Inbox },
  { title: "Pending Reviews", url: "/admin/reviews/pending", icon: Inbox },
  { title: "Published Content", url: "/admin/content/published", icon: Calendar },
  { title: "User Activity", url: "/admin/users/activity", icon: Search },
  { title: "Analytics", url: "/admin/analytics/stats", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="w-56 ">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-xs text-black tracking-wide px-3 pt-4 pb-2">
            ADMIN DASHBOARD
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${isActive ? "bg-blue-600 text-white" : "hover:bg-[#2a2a3b]"}
                        `}
                      >
                        <item.icon size={18} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-[#2a2a3b] mt-4 pt-3 px-3">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
