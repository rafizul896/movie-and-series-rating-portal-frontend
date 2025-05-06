"use client";

import { Calendar, Film, Home, Inbox, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
  { title: "Movie Management", url: "/admin/movie", icon: Film },
  { title: "Media", url: "/admin/media", icon: Film },
  { title: "Pending Reviews", url: "/admin/reviews/pending", icon: Inbox },
  {
    title: "Published Content",
    url: "/admin/content/published",
    icon: Calendar,
  },
  { title: "User Activity", url: "/admin/users/activity", icon: Search },
  { title: "Analytics", url: "/admin/analytics/stats", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="w-56 bg-[#1a1a2e] text-gray-300 shadow-lg min-h-screen">
      {/* Logo / Brand */}
      <div className="px-4 py-5 border-b border-[#2a2a3b]">
        <Link href="/" className="flex items-center gap-2">
          <Film className="text-blue-500" size={24} />
          <span className="text-xl font-bold text-white">FilmNest</span>
        </Link>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-xs text-gray-400 tracking-wide px-3 pt-4 pb-2">
            ADMIN DASHBOARD
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname?.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "hover:bg-[#2a2a3b] text-gray-300"
                          }
                        `}
                      >
                        <item.icon size={18} />
                        <span>{item.title}</span>
                      </Link>
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
