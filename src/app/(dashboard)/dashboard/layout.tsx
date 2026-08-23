import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { DashboardSidebar } from "../_components/DashboardSidebar";
import DashboardNavbar from "../_components/DashboardNavbar";
import { cn } from "@/lib/utils";
import { getMe } from "@/app/(auth)/_service/getMe";
import { IUser } from "@/interface/user.interface";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <SidebarProvider
      className={cn(
        "group/sidebar-wrapper relative flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
      )}
    >
      <DashboardSidebar user={user?.data as IUser} />
      <SidebarInset>
        <DashboardNavbar />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
