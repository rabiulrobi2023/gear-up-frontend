"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
          <Image src={logo} width={50} height={50} alt="logo" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {userDashboardMenus.length ? (
              <SidebarMenuSub>
                {userDashboardMenus.map((menu) => (
                  <SidebarMenuSubItem key={menu.label}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathName === menu.href}
                    >
                      <Link href={menu.href}>
                        {" "}
                        <menu.icon /> {menu.label}
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
