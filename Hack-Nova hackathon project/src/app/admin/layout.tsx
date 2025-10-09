import Link from "next/link";
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { SmartHostelLogo } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, BedDouble, CalendarCheck, Wrench, LogOut, Repeat } from "lucide-react";

function AdminSidebar() {
  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, tab: null },
    { href: "/admin/dashboard?tab=approvals", label: "Room Approvals", icon: BedDouble, tab: "approvals" },
    { href: "/admin/dashboard?tab=changes", label: "Change Room", icon: Repeat, tab: "changes" },
    { href: "/admin/dashboard?tab=leaves", label: "Leave Approvals", icon: CalendarCheck, tab: "leaves" },
    { href: "/admin/dashboard?tab=repairs", label: "Repair Requests", icon: Wrench, tab: "repairs" },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
              <SmartHostelLogo className="h-8 w-8" />
              <span className="text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">SmartHostel</span>
            </Link>
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild tooltip={item.label}>
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src="https://picsum.photos/seed/admin-avatar/100/100" />
                <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="group-data-[collapsible=icon]:hidden">
                <p className="font-semibold text-sm">Admin Warden</p>
                <p className="text-xs text-muted-foreground">warden@smarthostel.com</p>
            </div>
            <Link href="/login" className="ml-auto group-data-[collapsible=icon]:hidden">
                <Button variant="ghost" size="icon">
                    <LogOut className="h-5 w-5" />
                </Button>
            </Link>
        </div>
      </SidebarFooter>
    </>
  );
}


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar variant="inset" collapsible="icon">
          <AdminSidebar />
        </Sidebar>
        <SidebarInset>
            <div className="p-4 sm:p-6 lg:p-8">
                {children}
            </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
