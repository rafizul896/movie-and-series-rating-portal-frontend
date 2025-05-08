"use client";

import { Calendar, Film, Home, Inbox, Settings, Users } from "lucide-react";
import { usePathname } from "next/navigation";

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
import Link from "next/link";

const items = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Media Management", url: "/admin/movie", icon: Film },
  { title: "Users Management", url: "/admin/users", icon: Users },
  { title: "Review Management", url: "/admin/reviews", icon: Inbox },
  {
    title: "Published Content",
    url: "/admin/content/published",
    icon: Calendar,
  },

  { title: "Analytics", url: "/admin/analytics/stats", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="w-56 bg-[#1a1a2e] text-gray-300 shadow-lg min-h-screen" collapsible="icon">
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
        <Link href={"/"}>Home</Link>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
