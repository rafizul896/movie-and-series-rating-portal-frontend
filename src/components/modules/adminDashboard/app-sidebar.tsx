"use client";

import {
  Film,
  Home,
  Inbox,
  Users,
  ShoppingBag,
  UserRoundCog,
  Newspaper,
  History,
} from "lucide-react";
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

import Link from "next/link";
import NavUser from "./nav-user";
import Logo from "../shared/logo";
import { useUser } from "@/context/UserContext";
// import { NavUser } from "./nav-user";

const adminItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Media Management", url: "/admin/movie", icon: Film },
  { title: "Users Management", url: "/admin/users", icon: Users },
  { title: "Review Management", url: "/admin/reviews", icon: Inbox },
  {
    title: "Order History Management",
    url: "/admin/order-history",
    icon: ShoppingBag,
  },
  {
    title: "Newsletter Management",
    url: "/admin/newsletter",
    icon: ShoppingBag,
  },
  // {
  //   title: "Coupon Management",
  //   url: "/admin/coupon",
  //   icon: ShoppingBag,
  // },
];

const userItems = [
  {
    title: "Management Profile",
    url: "/user/manage-profile",
    icon: UserRoundCog,
  },
  { title: "Purchase History", url: "/user/purchase-history", icon: History },
  { title: "Newsletter History", url: "/user/newsletter", icon: Newspaper },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const items = user?.role === "USER" ? userItems : adminItems;

  return (
    <Sidebar
      className="w-56 bg-[#1a1a2e] text-gray-300 shadow-lg min-h-screen"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-5 tracking-wide px-3 pb-6 pt-4 ">
            <div className="px-4 py-5 border-b border-[#2a2a3b]">
              <Link href="/">
                <Logo />
              </Link>
            </div>
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
                              ? "bg-red-600 text-white"
                              : "hover:bg-red-200 text-gray-300"
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
