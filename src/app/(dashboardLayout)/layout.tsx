import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/modules/adminDashboard/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="px-4 py-2 w-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
