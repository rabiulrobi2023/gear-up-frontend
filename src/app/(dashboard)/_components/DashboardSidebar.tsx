"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getUserMenus } from "@/utils/getDashboardMenus";
import { IUser } from "@/interface/user.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logo } from "@/constants/image.constant";
import Image from "next/image";

export function DashboardSidebar({ user }: { user: IUser }) {
  const userDashboardMenus = getUserMenus(user.role);
  const pathName = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mx-auto">
        <Link href={"/"}>
          <Image unoptimized src={logo} width={50} height={50} alt="logo" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {userDashboardMenus.length ? (
              <SidebarMenuSub className="border-0">
                {userDashboardMenus.map((menu) => (
                  <SidebarMenuSubItem key={menu.label}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathName === menu.href}
                      className="data-[active=true]:bg-primary data-[active=true]:text-white data-[active=true]:[&>svg]:text-white rounded-xs hover:bg-primary hover:text-white hover:[&>svg]:text-white"
                    >
                      <Link href={menu.href}>
                        {" "}
                        <menu.icon className="text-current" /> {menu.label}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            ) : null}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
