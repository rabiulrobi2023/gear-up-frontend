"use client";
import { logout } from "@/app/(auth)/_service/logOut";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DASHBOARD_ROUTES } from "@/constants/proxy.constant";
import { Role } from "@/interface/auth.interface";

import { IUserResponse } from "@/interface/user.interface";
import { getInitial } from "@/utils/getInitial";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const UserDropdownMenu = ({ user }: { user?: IUserResponse }) => {
  const router = useRouter();
  const initial = getInitial(user?.data?.name as string);

  const dashboardHref = DASHBOARD_ROUTES[user?.data?.role as Role];
  const pathName = usePathname();
  const isDashboardRoute = pathName.startsWith("/dashboard");

  const userMenuItems = [
    {
      label: isDashboardRoute ? "Exit From Dashboard" : "Dashboard",
      icon: LayoutDashboard,
      href: isDashboardRoute ? "/" : dashboardHref,
    },
    // {
    //   label: "Profile",
    //   icon: User,
    //   href: "/profile",
    // },
    // {
    //   label: "Settings",
    //   icon: Settings,
    //   href: "/settings",
    // },
  ];

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("User logged out successfully!");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Failed to log out.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="rounded-full w-10 h-10 bg-primary text-xl font-bold border-2 border-gray-600"
          aria-label="Open user menu"
        >
          {initial}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{user?.data?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.data?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {userMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <DropdownMenuItem asChild key={item.href}>
              <Link href={item.href}>
                <Icon className="mr-2 size-4" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
